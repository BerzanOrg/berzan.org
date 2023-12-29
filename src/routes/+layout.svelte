<script>
	import '../app.css'
	import { onNavigate } from '$app/navigation'

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<slot />

<footer class="flex justify-center py-20 pb-10">
	<div
		class="flex w-full max-w-6xl flex-col gap-6 px-4 md:flex-row-reverse md:items-end md:justify-between md:px-8"
	>
		<div class="flex flex-col gap-4 md:flex-row md:gap-8">
			<div class="flex flex-col">
				<p class="text-lg font-bold">Website</p>
				<a href="/" class="hover:underline" id="reach-me">Homepage</a>
				<a href="/apps" class="hover:underline" id="reach-me">Apps</a>
				<a href="/blog" class="hover:underline" id="reach-me">Blog</a>
			</div>
			<div class="flex flex-col">
				<p class="text-lg font-bold">Profiles</p>
				<a href="https://twitter.com/BerzanOrg" target="_blank" class="hover:underline"
					>Twitter Profile</a
				>
				<a href="https://github.com/BerzanOrg" target="_blank" class="hover:underline"
					>GitHub Profile</a
				>
			</div>

			<div class="flex flex-col">
				<p class="text-lg font-bold">Contact</p>
				<a href="mailto:me@berzan.org" class="hover:underline" id="reach-me">Reach Me</a>
			</div>
		</div>
		<p>© Berzan</p>
	</div>
</footer>
