<script context="module" lang="ts">
  declare const anime: any;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import NavigationCard from '$lib/components/ui/NavigationCard.svelte';
  import { language } from '$lib/stores/language';
  import { getTranslations } from '$lib/i18n/translations';
  import type { ProfileData } from '$lib/types/portfolio';

  interface Props {
    profile: ProfileData;
  }

  let { profile }: Props = $props();
  let currentLang = $state('es');
  let t = $derived(getTranslations(currentLang as 'en' | 'es'));

  $effect(() => {
    const unsubscribe = language.subscribe((lang) => {
      currentLang = lang;
    });
    return unsubscribe;
  });

  onMount(() => {
    if (typeof anime === 'undefined') {
      console.error("anime.js not loaded, falling back to CSS.");
      startCSSAnimations();
      return;
    }

    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 750
    });

    timeline
      .add({
        targets: '.profile-image',
        translateX: [-100, 0],
        opacity: [0, 1],
        duration: 1000
      })
      .add({
        targets: '.hero-title, .hero-subtitle',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100)
      }, '-=800')
      .add({
        targets: '.navigation-card',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, { start: 200 })
      }, '-=700')
      .add({
        targets: '.scroll-indicator',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600
      }, '-=500');
  });

  function startCSSAnimations() {
    const elements: { selector: string, delay: number }[] = [
      { selector: '.profile-image', delay: 0 },
      { selector: '.hero-title', delay: 400 },
      { selector: '.hero-subtitle', delay: 500 },
      ...Array.from(document.querySelectorAll('.navigation-card')).map((_, i) => ({
        selector: `.navigation-card:nth-of-type(${i + 1})`,
        delay: 800 + i * 100
      })),
      { selector: '.scroll-indicator', delay: 1200 }
    ];

    elements.forEach(el => {
      const node = document.querySelector(el.selector) as HTMLElement;
      if (node) {
        setTimeout(() => {
          node.style.opacity = '1';
          node.style.transform = 'translate(0, 0)';
        }, el.delay);
      }
    });
  }
  
  const navigationSections = $derived([
    {
      title: t.hero.cards.work.title,
      description: t.hero.cards.work.description,
      icon: 'briefcase',
      targetId: 'experience'
    },
    {
      title: t.hero.cards.linkedin.title,
      description: t.hero.cards.linkedin.description,
      icon: 'linkedin',
      targetId: 'linkedin',
      isExternal: true,
      url: 'https://www.linkedin.com/in/eric-quevedo/'
    },
    {
      title: t.hero.cards.learn.title,
      description: t.hero.cards.learn.description,
      icon: 'book',
      targetId: 'medium',
      isExternal: true,
      url: 'https://ericquevedo7.medium.com/'
    },
    {
      title: t.hero.cards.x.title,
      description: t.hero.cards.x.description,
      icon: 'x',
      targetId: 'twitter',
      isExternal: true,
      url: 'https://x.com/EricQueveDev'
    },
    {
      title: 'GitHub',
      description: t.hero.cards.github.description,
      icon: 'github',
      targetId: 'github',
      isExternal: true,
      url: 'https://github.com/ericquevedof'
    },
    {
      title: t.hero.cards.resume.title,
      description: t.hero.cards.resume.description,
      icon: 'document',
      targetId: 'resume',
      isExternal: true,
      url: currentLang === 'es' ? '/eric-quevedo-cv-spanish.pdf' : '/eric-quevedo-cv-en.pdf'
    }
  ]);
  
  // No longer needed as NavigationCard handles external links
  // function downloadResume() {
  //   const link = document.createElement('a');
  //   link.href = '/EricQuevedo_Desarrollador.pdf';
  //   link.download = 'EricQuevedo_Desarrollador.pdf';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }
</script>

<section id="hero" class="min-h-screen flex flex-col justify-start pt-24 container-padding relative">
  <div class="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12">
    <!-- Profile Image -->
    <div class="profile-image relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex-shrink-0">
      <img 
        src="/3A0C6FA5-73A0-49CB-9AF6-62BC47C6CA0E_1_105_c.jpeg" 
        alt="Profile" 
        class="rounded-full object-cover w-full h-full shadow-lg border-4 border-white dark:border-gray-800"
      />
      <div class="absolute inset-0 rounded-full ring-4 ring-blue-500/50 dark:ring-blue-400/50 animate-pulse-slow"></div>
    </div>

    <!-- Text content and cards -->
    <div class="text-center lg:text-left">
      <div class="mb-8">
        <h1 class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          {t.hero.title}
        </h1>
        <p class="hero-subtitle text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
          {t.hero.subtitle}
        </p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-6 lg:gap-8 max-w-4xl mx-auto lg:mx-0">
        {#each navigationSections as section}
          <NavigationCard
            class="navigation-card"
            title={section.title}
            description={section.description}
            icon={section.icon}
            targetId={section.targetId}
            isExternal={section.isExternal}
            url={section.url}
          />
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Scroll indicator -->
  <div class="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
    <button 
      onclick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      aria-label="Scroll to about section"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  </div>
</section>

<style>
  .profile-image, .hero-title, .hero-subtitle, .navigation-card, .scroll-indicator {
    opacity: 0;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .profile-image {
    transform: translateX(-100px);
  }
  .hero-title, .hero-subtitle {
    transform: translateY(30px);
  }
  .navigation-card {
    transform: translateY(20px);
  }
  .scroll-indicator {
    transform: translateY(20px);
  }
</style>
