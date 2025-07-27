<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { SKILLS } from '$lib/utils/constants';
  import type { Skill } from '$lib/types/portfolio';
  
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
      { threshold: 0.2 }
    );
    
    if (sectionRef) {
      observer.observe(sectionRef);
    }
    
    return () => observer.disconnect();
  });
  
  // Group skills by category
  const skillsByCategory = SKILLS.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
  
  const categoryTitles = {
    backend: 'Backend',
    frontend: 'Frontend',
    devops: 'DevOps',
    tools: 'Herramientas'
  };
  
  const categoryIcons = {
    backend: '⚙️',
    frontend: '🎨',
    devops: '🚀',
    tools: '🛠️'
  };
  
  function getSkillLevelWidth(level: number): string {
    return `${(level / 5) * 100}%`;
  }
  
  function getSkillLevelColor(level: number): string {
    if (level >= 4) return 'bg-green-500';
    if (level >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  }
</script>

<section id="skills" class="section-padding container-padding" bind:this={sectionRef}>
  <div class="max-w-6xl mx-auto">
    {#if isVisible}
      <div in:fade={{ duration: 600 }}>
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Habilidades Técnicas
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Tecnologías y herramientas que domino para crear soluciones robustas
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {#each Object.entries(skillsByCategory) as [category, skills], categoryIndex}
            <div in:fade={{ duration: 600, delay: 200 + (categoryIndex * 100) }}>
              <Card class="h-full">
                <div class="text-center mb-6">
                  <div class="text-3xl mb-2">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                  </div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {categoryTitles[category as keyof typeof categoryTitles]}
                  </h3>
                </div>
                
                <div class="space-y-4">
                  {#each skills as skill, skillIndex}
                    <div in:fade={{ duration: 400, delay: 400 + (categoryIndex * 100) + (skillIndex * 50) }}>
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <Badge size="sm" variant={skill.level >= 4 ? 'success' : skill.level >= 3 ? 'warning' : 'secondary'}>
                          {skill.level}/5
                        </Badge>
                      </div>
                      
                      <!-- Skill level bar -->
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          class="h-2 rounded-full transition-all duration-1000 ease-out {getSkillLevelColor(skill.level)}"
                          style="width: {isVisible ? getSkillLevelWidth(skill.level) : '0%'}"
                        ></div>
                      </div>
                    </div>
                  {/each}
                </div>
              </Card>
            </div>
          {/each}
        </div>
        
        <!-- Skills summary -->
        <div in:fade={{ duration: 600, delay: 800 }} class="mt-16 text-center">
          <Card class="max-w-2xl mx-auto">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Especialidades
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Me especializo en desarrollo backend con Node.js y TypeScript, creando APIs escalables y arquitecturas robustas. También tengo experiencia sólida en frontend moderno y prácticas DevOps.
            </p>
            <div class="flex flex-wrap justify-center gap-2">
              {#each SKILLS.filter(s => s.level >= 4) as skill, index}
                <div in:fade={{ duration: 300, delay: 1000 + (index * 50) }}>
                  <Badge variant="primary">{skill.name}</Badge>
                </div>
              {/each}
            </div>
          </Card>
        </div>
      </div>
    {/if}
  </div>
</section>