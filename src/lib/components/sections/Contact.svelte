<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { ContactForm } from '$lib/types/portfolio';
	import { scrollAnimation } from '$lib/utils/animations';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { language } from '$lib/stores/language';
	import { getTranslations } from '$lib/i18n/translations';
	import { SOCIAL_LINKS } from '$lib/utils/constants';

	let sectionRef: HTMLElement;
	let isVisible = $state(false);
	let currentLang = $state('es');
	let t = $derived(getTranslations(currentLang as 'en' | 'es'));
	
	// Subscribe to language changes
	$effect(() => {
		const unsubscribe = language.subscribe((lang) => {
			currentLang = lang;
		});
		return unsubscribe;
	});

	// Form state using Svelte 5 runes
	let form = $state<ContactForm>({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');

	onMount(() => {
		if (sectionRef) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							isVisible = true;
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
			);
			observer.observe(sectionRef);
		}
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		submitStatus = 'idle';

		try {
			// Simulate form submission
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Reset form on success
			form = { name: '', email: '', subject: '', message: '' };
			submitStatus = 'success';
		} catch (error) {
			submitStatus = 'error';
		} finally {
			isSubmitting = false;
		}
	}

	// Derived validation
	const isFormValid = $derived(
		form.name.trim() !== '' && 
		form.email.trim() !== '' && 
		form.subject.trim() !== '' &&
		form.message.trim() !== '' &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
	);
</script>

<section id="contact" class="section-padding bg-gray-50 dark:bg-gray-900" bind:this={sectionRef}>
	<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4"
				class:animate-fade-in-up={isVisible}>
				{t.contact.title}
			</h2>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
				class:animate-fade-in-up={isVisible}
				style:animation-delay="0.1s">
				{t.contact.subtitle}
			</p>
		</div>

		<div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
			<!-- Contact Info -->
			<div class="space-y-8"
				class:animate-fade-in-up={isVisible}
				style:animation-delay="0.2s">
				<div>
					<h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
						{t.contact.letsConnect}
					</h3>
					<p class="text-gray-600 dark:text-gray-300 mb-8">
						{t.contact.description}
					</p>
				</div>

				<div class="space-y-6">
					<div class="flex items-center space-x-4">
						<div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
							<svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-gray-900 dark:text-white">{t.contact.email}</h4>
							<p class="text-gray-600 dark:text-gray-300">hello@example.com</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
							<svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-gray-900 dark:text-white">{t.contact.location}</h4>
							<p class="text-gray-600 dark:text-gray-300">{t.contact.locationValue}</p>
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
							<svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-gray-900 dark:text-white">Response Time</h4>
							<p class="text-gray-600 dark:text-gray-300">Within 24 hours</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class:animate-fade-in-up={isVisible} style="animation-delay: 0.3s;">
				<Card class="p-8">
					<form onsubmit={handleSubmit} class="space-y-6">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							{t.contact.name} *
						</label>
						<input
							id="name"
							type="text"
							bind:value={form.name}
							required
							class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
							placeholder={t.contact.namePlaceholder}
						/>
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							{t.contact.email} *
						</label>
						<input
							id="email"
							type="email"
							bind:value={form.email}
							required
							class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
							placeholder={t.contact.emailPlaceholder}
						/>
					</div>

					<div>
						<label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							{t.contact.subject} *
						</label>
						<input
							id="subject"
							type="text"
							bind:value={form.subject}
							required
							class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
							placeholder={t.contact.subjectPlaceholder}
						/>
					</div>

					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							{t.contact.message} *
						</label>
						<textarea
							id="message"
							bind:value={form.message}
							required
							rows="5"
							class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors resize-none"
							placeholder={t.contact.messagePlaceholder}
						></textarea>
					</div>

					{#if submitStatus === 'success'}
						<div class="p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
							<p class="text-green-800 dark:text-green-200 font-medium">
								✓ {t.contact.successMessage}
							</p>
						</div>
					{:else if submitStatus === 'error'}
						<div class="p-4 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
							<p class="text-red-800 dark:text-red-200 font-medium">
								✗ {t.contact.errorMessage}
							</p>
						</div>
					{/if}

					<Button
						type="submit"
						variant="primary"
						size="lg"
						class="w-full"
						disabled={!isFormValid || isSubmitting}
						loading={isSubmitting}
					>
						{isSubmitting ? t.contact.sending : t.contact.sendMessage}
					</Button>
					</form>
				</Card>
			</div>
		</div>
	</div>
</section>