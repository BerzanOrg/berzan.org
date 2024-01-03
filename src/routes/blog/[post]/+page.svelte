<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<svelte:head>
	<title>Berzan - {data.title}</title>
	<meta name="description" content={data.description} />
	<meta name="keywords" content="berzan, developer, web3" />
	<meta property="og:title" content="Berzan - {data.title}" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://berzan.org/blog/{data.no}" />
	<meta property="og:image" content="https://berzan.org/{data.no}.jpg" />
	<meta property="og:image:width" content="864" />
	<meta property="og:image:height" content="864" />
	<meta property="og:description" content={data.description} />
	<meta name="twitter:title" content="Berzan - {data.title}" />
	<meta name="twitter:url" content="https://berzan.org/blog/{data.no}" />
	<meta name="twitter:description" content={data.description} />
	<meta name="twitter:image:src" content="https://berzan.org/{data.no}.jpg" />
</svelte:head>

<main class="flex flex-1 flex-col items-center gap-4">
	<article class="flex w-full max-w-6xl flex-col gap-2 px-4 pt-2 text-center md:px-8">
		<div class="flex flex-col">
			<h1 class="text-4xl font-bold sm:text-5xl md:text-6xl">{data.title}</h1>
			<p class="text-sm sm:text-base md:text-lg">{data.fmtDate}</p>
		</div>
		<img alt="blog post {data.no}" src="/{data.no}.jpg" class="rounded-2xl md:rounded-3xl" />
		<div class="flex flex-col">
			{data.markdown}
		</div>
	</article>
</main>
