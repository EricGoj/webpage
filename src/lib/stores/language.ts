import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'es' | 'en';

interface LanguageStore {
  subscribe: (run: (value: Language) => void) => () => void;
  set: (value: Language) => void;
  update: (updater: (value: Language) => Language) => void;
  toggle: () => void;
}

function createLanguageStore(): LanguageStore {
  // Initialize with saved preference or default to Spanish
  const getInitialLanguage = (): Language => {
    if (!browser) return 'es';
    
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'es' || saved === 'en')) {
      return saved as Language;
    }
    
    return 'en'; // Default to English
  };

  const { subscribe, set, update } = writable(getInitialLanguage());

  const customSet = (lang: Language) => {
    set(lang);
    if (browser) {
      localStorage.setItem('language', lang);
    }
  };

  return {
    subscribe,
    set: customSet,
    update,
    toggle: () => {
      update((currentLang: Language) => {
        const newLang = currentLang === 'es' ? 'en' : 'es';
        if (browser) {
          localStorage.setItem('language', newLang);
        }
        return newLang;
      });
    }
  };
}

export const language = createLanguageStore();