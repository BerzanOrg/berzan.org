<svelte:head>
	<title>Berzan's Homepage</title>
</svelte:head>

<main
	class="flex flex-1 flex-col items-center gap-24 pb-24 sm:gap-28 sm:pb-28 md:gap-32 md:pb-32 lg:gap-36 lg:pb-36"
>
	<section class="w-full px-4 pt-2 md:px-8">
		<div
			class="flex h-140 flex-col items-center justify-center rounded-2xl bg-[url('/palm-trees.webp')] bg-cover bg-center text-white md:h-180 md:rounded-3xl xl:h-200"
		>
			<h1 class="text-center text-6xl font-bold sm:text-7xl md:text-8xl">I'm Berzan.</h1>
		</div>
	</section>
	<section class="w-full max-w-6xl px-4 pt-2 md:px-8">
		<p class="text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
			I'm a developer,
			<a href="https://minaprotocol.com/" target="_blank" class="hover:underline">Mina </a>
			Navigator,
			<br />
			<a href="https://superteam.fun/" target="_blank" class="hover:underline">Superteam </a>
			Member, or just
			<a href="https://twitter.com/BerzanOrg" target="_blank" class="hover:underline">myself</a>.
		</p>
	</section>
	<section class="flex w-full max-w-6xl flex-col gap-4 px-4 pt-2 sm:gap-6 md:px-8 lg:gap-7">
		<div class="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
			<h2 class="text-center text-5xl font-bold sm:text-6xl md:text-7xl">Berzan's Projects</h2>
			<p class="text-center text-lg font-medium sm:text-xl md:text-2xl">
				Below are the projects I'm building or I've built.
			</p>
		</div>
		<ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
			{#snippet project(params)}
				<li class="flex flex-col">
					<a
						href={params.link}
						target="_blank"
						class="flex flex-col gap-0.5 rounded-2xl bg-cyan-300/60 p-5 duration-200 hover:scale-95 hover:bg-cyan-300/40"
					>
						<h3 class="text-3xl font-bold sm:text-4xl md:text-3xl">
							{params.name}
						</h3>
						<p class="text-lg font-medium sm:text-xl md:text-lg">{params.description}</p>
					</a>
				</li>
			{/snippet}
			{@render project({
				name: 'Xane',
				description: 'A zero knowledge decentralized exchange.',
				link: 'https://xane.berzan.org/'
			})}
			{@render project({
				name: 'Starknet Token Creator',
				description: 'A tool to create tokens on Starknet.',
				link: '/apps/starknet-token-creator'
			})}
		</ul>
	</section>
	<section class="w-full max-w-6xl px-4 pt-2 md:px-8">
		<p class="text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
			I like VMs, distributed systems,
			<br />
			cryptography, and data structures.
		</p>
	</section>
</main>
