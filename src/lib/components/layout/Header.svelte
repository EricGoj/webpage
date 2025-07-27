<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { NAVIGATION } from '$lib/utils/constants';
	import Button from '$lib/components/ui/Button.svelte';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToSection(href: string) {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			isMobileMenuOpen = false;
		}
	}

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<header 
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
	class:bg-white={isScrolled}
	class:bg-opacity-80={isScrolled}
	class:dark:bg-gray-900={isScrolled}
	class:dark:bg-opacity-80={isScrolled}
	class:backdrop-blur-md={isScrolled}
	class:shadow-lg={isScrolled}
>
	<nav class="container-padding">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<button
					on:click={() => scrollToSection('#hero')}
					class="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
				>
					EQ
				</button>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-8">
					{#each NAVIGATION as item}
						<button
							on:click={() => scrollToSection(item.href)}
							class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
						>
							{item.name}
						</button>
					{/each}
				</div>
			</div>

			<!-- Theme Toggle & Mobile Menu Button -->
			<div class="flex items-center space-x-4">
				<!-- Theme Toggle -->
				<button
					on:click={theme.toggle}
					class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					aria-label="Toggle theme"
				>
					{#if $theme}
						<!-- Sun icon for dark mode -->
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
						</svg>
					{:else}
						<!-- Moon icon for light mode -->
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
						</svg>
					{/if}
				</button>

				<!-- Mobile menu button -->
				<div class="md:hidden">
					<button
						on:click={toggleMobileMenu}
						class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
						aria-label="Toggle mobile menu"
					>
						{#if isMobileMenuOpen}
							<!-- X icon -->
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
							</svg>
						{:else}
							<!-- Hamburger icon -->
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
							</svg>
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if isMobileMenuOpen}
			<div class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
				<div class="px-2 pt-2 pb-3 space-y-1">
					{#each NAVIGATION as item}
						<button
							on:click={() => scrollToSection(item.href)}
							class="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
						>
							{item.name}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</nav>
</header>

<!-- Spacer to prevent content from hiding behind fixed header -->
<div class="h-16"></div>