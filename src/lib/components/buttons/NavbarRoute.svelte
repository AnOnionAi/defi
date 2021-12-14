<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	export let pageRoute;

	const gotoPage = (route: string, home: boolean = false) => {
		if (home) goto(`/${$page.params.lang}`, { replaceState: true });
		else goto(`/${$page.params.lang}${route.toLowerCase()}`, { replaceState: true });
		console.log($page.params.lang);
	};
</script>

<button
	on:click={() => {
		gotoPage(pageRoute.route);
	}}
>
	<span class="hover:text-green-500 {$darkMode && 'hover:text-green-300'}   px-2  py-3 rounded-md">
		{pageRoute.title}
	</span>
</button>
