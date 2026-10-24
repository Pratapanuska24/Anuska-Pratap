import {
  savePortfolioStateToServer,
  loadPortfolioStateFromServer,
  saveToIdb,
  loadFromIdb,
} from './portfolioStorage';

export interface WorkImage {
  id: string;
  url: string; // Base64 data URL or external URL
  name?: string;
  caption?: string;
  addedAt: number;
}

export interface WorkProject {
  id: string;
  title: string;
  category: string;
  description: string;
  season?: string;
  tags?: string[];
  images: WorkImage[];
  featuredImageIndex?: number;
  isDefault?: boolean;
}

const STORAGE_KEY = 'anuska_portfolio_work_projects_v2';
const IDB_WORK_KEY = 'anuska_work_projects_idb';

export const DEFAULT_WORK_PROJECTS: WorkProject[] = [
  {
    id: 'work-1',
    title: 'The Rewoven Corset',
    category: 'Sustainable Couture & Draping',
    season: 'SS26 Collection',
    description: 'Exploration of zero-waste textile manipulation and back-lacing corset tailoring using leftover deadstock jacquard fabrics, hand-finished with contrast silk embroidery.',
    tags: ['Zero Waste', 'Back Lacing', 'Upcycled Jacquard', 'Hand Embroidery'],
    isDefault: true,
    images: [
      {
        id: 'img-1-1',
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FCE7F3"/><stop offset="100%" stop-color="%23F472B6"/></linearGradient></defs><rect width="400" height="500" fill="url(%23bg)"/><rect x="30" y="30" width="340" height="440" rx="8" fill="%23FFFFFF" stroke="%23F472B6" stroke-width="3"/><path d="M120 120 C140 90, 260 90, 280 120 L260 360 C220 380, 180 380, 140 360 Z" fill="%23FBCFE8" stroke="%23EC4899" stroke-width="3"/><path d="M170 140 L230 170 M230 140 L170 170 M170 170 L230 200 M230 170 L170 200 M170 200 L230 230 M230 200 L170 230 M170 230 L230 260 M230 230 L170 260 M170 260 L230 290 M230 260 L170 290" stroke="%23BE185D" stroke-width="3" stroke-linecap="round"/><circle cx="170" cy="140" r="4" fill="%239D174D"/><circle cx="230" cy="140" r="4" fill="%239D174D"/><circle cx="170" cy="170" r="4" fill="%239D174D"/><circle cx="230" cy="170" r="4" fill="%239D174D"/><circle cx="170" cy="200" r="4" fill="%239D174D"/><circle cx="230" cy="200" r="4" fill="%239D174D"/><circle cx="170" cy="230" r="4" fill="%239D174D"/><circle cx="230" cy="230" r="4" fill="%239D174D"/><circle cx="170" cy="260" r="4" fill="%239D174D"/><circle cx="230" cy="260" r="4" fill="%239D174D"/><circle cx="170" cy="290" r="4" fill="%239D174D"/><circle cx="230" cy="290" r="4" fill="%239D174D"/><text x="200" y="420" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23BE185D" text-anchor="middle" letter-spacing="3">BACK LACING TAILORING</text></svg>',
        name: 'Back Lacing Corset Tech',
        caption: 'Back criss-cross metallic eyelet and satin cord construction.',
        addedAt: Date.now()
      }
    ]
  },
  {
    id: 'work-2',
    title: 'Noir Bloom Draping',
    category: '3D Mannequin Draping',
    season: 'Couture Sample',
    description: '3D mannequin draping and fluid bias-cut gown construction with layered sheer organza frills, deep open back geometry, and sculptural silhouette.',
    tags: ['Couture', 'Bias Cut', 'Deep Back', 'Organza Frills'],
    isDefault: true,
    images: [
      {
        id: 'img-2-1',
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FDF2F8"/><stop offset="100%" stop-color="%23FBCFE8"/></linearGradient></defs><rect width="400" height="500" fill="url(%23bg2)"/><rect x="30" y="30" width="340" height="440" rx="8" fill="%23FFFFFF" stroke="%23F472B6" stroke-width="3"/><path d="M150 110 C130 80, 270 80, 250 110 L270 340 Q200 370 130 340 Z" fill="%2318181B"/><path d="M130 340 Q200 360 270 340 Q280 390 120 390 Z" fill="%23FCE7F3" stroke="%23EC4899" stroke-width="2"/><path d="M140 360 Q200 380 260 360 Q265 405 135 405 Z" fill="%23FFFFFF" stroke="%23F472B6" stroke-width="2"/><circle cx="200" cy="180" r="16" fill="%23FDF2F8" stroke="%23DB2777" stroke-width="1.5"/><path d="M190 180 Q200 168 210 180 Q200 192 190 180 Z" fill="%23BE185D"/><text x="200" y="440" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23831843" text-anchor="middle" letter-spacing="3">NOIR BLOOM DRAPE</text></svg>',
        name: 'Draped Gown Prototype',
        caption: 'Bias-cut drape with white cascading organza frills.',
        addedAt: Date.now()
      }
    ]
  },
  {
    id: 'work-3',
    title: 'Technical Flat CADs & Specs',
    category: 'Technical Design & Production',
    season: 'SS26 Tech Pack',
    description: 'Complete production tech packs including garment measurements, trims, hardware, stitch tolerances, and digital vector flats created in Adobe Illustrator.',
    tags: ['Vector CAD', 'BOM Sheet', 'Tech Pack', 'Stitch Specs'],
    isDefault: true,
    images: [
      {
        id: 'img-3-1',
        url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FFF1F2"/><stop offset="100%" stop-color="%23FCE7F3"/></linearGradient></defs><rect width="400" height="500" fill="url(%23bg3)"/><rect x="30" y="30" width="340" height="440" rx="8" fill="%23FFFFFF" stroke="%23F472B6" stroke-width="3"/><path d="M70 120 Q130 95 190 120 L175 280 Q130 305 85 280 Z" fill="%23FDF2F8" stroke="%23EC4899" stroke-width="2.5"/><path d="M130 110 L130 295" stroke="%23DB2777" stroke-width="1.5" stroke-dasharray="3 3"/><text x="130" y="140" font-size="9" fill="%239D174D" font-family="monospace">CF</text><path d="M220 130 L320 130 L305 280 L235 280 Z" fill="%23FDF2F8" stroke="%23EC4899" stroke-width="2.5"/><path d="M270 130 L270 280" stroke="%23DB2777" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="260" cy="150" r="3" fill="%23BE185D"/><circle cx="280" cy="150" r="3" fill="%23BE185D"/><circle cx="260" cy="180" r="3" fill="%23BE185D"/><circle cx="280" cy="180" r="3" fill="%23BE185D"/><circle cx="260" cy="210" r="3" fill="%23BE185D"/><circle cx="280" cy="210" r="3" fill="%23BE185D"/><circle cx="260" cy="240" r="3" fill="%23BE185D"/><circle cx="280" cy="240" r="3" fill="%23BE185D"/><text x="130" y="330" font-size="11" font-weight="bold" fill="%23BE185D" font-family="monospace">FRONT FLAT</text><text x="270" y="330" font-size="11" font-weight="bold" fill="%23BE185D" font-family="monospace">BACK FLAT</text><rect x="60" y="370" width="280" height="60" rx="4" fill="%23FCE7F3" stroke="%23F472B6"/><text x="80" y="395" font-size="10" font-weight="bold" fill="%239D174D" font-family="monospace">FABRIC: PINK DUPIONI SILK</text><text x="80" y="415" font-size="10" font-weight="bold" fill="%239D174D" font-family="monospace">TRIM: 8MM SPIRAL STEEL BONING</text></svg>',
        name: 'Technical Flat CAD Specs',
        caption: 'Front & back vector construction details with boning placement.',
        addedAt: Date.now()
      }
    ]
  }
];

export function loadWorkProjects(): WorkProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_WORK_PROJECTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Failed to load work projects:', err);
  }
  return DEFAULT_WORK_PROJECTS;
}

export async function loadWorkProjectsAsync(): Promise<WorkProject[]> {
  try {
    const serverData = await loadPortfolioStateFromServer<WorkProject[]>('work_projects');
    if (serverData && Array.isArray(serverData) && serverData.length > 0) {
      return serverData;
    }
    const idbData = await loadFromIdb<WorkProject[]>(IDB_WORK_KEY);
    if (idbData && Array.isArray(idbData) && idbData.length > 0) {
      return idbData;
    }
  } catch (err) {
    console.warn('Failed to load work projects async:', err);
  }
  return loadWorkProjects();
}

export function saveWorkProjects(projects: WorkProject[]): void {
  // 1. Permanent server disk persistence
  savePortfolioStateToServer('work_projects', projects).catch((e) => {
    console.warn('Server save warning for work projects:', e);
  });

  // 2. Persistent IndexedDB mirror (quota-safe)
  saveToIdb(IDB_WORK_KEY, projects).catch(() => {});

  // 3. LocalStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save work projects to localStorage:', err);
  }
}
