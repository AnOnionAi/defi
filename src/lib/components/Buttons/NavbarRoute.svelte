<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	
	export let pageTitle
	export let pageRoute;

	let isCurrentRoute = false;

	$: isCurrentRoute = $page?.url.pathname.includes(pageRoute);
</script>

<a sveltekit:prefetch href={`/${$page.params.lang}${pageRoute}`}>
	<span
		class="hover:text-green-500 {$darkMode &&
			'hover:text-green-300'}   px-2  py-3 rounded-md {isCurrentRoute && 'text-green-500'} {isCurrentRoute && !darkMode && 'text-green-500'}"
	>
		{pageTitle}
	</span>
</a>
