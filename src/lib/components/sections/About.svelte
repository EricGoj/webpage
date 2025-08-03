<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { scrollAnimation } from '$lib/utils/animations';
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
  let sectionRef: HTMLElement;
  let isVisible = $state(false);
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef) {
      observer.observe(sectionRef);
    }
    
    return () => observer.disconnect();
  });
  
  const mainTechnologies = [
    { 
      name: 'Java', 
      icon: `<svg class="w-4 h-4 inline" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
      </svg>`
    },
    { 
      name: 'Angular', 
      icon: `<svg class="w-4 h-4 inline" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2.5 6.5l1.5 13L12 22l8-2.5 1.5-13L12 2zm0 2.16l6.84 15.34H16.5l-1.41-3.5h-6.18L7.5 19.5H5.16L12 4.16zm0 5.84l-2.07 5h4.14L12 10z"/>
      </svg>`
    },
    { 
      name: 'TypeScript', 
      icon: `<svg class="w-4 h-4 inline" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>`
    },
    { 
      name: 'Docker', 
      icon: `<svg class="w-4 h-4 inline" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983 0 1.938-.089 2.835-.266a11.192 11.192 0 003.518-1.39c1.259-.716 2.207-1.615 2.834-2.68a8.365 8.365 0 001.29-2.64c.26.02.57.035.868.035.868 0 1.666-.149 2.373-.442.618-.257 1.121-.628 1.463-1.08l.145-.189-.248-.13c-.339-.175-.69-.298-1.052-.366-.177-.033-.357-.05-.539-.05z"/>
      </svg>`
    }
  ];
</script>

<section id="about" class="section-padding my-16 p-8 md:p-12 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl shadow-lg border border-white/10" bind:this={sectionRef}>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if isVisible}
      <div in:fade={{ duration: 600 }}>
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
          {t.about.title}
        </h2>
        
        <div class="grid lg:grid-cols-1 gap-12 items-center">
          <!-- Text content -->
          <div class="space-y-6">
            <div in:fade={{ duration: 600, delay: 200 }}>
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.about.bio}
              </p>
            </div>
            
            <div in:fade={{ duration: 600, delay: 400 }} class="grid grid-cols-2 gap-6">
              <Card class="text-center">
                <div class="text-3xl font-bold text-accent-600 dark:text-accent-400">
                  {profile.yearsOfExperience}+
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t.about.yearsExperience}
                </div>
              </Card>
              
              <Card class="text-center">
                <div class="text-3xl font-bold text-accent-600 dark:text-accent-400">
                  {profile.projectsCompleted}+
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t.about.projectsCompleted}
                </div>
              </Card>
            </div>
            
            <div in:fade={{ duration: 600, delay: 600 }}>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t.about.mainTechnologies}
              </h3>
              <div class="flex flex-wrap gap-2">
                {#each mainTechnologies as { name, icon }, index}
                  <div in:fade={{ duration: 400, delay: 700 + (index * 100) }}>
                    <Badge variant="primary">{@html icon} {name}</Badge>
                  </div>
                {/each}
              </div>
            </div>
          </div>
          

        </div>
      </div>
    {/if}
  </div>
</section>