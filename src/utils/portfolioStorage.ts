import {
  ProfileData,
  CorsetProject,
  IndianWearProject,
  PattachitraProject,
  SustainabilityProject,
  LandingPageData,
} from '../types';

// Storage keys
const LANDING_PAGE_KEY = 'anuska_landing_page_data_v1';
const PROFILE_KEY = 'anuska_profile_data_v1';
const CORSETS_KEY = 'anuska_corsets_data_v1';
const INDIAN_WEAR_KEY = 'anuska_indian_wear_data_v1';
const PATTACHITRA_KEY = 'anuska_pattachitra_data_v1';
const SUSTAINABILITY_KEY = 'anuska_sustainability_data_v1';

// Default Landing Page Data
export const defaultLandingPageData: LandingPageData = {
  name: 'ANUSKA',
  subtitle: 'PRESS TO ENTER',
  portfolioTitle: 'Anuska Pratap Portfolio',
  archiveNumber: 'Archive No. 71-04',
  season: 'Spring / Summer 2026',
  pageMetadata: 'Landscape Landing Page',
  pageCue: 'PAGE 01 / 02',
};

export function loadLandingPageData(): LandingPageData {
  try {
    const saved = localStorage.getItem(LANDING_PAGE_KEY);
    if (saved) {
      return { ...defaultLandingPageData, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading landing page data:', e);
  }
  return defaultLandingPageData;
}

export function saveLandingPageData(data: LandingPageData): void {
  try {
    localStorage.setItem(LANDING_PAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving landing page data:', e);
  }
}


// Default Profile Data
export const defaultProfileData: ProfileData = {
  name: 'Anuska Pratap',
  title: 'Fashion & Textile Designer',
  email: 'pratapanuska24@gmail.com',
  phone: '9668886970',
  profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  aboutMePhoto: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
  shortIntroduction: 'Fashion designer specializing in sculptural couture corsetry, heritage Indian textiles, Pattachitra art integration, and circular zero-waste construction.',
  aboutMe: 'I am a fashion and textile designer driven by the dialogue between structural architectural silhouettes and age-old Indian craftsmanship. My practice spans from high-precision boned corsetry to handwoven heritage textiles and sustainable material experiments. Every piece is an exploration of form, artisanal dignity, and responsible production.',
  designPhilosophy: 'True luxury lies in the balance between precision engineering and soul-stirring craftsmanship. By respecting traditional artisanal narratives while re-imagining them through contemporary, anatomically conscious tailoring, fashion becomes both timeless armor and poetic expression.',
  educationAndExperience: [
    {
      id: 'item-1',
      type: 'education',
      title: 'Bachelor of Design (B.Des) in Fashion Design',
      organization: 'National Institute of Fashion Technology (NIFT)',
      duration: '2022 – 2026',
      details: 'Specialization in Couture Pattern Making, Indian Textile Heritage & Sustainable Draping. Graduated with honors.',
    },
    {
      id: 'item-2',
      type: 'education',
      title: 'Certificate in Haute Couture Corsetry & Bespoke Tailoring',
      organization: 'Advanced Pattern & Draping Masterclass',
      duration: '2024 – 2025',
      details: 'Intensive training in historical Victorian and Edwardian corsetry, internal spiral steel boning, and cupped bodice engineering.',
    },
    {
      id: 'item-3',
      type: 'internship',
      title: 'Couture Design Intern',
      organization: 'Heritage Craft & Embroidery Studio',
      duration: 'Summer 2025 (4 Months)',
      details: 'Assisted in master pattern drafting, zardozi embroidery sample development, and fitting sessions for runway couture collections.',
    },
  ],
  skillCategories: [
    {
      id: 'cat-garment',
      name: 'GARMENT MAKING',
      skills: [
        'Bespoke Corsetry & Boning',
        'Haute Couture Hand Stitching',
        'Draping & Flat Pattern Cutting',
        'Architectural Tailoring',
        'Cupped Bodice Engineering',
      ],
    },
    {
      id: 'cat-digital',
      name: 'DIGITAL & CAD',
      skills: [
        'Adobe Illustrator (CAD & Technical Flats)',
        'Adobe Photoshop (Digital Rendering & Moodboards)',
        'CLO 3D (3D Garment Simulation)',
        'InDesign (Tech Pack & Portfolio Layout)',
      ],
    },
    {
      id: 'cat-tech',
      name: 'TECH PACK & SPEC',
      skills: [
        'Technical Specification Sheets (Tech Packs)',
        'Grading & Size Specification Charts',
        'Bill of Materials (BOM)',
        'Stitch Diagnostics & Quality Control',
      ],
    },
    {
      id: 'cat-craft',
      name: 'HERITAGE CRAFT',
      skills: [
        'Pattachitra Palm Leaf & Canvas Painting',
        'Zardozi & Aari Hand Embroidery',
        'Natural Indigo & Herbal Dyeing',
        'Zero-Waste Pattern Draping',
        'Handloom Brocade & Raw Silk Handling',
      ],
    },
  ],
};

// Default Corsets Projects
export const defaultCorsetProjects: CorsetProject[] = [
  {
    id: 'corset-1',
    title: 'The Rose Silk Sculptural Corset',
    season: 'Spring / Summer 2026',
    concept: 'Exploration of classical 18th-century stays merged with modern ergonomic contouring. Built with 16 spiral steel bones, custom sweetheart bustline, and curved dipped hemline.',
    materials: 'Heavy Silk Satin in Rose Pink, Cotton Coutil lining, 7mm Spiral Steel Boning, Stainless Steel Eyelets, Grosgrain Waist Tape.',
    techniques: 'Multi-panel coutil interlining, bias-bound neckline, continuous channels, hand-inserted grommets, tension-balanced back lacing.',
    description: 'A signature couture piece framing the waistline with sculpted lines. Designed for structural stability while maintaining comfort and flexibility on the wearer.',
    images: [
      {
        id: 'img-c1-1',
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
        label: 'Front View',
        caption: 'Front silhouette showing sweetheart contour and dipped Basque waistline.',
        categoryFolder: '/images/corsets/',
        addedAt: 1,
      },
      {
        id: 'img-c1-2',
        url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
        label: 'Back View',
        caption: 'Rear view showcasing eyelet placement and cross-lacing tension.',
        categoryFolder: '/images/corsets/',
        addedAt: 2,
      },
      {
        id: 'img-c1-3',
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        label: 'Detail Shot',
        caption: 'Close-up of contrast boning channels and delicate micro-piping finish.',
        categoryFolder: '/images/corsets/',
        addedAt: 3,
      },
      {
        id: 'img-c1-4',
        url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
        label: 'Process / Draping',
        caption: 'Initial muslin fitting on bespoke mannequin exploring cup proportions.',
        categoryFolder: '/images/corsets/',
        addedAt: 4,
      },
      {
        id: 'img-c1-5',
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
        label: 'Sketches & CAD',
        caption: 'Vector specification drawing with seam balance and point-to-point measurements.',
        categoryFolder: '/images/corsets/',
        addedAt: 5,
      },
      {
        id: 'img-c1-6',
        url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
        label: 'Final Photoshoot',
        caption: 'Editorial editorial look styled with pleated organza overskirt.',
        categoryFolder: '/images/corsets/',
        addedAt: 6,
      },
    ],
  },
  {
    id: 'corset-2',
    title: 'Architectural Obsidian Cupped Bodice',
    season: 'Autumn / Winter Couture',
    concept: 'Geometric deconstruction inspired by brutalist facade patterns. Features segmented dual-tone panels and high-neck harness integration.',
    materials: 'Matte Duchess Satin, Structured Mesh, German Plastic Boning, Gunmetal Hardware.',
    techniques: 'Underwire cup insertion, French seam finishing, topstitched reinforcement channels.',
    description: 'A striking structural corset bodice balancing severe geometry with fluid organic styling.',
    images: [
      {
        id: 'img-c2-1',
        url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
        label: 'Front View',
        caption: 'Front perspective highlighting geometric panel transitions.',
        categoryFolder: '/images/corsets/',
        addedAt: 1,
      },
      {
        id: 'img-c2-2',
        url: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=80',
        label: 'Side View',
        caption: 'Profile line emphasizing underarm clearance and rib stabilization.',
        categoryFolder: '/images/corsets/',
        addedAt: 2,
      },
      {
        id: 'img-c2-3',
        url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80',
        label: 'Moodboard',
        caption: 'Visual inspiration board connecting modern architecture with Renaissance corsets.',
        categoryFolder: '/images/corsets/',
        addedAt: 3,
      },
    ],
  },
];

// Default Indian Wear Projects
export const defaultIndianWearProjects: IndianWearProject[] = [
  {
    id: 'iw-1',
    title: 'Gulabi Zardozi Brocade Ensemble',
    garmentType: 'Contemporary Lehenga & Structured Choli',
    concept: 'Re-imagining royal Awadh court silhouettes with contemporary ergonomics. The ensemble unites handloom Benarasi katan silk with sculptural tailoring.',
    fabrics: 'Pure Katan Silk Brocade with Real Gold Zari, Organza Tissue Dupatta, Micro-Velvet Blouse Base.',
    techniques: 'Zardozi metal embroidery, Dabka and Nakshi hand needlework, Resham silk thread shading, French knot detailing.',
    description: 'A bridal masterwork combining rich tactile craftsmanship with a lightweight, flowing silhouette designed for the modern bride.',
    images: [
      {
        id: 'img-iw1-1',
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        label: 'Garment Full View',
        caption: 'Full view of the 36-kali flared lehenga in rose gold and blush brocade.',
        categoryFolder: '/images/indian-wear/',
        addedAt: 1,
      },
      {
        id: 'img-iw1-2',
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
        label: 'Choli & Neckline Details',
        caption: 'Structured sweetheart choli with hand-placed micro pearl borders.',
        categoryFolder: '/images/indian-wear/',
        addedAt: 2,
      },
      {
        id: 'img-iw1-3',
        url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80',
        label: 'Design Sketch & Swatches',
        caption: 'Color rendering with actual fabric swatches and metallic thread tests.',
        categoryFolder: '/images/indian-wear/',
        addedAt: 3,
      },
      {
        id: 'img-iw1-4',
        url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
        label: 'Textile & Embroidery Close-Up',
        caption: 'Macrophotography of Zardozi needlework showing intricate wire looping.',
        categoryFolder: '/images/indian-wear/',
        addedAt: 4,
      },
    ],
  },
  {
    id: 'iw-2',
    title: 'Ivory & Lotus Drape Gown Saree',
    garmentType: 'Pre-draped Concept Saree',
    concept: 'Seamless fusion of the traditional six-yard drape with ready-to-wear red carpet ease, framed by hand-pleated pallu tiers.',
    fabrics: 'Mulberry Silk Crepe, Hand-dyed Chiffon, Crushed Tissue.',
    techniques: 'Pre-stitched pleating, concealed side zipper construction, hand-tucked waist pleats.',
    description: 'An ethereal evening ensemble highlighting the grace of Indian drapery with effortless wearability.',
    images: [
      {
        id: 'img-iw2-1',
        url: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?auto=format&fit=crop&w=1200&q=80',
        label: 'Garment Full View',
        caption: 'Full fluid silhouette showcasing waterfall pallu drape.',
        categoryFolder: '/images/indian-wear/',
        addedAt: 1,
      },
      {
        id: 'img-iw2-2',
        url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=1200&q=80',
        label: 'Draping Technique & Sketch',
        caption: 'Illustration detailing pleat calculation and anchor points.',
        categoryFolder: '/images/indian-wear/',
        addedAt: 2,
      },
    ],
  },
];

// Default Pattachitra Project
export const defaultPattachitraProjects: PattachitraProject[] = [
  {
    id: 'pat-1',
    title: 'Folklore in Threads: The Pattachitra Odyssey',
    inspiration: 'The ancient art of Raghurajpur heritage village in Odisha, where master chitrakars translate mythological narratives onto treated cloth scrolls (Patta) and palm leaves (Tala Pattachitra) using stone and mineral pigments.',
    research: 'Conducted field research documenting traditional line weights, floral border motifs (Kuhila), floral creepers, and mineral pigment preparation (conch shell white, harital yellow, lampblack, hingula red). Studied how to translate 2D scroll art into 3D wearable textile surfaces without compromising sacred storytelling authenticity.',
    designDevelopment: 'Developed modular narrative panels engineered directly to follow the contour lines of the female torso and sleeves. Transferred hand-drawn master motifs into digital Jacquard punchcards and hand-embroidery stencils.',
    technique: 'Direct hand-painting on primed raw Tussar silk using natural tamarind seed binder, followed by outline enhancement in single-strand silk thread and fine zari couching.',
    finalOutcome: 'A capsule collection consisting of a structured narrative trench coat, a hand-painted corset bodice with floral border framing, and an embroidered silk organza cape representing the tree of life motif.',
    images: [
      {
        id: 'img-p1-1',
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
        label: 'Inspiration & Art Reference',
        caption: 'Traditional palm leaf Pattachitra scroll documented during field research in Odisha.',
        categoryFolder: '/images/pattachitra/',
        addedAt: 1,
      },
      {
        id: 'img-p1-2',
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
        label: 'Research & Motif Study',
        caption: 'Extraction of traditional floral creepers and geometric border alignments.',
        categoryFolder: '/images/pattachitra/',
        addedAt: 2,
      },
      {
        id: 'img-p1-3',
        url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
        label: 'Design Development & Sketches',
        caption: 'Conceptual sketches placing narrative scrolls along spinal seams and sleeve lengths.',
        categoryFolder: '/images/pattachitra/',
        addedAt: 3,
      },
      {
        id: 'img-p1-4',
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
        label: 'Textile Experiments & Painting',
        caption: 'Pigment binding tests on raw Tussar and mulberry silk substrates.',
        categoryFolder: '/images/pattachitra/',
        addedAt: 4,
      },
      {
        id: 'img-p1-5',
        url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
        label: 'Final Garment Photoshoot',
        caption: 'Completed narrative garment styled with sculptural headpiece and artisan footwear.',
        categoryFolder: '/images/pattachitra/',
        addedAt: 5,
      },
    ],
  },
];

// Default Sustainability Project
export const defaultSustainabilityProjects: SustainabilityProject[] = [
  {
    id: 'sust-1',
    title: 'Zero-Waste Origami & Circular Deadstock',
    concept: 'Reclaiming industrial post-production deadstock silks and post-consumer denim to craft modular, zero-waste luxury garments through geometric tessellation and Japanese origami folding.',
    problemResearch: 'Fast fashion and commercial cutting rooms discard up to 15-20% of premium textile yardage as scrap waste. This project targets the elimination of cutting waste by utilizing whole-cloth geometrical tessellation.',
    materialsUsed: '100% Post-Industrial Deadstock Mulberry Silk, Reclaimed 13oz Indigo Denim Scraps, Natural Unbleached Cotton Muslin, Organic Beeswax Water-Repellent Sealant.',
    sustainableApproach: 'Zero-waste pattern engineering where 100% of the rectangular fabric width is utilized. No scraps are thrown away; microscopic fabric off-cuts are shredded to create internal volume and quilted insulation.',
    process: 'Each garment begins with square grid mapping. Laser-free hand scored folds are pressed into the silk, creating kinetic 3D pleats that expand and contract naturally without synthetic elastic fibers.',
    finalOutcome: 'A versatile 3-piece modular outfit that can be styled as a cape, a structured corset vest, or an asymmetrical evening skirt, certified 0.0% cutting room waste.',
    images: [
      {
        id: 'img-s1-1',
        url: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1200&q=80',
        label: 'Research & Textile Waste',
        caption: 'Sorting and categorization of post-industrial deadstock silk cuts by fiber weight.',
        categoryFolder: '/images/sustainability/',
        addedAt: 1,
      },
      {
        id: 'img-s1-2',
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
        label: 'Material Experiments',
        caption: 'Origami fold tests exploring kinetic elasticity without adding synthetic elastane.',
        categoryFolder: '/images/sustainability/',
        addedAt: 2,
      },
      {
        id: 'img-s1-3',
        url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80',
        label: 'Process & Zero-Waste Layout',
        caption: 'Full-width cutting layout demonstrating 0% fabric wastage marker planning.',
        categoryFolder: '/images/sustainability/',
        addedAt: 3,
      },
      {
        id: 'img-s1-4',
        url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
        label: 'Final Product & Photoshoot',
        caption: 'Editorial showcase of the completed modular zero-waste ensemble.',
        categoryFolder: '/images/sustainability/',
        addedAt: 4,
      },
    ],
  },
];

// Helper to convert File to Base64
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

// PROFILE GETTERS / SETTERS
export function loadProfileData(): ProfileData {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Ensure educationAndExperience exists
      if (!parsed.educationAndExperience || !Array.isArray(parsed.educationAndExperience) || parsed.educationAndExperience.length === 0) {
        if (parsed.education && Array.isArray(parsed.education) && parsed.education.length > 0) {
          parsed.educationAndExperience = parsed.education.map((e: any, i: number) => ({
            id: `migrated-${i}`,
            type: 'education',
            title: e.degree || '',
            organization: e.institution || '',
            duration: e.year || '',
            details: e.details || '',
          }));
        } else {
          parsed.educationAndExperience = defaultProfileData.educationAndExperience;
        }
      }

      // Ensure skillCategories exists
      if (!parsed.skillCategories || !Array.isArray(parsed.skillCategories) || parsed.skillCategories.length === 0) {
        if (parsed.skills) {
          parsed.skillCategories = [
            { id: 'cat-garment', name: 'GARMENT MAKING', skills: parsed.skills.garmentConstruction || [] },
            { id: 'cat-digital', name: 'DIGITAL & CAD', skills: parsed.skills.digitalSoftware || [] },
            { id: 'cat-tech', name: 'TECH PACK & SPEC', skills: parsed.skills.technicalDesign || [] },
            { id: 'cat-craft', name: 'HERITAGE CRAFT', skills: parsed.skills.textileCraft || [] },
          ];
        } else {
          parsed.skillCategories = defaultProfileData.skillCategories;
        }
      }

      // Ensure aboutMePhoto exists
      if (!parsed.aboutMePhoto) {
        parsed.aboutMePhoto = defaultProfileData.aboutMePhoto;
      }

      // Ensure phone is set to Contact: 9668886970 unless updated by user
      if (!parsed.phone || parsed.phone.includes('98765')) {
        parsed.phone = '9668886970';
      }

      return {
        ...defaultProfileData,
        ...parsed,
      };
    }
  } catch (e) {
    console.error('Error loading profile data:', e);
  }
  return defaultProfileData;
}

export function saveProfileData(data: ProfileData): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving profile data:', e);
  }
}

