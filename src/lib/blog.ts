const test = `

---
title: Astro in brief
description: Find out what makes Astro awesome!
---

# hello world


`

export const parsePost = (postData: [string, string]) => {
	const fileName = postData[0]
	const fileContent = postData[1]
	const postNo = fileName.split('/').at(-1)!.split('.md').at(0)!

	const { title, description, date, fmtDate } = parseYaml(fileContent)

	const { markdown } = parseMarkdown(fileContent)

	return {
		no: postNo,
		title,
		description,
		date,
		fmtDate,
		markdown
	}
}

const datetimeFormat = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'medium'
})

const parseYaml = (content: string) => {
	const startIndex = content.indexOf('---\n') + 4
	const endIndex = content.indexOf('\n---\n')
	const yaml = content.slice(startIndex, endIndex)

	const title = yaml.split('\n')[0].split('title: ')[1]
	const description = yaml.split('\n')[1].split('description: ')[1]
	const date = yaml.split('\n')[2].split('date: ')[1]

	const parsedDate = new Date(date)

	return {
		title,
		description,
		fmtDate: datetimeFormat.format(parsedDate),
		date: parsedDate
	}
}

const parseMarkdown = (content: string) => {
	const startIndex = content.indexOf('\n---\n') + 5
	const markdown = content.slice(startIndex)

	return { markdown }
}
