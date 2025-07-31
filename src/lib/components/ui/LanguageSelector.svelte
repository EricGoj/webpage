<script lang="ts">
  import { language } from '$lib/stores/language';
  import type { Language } from '$lib/stores/language';
  
  let currentLang = $state<Language>('es');
  
  // Subscribe to language changes
  $effect(() => {
    const unsubscribe = language.subscribe((lang) => {
      currentLang = lang;
    });
    return unsubscribe;
  });
  
  function toggleLanguage() {
    language.toggle();
  }
</script>

<button
  on:click={toggleLanguage}
  class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
  aria-label="Toggle language"
>
  <span class="text-xs font-bold">
    {currentLang === 'es' ? 'ES' : 'EN'}
  </span>
  <span class="text-xs opacity-60">|</span>
  <span class="text-xs opacity-60">
    {currentLang === 'es' ? 'EN' : 'ES'}
  </span>
</button>

<style lang="postcss">
  button {
    user-select: none;
  }
</style>