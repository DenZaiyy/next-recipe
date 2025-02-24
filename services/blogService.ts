import { redirect } from "next/navigation"

export interface BlogService {
	getArticles: () => Promise<TArticle[]>
	getArticle: (slug: string) => Promise<TArticle>
}

export const apiBlogService: BlogService = {
	getArticles: async (): Promise<TArticle[]> => {
		const res = await fetch(`${process.env.BASE_URL}/api/blog/`, {
			cache: "no-store",
		})

		if (!res.ok) redirect("/blog/article")

		return res.json()
	},
	getArticle: async (slug: string): Promise<TArticle> => {
		const res = await fetch(`/api/blog/${slug}`, { cache: "no-store" })

		if (!res.ok) redirect("/blog/article")

		return res.json()
	},
}
