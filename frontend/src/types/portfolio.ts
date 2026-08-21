export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  category: string;
  metric?: string;
  architectureType?: string;
  collaborator?: string;
  date?: string;
  docUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  pdfUrl?: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  status?: string;
  cgpa?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}

export interface ApiEnvelope<T> {
  data: T;
  source: 'firestore' | 'seed';
}

export interface PortfolioData {
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  education: EducationEntry[];
}
