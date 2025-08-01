<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    external?: boolean;
    loading?: boolean;
    icon?: string;
    iconPosition?: 'left' | 'right';
    class?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onclick?: () => void;
    children?: any;
  }
  
  let {
    variant = 'primary',
    size = 'md',
    href,
    external = false,
    loading = false,
    icon,
    iconPosition = 'left',
    class: className = '',
    disabled = false,
    type = 'button',
    onclick,
    children
  }: Props = $props();
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-accent-600 hover:bg-accent-700 text-white focus:ring-accent-500',
    secondary: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white focus:ring-gray-500',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
</script>

{#if href}
  <a
    {href}
    class={classes}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
  >
    {#if icon && iconPosition === 'left'}
      <span class="mr-2">
        <!-- Icon would go here -->
        {icon}
      </span>
    {/if}
    
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    
    {@render children?.()}
    
    {#if icon && iconPosition === 'right'}
      <span class="ml-2">
        {icon}
      </span>
    {/if}
  </a>
{:else}
  <button
    class={classes}
    {type}
    {disabled}
    {onclick}
  >
    {#if icon && iconPosition === 'left'}
      <span class="mr-2">
        {icon}
      </span>
    {/if}
    
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    
    {@render children?.()}
    
    {#if icon && iconPosition === 'right'}
      <span class="ml-2">
        {icon}
      </span>
    {/if}
  </button>
{/if}