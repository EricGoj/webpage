<script lang="ts">
  import { fly } from 'svelte/transition';
  import GithubIcon from '$lib/components/ui/GithubIcon.svelte';
  
  function getIconSVG(iconName: string) {
    const icons = {
      user: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>`,
      briefcase: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>`,
      linkedin: `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>`,
      book: `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="6" ry="6" fill="currentColor"/>
        <text x="12" y="17" text-anchor="middle" fill="white" font-family="serif" font-size="14" font-weight="bold">M</text>
      </svg>`,
      x: `<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>`,
      code: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>`,
      document: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>`,
      mail: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>`
    };
    return icons[iconName as keyof typeof icons] || icons.user;
  }
  
  interface Props {
    title: string;
    description: string;
    icon: string;
    targetId: string;
    delay?: number;
    isExternal?: boolean;
    url?: string;
    class?: string;
  }
  
  let { title, description, icon, targetId, delay = 0, isExternal = false, url, class: extraClass = '' }: Props = $props();
  
  function handleClick() {
    if (isExternal && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
  

</script>

<button
  in:fly={{ y: 30, duration: 600, delay }}
  onclick={handleClick}
  class="group relative flex h-full flex-col bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl focus:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-800/20 dark:border-gray-700/30 dark:hover:bg-gray-800/30 border border-white/20 rounded-xl {extraClass}"
  aria-label={isExternal ? `Abrir ${title} en nueva pestaña` : `Navegar a sección ${title}`}
>
  <!-- Icon -->
  <div class="text-blue-600 dark:text-blue-400 mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors">
    {#if icon === 'github'}
      <GithubIcon />
    {:else}
      {@html getIconSVG(icon)}
    {/if}
  </div>
  
  <!-- Content -->
  <div class="flex-grow text-left">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      {title}
    </h3>
    <p class="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
      {description}
    </p>
  </div>
  
  <!-- Hover effect overlay -->
  <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</button>