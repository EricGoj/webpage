<script lang="ts">
  interface Props {
    items: Array<{
      id: string;
      title: string;
      subtitle?: string;
      period: string;
      description: string[];
      technologies?: string[];
      current?: boolean;
    }>;
    class?: string;
  }
  
  let {
    items,
    class: className = ''
  }: Props = $props();
</script>

<div class="relative {className}">
  <!-- Timeline line -->
  <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
  
  {#each items as item, index}
    <div class="relative flex items-start mb-8 last:mb-0">
      <!-- Timeline dot -->
      <div class="relative z-10 flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-900 border-2 {item.current ? 'border-accent-500' : 'border-gray-300 dark:border-gray-600'} rounded-full">
        <div class="w-3 h-3 {item.current ? 'bg-accent-500' : 'bg-gray-300 dark:bg-gray-600'} rounded-full"></div>
      </div>
      
      <!-- Content -->
      <div class="ml-6 flex-1">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {item.title}
          </h3>
          <span class="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
            {item.period}
          </span>
        </div>
        
        {#if item.subtitle}
          <p class="text-accent-600 dark:text-accent-400 font-medium mb-3">
            {item.subtitle}
          </p>
        {/if}
        
        <ul class="space-y-2 mb-4">
          {#each item.description as desc}
            <li class="text-gray-600 dark:text-gray-300 flex items-start">
              <span class="text-accent-500 mr-2 mt-1.5 flex-shrink-0">•</span>
              {desc}
            </li>
          {/each}
        </ul>
        
        {#if item.technologies && item.technologies.length > 0}
          <div class="flex flex-wrap gap-2">
            {#each item.technologies as tech}
              <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                {tech}
              </span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>