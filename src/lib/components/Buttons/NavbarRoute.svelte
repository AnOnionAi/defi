<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { page } from '$app/stores';
	export let pageTitle;
	export let pageRoute;

	let isCurrentRoute = false;

	$: isCurrentRoute = $page?.url.pathname.includes(pageRoute);
</script>

<a sveltekit:prefetch href={`/${$page.params.lang}${pageRoute}`}>
	<span
		class="hover:text-green-500 {$darkMode &&
			'hover:text-green-300'}   rounded-md   {isCurrentRoute &&
			!$darkMode &&
			'font-medium text-green-500'} {isCurrentRoute &&
			$darkMode &&
			'font-medium text-green-300'}">
		{pageTitle}
	</span>
</a>
