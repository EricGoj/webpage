<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
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

  // Subscribe to language changes
  $effect(() => {
    const unsubscribe = language.subscribe((lang) => {
      currentLang = lang;
    });
    return unsubscribe;
  });
  let titleVisible = $state(false);
  let cardsVisible = $state(false);
  let scrollIndicatorVisible = $state(false);
  
  onMount(() => {
    titleVisible = true;
    setTimeout(() => cardsVisible = true, 400);
    setTimeout(() => scrollIndicatorVisible = true, 1200);
  });
  
  const navigationSections = [
    {
      title: 'Work',
      description: 'Explora mi experiencia profesional y proyectos en los que trabajo',
      icon: 'briefcase',
      targetId: 'projects'
    },
    {
      title: 'LinkedIn',
      description: 'Conecta conmigo profesionalmente',
      icon: 'linkedin',
      targetId: 'linkedin',
      isExternal: true,
      url: 'https://www.linkedin.com/in/eric-quevedo/'
    },
    {
      title: 'Learn',
      description: 'Lee mis artículos y reflexiones en Medium',
      icon: 'book',
      targetId: 'medium',
      isExternal: true,
      url: 'https://ericquevedo7.medium.com/'
    },
    {
      title: 'X',
      description: 'Sígueme en X para actualizaciones y pensamientos',
      icon: 'x',
      targetId: 'twitter',
      isExternal: true,
      url: 'https://x.com/EricQueveDev'
    }
  ];
  
  function downloadResume() {
    // Crear un enlace temporal para descargar el PDF
    const link = document.createElement('a');
    link.href = '/resume-eric-quevedo.pdf';
    link.download = 'Eric-Quevedo-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<section id="hero" class="min-h-screen flex flex-col justify-start pt-24 container-padding relative overflow-hidden">
  <!-- Imagen de fondo con efecto de desenfoque que se extiende al header -->
  <div class="fixed inset-0 z-0 overflow-hidden">
    <img 
      src="/enver-guclu-XVYUUcNZIis-unsplash.jpg" 
      alt="Background"
      class="absolute w-full h-full object-cover scale-110 blur-[1px]"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-white/60 to-white/80 dark:from-gray-900/60 dark:to-gray-900/80 backdrop-blur-xl z-20"></div>
  </div>
  
  <div class="max-w-6xl mx-auto text-center relative z-30">
    {#if titleVisible}
      <div in:fly={{ y: 30, duration: 600 }} class="mb-12">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          {t.hero.title}
        </h1>
        <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
          {t.hero.subtitle}
        </p>
      </div>
    {/if}
    
    {#if cardsVisible}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
        {#each navigationSections as section, index}
          <NavigationCard
            title={section.title}
            description={section.description}
            icon={section.icon}
            targetId={section.targetId}
            delay={index * 150}
            isExternal={section.isExternal}
            url={section.url}
          />
        {/each}
      </div>
      
      <!-- Resume Button -->
      <div 
        in:fly={{ y: 20, duration: 600, delay: 600 }}
        class="flex justify-center"
      >
        <button
          onclick={downloadResume}
          class="group relative bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 rounded-lg p-4 transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-800/30 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:scale-105 min-w-[160px]"
          aria-label={t.hero.downloadCV}
        >
          <div class="flex items-center gap-3">
            <div class="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {t.hero.downloadCV}
            </h3>
          </div>
        </button>
      </div>
    {/if}
  </div>
  
  <!-- Scroll indicator -->
  {#if scrollIndicatorVisible}
    <div 
      in:fly={{ y: 20, duration: 600, delay: 400 }}
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10"
    >
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
  {/if}
</section>