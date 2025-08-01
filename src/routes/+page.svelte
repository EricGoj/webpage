<script lang="ts">
	import { onMount } from 'svelte';
	import AnimatedTitle from '$lib/components/AnimatedTitle.svelte';
	import { PROFILE } from '$lib/utils/constants';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';


	const profile = PROFILE;

	</script>

<svelte:head>
	<title>Eric Quevedo - Full Stack Developer</title>
	<meta name="description" content="Full Stack Developer specializing in modern web technologies. Building scalable applications with React, Node.js, and cloud technologies." />
	<meta name="keywords" content="Full Stack Developer, React, Node.js, TypeScript, SvelteKit, Web Development" />
	<meta property="og:title" content="Eric Quevedo - Full Stack Developer" />
	<meta property="og:description" content="Full Stack Developer specializing in modern web technologies." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Eric Quevedo - Full Stack Developer" />
	<meta name="twitter:description" content="Full Stack Developer specializing in modern web technologies." />
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
	<Header />

	<main class="relative">
		<Hero {profile} />
		
		<!-- Secciones principales con mejor espaciado -->
		<div class="relative bg-white dark:bg-gray-900">
			<div class="max-w-7xl mx-auto">
				<About {profile} />
				<Experience />
			</div>
		</div>
	</main>

	<Footer />
</div>
