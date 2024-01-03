import { parsePost } from '$lib/blog'
import type { PageLoad } from './$types'

export const load: PageLoad = () => {
	const posts = import.meta.glob('/blog/*.md', { eager: true, as: 'raw' })

	return {
		posts: Object.entries(posts).map(parsePost)
	}
}
