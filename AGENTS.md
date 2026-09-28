# PERMANENT SYSTEM DIRECTIVE: USER ASSET PRESERVATION RULE

## CRITICAL MANDATE — STRICTLY ENFORCED ACROSS ALL TURNS
Every image uploaded, pasted, or provided by the user in this portfolio MUST be treated as a **FINAL, FIXED USER ASSET**.

### 15 STRICT PRESERVATION RULES
1. **DO NOT** generate, recreate, redraw, reinterpret, stylize, enhance, retouch, replace, or modify any uploaded image.
2. The uploaded image must appear **EXACTLY** as provided:
   - Same person / model
   - Same garment
   - Same pose
   - Same background
   - Same colours
   - Same texture
   - Same proportions
   - Same composition
   - Same resolution and aspect ratio wherever technically possible
3. **NEVER** replace an uploaded image with an AI-generated version, stock image, placeholder, similar image, or newly generated model.
4. **NEVER** regenerate an image when the website is refreshed, reopened, rebuilt, or edited.
5. Uploaded images must remain **permanently associated** with their specific portfolio section/project.
6. If an image already exists in a section, **PRESERVE THAT EXACT IMAGE**. Do not remove it or substitute another image unless the user explicitly instructs to do so.
7. **DO NOT** use AI image generation to populate an image slot when the user has already provided an image.
8. **DO NOT** use random images, temporary preview URLs, generated placeholders, or temporary upload references as the permanent source for portfolio images.
9. Store and reference the original uploaded image as the actual asset used by the website so that it remains available after:
   - Page refresh
   - Browser reopening
   - Closing and reopening the project
   - Website redeployment
   - Editing other parts of the website (text, styles, layouts)
   - Making future AI Studio edits
10. If an implementation uses temporary image URLs or temporary upload data, the original uploaded files must be persisted to disk storage (`public/uploads/` and `src/assets/images/`) and IndexedDB.
11. **SEPARATE IMAGE DATA FROM WEBSITE DESIGN CODE**: Editing layout, typography, animations, headings, colors, or other content must **NEVER** overwrite, drop, or regenerate saved image assets.
12. Existing uploaded images are **HIGH PRIORITY CONTENT**. Preserve them before making any other website modification.
13. Before changing anything, identify all currently uploaded portfolio images and preserve their exact file references/assets.
14. If an image cannot be permanently stored because of a technical limitation, **DO NOT** silently replace it with another image. Keep the existing image reference intact.
15. This rule applies to **ALL portfolio pages and ALL future image uploads**.

### CORE PRINCIPLE
> **USER-UPLOADED PHOTOS ARE FINAL ORIGINAL ASSETS — NEVER PROMPTS FOR AI IMAGE GENERATION.**
> When the user uploads or specifies a photograph, use **THAT EXACT FILE** as the website image. Never recreate what you see in the photograph.
