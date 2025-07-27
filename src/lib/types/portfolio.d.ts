export interface ProfileData {
  name: string;
  title: string;
  focus: string;
  email: string;
  location: string;
  bio: string;
  yearsOfExperience: number;
  avatar?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'backend' | 'frontend' | 'devops' | 'tools';
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  achievements: string[];
  technologies: string[];
  location?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  category: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  contributionsThisYear: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
}

import type { Writable } from 'svelte/store';

export interface ThemeStore extends Writable<boolean> {
  toggle: () => void;
  set: (dark: boolean) => void;
}