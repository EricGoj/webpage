import type { ProfileData, SocialLink, Skill, Experience, Project, NavigationItem } from '$lib/types/portfolio';

export const PROFILE: ProfileData = {
  name: 'Eric Quevedo',
  title: 'Building software from Argentina 🇦🇷',
  focus: 'Full Stack Developer',
  email: 'eric@example.com',
  location: 'Remote',
  bio: 'Desarrollador Full Stack especializado en backend con experiencia en arquitecturas escalables y APIs robustas. Apasionado por crear soluciones eficientes que resuelvan problemas reales.',
  yearsOfExperience: 5
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/ericquevedo',
    icon: 'github',
    username: 'ericquevedo'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/eric-quevedo/',
    icon: 'linkedin',
    username: 'eric-quevedo'
  },
  {
    name: 'Email',
    url: 'mailto:eric@example.com',
    icon: 'mail'
  }
];

export const SKILLS: Skill[] = [
  // Backend
  { name: 'Node.js', level: 5, category: 'backend', icon: 'nodejs' },
  { name: 'Python', level: 4, category: 'backend', icon: 'python' },
  { name: 'TypeScript', level: 5, category: 'backend', icon: 'typescript' },
  { name: 'PostgreSQL', level: 4, category: 'backend', icon: 'postgresql' },
  { name: 'MongoDB', level: 4, category: 'backend', icon: 'mongodb' },
  { name: 'Redis', level: 3, category: 'backend', icon: 'redis' },
  { name: 'GraphQL', level: 4, category: 'backend', icon: 'graphql' },
  { name: 'REST APIs', level: 5, category: 'backend' },
  
  // Frontend
  { name: 'Svelte/SvelteKit', level: 4, category: 'frontend', icon: 'svelte' },
  { name: 'React', level: 4, category: 'frontend', icon: 'react' },
  { name: 'Vue.js', level: 3, category: 'frontend', icon: 'vue' },
  { name: 'Tailwind CSS', level: 5, category: 'frontend', icon: 'tailwind' },
  { name: 'JavaScript', level: 5, category: 'frontend', icon: 'javascript' },
  
  // DevOps
  { name: 'Docker', level: 4, category: 'devops', icon: 'docker' },
  { name: 'AWS', level: 3, category: 'devops', icon: 'aws' },
  { name: 'Vercel', level: 4, category: 'devops', icon: 'vercel' },
  { name: 'GitHub Actions', level: 4, category: 'devops', icon: 'github' },
  
  // Tools
  { name: 'Git', level: 5, category: 'tools', icon: 'git' },
  { name: 'VS Code', level: 5, category: 'tools', icon: 'vscode' },
  { name: 'Figma', level: 3, category: 'tools', icon: 'figma' },
  { name: 'Postman', level: 4, category: 'tools', icon: 'postman' }
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    company: 'Tech Startup',
    role: 'Senior Full Stack Developer',
    period: '2022 - Presente',
    startDate: '2022-01',
    current: true,
    achievements: [
      'Desarrollé una API REST que maneja 10M+ requests diarios',
      'Implementé arquitectura de microservicios reduciendo latencia en 40%',
      'Lideré equipo de 4 desarrolladores en migración a TypeScript'
    ],
    technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    location: 'Remote'
  },
  {
    id: '2',
    company: 'Digital Agency',
    role: 'Full Stack Developer',
    period: '2020 - 2022',
    startDate: '2020-03',
    endDate: '2022-01',
    current: false,
    achievements: [
      'Construí 15+ aplicaciones web para clientes enterprise',
      'Optimicé performance de aplicaciones existentes en 60%',
      'Implementé CI/CD pipelines reduciendo deployment time en 80%'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'Vercel'],
    location: 'Hybrid'
  },
  {
    id: '3',
    company: 'Freelance',
    role: 'Web Developer',
    period: '2019 - 2020',
    startDate: '2019-01',
    endDate: '2020-03',
    current: false,
    achievements: [
      'Desarrollé 20+ sitios web para pequeñas empresas',
      'Implementé soluciones e-commerce aumentando ventas en 150%',
      'Creé sistema de gestión interno reduciendo tiempo de trabajo en 50%'
    ],
    technologies: ['JavaScript', 'PHP', 'MySQL', 'WordPress', 'CSS'],
    location: 'Remote'
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Plataforma completa de e-commerce con panel de administración y pasarela de pagos.',
    longDescription: 'Sistema completo de e-commerce construido con arquitectura de microservicios, incluyendo gestión de inventario, procesamiento de pagos, y analytics en tiempo real.',
    technologies: ['Node.js', 'React', 'PostgreSQL', 'Stripe', 'Docker'],
    githubUrl: 'https://github.com/ericquevedo/ecommerce-platform',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    status: 'completed',
    category: 'Web Application'
  },
  {
    id: '2',
    title: 'Task Management API',
    description: 'API REST robusta para gestión de tareas con autenticación JWT y real-time updates.',
    technologies: ['Node.js', 'TypeScript', 'MongoDB', 'Socket.io', 'JWT'],
    githubUrl: 'https://github.com/ericquevedo/task-api',
    featured: true,
    status: 'completed',
    category: 'Backend API'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Dashboard interactivo del clima con mapas, gráficos y predicciones.',
    technologies: ['Svelte', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    githubUrl: 'https://github.com/ericquevedo/weather-dashboard',
    demoUrl: 'https://weather-dashboard-demo.vercel.app',
    featured: true,
    status: 'completed',
    category: 'Frontend Application'
  },
  {
    id: '4',
    title: 'DevOps Monitoring Tool',
    description: 'Herramienta de monitoreo para aplicaciones con alertas y métricas en tiempo real.',
    technologies: ['Python', 'FastAPI', 'Redis', 'Grafana', 'Docker'],
    githubUrl: 'https://github.com/ericquevedo/devops-monitor',
    featured: false,
    status: 'in-progress',
    category: 'DevOps Tool'
  }
];

export const NAVIGATION: NavigationItem[] = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre mí', href: '#about' },
  { name: 'Experiencia', href: '#experience' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'GitHub', href: '#github' },
  { name: 'Contacto', href: '#contact' }
];

export const GITHUB_USERNAME = 'ericquevedo';
export const GITHUB_API_URL = 'https://api.github.com';