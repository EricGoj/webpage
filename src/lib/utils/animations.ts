import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function fadeInUp(node: Element, { delay = 0, duration = 600 }): TransitionConfig {
  return {
    delay,
    duration,
    easing: cubicOut,
    css: (t: number) => {
      const y = (1 - t) * 30;
      const opacity = t;
      return `transform: translateY(${y}px); opacity: ${opacity};`;
    }
  };
}

export function fadeInDown(node: Element, { delay = 0, duration = 600 }): TransitionConfig {
  return {
    delay,
    duration,
    easing: cubicOut,
    css: (t: number) => {
      const y = (1 - t) * -30;
      const opacity = t;
      return `transform: translateY(${y}px); opacity: ${opacity};`;
    }
  };
}

export function staggeredFadeIn(node: Element, { delay = 0, duration = 600, stagger = 100 }): TransitionConfig {
  return {
    delay: delay + stagger,
    duration,
    easing: cubicOut,
    css: (t: number) => {
      const y = (1 - t) * 20;
      const opacity = t;
      return `transform: translateY(${y}px); opacity: ${opacity};`;
    }
  };
}

export function scaleIn(node: Element, { delay = 0, duration = 300 }): TransitionConfig {
  return {
    delay,
    duration,
    easing: cubicOut,
    css: (t: number) => {
      const scale = t;
      const opacity = t;
      return `transform: scale(${scale}); opacity: ${opacity};`;
    }
  };
}

// Intersection Observer utility for scroll animations
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Scroll animation action
export function scrollAnimation(node: Element, { threshold = 0.1, rootMargin = '0px 0px -100px 0px' } = {}) {
  let observer: IntersectionObserver;

  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
  }

  return {
    destroy() {
      if (observer) {
        observer.disconnect();
      }
    }
  };
}