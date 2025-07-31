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
    { name: 'Java', icon: '☕' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Docker', icon: '🐳' }
  ];
</script>

<section id="about" class="section-padding" bind:this={sectionRef}>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if isVisible}
      <div in:fade={{ duration: 600 }}>
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
          {t.about.title}
        </h2>
        
        <div class="grid lg:grid-cols-2 gap-12 items-center">
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
              
            </div>
            
            <div in:fade={{ duration: 600, delay: 600 }}>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t.about.mainTechnologies}
              </h3>
              <div class="flex flex-wrap gap-2">
                {#each mainTechnologies as { name, icon }, index}
                  <div in:fade={{ duration: 400, delay: 700 + (index * 100) }}>
                    <Badge variant="primary">{icon} {name}</Badge>
                  </div>
                {/each}
              </div>
            </div>
          </div>
          
          <!-- Image/Visual content -->
          <div in:fade={{ duration: 600, delay: 300 }} class="relative">
            <Card class="overflow-hidden">
              <!-- Profile Image -->
              <div class="w-full h-96 overflow-hidden">
                <img 
                  src="/3A0C6FA5-73A0-49CB-9AF6-62BC47C6CA0E_1_105_c.jpeg" 
                  alt="Profile photo" 
                  class="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>