export interface Project {
  id: string;
  title: string;
  category: "ai" | "uiux" | "fullstack" | "networking";
  description: string;
  detailedDescription?: string;
  tech: string[];
  links: {
    github?: string;
    githubScanner?: string; // Specific for Ma5zany
    live?: string;
    figma?: string;
  };
  features?: string[];
  role?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  location?: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  gpa: string;
  details?: string;
}

export interface Certification {
  name: string;
  provider: string;
  description?: string;
}
