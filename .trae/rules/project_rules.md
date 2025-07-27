REGLAS DE DESARROLLO - SVELTE 5 + SVELTEKIT + TAILWIND CSS:

1. ESTRUCTURA Y ORGANIZACIÓN:
   - Usar estructura de carpetas de SvelteKit: routes/, lib/components/, lib/stores/, lib/utils/
   - Un componente por archivo con nombre PascalCase
   - Agrupar componentes relacionados en subcarpetas
   - Tipos TypeScript en archivos .d.ts o inline cuando sean simples

2. SVELTE 5 RUNES (OBLIGATORIO):
   - Usar $state() en lugar de let para valores reactivos
   - Usar $derived() para valores computados en lugar de $:
   - Usar $props() para recibir props con tipos
   - Usar $effect() en lugar de $: para efectos secundarios
   - NO usar sintaxis legacy de Svelte 4

3. COMPONENTES:
   - Props tipados con TypeScript interfaces
   - Destructuring de props con valores por defecto
   - Eventos con createEventDispatcher tipado
   - Slots nombrados cuando sea necesario
   - Binding bidireccional solo cuando sea absolutamente necesario

4. ESTADO Y STORES:
   - Stores globales mínimos (solo para theme, auth, etc.)
   - Preferir props y contexto sobre stores
   - Stores custom con funciones de utilidad
   - Persistencia en localStorage con verificación de browser

5. SVELTEKIT PATTERNS:
   - Load functions en +page.ts para data fetching
   - Layout para elementos comunes
   - Error boundary con +error.svelte
   - Grupos de rutas con carpetas (group)
   - Form actions para mutaciones

6. TAILWIND CSS:
   - Clases utilitarias, evitar CSS custom
   - Configurar theme extend para valores del proyecto
   - Usar clases de Tailwind para animaciones simples
   - @apply solo para componentes muy reutilizables
   - Purge CSS automático en producción

7. PERFORMANCE:
   - Lazy loading con import() dinámico
   - Prerendering de rutas estáticas
   - Optimización de imágenes con vite-imagetools
   - Code splitting automático de SvelteKit
   - Intersection Observer para animaciones on-scroll

8. ACCESIBILIDAD:
   - Semántica HTML5 correcta
   - ARIA labels donde sea necesario
   - Navegación por teclado
   - Focus visible states
   - Contraste WCAG AA mínimo

9. SEO:
   - Meta tags en <svelte:head>
   - Open Graph tags
   - Canonical URLs
   - Sitemap generado
   - Schema.org markup para portfolio

10. CÓDIGO LIMPIO:
    - Funciones pequeñas y con propósito único
    - Nombres descriptivos para variables y funciones
    - Comentarios solo cuando añadan valor
    - Evitar magic numbers, usar constantes
    - Early returns para reducir anidación