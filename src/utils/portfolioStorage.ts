import {
  ProfileData,
  CorsetProject,
  CorsetEditorialSection,
  DressEditorialItem,
  IndianWearProject,
  PattachitraProject,
  SustainabilityProject,
  GalleryImage,
  DressesProject,
  LandingPageData,
} from '../types';
import corset01ImageC11 from '../assets/images/C1.1.jpg';
import corset01ImageC12 from '../assets/images/C1.2.png';
import corset01ImageC13 from '../assets/images/C1.3.jpg';
import corset2ImageC41 from '../assets/images/C4.1.jpg';
import corset2ImageC42 from '../assets/images/C4.2.jpeg';
import corset2ImageC43 from '../assets/images/C4.3.jpg';
import corset2ImageC44 from '../assets/images/C4.4.jpeg';
import corset2ImageC45 from '../assets/images/C4.5.jpeg';
import corset3ImageC1 from '../assets/images/C1.jpeg';
import corset3ImageC2 from '../assets/images/C2.jpeg';
import corset3ImageC3 from '../assets/images/C3.jpeg';
import corset3ImageC4 from '../assets/images/C4.png';
import corset4ImageC51 from '../assets/images/C5.1.jpeg';
import corset4ImageC52 from '../assets/images/C5.2.jpeg';
import corset4ImageC53 from '../assets/images/C5.3.jpeg';
import corset4ImageC54 from '../assets/images/C5.4.jpeg';
import dressOneCover from '../assets/images/Cover D1.jpg';
import dressTwoCover from '../assets/images/Cover D2.jpg';
import dressThreeCover from '../assets/images/Cover D3.jpg';
import dressOneBlushPink from '../assets/images/D1.jpeg';
import dressOneBlushPinkDetail from '../assets/images/D2.jpeg';
import dressOneBlushPinkFinal from '../assets/images/D3.jpeg';
import velvetNoirDressOne from '../assets/images/D3.1.jpeg';
import velvetNoirDressTwo from '../assets/images/D3.2.jpeg';
import velvetNoirDressThree from '../assets/images/D3.3.jpeg';
import personalSpaceME1 from '../assets/images/ME1.jpeg';
import profileMEE from '../assets/images/MEE.jpeg';
import anuskaCV from '../assets/images/Anuska CV.jpg';
import coverOnePortrait from '../assets/images/Cover 1.jpg';

// Storage keys
const LANDING_PAGE_KEY = 'anuska_landing_page_data_v1';
const PROFILE_KEY = 'anuska_profile_data_v1';
const PROFILE_PRESENTATION_MIGRATION_KEY = 'anuska_profile_presentation_v1';
const CORSETS_KEY = 'anuska_corsets_data_v1';
const CORSET_EDITORIAL_KEY = 'anuska_corset_editorial_v2';
const CORSET_EDITORIAL_TEXT_KEY = 'anuska_corset_editorial_text_v3';
const CORSET_EDITORIAL_IDB_KEY = 'corset_editorial_full_data';
const INDIAN_WEAR_KEY = 'anuska_indian_wear_data_v1';
const PATTACHITRA_KEY = 'anuska_pattachitra_data_v1';
const SUSTAINABILITY_KEY = 'anuska_sustainability_data_v1';
const DRESSES_KEY = 'anuska_dresses_data_v1';
const PERSONAL_SPACE_KEY = 'anuska_personal_space_v1';

