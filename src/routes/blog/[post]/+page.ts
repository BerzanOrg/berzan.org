import { parsePost } from '$lib/blog'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ params }) => {
	const posts = import.meta.glob(`/blog/*.md`, { eager: true, as: 'raw' })

	const post = posts[`/blog/${params.post}.md`]

	return parsePost([`/blog/${params.post}.md`, post])
}
