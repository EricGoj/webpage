<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
	}

	let { title, subtitle = '' }: Props = $props();
</script>

<div class="animated-title">
	<h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
		{title}
	</h1>
	{#if subtitle}
		<p class="text-xl text-gray-600 dark:text-gray-300">{subtitle}</p>
	{/if}
</div>