// Default Landing Page Data
export const defaultLandingPageData: LandingPageData = {
  name: 'ANUSKA',
  subtitle: 'Tap to explore more…',
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
      const parsed = JSON.parse(saved);
      // If previous subtitle was 'PRESS TO ENTER', modernize to user's requested 'Tap to explore more…'
      if (parsed.subtitle === 'PRESS TO ENTER') {
        parsed.subtitle = 'Tap to explore more…';
      }
      return { ...defaultLandingPageData, ...parsed };
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
  title: 'Fashion Designer',
  email: 'pratapanuska24@gmail.com',
  phone: '9668886970',
  profilePhoto: profileMEE,
  aboutMePhoto: coverOnePortrait,
  shortIntroduction: 'Hey, I am Anuska, a fashion design student , very passionate and inclined towards exploring and learning new. My work combines creativity with a strong interest in sustainability, Research and thoughtful material exploration. Through my designs, I enjoy experimenting with silhouettes, techniques, and materials to create pieces that tell a story while balancing aesthetics with purpose.',
  aboutMe: 'Hi, I’m Anuska Pratap, a fashion designer with a playful spirit, a curious mind, and a love for exploring the unexpected. Raised in Kuwait and now pursuing my creative journey in India, my experiences have shaped the way I perceive fashion, culture, and identity. I love experimenting with silhouettes, textures, colours, and unconventional materials, constantly challenging myself to think beyond the ordinary. From corsetry and draping to textile exploration and sustainable design, I enjoy transforming ideas into something expressive and meaningful. For me, fashion is more than just clothing; it is a language through which I communicate, tell stories, and express emotions. I find inspiration in everyday experiences, different cultures, and the freedom to experiment without boundaries. I believe in embracing imperfections, questioning conventions, and finding beauty in the unexpected. This portfolio is a glimpse into my creative world, where curiosity meets craftsmanship and every design tells a story.',
  designPhilosophy: 'True luxury lies in the balance between precision engineering and soul-stirring craftsmanship. By respecting traditional artisanal narratives while re-imagining them through contemporary, anatomically conscious tailoring, fashion becomes both timeless armor and poetic expression.',
  educationAndExperience: [
    {
      id: 'item-1',
      type: 'education',
      title: 'INDUS DESUGN SCHOOL',
      organization: 'INDUS UNIVERSITY Ahmedabad · Fashion Designing',
      duration: '2023-27',
      details: 'Minor Degree - Sustainability.',
    },
    {
      id: 'item-2',
      type: 'education',
      title: 'Indian Community School, Kuwait',
      organization: 'Fashion Studies - 96% · CBSE',
      duration: '2021-23',
      details: '(10+2- 81%)',
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

function migrateProfilePresentation(data: ProfileData): { profile: ProfileData; migrated: boolean } {
  try {
    if (localStorage.getItem(PROFILE_PRESENTATION_MIGRATION_KEY) === 'v3') {
      return { profile: data, migrated: false };
    }
  } catch (error) {
    console.warn('Could not check profile presentation migration state:', error);
  }

  return {
    profile: {
      ...data,
      aboutMePhoto: anuskaCV,
    },
    migrated: true,
  };
}

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
export const defaultDigitalCanvasImages: GalleryImage[] = [
  {
    id: 'digital-canvas-d1-1',
    url: '/uploads/D1.1.png',
    label: 'D1.1 — Cover',
    caption: 'Drishti and Abhinay project cover',
    categoryFolder: '/images/sustainability/',
    addedAt: 1001,
  },
  {
    id: 'digital-canvas-d1-2',
    url: '/uploads/D1.2.png',
    label: 'D1.2',
    caption: 'Eye expression development and prototypes',
    categoryFolder: '/images/sustainability/',
    addedAt: 1002,
  },
  {
    id: 'digital-canvas-d1-3',
    url: '/uploads/D1.3.png',
    label: 'D1.3',
    caption: 'Expressions explored through digital eye studies',
    categoryFolder: '/images/sustainability/',
    addedAt: 1003,
  },
  {
    id: 'digital-canvas-d1-4',
    url: '/uploads/D1.4.png',
    label: 'D1.4',
    caption: 'Bharatanatyam-inspired eye and face design',
    categoryFolder: '/images/sustainability/',
    addedAt: 1004,
  },
];

export const defaultSustainabilityProjects: SustainabilityProject[] = [
  {
    id: 'sust-1',
    title: 'Drishti and Abhinay',
    concept: 'Reclaiming industrial post-production deadstock silks and post-consumer denim to craft modular, zero-waste luxury garments through geometric tessellation and Japanese origami folding.',
    problemResearch: 'Fast fashion and commercial cutting rooms discard up to 15-20% of premium textile yardage as scrap waste. This project targets the elimination of cutting waste by utilizing whole-cloth geometrical tessellation.',
    materialsUsed: '100% Post-Industrial Deadstock Mulberry Silk, Reclaimed 13oz Indigo Denim Scraps, Natural Unbleached Cotton Muslin, Organic Beeswax Water-Repellent Sealant.',
    sustainableApproach: 'Zero-waste pattern engineering where 100% of the rectangular fabric width is utilized. No scraps are thrown away; microscopic fabric off-cuts are shredded to create internal volume and quilted insulation.',
    process: 'Each garment begins with square grid mapping. Laser-free hand scored folds are pressed into the silk, creating kinetic 3D pleats that expand and contract naturally without synthetic elastic fibers.',
    finalOutcome: 'A versatile 3-piece modular outfit that can be styled as a cape, a structured corset vest, or an asymmetrical evening skirt, certified 0.0% cutting room waste.',
    images: [
      ...defaultDigitalCanvasImages,
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

// Image Compression Helper to keep Base64 strings small and prevent LocalStorage quota errors
export function compressImageFile(file: File, maxDim = 1000, quality = 0.80): Promise<string> {
  return new Promise((resolve) => {
    // If it's not a compressible image format (e.g. SVG), fall back to standard reader
    if (!file.type.startsWith('image/') || file.type.includes('svg')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = Math.max(width, 1);
          canvas.height = Math.max(height, 1);
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } catch (err) {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => resolve(event.target?.result as string);
      img.src = event.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

// Helper to convert File to Base64 (preserves high fidelity and avoids unnecessary compression)
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = (e.target?.result as string) || '';
      if (res) {
        resolve(res);
      } else {
        reject(new Error('File reader returned empty result.'));
      }
    };
    reader.onerror = () => {
      reject(reader.error || new Error('Failed to read file from disk.'));
    };
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

      const profile = {
        ...defaultProfileData,
        ...parsed,
      };
      return migrateProfilePresentation(profile).profile;
    }
  } catch (e) {
    console.error('Error loading profile data:', e);
  }
  return migrateProfilePresentation(defaultProfileData).profile;
}

export function saveProfileData(data: ProfileData): void {
  // 1. Immediately save to Node.js server disk storage (/data/portfolio-state.json)
  savePortfolioStateToServer('profile_data', data).catch((e) => {
    console.warn('Server save warning for profile data:', e);
  });

  // 2. Immediately save to IndexedDB (resilient against quota limits)
  saveToIdb('anuska_profile_data_idb', data).catch(() => {});
  if (data.profilePhoto) {
    savePhotoToIdb('profile_hero_photo', data.profilePhoto).catch(() => {});
  } else if (data.profilePhoto === '') {
    savePhotoToIdb('profile_hero_photo', '__REMOVED__').catch(() => {});
  }
  if (data.aboutMePhoto) {
    savePhotoToIdb('profile_about_me_photo', data.aboutMePhoto).catch(() => {});
  } else if (data.aboutMePhoto === '') {
    savePhotoToIdb('profile_about_me_photo', '__REMOVED__').catch(() => {});
  }

  // 3. Also try localStorage
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
  } catch (e: any) {
    console.warn('Could not save profile to localStorage (quota or storage restriction):', e?.message || e);
  }
}

export async function loadProfileDataAsync(): Promise<ProfileData> {
  try {
    // 1. Load from server disk first
    const serverData = await loadPortfolioStateFromServer<ProfileData>('profile_data');

    // 2. Load from IndexedDB
    const idbData = await loadFromIdb<ProfileData>('anuska_profile_data_idb');
    const heroPhoto = await loadPhotoFromIdb('profile_hero_photo');
    const aboutPhoto = await loadPhotoFromIdb('profile_about_me_photo');

    const base = serverData || idbData || loadProfileData();
    const profilePhoto = heroPhoto === '__REMOVED__' ? '' : (heroPhoto || base.profilePhoto);
    const aboutMePhoto = aboutPhoto === '__REMOVED__' ? '' : (aboutPhoto || base.aboutMePhoto);

    const loadedProfile = {
      ...base,
      profilePhoto,
      aboutMePhoto,
    };
    const migration = migrateProfilePresentation(loadedProfile);
    if (migration.migrated) {
      saveProfileData(migration.profile);
      try {
        localStorage.setItem(PROFILE_PRESENTATION_MIGRATION_KEY, 'v3');
      } catch (error) {
        console.warn('Could not save profile presentation migration state:', error);
      }
    }
    return migration.profile;
  } catch {
    return loadProfileData();
  }
}

// CORSETS GETTERS / SETTERS
export function loadCorsetProjects(): CorsetProject[] {
  try {
    const saved = localStorage.getItem(CORSETS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Graceful fallback
  }
  return defaultCorsetProjects;
}

export function saveCorsetProjects(data: CorsetProject[]): void {
  try {
    localStorage.setItem(CORSETS_KEY, JSON.stringify(data));
  } catch (e: any) {
    console.warn('Could not save corsets to localStorage:', e?.message || e);
  }
}

// CORSET SLOT CAPACITIES: Corset 1: 3 photos, Corset 2: 5 photos, Corset 3: 4 photos, Corset 4: 4 photos
export const CORSET_SLOT_COUNTS = [3, 5, 4, 4] as const;

// CORSET EDITORIAL SECTIONS
export const defaultCorsetEditorialSections: CorsetEditorialSection[] = [
  {
    id: 'corset-01',
    title: 'CORSET 01 — Corset',
    name: '',
    images: [corset01ImageC11, corset01ImageC12, corset01ImageC13],
    description: '',
  },
  {
    id: 'corset-02',
    title: 'CORSET 02 — THE SCARLET DUST',
    name: 'THE SCARLET DUST',
    images: [corset2ImageC41, corset2ImageC42, corset2ImageC43, corset2ImageC44, corset2ImageC45],
    description: 'A deep red velvet corset designed with asymmetrical detailing to create a silhouette that feels both bold and elegant. The richness of velvet paired with sharp structure gives the garment a dramatic yet timeless presence.',
  },
  {
    id: 'corset-03',
    title: 'CORSET 03 — MY BOLLYWOOD ERA',
    name: 'MY BOLLYWOOD ERA',
    images: [
      corset3ImageC1,
      corset3ImageC2,
      corset3ImageC3,
      corset3ImageC4,
    ],
    description: 'Inspired by the drama, glamour, and timeless allure of Bollywood, this corset celebrates bold femininity and cinematic elegance. Its construction features multiple layers, creating depth, texture, and a sculpted silhouette. The rich burgundy tones and intricate surface detailing capture the essence of a statement piece, blending traditional glamour with contemporary styling.',
  },
  {
    id: 'corset-04',
    title: 'CORSET 04 — THE BOLD BADDIE',
    name: 'THE BOLD BADDIE',
    images: [corset4ImageC51, corset4ImageC52, corset4ImageC53, corset4ImageC54],
    description: 'This corset is a bold fusion of elegance and drama, designed to create a striking visual contrast through texture, structure, and transparency. Crafted with black satin pleats along the bust area, the garment highlights sculpted detailing and refined craftsmanship while enhancing the silhouette with a luxurious finish.',
  },
];

export function loadCorsetEditorialSections(): CorsetEditorialSection[] {
  // Synchronous loader for instant rendering without flicker
  try {
    // 1. First check if text-only metadata is available in localStorage
    const textSaved = localStorage.getItem(CORSET_EDITORIAL_TEXT_KEY);
    const textMap: Record<number, { name: string; title: string; description: string }> = {};
    if (textSaved) {
      try {
        const parsedText = JSON.parse(textSaved);
        if (Array.isArray(parsedText)) {
          parsedText.forEach((item, idx) => {
            textMap[idx] = {
              name: item.name || '',
              title: item.title || (item.name ? `CORSET 0${idx + 1} — ${item.name}` : `CORSET 0${idx + 1} — Corset`),
              description: item.description || '',
            };
          });
        }
      } catch {}
    }

    // 2. Check full localStorage if available
    const saved = localStorage.getItem(CORSET_EDITORIAL_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 4) {
        return parsed.map((item, idx) => {
          const targetCount = CORSET_SLOT_COUNTS[idx] || 4;
          const rawName = textMap[idx]?.name !== undefined && textMap[idx].name !== ''
            ? textMap[idx].name
            : (item.name !== undefined ? item.name : (
                item.title && !item.title.match(/^(?:0\d|CORSET\s*0\d)\s*—\s*(?:Corset)?$/i)
                  ? item.title.replace(/^(?:0\d|CORSET\s*0\d)\s*—\s*/i, '')
                  : ''
              ));
          const rawTitle = textMap[idx]?.title || (
            rawName ? `CORSET 0${idx + 1} — ${rawName}` : `CORSET 0${idx + 1} — Corset`
          );
          const rawDesc = textMap[idx]?.description !== undefined && textMap[idx].description !== ''
            ? textMap[idx].description
            : (item.description || '');

          const rawImages = Array.isArray(item.images) ? item.images : [];
          const loadedImages = Array.from({ length: targetCount }, (_, slotIdx) => rawImages[slotIdx] || null);

          if (idx === 0) {
            loadedImages[0] = corset01ImageC11;
            loadedImages[1] = corset01ImageC12;
            loadedImages[2] = corset01ImageC13;
          }
          if (idx === 1) {
            loadedImages[0] = corset2ImageC41;
            loadedImages[1] = corset2ImageC42;
            loadedImages[2] = corset2ImageC43;
            loadedImages[3] = corset2ImageC44;
            loadedImages[4] = corset2ImageC45;
          }
          if (idx === 2) {
            const corset03Defaults = [
              '/1779093243584.png',
              '/20260518_135055.jpg.jpeg',
              '/20260518_135011.jpg.jpeg',
              null,
              null,
            ];
            corset03Defaults.forEach((cImg, sIdx) => {
              if (sIdx < loadedImages.length && !loadedImages[sIdx]) loadedImages[sIdx] = cImg;
            });
          }
          if (idx === 3) {
            const corset04Defaults = [
              corset4ImageC51,
              corset4ImageC52,
              corset4ImageC53,
              corset4ImageC54,
            ];
            corset04Defaults.forEach((cImg, sIdx) => {
              if (!loadedImages[sIdx]) loadedImages[sIdx] = cImg;
            });
          }

          return {
            id: item.id || `corset-0${idx + 1}`,
            title: rawTitle,
            name: rawName,
            images: loadedImages,
            description: rawDesc,
          };
        });
      }
    }

    // 3. If text-only had 4 items, build with empty images until IDB hydrates them
    if (Object.keys(textMap).length === 4) {
      return defaultCorsetEditorialSections.map((sec, idx) => ({
        id: sec.id,
        title: textMap[idx]?.title || `CORSET 0${idx + 1} — Corset`,
        name: textMap[idx]?.name || '',
        images: idx === 0 
          ? [corset01ImageC11, corset01ImageC12, corset01ImageC13] 
          : idx === 1
            ? [corset2ImageC41, corset2ImageC42, corset2ImageC43, corset2ImageC44, corset2ImageC45]
            : idx === 2
              ? ['/1779093243584.png', '/20260518_135055.jpg.jpeg', '/20260518_135011.jpg.jpeg', null, null]
              : Array(CORSET_SLOT_COUNTS[idx] || 4).fill(null),
        description: textMap[idx]?.description || '',
      }));
    }

    // 4. Fallback: Check older key if present to recover any user data
    const olderSaved = localStorage.getItem(CORSETS_KEY);
    if (olderSaved) {
      const parsedOlder = JSON.parse(olderSaved);
      if (Array.isArray(parsedOlder) && parsedOlder.length > 0) {
        return defaultCorsetEditorialSections.map((sec, idx) => {
          const targetCount = CORSET_SLOT_COUNTS[idx] || 4;
          const oldProj = parsedOlder[idx];
          if (!oldProj) return sec;
          const oldImgs = Array.isArray(oldProj.images)
            ? oldProj.images.map((img: any) => typeof img === 'string' ? img : img?.url || null).filter(Boolean)
            : [];
          return {
            id: sec.id,
            title: `CORSET 0${idx + 1} — ${oldProj.title || 'Corset'}`,
            name: oldProj.title || '',
            images: Array.from({ length: targetCount }, (_, sIdx) => oldImgs[sIdx] || null),
            description: oldProj.description || oldProj.concept || '',
          };
        });
      }
    }
  } catch (e) {
    console.error('Error loading corset editorial sections:', e);
  }
  return defaultCorsetEditorialSections;
}

// SERVER-BACKED DISK PERSISTENCE HELPERS
// Writes and reads directly to Node.js server disk (/data/portfolio-state.json)
// Ensuring uploaded assets and portfolio edits survive page refresh, browser close, and project reopens.
export async function savePortfolioStateToServer<T = any>(key: string, data: T): Promise<boolean> {
  try {
    const res = await fetch('/api/portfolio-state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, data }),
    });
    return res.ok;
  } catch (e) {
    console.warn(`[State Persistence] Server save warning for ${key} (falling back to IDB):`, e);
    return false;
  }
}

export async function loadPortfolioStateFromServer<T = any>(key: string): Promise<T | null> {
  try {
    const res = await fetch('/api/portfolio-state');
    if (res.ok) {
      const json = await res.json();
      if (json && json.state && json.state[key] !== undefined) {
        return json.state[key] as T;
      }
    }
  } catch (e) {
    console.warn(`[State Persistence] Server read warning for ${key}:`, e);
  }
  return null;
}

export async function loadCorsetEditorialSectionsAsync(): Promise<CorsetEditorialSection[]> {
  // Start with best synchronous data
  const base = loadCorsetEditorialSections();

  try {
    // 1. Try loading persistent document from server disk first
    const serverFull = await loadPortfolioStateFromServer<CorsetEditorialSection[]>('corset_editorial');

    // 2. Try loading full document from IndexedDB
    const idbFull = await loadFromIdb<CorsetEditorialSection[]>(CORSET_EDITORIAL_IDB_KEY);

    // 3. Try loading individual slot images from IndexedDB
    const slotImages: (string | null)[][] = CORSET_SLOT_COUNTS.map((count) =>
      Array(count).fill(null)
    );

    await Promise.all(
      CORSET_SLOT_COUNTS.map(async (count, sIdx) => {
        await Promise.all(
          Array.from({ length: Math.max(count, 5) }, (_, iIdx) => iIdx).map(async (iIdx) => {
            const img = await loadPhotoFromIdb(`corset_${sIdx}_slot_${iIdx}`);
            if (img && iIdx < count) {
              slotImages[sIdx][iIdx] = img;
            }
          })
        );
      })
    );

    // Default static slot fallback images (only used when user has not uploaded or replaced an image)
    const defaultCorsetSlots: (string | null)[][] = [
      [corset01ImageC11, corset01ImageC12, corset01ImageC13],
      [corset2ImageC41, corset2ImageC42, corset2ImageC43, corset2ImageC44, corset2ImageC45],
      [corset3ImageC1, corset3ImageC2, corset3ImageC3, corset3ImageC4],
      [corset4ImageC51, corset4ImageC52, corset4ImageC53, corset4ImageC54],
    ];

    // 4. Merge serverFull, base, idbFull, and slotImages with 100% respect for user uploaded assets
    const merged: CorsetEditorialSection[] = base.map((baseSec, sIdx) => {
      const serverSec = Array.isArray(serverFull) ? serverFull[sIdx] : null;
      const idbSec = Array.isArray(idbFull) ? idbFull[sIdx] : null;
      const targetCount = CORSET_SLOT_COUNTS[sIdx] || 4;

      // Preserve name: prefer user edited name from server -> IDB -> base
      const name = (serverSec?.name && serverSec.name.trim() !== '')
        ? serverSec.name
        : (baseSec.name && baseSec.name.trim() !== ''
          ? baseSec.name
          : (idbSec?.name || ''));

      const isDefaultTitle = !baseSec.title || Boolean(baseSec.title.match(/^CORSET\s*0\d\s*—\s*Corset$/i));
      const title = serverSec?.title || ((!isDefaultTitle && baseSec.title)
        ? baseSec.title
        : (idbSec?.title || (name ? `CORSET 0${sIdx + 1} — ${name}` : `CORSET 0${sIdx + 1} — Corset`)));

      const description = (serverSec?.description && serverSec.description.trim() !== '')
        ? serverSec.description
        : ((baseSec.description && baseSec.description.trim() !== '')
          ? baseSec.description
          : (idbSec?.description || ''));

      const images = Array.from({ length: targetCount }, (_, iIdx) => {
        // Priority: individual slot in IDB -> server saved state -> full IDB doc -> base (localStorage)
        const val = slotImages[sIdx]?.[iIdx] ?? serverSec?.images?.[iIdx] ?? idbSec?.images?.[iIdx] ?? baseSec.images?.[iIdx];
        if (val === '__REMOVED__') {
          return null;
        }
        // If a user uploaded an image (whether /uploads/ or dataUrl or other URL), PRESERVE THAT EXACT IMAGE!
        if (val && typeof val === 'string' && val.trim() !== '') {
          return val;
        }
        // Fall back to original default image slot only when slot is unassigned
        return defaultCorsetSlots[sIdx]?.[iIdx] ?? null;
      });

      return {
        id: baseSec.id,
        title,
        name,
        images,
        description,
      };
    });

    return merged;
  } catch (err) {
    console.error('Error in loadCorsetEditorialSectionsAsync:', err);
    return base;
  }
}

export async function saveCorsetEditorialSections(data: CorsetEditorialSection[]): Promise<boolean> {
  let isSuccess = true;

  // 1. ALWAYS save to Node.js server disk storage (/data/portfolio-state.json)
  savePortfolioStateToServer('corset_editorial', data).catch((e) => {
    console.warn('Server save warning for corset editorial:', e);
  });

  // 2. ALWAYS save text-only metadata to localStorage (100% quota-safe, instantaneous)
  try {
    const textData = data.map((sec, idx) => ({
      id: sec.id || `corset-0${idx + 1}`,
      title: sec.title || (sec.name ? `CORSET 0${idx + 1} — ${sec.name}` : `CORSET 0${idx + 1} — Corset`),
      name: sec.name || '',
      description: sec.description || '',
    }));
    localStorage.setItem(CORSET_EDITORIAL_TEXT_KEY, JSON.stringify(textData));
  } catch (e) {
    console.warn('LocalStorage text save warning:', e);
  }

  // 3. Try saving full data to localStorage (if quota permits)
  try {
    localStorage.setItem(CORSET_EDITORIAL_KEY, JSON.stringify(data));
  } catch {
    // Quota exceeded is normal for multi-MB photos - IndexedDB and server disk are our rock-solid primary stores
  }

  // 4. Save full data to IndexedDB
  try {
    const savedDoc = await saveToIdb(CORSET_EDITORIAL_IDB_KEY, data);
    if (!savedDoc) isSuccess = false;
  } catch {
    isSuccess = false;
  }

  // 5. Save each individual image slot into IndexedDB (safeguarding any existing high-res dataUrl)
  try {
    await Promise.all(
      data.map((sec, sIdx) =>
        Promise.all(
          sec.images.map(async (img, iIdx) => {
            const key = `corset_${sIdx}_slot_${iIdx}`;
            if (img) {
              if (img.startsWith('data:')) {
                return savePhotoToIdb(key, img);
              }
              // Never overwrite an existing high-res data: URL in IDB with a relative URL string
              return;
            } else {
              return savePhotoToIdb(key, '__REMOVED__');
            }
          })
        )
      )
    );
  } catch (e) {
    console.warn('Error saving individual slot photos to IDB:', e);
  }

  return isSuccess;
}

// INDIAN WEAR GETTERS / SETTERS
export function loadIndianWearProjects(): IndianWearProject[] {
  try {
    const saved = localStorage.getItem(INDIAN_WEAR_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Graceful fallback
  }
  return defaultIndianWearProjects;
}

export async function loadIndianWearProjectsAsync(): Promise<IndianWearProject[]> {
  try {
    const serverData = await loadPortfolioStateFromServer<IndianWearProject[]>('indian_wear');
    if (serverData && serverData.length > 0) return serverData;
    const idbData = await loadFromIdb<IndianWearProject[]>('anuska_indianwear_idb');
    if (idbData && idbData.length > 0) return idbData;
  } catch {
    // Fallback
  }
  return loadIndianWearProjects();
}

export function saveIndianWearProjects(data: IndianWearProject[]): void {
  // 1. Server disk persistence
  savePortfolioStateToServer('indian_wear', data).catch(() => {});

  // 2. IndexedDB persistence (quota-safe)
  saveToIdb('anuska_indianwear_idb', data).catch(() => {});

  // 3. LocalStorage sync
  try {
    localStorage.setItem(INDIAN_WEAR_KEY, JSON.stringify(data));
  } catch (e: any) {
    console.warn('Could not save Indian wear to localStorage:', e?.message || e);
  }
}

// PATTACHITRA GETTERS / SETTERS
export function loadPattachitraProjects(): PattachitraProject[] {
  try {
    const saved = localStorage.getItem(PATTACHITRA_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Graceful fallback
  }
  return defaultPattachitraProjects;
}

export async function loadPattachitraProjectsAsync(): Promise<PattachitraProject[]> {
  try {
    const serverData = await loadPortfolioStateFromServer<PattachitraProject[]>('pattachitra');
    if (serverData && serverData.length > 0) return serverData;
    const idbData = await loadFromIdb<PattachitraProject[]>('anuska_pattachitra_idb');
    if (idbData && idbData.length > 0) return idbData;
  } catch {
    // Fallback
  }
  return loadPattachitraProjects();
}

export function savePattachitraProjects(data: PattachitraProject[]): void {
  // 1. Server disk persistence
  savePortfolioStateToServer('pattachitra', data).catch(() => {});

  // 2. IndexedDB persistence (quota-safe)
  saveToIdb('anuska_pattachitra_idb', data).catch(() => {});

  // 3. LocalStorage sync
  try {
    localStorage.setItem(PATTACHITRA_KEY, JSON.stringify(data));
  } catch (e: any) {
    console.warn('Could not save Pattachitra to localStorage:', e?.message || e);
  }
}

// SUSTAINABILITY GETTERS / SETTERS
export interface SustainabilityBannerData {
  categorySubtitle: string;
  categoryFolder: string;
  bannerTitle: string;
  bannerDescription: string;
}

const SUSTAINABILITY_BANNER_KEY = 'anuska_sustainability_banner_v1';

export const defaultSustainabilityBanner: SustainabilityBannerData = {
  categorySubtitle: 'PAGE 05 — CIRCULAR TEXTILES, DEADSTOCK & ZERO-WASTE ENGINEERING',
  categoryFolder: '/images/sustainability/',
  bannerTitle: 'ZERO-WASTE, DEADSTOCK & CIRCULAR DESIGN',
  bannerDescription: 'Dedicated portfolio celebrating ecological responsibility in luxury fashion: post-industrial deadstock salvage, post-consumer denim reweaving, 100% whole-cloth zero-waste pattern markers, and origami-inspired kinetic folding systems.',
};

export function loadSustainabilityBanner(): SustainabilityBannerData {
  try {
    const saved = localStorage.getItem(SUSTAINABILITY_BANNER_KEY);
    if (saved) return { ...defaultSustainabilityBanner, ...JSON.parse(saved) };
  } catch {
    // Graceful fallback
  }
  return defaultSustainabilityBanner;
}

export async function loadSustainabilityBannerAsync(): Promise<SustainabilityBannerData> {
  try {
    const serverData = await loadPortfolioStateFromServer<SustainabilityBannerData>('sustainability_banner');
    if (serverData && serverData.bannerTitle) return { ...defaultSustainabilityBanner, ...serverData };
    const idbData = await loadFromIdb<SustainabilityBannerData>('anuska_sustainability_banner_idb');
    if (idbData && idbData.bannerTitle) return { ...defaultSustainabilityBanner, ...idbData };
  } catch {
    // Fallback
  }
  return loadSustainabilityBanner();
}

export function saveSustainabilityBanner(data: SustainabilityBannerData): void {
  savePortfolioStateToServer('sustainability_banner', data).catch(() => {});
  saveToIdb('anuska_sustainability_banner_idb', data).catch(() => {});
  try {
    localStorage.setItem(SUSTAINABILITY_BANNER_KEY, JSON.stringify(data));
  } catch (e: any) {
    console.warn('Could not save Sustainability banner to localStorage:', e?.message || e);
  }
}

export function loadSustainabilityProjects(): SustainabilityProject[] {
  try {
    const saved = localStorage.getItem(SUSTAINABILITY_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Graceful fallback
  }
  return defaultSustainabilityProjects;
}

export async function loadSustainabilityProjectsAsync(): Promise<SustainabilityProject[]> {
  try {
    const serverData = await loadPortfolioStateFromServer<SustainabilityProject[]>('sustainability');
    if (serverData && serverData.length > 0) return serverData;
    const idbData = await loadFromIdb<SustainabilityProject[]>('anuska_sustainability_idb');
    if (idbData && idbData.length > 0) return idbData;
  } catch {
    // Fallback
  }
  return loadSustainabilityProjects();
}

export function saveSustainabilityProjects(data: SustainabilityProject[]): void {
  // 1. Server disk persistence
  savePortfolioStateToServer('sustainability', data).catch(() => {});

  // 2. IndexedDB persistence (quota-safe)
  saveToIdb('anuska_sustainability_idb', data).catch(() => {});

  // 3. LocalStorage sync
  try {
    localStorage.setItem(SUSTAINABILITY_KEY, JSON.stringify(data));
  } catch (e: any) {
    console.warn('Could not save Sustainability to localStorage:', e?.message || e);
  }
}

// DEFAULT DRESSES PROJECTS
export const defaultDressesProjects: DressesProject[] = [
  {
    id: 'dress-1',
    title: 'Sculpted Chiffon & Architecture Gown',
    silhouette: 'Mermaid Column with Architectural Flounce',
    concept: 'An exploration of fluid drapery contrasted against rigid geometric understructures, inspired by modern parametric facades.',
    fabrics: 'Pure Mulberry Silk Chiffon, Heavy Silk Crepe, Hand-Dyed Organza',
    techniques: 'Bias Draping, Hand-Rolled Hems, Internal Georgette Bodice, Micro Pleating',
    description: 'A striking evening gown exploring weightless volumetric movement. The interior bodice features minimalist bone casing for effortless support, while exterior hand-pleated chiffon cascades organically to create dynamic silhouettes in motion.',
    images: [
      {
        id: 'img-dr-1',
        url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80',
        label: 'Front Editorial View',
        caption: 'Full-length runway presentation showing cascading bias drape',
        categoryFolder: '/images/dresses/',
        addedAt: Date.now() - 300000,
      },
      {
        id: 'img-dr-2',
        url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
        label: 'Silhouette Movement',
        caption: 'Motion capture highlighting fluid silk chiffon hemline',
        categoryFolder: '/images/dresses/',
        addedAt: Date.now() - 250000,
      },
      {
        id: 'img-dr-3',
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
        label: 'Back Detail & Construction',
        caption: 'Concealed closure with hand-finished bias binding',
        categoryFolder: '/images/dresses/',
        addedAt: Date.now() - 200000,
      }
    ]
  },
  {
    id: 'dress-2',
    title: 'Deconstructed Poplin Shirt Dress',
    silhouette: 'Asymmetrical Cocoon Drape',
    concept: 'Re-imagining classical tailoring into a sculptural contemporary day-to-evening silhouette with modular tie-belts.',
    fabrics: '100% GOTS Organic Cotton Poplin, Mother of Pearl Buttons',
    techniques: 'French Seams, Laser Cut Collar Details, Engineered Asymmetry',
    description: 'An architectural shirt dress balancing sartorial discipline with casual drape. Features convertible sleeve cuffs, oversized patch pockets, and an asymmetrical pleated wrap.',
    images: [
      {
        id: 'img-dr-4',
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        label: 'Lookbook Front View',
        caption: 'Engineered asymmetry with functional modular tie belt',
        categoryFolder: '/images/dresses/',
        addedAt: Date.now() - 150000,
      },
      {
        id: 'img-dr-5',
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
        label: 'Fabric & Seam Detail',
        caption: 'High-density organic cotton poplin with crisp French seams',
        categoryFolder: '/images/dresses/',
        addedAt: Date.now() - 100000,
      }
    ]
  }
];

// DRESSES EDITORIAL STORAGE (3 EQUAL COLUMNS)
export const DRESSES_EDITORIAL_KEY = 'anuska_dresses_editorial_v1';
export const DRESSES_EDITORIAL_TEXT_KEY = 'anuska_dresses_text_v1';
export const DRESSES_EDITORIAL_IDB_KEY = 'anuska_dresses_editorial_idb_v1';

export const defaultDressEditorialItems: DressEditorialItem[] = [
  {
    id: 'dress-01',
    number: 1,
    title: 'The Blush Pink',
    name: 'The Blush Pink',
    images: [dressOneCover, dressOneBlushPink, dressOneBlushPinkDetail, dressOneBlushPinkFinal],
    description: '',
  },
  {
    id: 'dress-02',
    number: 2,
    title: 'The Midnight Dots',
    name: 'The Midnight Dots',
    images: [
      dressTwoCover,
      '/uploads/D2.1.jpeg',
      '/uploads/D2.2.jpeg',
      '/uploads/D2.3.jpeg',
    ],
    description: '',
  },
  {
    id: 'dress-03',
    number: 3,
    title: 'The Velvet Noir',
    name: 'The Velvet Noir',
    images: [
      dressThreeCover,
      velvetNoirDressOne,
      velvetNoirDressTwo,
      velvetNoirDressThree,
    ],
    description: '',
  },
];

const MIDNIGHT_DOTS_REMOVED_SENTENCE =
  'THE BLACK POLKA DOT PATTERN INTRODUCES A PLAYFUL RETRO CHARM, BALANCED BY THE DRAMATIC COWL DETAILING AT THE BACK THAT CREATES DEPTH, SOFTNESS, AND SOPHISTICATION.';

function normalizeDressEditorialDescription(description: string, index: number): string {
  return index === 1
    ? description.replace(MIDNIGHT_DOTS_REMOVED_SENTENCE, '').trim()
    : description;
}

function isLegacyBlankDressTwo(item: Partial<DressEditorialItem>, index: number): boolean {
  const images = Array.isArray(item.images) ? item.images : [];
  return index === 1 &&
    (!item.title || item.title === 'DRESS 02') &&
    !item.name?.trim() &&
    !item.description?.trim() &&
    images.every((image) => !image);
}

function isBlankDressEntry(item: Partial<DressEditorialItem>, index: number): boolean {
  const title = (item.title || '').trim();
  const name = (item.name || '').trim();
  const description = (item.description || '').trim();
  const images = Array.isArray(item.images) ? item.images : [];

  const matchesLegacyTitle =
    !title ||
    title === 'DRESS 01' ||
    title === 'DRESS 02' ||
    title === 'DRESS 03' ||
    title === 'Dress 01' ||
    title === 'Dress 02' ||
    title === 'Dress 03' ||
    title.toUpperCase() === `DRESS0${index + 1}` ||
    title.toUpperCase() === `DRESS ${index + 1}`;

  return matchesLegacyTitle &&
    !name &&
    !description &&
    (!images.length || images.every((image) => !image));
}

function isStalePlaceholderDressState(parsed: unknown): boolean {
  if (!Array.isArray(parsed) || parsed.length !== 3) return false;

  const first = parsed[0];
  if (!first || typeof first !== 'object') return false;

  const title = (first as { title?: string }).title || '';
  const name = (first as { name?: string }).name || '';
  const description = (first as { description?: string }).description || '';
  const images = Array.isArray((first as { images?: unknown[] }).images) ? (first as { images: unknown[] }).images : [];

  const looksBlank =
    title.replace(/\s+/g, '').toUpperCase() === 'DRESS01' ||
    title === 'DRESS 01' ||
    title === 'Dress 01' ||
    name === '' && description === '' && images.length === 1 && images[0] === null;

  return looksBlank;
}

export function loadDressEditorialItems(): DressEditorialItem[] {
  try {
    const textSaved = localStorage.getItem(DRESSES_EDITORIAL_TEXT_KEY);
    const textMap: Record<number, { name: string; title: string; description: string }> = {};
    if (textSaved) {
      try {
        const parsed = JSON.parse(textSaved);
        if (Array.isArray(parsed)) {
          parsed.forEach((item, idx) => {
            textMap[idx] = {
              name: item.name || '',
              title: item.title || (item.name ? `DRESS 0${idx + 1} — ${item.name}` : `DRESS 0${idx + 1}`),
              description: item.description || '',
            };
          });
        }
      } catch {}
    }

    const saved = localStorage.getItem(DRESSES_EDITORIAL_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 3 && !isStalePlaceholderDressState(parsed)) {
        return parsed.map((item, idx) => {
          if (isBlankDressEntry(item as Partial<DressEditorialItem>, idx)) {
            return { ...defaultDressEditorialItems[idx] };
          }

          const rawName = textMap[idx]?.name !== undefined && textMap[idx].name !== ''
            ? textMap[idx].name
            : (item.name || '');
          const rawTitle = textMap[idx]?.title || (rawName ? `DRESS 0${idx + 1} — ${rawName}` : (item.title || `DRESS 0${idx + 1}`));
          const rawDesc = normalizeDressEditorialDescription(textMap[idx]?.description !== undefined && textMap[idx].description !== ''
            ? textMap[idx].description
            : (item.description || ''), idx);
          const rawImages = Array.isArray(item.images) && item.images.length > 0 
            ? item.images 
            : [null];
          if (isLegacyBlankDressTwo({
            title: rawTitle,
            name: rawName,
            description: rawDesc,
            images: rawImages,
          }, idx)) {
            return { ...defaultDressEditorialItems[idx] };
          }
          return {
            id: item.id || `dress-0${idx + 1}`,
            number: idx + 1,
            title: defaultDressEditorialItems[idx].title,
            name: defaultDressEditorialItems[idx].name,
            images: idx === 0
              ? [dressOneCover, ...rawImages.slice(1)]
              : idx === 1
                ? [dressTwoCover, ...rawImages.slice(1)]
                : idx === 2
                  ? [dressThreeCover, ...rawImages.slice(1)]
                  : rawImages,
            description: '',
          };
        });
      }
    }
    
    if (Object.keys(textMap).length === 3 && !isStalePlaceholderDressState(Object.values(textMap))) {
      return defaultDressEditorialItems.map((item, idx) => ({
        ...item,
        name: item.name,
        title: item.title,
        images: idx === 2 && !item.images?.[0]
          ? [dressThreeCover, ...item.images.slice(1)]
          : idx === 2
            ? [dressThreeCover, ...item.images.slice(1)]
            : item.images,
        description: '',
      }));
    }
  } catch (e) {
    console.error('Error loading dresses editorial items:', e);
  }
  return defaultDressEditorialItems;
}

export async function loadDressEditorialItemsAsync(): Promise<DressEditorialItem[]> {
  const base = loadDressEditorialItems();
  try {
    // 1. Try loading persistent document from server disk first
    const serverFull = await loadPortfolioStateFromServer<DressEditorialItem[]>('dresses_editorial');

    // 2. Try loading full document from IndexedDB
    const idbFull = await loadFromIdb<DressEditorialItem[]>(DRESSES_EDITORIAL_IDB_KEY);
    
    // 3. Load individual slot images for each dress (up to 8 slots each)
    const slotImages: (string | null)[][] = [
      Array(8).fill(null),
      Array(8).fill(null),
      Array(8).fill(null),
    ];

    await Promise.all(
      [0, 1, 2].map(async (dIdx) => {
        await Promise.all(
          Array.from({ length: 8 }, (_, iIdx) => iIdx).map(async (iIdx) => {
            const img = await loadPhotoFromIdb(`dress_${dIdx}_slot_${iIdx}`);
            if (img) slotImages[dIdx][iIdx] = img;
          })
        );
      })
    );

    const serverData = Array.isArray(serverFull) && !isStalePlaceholderDressState(serverFull) ? serverFull : null;
    const idbData = Array.isArray(idbFull) && !isStalePlaceholderDressState(idbFull) ? idbFull : null;

    const merged: DressEditorialItem[] = base.map((baseItem, dIdx) => {
      const storedServerItem = serverData ? serverData[dIdx] : null;
      const serverItem = storedServerItem && isLegacyBlankDressTwo(storedServerItem, dIdx)
        ? null
        : storedServerItem;
      const idbItem = idbData ? idbData[dIdx] : null;

      const name =       baseItem.name;

      const title = baseItem.title;

      const serverImages = Array.isArray(serverItem?.images) ? serverItem.images : [];
      const baseImages = Array.isArray(baseItem.images) ? baseItem.images : [];
      const idbImages = Array.isArray(idbItem?.images) ? idbItem.images : [];
      const maxSlots = Math.max(1, serverImages.length, baseImages.length, idbImages.length);

      const images: (string | null)[] = Array.from({ length: maxSlots }, (_, iIdx) => {
        const val = slotImages[dIdx]?.[iIdx] ?? serverImages[iIdx] ?? idbImages[iIdx] ?? baseImages[iIdx] ?? null;
        if (val === '__REMOVED__') return null;
        if (val && typeof val === 'string' && val.trim() !== '' && !val.startsWith('blob:')) return val;
        return null;
      });

      return {
        id: baseItem.id,
        number: dIdx + 1,
        title,
        name,
        images: dIdx === 0
          ? [dressOneCover, ...images.slice(1)]
          : dIdx === 1
            ? [dressTwoCover, ...images.slice(1)]
            : dIdx === 2
              ? [dressThreeCover, ...images.slice(1)]
              : images.length ? images : [null],
        description: '',
      };
    });

    return merged;
  } catch (err) {
    console.error('Error in loadDressEditorialItemsAsync:', err);
    return base;
  }
}

export async function saveDressEditorialItems(data: DressEditorialItem[]): Promise<boolean> {
  let isSuccess = true;

  // Clean data so temporary blob: URLs are never persisted to disk or storage
  const cleanData = data.map((item) => ({
    ...item,
    images: item.images.map((img) => (img && img.startsWith('blob:') ? null : img)),
  }));

  // 1. ALWAYS save to Node.js server disk storage (/data/portfolio-state.json)
  savePortfolioStateToServer('dresses_editorial', cleanData).catch((e) => {
    console.warn('Server save warning for dresses editorial:', e);
  });

  // 2. ALWAYS save text-only metadata to localStorage (100% quota-safe, instantaneous)
  try {
    const textData = data.map((item, idx) => ({
      id: item.id || `dress-0${idx + 1}`,
      number: idx + 1,
      title: item.title || (item.name ? `DRESS 0${idx + 1} — ${item.name}` : `DRESS 0${idx + 1}`),
      name: item.name || '',
      description: item.description || '',
    }));
    localStorage.setItem(DRESSES_EDITORIAL_TEXT_KEY, JSON.stringify(textData));
  } catch (e) {
    console.warn('LocalStorage dresses text save warning:', e);
  }

  // 3. Try saving full clean data to localStorage (if quota permits)
  try {
    localStorage.setItem(DRESSES_EDITORIAL_KEY, JSON.stringify(cleanData));
  } catch {}

  // 4. Save full clean data to IndexedDB
  try {
    const savedDoc = await saveToIdb(DRESSES_EDITORIAL_IDB_KEY, cleanData);
    if (!savedDoc) isSuccess = false;
  } catch {
    isSuccess = false;
  }

  // 5. Save each individual image slot into IndexedDB (safeguarding any existing high-res dataUrl)
  try {
    await Promise.all(
      cleanData.map((item, dIdx) =>
        Promise.all(
          item.images.map(async (img, iIdx) => {
            const key = `dress_${dIdx}_slot_${iIdx}`;
            if (img) {
              if (img.startsWith('data:')) {
                return savePhotoToIdb(key, img);
              }
              // Never overwrite an existing high-res data: URL in IDB with a relative URL string
              return;
            } else {
              return savePhotoToIdb(key, '__REMOVED__');
            }
          })
        )
      )
    );
  } catch (e) {
    console.warn('Error saving dresses slot photos to IDB:', e);
  }

  return isSuccess;
}

// DRESSES GETTERS / SETTERS (LEGACY COMPATIBILITY)
export function loadDressesProjects(): DressesProject[] {
  try {
    const saved = localStorage.getItem(DRESSES_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Graceful fallback
  }
  return defaultDressesProjects;
}

export function saveDressesProjects(data: DressesProject[]): void {
  try {
    localStorage.setItem(DRESSES_KEY, JSON.stringify(data));
  } catch (e: any) {
    console.warn('Could not save Dresses to localStorage:', e?.message || e);
  }
}

// IndexedDB safe store for large images (photos, user media, full documents)
const IDB_NAME = 'anuska_portfolio_media';
const IDB_STORE = 'photos';

let idbPromise: Promise<IDBDatabase> | null = null;

function openPhotoDb(): Promise<IDBDatabase> {
  if (idbPromise) return idbPromise;
  idbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const req = window.indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      idbPromise = null;
      reject(req.error);
    };
  });
  return idbPromise;
}

export async function getAllPhotosFromIdb(): Promise<Record<string, string>> {
  try {
    const db = await openPhotoDb();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.openCursor();
      const results: Record<string, string> = {};
      req.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          if (typeof cursor.value === 'string') {
            results[String(cursor.key)] = cursor.value;
          }
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      req.onerror = () => resolve(results);
    });
  } catch {
    return {};
  }
}

export async function savePhotoToIdb(key: string, dataUrl: string): Promise<void> {
  try {
    if (!dataUrl) return;
    // CRITICAL ASSET PRESERVATION: Never overwrite an existing high-resolution data: URL with a relative URL or path
    if (!dataUrl.startsWith('data:') && dataUrl !== '__REMOVED__') {
      const existing = await loadPhotoFromIdb(key);
      if (existing && existing.startsWith('data:')) {
        // Pristine uncompressed original base64 bytes are already safely stored under this key.
        return;
      }
    }
    const db = await openPhotoDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const store = tx.objectStore(IDB_STORE);
      const req = dataUrl === '__REMOVED__' ? store.delete(key) : store.put(dataUrl, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Non-blocking
  }
}

export async function loadPhotoFromIdb(key: string): Promise<string | null> {
  try {
    const db = await openPhotoDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function saveToIdb(key: string, value: any): Promise<boolean> {
  try {
    const db = await openPhotoDb();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const store = tx.objectStore(IDB_STORE);
      const req = value !== null && value !== undefined ? store.put(value, key) : store.delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

export async function loadFromIdb<T = any>(key: string): Promise<T | null> {
  try {
    const db = await openPhotoDb();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// RIGHT-SIDE PERSONAL SPACE (Photo + ~50 words Text)
export interface PersonalSpaceData {
  photoUrl: string;
  introText: string;
}

export const defaultPersonalSpaceData: PersonalSpaceData = {
  photoUrl: personalSpaceME1,
  introText: 'Hey, I am Anuska Pratap, an extroverted, playful, and cheerful Fashion Designer who loves designing, styling, communicating, presenting and most importantly connecting with new people and learning from every interaction. Fashion has always been a space where I feel most alive. I enjoy exploring ideas, experimenting with creativity, and bringing stories to life through design. Welcome to my world of Fashion! To know more about me, my work and my creative journey, click on any icon to discover more.',
};

export function loadPersonalSpaceData(): PersonalSpaceData {
  try {
    const saved = localStorage.getItem(PERSONAL_SPACE_KEY);
    if (saved) {
      return { ...defaultPersonalSpaceData, ...JSON.parse(saved) };
    }
    const textOnly = localStorage.getItem(PERSONAL_SPACE_KEY + '_text');
    if (textOnly) {
      return { ...defaultPersonalSpaceData, introText: textOnly };
    }
  } catch {
    // Graceful fallback
  }
  return defaultPersonalSpaceData;
}

export function savePersonalSpaceData(data: PersonalSpaceData): void {
  // 1. Immediately save to Node.js server disk storage (/data/portfolio-state.json)
  savePortfolioStateToServer('personal_space', data).catch((e) => {
    console.warn('Server save warning for personal space:', e);
  });

  // 2. Always mirror photo to IndexedDB for high resilience without quota issues
  if (data.photoUrl) {
    savePhotoToIdb('personal_space_photo', data.photoUrl).catch(() => {});
  }

  try {
    localStorage.setItem(PERSONAL_SPACE_KEY, JSON.stringify(data));
  } catch (e: any) {
    console.warn('LocalStorage quota limit reached for Personal Space. Using smart fallback:', e?.message || e);
    try {
      const safeData: PersonalSpaceData = {
        photoUrl: data.photoUrl.length > 150000 ? defaultPersonalSpaceData.photoUrl : data.photoUrl,
        introText: data.introText,
      };
      localStorage.setItem(PERSONAL_SPACE_KEY, JSON.stringify(safeData));
    } catch {
      try {
        localStorage.setItem(PERSONAL_SPACE_KEY + '_text', data.introText);
      } catch {
        // Silent
      }
    }
  }
}

export async function loadPersonalSpaceDataAsync(): Promise<PersonalSpaceData> {
  try {
    const serverData = await loadPortfolioStateFromServer<PersonalSpaceData>('personal_space');
    const idbPhoto = await loadPhotoFromIdb('personal_space_photo');
    const base = serverData || loadPersonalSpaceData();
    const photoUrl = idbPhoto && idbPhoto !== '__REMOVED__' ? idbPhoto : base.photoUrl;
    return {
      ...base,
      photoUrl,
    };
  } catch {
    return loadPersonalSpaceData();
  }
}

/**
 * PERMANENT USER ASSET PERSISTENCE FUNCTION
 * Adheres strictly to the Permanent Image Preservation Rule:
 * 1. Treats every user image as a FINAL, FIXED ORIGINAL ASSET (never an AI prompt or temporary preview).
 * 2. Saves to IndexedDB immediately for instant offline resilience.
 * 3. Persists to permanent disk storage via /api/upload (/public/uploads/<filename>).
 * 4. Preserves the exact original bytes, aspect ratio, and composition.
 */
export async function uploadAndPersistAsset(
  file: File,
  idbKey?: string
): Promise<{ url: string; originalFilename: string; dataUrl: string }> {
  if (!file) {
    throw new Error('No file was provided for upload.');
  }

  const dataUrl = await fileToDataUrl(file);
  if (!dataUrl) {
    throw new Error('Could not read image file data.');
  }

  // 1. Immediately preserve full uncompressed image in IndexedDB under slot key & filename
  if (idbKey) {
    try {
      await savePhotoToIdb(idbKey, dataUrl);
    } catch (err) {
      console.warn('[Asset Preservation] IndexedDB initial save warning:', err);
    }
  }
  try {
    await savePhotoToIdb(`file_${file.name}`, dataUrl);
  } catch {}

  // 2. Persist to permanent server disk storage across multiple folders & manifest
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.name,
        dataUrl,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.url) {
        // Map the permanent server URL to the dataUrl in IndexedDB as well
        // so if server disk is ever recycled or network is offline, the image is 100% recoverable
        try {
          await savePhotoToIdb(data.url, dataUrl);
          if (data.filename) {
            await savePhotoToIdb(data.filename, dataUrl);
          }
        } catch {}
        return { url: data.url, originalFilename: file.name, dataUrl };
      }
    } else {
      const errBody = await res.text().catch(() => '');
      console.warn('[Asset Preservation] Server upload responded with status:', res.status, errBody);
    }
  } catch (err) {
    console.warn('[Asset Preservation] Server disk upload notice (IndexedDB preserved):', err);
  }

  // Fallback to dataUrl (which is safely stored in IndexedDB)
  return { url: dataUrl, originalFilename: file.name, dataUrl };
}

/**
 * Resilient image resolver: if an image src fails or is 404,
 * checks IndexedDB by slotKey, URL, filename, or broad scan to recover the exact original bytes.
 * If recovered, automatically re-syncs to server disk and manifest.
 */
export async function resolveImageFallback(src: string, slotKey?: string): Promise<string | null> {
  try {
    const syncToServer = (name: string, dataUrl: string) => {
      fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: name, dataUrl }),
      }).catch(() => {});
    };

    // 1. Direct slotKey check (if it holds a data: URL)
    if (slotKey) {
      const slotData = await loadPhotoFromIdb(slotKey);
      if (slotData && slotData.startsWith('data:')) {
        syncToServer(`${slotKey}.jpg`, slotData);
        return slotData;
      }
    }

    if (src) {
      // 2. Direct exact src match
      const byUrl = await loadPhotoFromIdb(src);
      if (byUrl && byUrl.startsWith('data:')) {
        syncToServer(src.split('/').pop() || 'recovered_image.jpg', byUrl);
        return byUrl;
      }

      // 3. Strip origin to get relative path (e.g., https://domain.com/uploads/foo.jpg -> /uploads/foo.jpg)
      let pathname = src;
      try {
        if (src.startsWith('http://') || src.startsWith('https://')) {
          pathname = new URL(src).pathname;
          const byPath = await loadPhotoFromIdb(pathname);
          if (byPath && byPath.startsWith('data:')) {
            syncToServer(pathname.split('/').pop() || 'recovered_image.jpg', byPath);
            return byPath;
          }
        }
      } catch {}

      // 4. Filename checks
      const filename = pathname.split('/').pop() || '';
      if (filename) {
        const byFile = await loadPhotoFromIdb(filename);
        if (byFile && byFile.startsWith('data:')) {
          syncToServer(filename, byFile);
          return byFile;
        }

        const byFilePrefix = await loadPhotoFromIdb(`file_${filename}`);
        if (byFilePrefix && byFilePrefix.startsWith('data:')) {
          syncToServer(filename, byFilePrefix);
          return byFilePrefix;
        }

        // Try stripping timestamp prefix (e.g. 1790261266837_DSC_5597.JPG.jpg -> DSC_5597.JPG.jpg or DSC_5597.JPG)
        const stripped = filename.replace(/^\d+_/, '');
        if (stripped !== filename) {
          const byStripped = await loadPhotoFromIdb(stripped);
          if (byStripped && byStripped.startsWith('data:')) {
            syncToServer(stripped, byStripped);
            return byStripped;
          }

          const byStrippedPrefix = await loadPhotoFromIdb(`file_${stripped}`);
          if (byStrippedPrefix && byStrippedPrefix.startsWith('data:')) {
            syncToServer(stripped, byStrippedPrefix);
            return byStrippedPrefix;
          }

          const baseClean = stripped.replace(/\.jpg$/i, '');
          const byBaseClean = await loadPhotoFromIdb(baseClean);
          if (byBaseClean && byBaseClean.startsWith('data:')) {
            syncToServer(baseClean, byBaseClean);
            return byBaseClean;
          }

          const byBaseCleanPrefix = await loadPhotoFromIdb(`file_${baseClean}`);
          if (byBaseCleanPrefix && byBaseCleanPrefix.startsWith('data:')) {
            syncToServer(baseClean, byBaseCleanPrefix);
            return byBaseCleanPrefix;
          }
        }
      }

      // 5. Scan all keys in IndexedDB photos store
      const allPhotos = await getAllPhotosFromIdb();
      if (slotKey && allPhotos[slotKey] && allPhotos[slotKey].startsWith('data:')) {
        const val = allPhotos[slotKey];
        syncToServer(filename || `${slotKey}.jpg`, val);
        return val;
      }

      // Extract unique identifier token from src, e.g. "5597", "5666", "5562", "DSC_"
      const idMatch = src.match(/(?:DSC_)?\d{4,}/i);
      const token = idMatch ? idMatch[0].toLowerCase() : '';

      for (const [key, val] of Object.entries(allPhotos)) {
        if (!val || typeof val !== 'string' || !val.startsWith('data:')) continue;
        const lowerKey = key.toLowerCase();
        if (token && lowerKey.includes(token)) {
          // Re-sync recovered image to server disk
          fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename: filename || key, dataUrl: val }),
          }).catch(() => {});
          return val;
        }
      }
    }
  } catch (err) {
    console.warn('[Asset Preservation] resolveImageFallback warning:', err);
  }
  return null;
}
