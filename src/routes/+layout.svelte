<script>
	import '../app.css';
</script>

<div class="relative min-h-screen">
  <!-- Imagen de fondo con efecto de desenfoque que se extiende al header -->
  <div class="fixed inset-0 z-0 overflow-hidden">
    <img 
      src="/enver-guclu-XVYUUcNZIis-unsplash.jpg" 
      alt="Background"
      class="absolute w-full h-full object-cover scale-110 blur-[1px]"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-white/60 to-white/80 dark:from-black/60 dark:to-black/80 backdrop-blur-xl"></div>
  </div>

  <div class="relative z-10">
    <slot />
  </div>
</div>