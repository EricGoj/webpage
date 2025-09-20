/**
 * Animation configuration for text effects
 */

export const animationConfig = {
  hero: {
    title: {
      type: 'letters' as const,
      duration: 60,
      delay: 200,
      stagger: 25,
      easing: 'easeOutExpo'
    },
    subtitle: {
      type: 'words' as const,
      duration: 400,
      delay: 800,
      stagger: 100,
      easing: 'easeOutQuart'
    }
  },
  // Additional animation presets
  presets: {
    fadeInLetters: {
      type: 'letters' as const,
      duration: 50,
      delay: 0,
      stagger: 30,
      easing: 'easeOutQuart'
    },
    fadeInWords: {
      type: 'words' as const,
      duration: 300,
      delay: 0,
      stagger: 80,
      easing: 'easeOutQuart'
    },
    typewriter: {
      type: 'letters' as const,
      duration: 30,
      delay: 0,
      stagger: 40,
      easing: 'linear'
    },
    bounceIn: {
      type: 'words' as const,
      duration: 600,
      delay: 0,
      stagger: 150,
      easing: 'easeOutBounce'
    }
  }
};

// Animation variations for different effects
export const animationVariants = {
  // Entrance animations
  fadeUp: {
    initial: { opacity: 0, translateY: 20 },
    animate: { opacity: 1, translateY: 0 }
  },
  fadeDown: {
    initial: { opacity: 0, translateY: -20 },
    animate: { opacity: 1, translateY: 0 }
  },
  fadeLeft: {
    initial: { opacity: 0, translateX: 20 },
    animate: { opacity: 1, translateX: 0 }
  },
  fadeRight: {
    initial: { opacity: 0, translateX: -20 },
    animate: { opacity: 1, translateX: 0 }
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 }
  }
};

// Timing functions
export const easings = {
  easeOutExpo: 'easeOutExpo',
  easeOutQuart: 'easeOutQuart',
  easeOutBounce: 'easeOutBounce',
  easeInOutQuad: 'easeInOutQuad',
  linear: 'linear',
  spring: 'spring(1, 80, 10, 0)'
};
