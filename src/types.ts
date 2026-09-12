export type AppMode = 
  | 'landing' 
  | 'menu' 
  | 'profile' 
  | 'corsets' 
  | 'indian-wear' 
  | 'pattachitra' 
  | 'sustainability';

export interface GalleryImage {
  id: string;
  url: string;
  label?: string; // e.g. "Front View", "Back View", "Detail Shot", "Sketch", "Process", "Moodboard", "Final Photoshoot"
  caption?: string;
  categoryFolder?: string; // e.g. "/images/corsets/"
  addedAt: number;
}

export interface CorsetProject {
  id: string;
  title: string;
  season: string;
  concept: string;
  materials: string;
  techniques: string;
  description: string;
  images: GalleryImage[];
}

export interface IndianWearProject {
  id: string;
  title: string;
  garmentType: string;
  concept: string;
  fabrics: string;
  techniques: string;
  description: string;
  images: GalleryImage[];
}

export interface PattachitraProject {
  id: string;
  title: string;
  inspiration: string;
  research: string;
  designDevelopment: string;
  technique: string;
  finalOutcome: string;
  images: GalleryImage[];
}

export interface SustainabilityProject {
  id: string;
  title: string;
  concept: string;
  problemResearch: string;
  materialsUsed: string;
  sustainableApproach: string;
  process: string;
  finalOutcome: string;
  images: GalleryImage[];
}

export interface EducationExperienceItem {
  id: string;
  type: 'education' | 'experience' | 'internship' | 'other';
  title: string; // Degree/Course or Role/Designation
  organization: string; // College/University or Company/Brand
  duration: string; // Year or Duration
  details: string; // Additional relevant experience or description
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location?: string;
  profilePhoto: string;
  aboutMePhoto?: string;
  shortIntroduction: string;
  aboutMe: string;
  designPhilosophy: string;
  educationAndExperience: EducationExperienceItem[];
  skillCategories: SkillCategory[];
  // Legacy optional fields for backwards compatibility
  education?: Array<{
    institution: string;
    degree: string;
    year: string;
    details: string;
  }>;
  skills?: {
    garmentConstruction: string[];
    digitalSoftware: string[];
    technicalDesign: string[];
    textileCraft: string[];
  };
}

export interface LandingPageData {
  name: string; // e.g. "ANUSKA"
  subtitle: string; // e.g. "PRESS TO ENTER"
  portfolioTitle: string; // e.g. "Anuska Pratap Portfolio"
  archiveNumber: string; // e.g. "Archive No. 71-04"
  season: string; // e.g. "Spring / Summer 2026"
  pageMetadata: string; // e.g. "Landscape Landing Page"
  pageCue: string; // e.g. "PAGE 01 / 02"
}

