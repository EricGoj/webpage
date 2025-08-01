export interface Translations {
  // Navigation
  nav: {
    about: string;
    experience: string;
    projects: string;
    contact: string;
  };
  
  // Hero section
  hero: {
    title: string;
    subtitle: string;
    downloadCV: string;
    viewProjects: string;
    cards: {
      work: {
        title: string;
        description: string;
      };
      linkedin: {
        title: string;
        description: string;
      };
      learn: {
        title: string;
        description: string;
      };
      x: {
        title: string;
        description: string;
      };
    };
  };
  
  // About section
  about: {
    title: string;
    yearsExperience: string;
    projectsCompleted: string;
    bio: string;
    mainTechnologies: string;
  };
  
  // Experience section
  experience: {
    title: string;
    subtitle: string;
    current: string;
    present: string;
  };
  
  // Contact section
  contact: {
    title: string;
    subtitle: string;
    letsConnect: string;
    description: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    location: string;
    locationValue: string;
    sendMessage: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
  };
  
  // Footer section
  footer: {
    quickLinks: string;
    connect: string;
    buildTogether: string;
    rights: string;
    builtWith: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    retry: string;
  };
}

export const translations: Record<'es' | 'en', Translations> = {
  es: {
    nav: {
      about: 'Sobre Mí',
      experience: 'Experiencia',
      projects: 'Proyectos',
      contact: 'Contacto'
    },
    hero: {
      title: 'Eric Quevedo',
      subtitle: 'Building Software desde Argentina 🇦🇷',
      downloadCV: 'Mi Currículum',
      viewProjects: 'Ver Proyectos',
      cards: {
        work: {
          title: 'Trabajo',
          description: 'Explora mi experiencia profesional y proyectos en los que trabajo'
        },
        linkedin: {
          title: 'LinkedIn',
          description: 'Conecta conmigo profesionalmente'
        },
        learn: {
          title: 'Aprender',
          description: 'Lee mis artículos y reflexiones en Medium'
        },
        x: {
          title: 'X',
          description: 'Sígueme en X para actualizaciones y pensamientos'
        }
      }
    },
    about: {
      title: 'Sobre Mí',
      yearsExperience: 'Años de Experiencia',
      projectsCompleted: 'Proyectos Completados',
      bio: 'Software Engineer, apasionado por aplicar tecnologías de vanguardia para resolver problemas del mundo real. Cuento con expereriencia en sistemas escalables y llevar los límites del rendimiento al máximo. Me importa escribir código limpio y eficiente, y encontrar formas inteligentes de lograr que los sistemas no solo funcionen, sino que funcionen mejor. Tengo una curiosidad constante y me encanta enfrentar desafíos técnicos, sobre todo cuando implican aprender algo nuevo o superar límites establecidos.',
      mainTechnologies: 'Tecnologías Principales'
    },
    experience: {
      title: 'Experiencia Profesional',
      subtitle: 'Mi trayectoria profesional desarrollando soluciones tecnológicas innovadoras',
      current: 'Actual',
      present: 'Presente'
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Siempre estoy abierto a discutir nuevas oportunidades y proyectos interesantes.',
      letsConnect: 'Conectemos',
      description: 'Ya sea que tengas un proyecto en mente, quieras colaborar, o simplemente saludar, me encantaría saber de ti.',
      name: 'Nombre',
      email: 'Email',
      subject: 'Asunto',
      message: 'Mensaje',
      location: 'Ubicación',
      locationValue: 'Remoto / Mundial',
      sendMessage: 'Enviar Mensaje',
      sending: 'Enviando...',
      successMessage: '¡Mensaje enviado exitosamente! Te responderé pronto.',
      errorMessage: 'Algo salió mal. Por favor, intenta de nuevo.',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      subjectPlaceholder: 'Consulta de proyecto, colaboración, etc.',
      messagePlaceholder: 'Cuéntame sobre tu proyecto o simplemente saluda...'
    },
    footer: {
      quickLinks: 'Enlaces Rápidos',
      connect: 'Conectar',
      buildTogether: '¡Construyamos algo increíble juntos!',
      rights: 'Todos los derechos reservados.',
      builtWith: 'Construido con SvelteKit & Tailwind CSS'
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      retry: 'Reintentar'
    }
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      title: 'Eric Quevedo',
      subtitle: 'Building Software from 🇦🇷, trying to make a difference',
      downloadCV: 'My Resume',
      viewProjects: 'View Projects',
      cards: {
        work: {
          title: 'Work',
          description: 'Explore my professional experience and projects I work on'
        },
        linkedin: {
          title: 'LinkedIn',
          description: 'Connect with me professionally'
        },
        learn: {
          title: 'Learn',
          description: 'Read my articles and thoughts on Medium'
        },
        x: {
          title: 'X',
          description: 'Follow me on X for updates and thoughts'
        }
      }
    },
    about: {
      title: 'About Me',
      yearsExperience: 'Years of Experience',
      projectsCompleted: 'Projects Completed',
      bio: 'I\'m a backend-focused Software Developer passionate about applying cutting-edge technologies to solve real-world problems. I enjoy building scalable systems and pushing performance limits to see how far they can go. I care deeply about writing clean, efficient code and finding smart ways to make systems not just work — but work better. I\'m naturally curious and love tackling technical challenges, especially when they offer a chance to learn something new or push boundaries.',
      mainTechnologies: 'Main Technologies'
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'My professional journey developing innovative technological solutions',
      current: 'Current',
      present: 'Present'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'I\'m always open to discussing new opportunities and interesting projects.',
      letsConnect: 'Let\'s Connect',
      description: 'Whether you have a project in mind, want to collaborate, or just want to say hello, I\'d love to hear from you.',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      location: 'Location',
      locationValue: 'Remote / Worldwide',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      successMessage: 'Message sent successfully! I\'ll get back to you soon.',
      errorMessage: 'Something went wrong. Please try again.',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your.email@example.com',
      subjectPlaceholder: 'Project inquiry, collaboration, etc.',
      messagePlaceholder: 'Tell me about your project or just say hello...'
    },
    footer: {
      quickLinks: 'Quick Links',
      connect: 'Connect',
      buildTogether: 'Let\'s build something amazing together!',
      rights: 'All rights reserved.',
      builtWith: 'Built with SvelteKit & Tailwind CSS'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry'
    }
  }
};

// Helper function to get translations for current language
export function getTranslations(lang: 'es' | 'en'): Translations {
  return translations[lang];
}