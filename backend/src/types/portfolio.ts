export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  category: string;
  liveUrl: string;
  repoUrl: string;
  imageLabel: string;
  collaborator?: string;
  date?: string;
  docUrl?: string;
  order: number;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
  order: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  pdfUrl?: string;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date?: string;
  order: number;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  status?: string;
  cgpa?: string;
  order: number;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  order: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'unread' | 'read' | 'archived';
}

export interface ApiResponse<T> {
  data: T;
  source: 'data' | 'seed';
}
