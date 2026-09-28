import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure storage directories exist for permanent image persistence
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const srcImagesDir = path.join(process.cwd(), 'src', 'assets', 'images');
  const publicDir = path.join(process.cwd(), 'public');
  const dataDir = path.join(process.cwd(), 'data');
  const dataUploadsDir = path.join(dataDir, 'uploads');

  for (const dir of [uploadsDir, srcImagesDir, publicDir, dataDir, dataUploadsDir]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const stateFilePath = path.join(dataDir, 'portfolio-state.json');
  const manifestFilePath = path.join(dataDir, 'uploads-manifest.json');

  // Synchronize and restore any manifest images to disk on server boot
  try {
    if (fs.existsSync(manifestFilePath)) {
      const rawManifest = fs.readFileSync(manifestFilePath, 'utf-8');
      const manifest = JSON.parse(rawManifest);
      for (const [key, item] of Object.entries<any>(manifest)) {
        if (item?.dataUrl && item?.filename) {
          const targetUploadPath = path.join(uploadsDir, item.filename);
          const targetSrcPath = path.join(srcImagesDir, item.filename);
          const targetPublicPath = path.join(publicDir, item.filename);
          const targetDataPath = path.join(dataUploadsDir, item.filename);
          if (!fs.existsSync(targetUploadPath) || !fs.existsSync(targetSrcPath) || !fs.existsSync(targetPublicPath) || !fs.existsSync(targetDataPath)) {
            const comma = item.dataUrl.indexOf(',');
            const base64 = comma !== -1 ? item.dataUrl.slice(comma + 1) : item.dataUrl;
            const buf = Buffer.from(base64, 'base64');
            if (buf.length > 0) {
              if (!fs.existsSync(targetUploadPath)) fs.writeFileSync(targetUploadPath, buf);
              if (!fs.existsSync(targetSrcPath)) fs.writeFileSync(targetSrcPath, buf);
              if (!fs.existsSync(targetPublicPath)) fs.writeFileSync(targetPublicPath, buf);
              if (!fs.existsSync(targetDataPath)) fs.writeFileSync(targetDataPath, buf);
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('[Storage Boot] Manifest sync notice:', err);
  }

  // Parse JSON payloads up to 100MB for high-resolution uncompressed original photos
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  // Helper to find image on disk across all persistent locations
  const findImageOnDisk = (filename: string): string | null => {
    const clean = path.basename(filename);
    const candidates = [
      path.join(uploadsDir, clean),
      path.join(srcImagesDir, clean),
      path.join(publicDir, clean),
      path.join(dataUploadsDir, clean),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) return c;
    }
    // Try matching without timestamp prefix or extension variance
    const lower = clean.toLowerCase();
    for (const dir of [uploadsDir, srcImagesDir, publicDir, dataUploadsDir]) {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        for (const f of files) {
          if (f.toLowerCase() === lower || f.toLowerCase().endsWith(lower) || lower.endsWith(f.toLowerCase())) {
            return path.join(dir, f);
          }
        }
      }
    }
    return null;
  };

  // Dedicated resilient route for /uploads/:filename
  app.get('/uploads/:filename(*)', async (req, res, next) => {
    try {
      const requested = req.params.filename;
      const foundPath = findImageOnDisk(requested);
      if (foundPath) {
        return res.sendFile(foundPath);
      }

      // Check manifest for dataUrl recovery
      if (fs.existsSync(manifestFilePath)) {
        const raw = await fs.promises.readFile(manifestFilePath, 'utf-8');
        const manifest = JSON.parse(raw);
        let item = manifest[requested] || manifest[`/uploads/${requested}`] || manifest[path.basename(requested)];
        if (!item) {
          const baseReq = path.basename(requested).toLowerCase();
          for (const val of Object.values<any>(manifest)) {
            if (val?.filename?.toLowerCase() === baseReq || val?.originalFilename?.toLowerCase() === baseReq) {
              item = val;
              break;
            }
          }
        }
        if (item?.dataUrl) {
          const comma = item.dataUrl.indexOf(',');
          const base64 = comma !== -1 ? item.dataUrl.slice(comma + 1) : item.dataUrl;
          const buf = Buffer.from(base64, 'base64');
          if (buf.length > 0) {
            const restoredPath = path.join(uploadsDir, path.basename(requested));
            await fs.promises.writeFile(restoredPath, buf).catch(() => {});
            const mime = item.dataUrl.slice(5, comma).split(';')[0] || 'image/jpeg';
            res.setHeader('Content-Type', mime);
            return res.send(buf);
          }
        }
      }
      return next();
    } catch {
      return next();
    }
  });

  // Dedicated resilient route for /src/assets/images/:filename
  app.get('/src/assets/images/:filename(*)', async (req, res, next) => {
    try {
      const requested = req.params.filename;
      const foundPath = findImageOnDisk(requested);
      if (foundPath) {
        return res.sendFile(foundPath);
      }

      // Check manifest for dataUrl recovery
      if (fs.existsSync(manifestFilePath)) {
        const raw = await fs.promises.readFile(manifestFilePath, 'utf-8');
        const manifest = JSON.parse(raw);
        let item = manifest[requested] || manifest[`/src/assets/images/${requested}`] || manifest[`/uploads/${requested}`] || manifest[path.basename(requested)];
        if (!item) {
          const baseReq = path.basename(requested).toLowerCase();
          for (const val of Object.values<any>(manifest)) {
            if (val?.filename?.toLowerCase() === baseReq || val?.originalFilename?.toLowerCase() === baseReq) {
              item = val;
              break;
            }
          }
        }
        if (item?.dataUrl) {
          const comma = item.dataUrl.indexOf(',');
          const base64 = comma !== -1 ? item.dataUrl.slice(comma + 1) : item.dataUrl;
          const buf = Buffer.from(base64, 'base64');
          if (buf.length > 0) {
            const restoredPath = path.join(srcImagesDir, path.basename(requested));
            await fs.promises.writeFile(restoredPath, buf).catch(() => {});
            const mime = item.dataUrl.slice(5, comma).split(';')[0] || 'image/jpeg';
            res.setHeader('Content-Type', mime);
            return res.send(buf);
          }
        }
      }
      return next();
    } catch {
      return next();
    }
  });

  // Serve static folders
  app.use('/uploads', express.static(uploadsDir));
  app.use('/uploads', express.static(srcImagesDir));
  app.use('/src/assets/images', express.static(srcImagesDir));
  app.use('/src/assets/images', express.static(uploadsDir));
  app.use(express.static(publicDir));

  // API ROUTE 1: Permanent Image Upload & Multi-Location Disk Storage
  // Adheres strictly to the Permanent User Asset Preservation Rule:
  // 1. Saves exact bytes to public/uploads/
  // 2. Saves exact bytes to src/assets/images/
  // 3. Saves to public/
  // 4. Backs up in data/uploads-manifest.json for guaranteed permanent recovery
  app.post('/api/upload', async (req, res) => {
    try {
      const { filename, dataUrl } = req.body;
      if (!dataUrl || typeof dataUrl !== 'string') {
        return res.status(400).json({ error: 'Valid dataUrl is required' });
      }

      // Extract base64 cleanly
      const commaIdx = dataUrl.indexOf(',');
      const header = commaIdx !== -1 ? dataUrl.slice(0, commaIdx) : '';
      const base64Data = commaIdx !== -1 ? dataUrl.slice(commaIdx + 1) : dataUrl;
      const buffer = Buffer.from(base64Data, 'base64');

      if (buffer.length === 0) {
        return res.status(400).json({ error: 'Uploaded file data is empty' });
      }

      // Determine extension from header or original filename
      let ext = '.jpg';
      const lowerHeader = header.toLowerCase();
      const lowerFilename = (filename || '').toLowerCase();
      if (lowerHeader.includes('png') || lowerFilename.endsWith('.png')) ext = '.png';
      else if (lowerHeader.includes('webp') || lowerFilename.endsWith('.webp')) ext = '.webp';
      else if (lowerHeader.includes('gif') || lowerFilename.endsWith('.gif')) ext = '.gif';
      else if (lowerHeader.includes('svg') || lowerFilename.endsWith('.svg')) ext = '.svg';
      else if (lowerHeader.includes('jpeg') || lowerHeader.includes('jpg') || lowerFilename.endsWith('.jpg') || lowerFilename.endsWith('.jpeg')) ext = '.jpg';

      // Generate clean safe filename preserving original name
      const originalClean = (filename || 'portfolio_asset')
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .replace(/\.[^/.]+$/, '');
      const finalFilename = `${Date.now()}_${originalClean}${ext}`;

      // Write to multiple persistent locations
      const primaryPath = path.join(uploadsDir, finalFilename);
      const srcPath = path.join(srcImagesDir, finalFilename);
      const publicPath = path.join(publicDir, finalFilename);
      const dataBackupPath = path.join(dataUploadsDir, finalFilename);

      await Promise.all([
        fs.promises.writeFile(primaryPath, buffer),
        fs.promises.writeFile(srcPath, buffer).catch(() => {}),
        fs.promises.writeFile(publicPath, buffer).catch(() => {}),
        fs.promises.writeFile(dataBackupPath, buffer).catch(() => {}),
      ]);

      // Copy to dist/uploads if dist exists (ensures availability in production build)
      const distUploads = path.join(process.cwd(), 'dist', 'uploads');
      if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
        if (!fs.existsSync(distUploads)) {
          fs.mkdirSync(distUploads, { recursive: true });
        }
        await fs.promises.writeFile(path.join(distUploads, finalFilename), buffer).catch(() => {});
      }

      const publicUrl = `/uploads/${finalFilename}`;

      // Update persistent uploads manifest
      try {
        let manifest: Record<string, any> = {};
        if (fs.existsSync(manifestFilePath)) {
          try {
            manifest = JSON.parse(await fs.promises.readFile(manifestFilePath, 'utf-8'));
          } catch {}
        }
        manifest[finalFilename] = {
          filename: finalFilename,
          originalFilename: filename,
          publicUrl,
          dataUrl,
          size: buffer.length,
          uploadedAt: new Date().toISOString(),
        };
        manifest[publicUrl] = manifest[finalFilename];

        const tmpManifest = `${manifestFilePath}.tmp`;
        await fs.promises.writeFile(tmpManifest, JSON.stringify(manifest, null, 2), 'utf-8');
        await fs.promises.rename(tmpManifest, manifestFilePath);
      } catch (manifestErr) {
        console.warn('[Asset Preservation] Manifest update notice:', manifestErr);
      }

      console.log(`[Permanent Asset Storage] Saved original user asset: ${finalFilename} (${buffer.length} bytes) to disk & manifest`);

      return res.json({
        success: true,
        url: publicUrl,
        filename: finalFilename,
        size: buffer.length,
      });
    } catch (err: any) {
      console.error('[Permanent Asset Storage] Error saving image:', err);
      return res.status(500).json({ error: 'Failed to permanently store image: ' + (err?.message || err) });
    }
  });

  // API ROUTE 2: Get full persistent portfolio state from disk
  app.get('/api/portfolio-state', async (_req, res) => {
    try {
      if (fs.existsSync(stateFilePath)) {
        const raw = await fs.promises.readFile(stateFilePath, 'utf-8');
        const data = JSON.parse(raw);
        return res.json({ success: true, state: data });
      }
      return res.json({ success: true, state: {} });
    } catch (err: any) {
      console.error('[State Storage] Error reading portfolio state:', err);
      return res.status(500).json({ error: 'Failed to read state: ' + (err?.message || err) });
    }
  });

  // API ROUTE 3: Save / Update persistent portfolio state to disk
  app.post('/api/portfolio-state', async (req, res) => {
    try {
      const { key, data } = req.body;
      if (!key) {
        return res.status(400).json({ error: 'key is required' });
      }

      let currentState: Record<string, any> = {};
      if (fs.existsSync(stateFilePath)) {
        try {
          const raw = await fs.promises.readFile(stateFilePath, 'utf-8');
          currentState = JSON.parse(raw);
        } catch {
          currentState = {};
        }
      }

      currentState[key] = data;
      currentState._lastUpdated = new Date().toISOString();

      // Write atomically to stateFilePath
      const tempPath = `${stateFilePath}.tmp`;
      await fs.promises.writeFile(tempPath, JSON.stringify(currentState, null, 2), 'utf-8');
      await fs.promises.rename(tempPath, stateFilePath);

      console.log(`[State Storage] Persisted section '${key}' to disk successfully.`);
      return res.json({ success: true, key });
    } catch (err: any) {
      console.error('[State Storage] Error saving portfolio state:', err);
      return res.status(500).json({ error: 'Failed to save state: ' + (err?.message || err) });
    }
  });

  // API ROUTE 4: List all permanently preserved uploaded images
  app.get('/api/images', async (_req, res) => {
    try {
      const files = await fs.promises.readdir(uploadsDir);
      const images = files.map((f) => ({
        filename: f,
        url: `/uploads/${f}`,
      }));
      res.json({ success: true, images });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to read images: ' + (err?.message || err) });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware for development vs static build serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Portfolio Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