// CORSETS GETTERS / SETTERS
export function loadCorsetProjects(): CorsetProject[] {
  try {
    const saved = localStorage.getItem(CORSETS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading corsets data:', e);
  }
  return defaultCorsetProjects;
}

export function saveCorsetProjects(data: CorsetProject[]): void {
  try {
    localStorage.setItem(CORSETS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving corsets data:', e);
  }
}

// INDIAN WEAR GETTERS / SETTERS
export function loadIndianWearProjects(): IndianWearProject[] {
  try {
    const saved = localStorage.getItem(INDIAN_WEAR_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading Indian wear data:', e);
  }
  return defaultIndianWearProjects;
}

export function saveIndianWearProjects(data: IndianWearProject[]): void {
  try {
    localStorage.setItem(INDIAN_WEAR_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving Indian wear data:', e);
  }
}

// PATTACHITRA GETTERS / SETTERS
export function loadPattachitraProjects(): PattachitraProject[] {
  try {
    const saved = localStorage.getItem(PATTACHITRA_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading Pattachitra data:', e);
  }
  return defaultPattachitraProjects;
}

export function savePattachitraProjects(data: PattachitraProject[]): void {
  try {
    localStorage.setItem(PATTACHITRA_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving Pattachitra data:', e);
  }
}

// SUSTAINABILITY GETTERS / SETTERS
export function loadSustainabilityProjects(): SustainabilityProject[] {
  try {
    const saved = localStorage.getItem(SUSTAINABILITY_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading Sustainability data:', e);
  }
  return defaultSustainabilityProjects;
}

export function saveSustainabilityProjects(data: SustainabilityProject[]): void {
  try {
    localStorage.setItem(SUSTAINABILITY_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving Sustainability data:', e);
  }
}
