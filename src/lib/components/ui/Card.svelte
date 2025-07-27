<script lang="ts">
  interface Props {
    class?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    children?: any;
  }
  
  let {
    class: className = '',
    padding = 'md',
    hover = false,
    children
  }: Props = $props();
  
  const baseClasses = 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const hoverClasses = hover ? 'transition-all duration-200 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600' : '';
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`;
</script>

<div class={classes}>
  {@render children?.()}
</div>