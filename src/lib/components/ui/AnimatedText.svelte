<script module lang="ts">
  declare const anime: any;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Props {
    text: string;
    animationType?: 'letters' | 'words' | 'lines';
    duration?: number;
    delay?: number;
    stagger?: number;
    easing?: string;
    class?: string;
    elementType?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  }
  
  let { 
    text, 
    animationType = 'letters',
    duration = 50,
    delay = 0,
    stagger = 30,
    easing = 'easeOutQuart',
    class: className = '',
    elementType = 'span'
  }: Props = $props();
  
  let container = $state<HTMLElement>();
  let animationComplete = $state(false);
  
  function splitText(text: string, type: 'letters' | 'words' | 'lines'): string[] {
    switch(type) {
      case 'letters':
        return text.split('').map(char => char === ' ' ? '&nbsp;' : char);
      case 'words':
        return text.split(' ');
      case 'lines':
        return text.split('\n');
      default:
        return [text];
    }
  }
  
  function wrapElements(elements: string[], type: 'letters' | 'words' | 'lines'): string {
    return elements.map((el, index) => {
      const className = `animated-${type.slice(0, -1)}`;
      const style = 'display: inline-block; opacity: 0;';
      
      if (type === 'letters') {
        return `<span class="${className}" style="${style}">${el}</span>`;
      } else if (type === 'words') {
        return `<span class="${className}" style="${style}">${el}</span>${index < elements.length - 1 ? ' ' : ''}`;
      } else {
        return `<div class="${className}" style="${style}">${el}</div>`;
      }
    }).join('');
  }
  
  onMount(() => {
    if (!container) return;
    
    // Split and wrap text
    const elements = splitText(text, animationType);
    container.innerHTML = wrapElements(elements, animationType);
    
    // Check if anime.js is loaded
    if (typeof anime === 'undefined') {
      console.warn('anime.js not loaded, falling back to CSS animations');
      // Fallback to simple CSS animation
      const targets = container.querySelectorAll(`.animated-${animationType.slice(0, -1)}`);
      targets.forEach((el: Element, index: number) => {
        setTimeout(() => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
        }, delay + (index * stagger));
      });
      animationComplete = true;
      return;
    }
    
    // Create anime.js animation
    const targets = `.animated-${animationType.slice(0, -1)}`;
    
    const animation = anime({
      targets: container.querySelectorAll(targets),
      opacity: [0, 1],
      translateY: [20, 0],
      translateZ: 0,
      duration: duration,
      delay: anime.stagger(stagger, { start: delay }),
      easing: easing,
      complete: () => {
        animationComplete = true;
      }
    });
    
    // Optional: Add hover effect for individual elements
    if (animationType === 'letters') {
      container.querySelectorAll(targets).forEach((el: Element) => {
        el.addEventListener('mouseenter', () => {
          if (!animationComplete) return;
          anime({
            targets: el,
            translateY: -5,
            scale: 1.2,
            color: '#3b82f6',
            duration: 200,
            easing: 'easeOutQuad'
          });
        });
        
        el.addEventListener('mouseleave', () => {
          if (!animationComplete) return;
          anime({
            targets: el,
            translateY: 0,
            scale: 1,
            color: '#000000',
            duration: 200,
            easing: 'easeOutQuad'
          });
        });
      });
    }
  });
</script>

{#if elementType === 'h1'}
  <h1 bind:this={container} class={className} aria-label={text}>{text}</h1>
{:else if elementType === 'h2'}
  <h2 bind:this={container} class={className} aria-label={text}>{text}</h2>
{:else if elementType === 'h3'}
  <h3 bind:this={container} class={className} aria-label={text}>{text}</h3>
{:else if elementType === 'p'}
  <p bind:this={container} class={className} aria-label={text}>{text}</p>
{:else}
  <span bind:this={container} class={className} aria-label={text}>{text}</span>
{/if}

<style>
  :global(.animated-letter),
  :global(.animated-word),
  :global(.animated-line) {
    transition: all 0.3s ease;
    will-change: transform, opacity;
  }
  
  :global(.animated-letter:hover) {
    cursor: default;
  }
</style>
