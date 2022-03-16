<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { page } from '$app/stores';
	export let pageTitle;
	export let pageRoute;

	$: isCurrentRoute = $page?.url.pathname.includes(pageRoute);
</script>

<a sveltekit:prefetch href={`/${$page.params.lang}${pageRoute}`}>
	<span
		class="link link-underline link-underline-black {$darkMode &&
			'link-underline-dark link-underline-black-dark'} text-[18px] font-[500] {isCurrentRoute &&
			'text-primary-400'}
	{isCurrentRoute && $darkMode && 'text-analogPurple-200'}">{pageTitle}</span>
</a>

<style>
	.link-underline {
		border-bottom-width: 0;
		background-image: linear-gradient(transparent, transparent),
			linear-gradient(#fff, #fff);
		background-size: 0 3px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		transition: background-size 0.4s ease-in-out;
	}

	.link-underline-black {
		background-image: linear-gradient(transparent, transparent),
			linear-gradient(#fe7688, #fe7688);
	}

	.link-underline:hover {
		background-size: 100% 3px;
		background-position: 0 100%;
	}

	.link-underline-dark {
		border-bottom-width: 0;
		background-image: linear-gradient(transparent, transparent),
			linear-gradient(#fff, #fff);
		background-size: 0 3px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		transition: background-size 0.4s ease-in-out;
	}

	.link-underline-black-dark {
		background-image: linear-gradient(transparent, transparent),
			linear-gradient(#f2c, #f2c);
	}

	.link-underline-dark:hover {
		background-size: 100% 3px;
		background-position: 0 100%;
	}
</style>
