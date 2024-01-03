<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<svelte:head>
	<title>Berzan's Blog</title>
</svelte:head>

<main class="flex flex-1 flex-col items-center gap-4">
	<section
		class="flex w-full max-w-6xl flex-col items-center gap-5 px-4 pt-2 sm:gap-6 md:gap-8 md:px-8 lg:gap-6"
	>
		<h1 class="text-center text-6xl font-bold sm:text-7xl md:text-8xl">Berzan's Blog</h1>
		<ol
			class="grid w-full max-w-md grid-cols-1 gap-14 sm:max-w-lg sm:gap-16 md:max-w-xl md:gap-20 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 lg:gap-y-14"
		>
			{#each data.posts as post}
				<a href="/blog/{post.no}">
					<li class="flex flex-col gap-1 rounded-2xl duration-200 hover:scale-95 sm:gap-1.5">
						<img alt="blog post {post.no}" src="/{post.no}.jpg" class="rounded-2xl" />
						<div class="flex flex-col">
							<h2 class="text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-4xl">
								{post.title}
							</h2>
							<p class="text-center sm:text-lg md:text-xl lg:text-lg">
								{post.fmtDate} - {post.description}
							</p>
						</div>
					</li>
				</a>
			{/each}
		</ol>
	</section>
</main>
