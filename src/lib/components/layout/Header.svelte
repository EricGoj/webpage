<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/stores/language';
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

<header class="absolute top-0 left-0 right-0 z-50 p-4">
	<nav class="max-w-4xl mx-auto bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/20 rounded-2xl px-6">
		<div class="flex items-center justify-between h-16">

			<!-- Desktop Navigation - Centered -->
			<div class="hidden md:flex flex-1 justify-center">
				<div class="flex items-baseline space-x-8">
					{#each NAVIGATION[$language] as item}
						<button
						onclick={() => scrollToSection(item.href)}
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
					>
							{item.name}
						</button>
					{/each}
				</div>
			</div>

			<!-- Spacer for mobile to center language toggle -->
			<div class="md:hidden flex-1"></div>

			<!-- Language Toggle & Mobile Menu Button -->
			<div class="flex items-center space-x-4">
				<!-- Language Toggle Switch -->
				<div class="flex items-center space-x-2">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300" class:text-blue-600={$language === 'es'} class:dark:text-blue-400={$language === 'es'}>ES</span>
					<button
						onclick={language.toggle}
						class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						class:bg-blue-600={$language === 'en'}
						class:dark:bg-blue-600={$language === 'en'}
						aria-label="Toggle language"
					>
						<span
							class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
							class:translate-x-6={$language === 'en'}
							class:translate-x-1={$language === 'es'}
						></span>
					</button>
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300" class:text-blue-600={$language === 'en'} class:dark:text-blue-400={$language === 'en'}>EN</span>
				</div>

				<!-- Mobile menu button -->
				<div class="md:hidden">
					<button
						onclick={toggleMobileMenu}
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
			<div class="md:hidden mt-2 border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-b-2xl">
				<div class="px-2 pt-2 pb-3 space-y-1">
					{#each NAVIGATION[$language] as item}
						<button
							onclick={() => scrollToSection(item.href)}
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
<div class="h-24"></div>
