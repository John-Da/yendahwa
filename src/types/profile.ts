// src/types/Profile.ts
export interface Skill {
  name: string;
  icon: string;
  type?: string; // optional if HeroSection requires it
}

export interface Profile {
  name: string;
  title: string;
  heroText: string;
  author: string;
  skills?: Skill[];
  [key: string]: any; // for extra fields
}
