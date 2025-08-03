import type { ProfileData, SocialLink, Skill, Experience, Project, NavigationItem } from '$lib/types/portfolio';

export const PROFILE: ProfileData = {
  name: 'Eric Quevedo',
  title: 'Building software from Argentina 🇦🇷',
  focus: 'Full Stack Developer',
  email: 'ericqdev7@gmail.com',
  location: 'Buenos Aires, Argentina',
  bio: 'Software Eng. creando soluciones escalables y eficientes con tecnología de vanguardia. Me gustan los desafios e innovar con nuevas tecnologías. Aspiro a ser Architect IA Engineer',
  yearsOfExperience: 3,
  projectsCompleted: 0
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/EricGoj',
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
    company: 'NTT DATA',
    role: 'SSR Software Engineer',
    period: '2024 - Presente',
    startDate: '2024-12',
    current: true,
    achievements: [
      'Desarrollo y mantenimiento a microservicios',
      'Mejoras de perfomance aplicando operaciones asincronicas e implementando patrones de diseño',
      'Migraciones a nuevas tecnologicas aplicando buenas practicas'
    ],
    technologies: ['Java', 'Angular', 'Oracle', 'Docker', 'OpenShift'],
    location: 'Remote'
  },
  {
    id: '2',
    company: 'CDT Solutions',
    role: 'Backend Developer',
    period: '2024 - 2024',
    startDate: '2024-03',
    endDate: '2024-12',
    current: false,
    achievements: [
      'Migraciones de aplicaciones legacy a microservicios',
      'Actualizacion de microservicios de Java 17 a Java 21, aplicando las ventajas de las nuevas versiones',
      'Mejora en pipeline CI/CD reduciendo deployment time',
      'Documentacion precisa sobre rendimiento de microservicios utilizando herramientas como Grafana y Prometheus para medir metricas'
    ],
    technologies: ['Java', 'Gitlab', 'GCP', 'GKE', 'Istio'],
    location: 'Hybrid'
  },
  {
    id: '3',
    company: 'Besysoft',
    role: 'Jr Sofware Developer',
    period: '2022 - 2024',
    startDate: '2022-01',
    endDate: '2024-03',
    current: false,
    achievements: [
      'Desarrollé e implemente nuevas mejoras a aplicaciones Web',
      'Integracion de servicios externos para facturacion',
      'Implementacion de modulo de seguridad open source para autenticacion de usuarios. Keycloak',
      'Creé sistema de gestión interno reduciendo tiempo de trabajo en 50%'
    ],
    technologies: ['Java', 'Angular', 'PostgresSQL', 'BPM', 'AWS','Docker'],
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

export const NAVIGATION = {
  es: [
    { name: 'Inicio', href: '#hero' },
    { name: 'Sobre mí', href: '#about' },
    { name: 'Experiencia', href: '#experience' }
  ],
  en: [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' }
  ]
};

export const GITHUB_USERNAME = 'ericquevedo';
export const GITHUB_API_URL = 'https://api.github.com';