// src/types/Project.ts
export interface ProjectData {
  id: string | number;
  title: string;
  description?: string;
  category?: string;
  image?: string;
  tags?: string[];
  data?: {
    sourceCode?: string;
    demoLink?: string;
  };
}


export interface Project {
  id: string | number;
  title: string;
  description?: string;
  category?: string;
  image?: string;
  tags?: string[];
  data?: {
    sourceCode?: string;
    demoLink?: string;
  };
}

