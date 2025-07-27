import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { ThemeStore } from '$lib/types/portfolio';

function createThemeStore(): ThemeStore {
  // Initialize with system preference or saved preference
  const getInitialTheme = (): boolean => {
    if (!browser) return false;
    
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const { subscribe, set, update } = writable(getInitialTheme());

  const customSet = (dark: boolean) => {
    set(dark);
    if (browser) {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', dark);
    }
  };

  return {
    subscribe,
    set: customSet,
    update,
    toggle: () => {
      update((isDark: boolean) => {
        const newTheme = !isDark;
        if (browser) {
          localStorage.setItem('theme', newTheme ? 'dark' : 'light');
          document.documentElement.classList.toggle('dark', newTheme);
        }
        return newTheme;
      });
    }
  };
}

export const theme = createThemeStore();

// Initialize theme on client side
if (browser) {
  theme.subscribe(isDark => {
    document.documentElement.classList.toggle('dark', isDark);
  });
}