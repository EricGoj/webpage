<script module lang="ts">
  declare const anime: any;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import NavigationCard from '$lib/components/ui/NavigationCard.svelte';
  import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
  import { language } from '$lib/stores/language';
  import { getTranslations } from '$lib/i18n/translations';
  import { animationConfig } from '$lib/config/animations';
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

  let showTextAnimations = $state(false);
  
  onMount(() => {
    if (typeof anime === 'undefined') {
      console.error("anime.js not loaded, falling back to CSS.");
      startCSSAnimations();
      showTextAnimations = true;
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
        duration: 1000,
        complete: () => {
          // Start text animations after profile image appears
          showTextAnimations = true;
        }
      })
      .add({
        targets: '.navigation-card',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, { start: 800 })
      }, '-=200')
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
      ...Array.from(document.querySelectorAll('.navigation-card')).map((_, i) => ({
        selector: `.navigation-card:nth-of-type(${i + 1})`,
        delay: 1200 + i * 100
      })),
      { selector: '.scroll-indicator', delay: 1600 }
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
      url: 'https://x.com/EriccQuevedo'
    },
    {
      title: 'GitHub',
      description: t.hero.cards.github.description,
      icon: 'github',
      targetId: 'github',
      isExternal: true,
      url: 'https://github.com/EricGoj'
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
        {#if showTextAnimations}
          <AnimatedText
            text={t.hero.title}
            animationType={animationConfig.hero.title.type}
            duration={animationConfig.hero.title.duration}
            delay={animationConfig.hero.title.delay}
            stagger={animationConfig.hero.title.stagger}
            easing={animationConfig.hero.title.easing}
            elementType="h1"
            class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
          />
          <AnimatedText
            text={t.hero.subtitle}
            animationType={animationConfig.hero.subtitle.type}
            duration={animationConfig.hero.subtitle.duration}
            delay={animationConfig.hero.subtitle.delay}
            stagger={animationConfig.hero.subtitle.stagger}
            easing={animationConfig.hero.subtitle.easing}
            elementType="p"
            class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300"
          />
        {:else}
          <h1 class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4" style="opacity: 0">
            {t.hero.title}
          </h1>
          <p class="hero-subtitle text-xl sm:text-2xl text-gray-600 dark:text-gray-300" style="opacity: 0">
            {t.hero.subtitle}
          </p>
        {/if}
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
  

</section>

<style>
  .profile-image, .scroll-indicator {
    opacity: 0;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .profile-image {
    transform: translateX(-100px);
  }
  :global(.navigation-card) {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .scroll-indicator {
    transform: translateY(20px);
  }
  
  /* Add a subtle glow effect for the animated text */
  :global(.animated-letter:hover) {
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  }
</style>
