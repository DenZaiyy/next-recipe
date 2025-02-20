import { redirect } from "next/navigation"

export const fetchArticle = async (slug: string): Promise<TArticle> => {
	const res = await fetch(`/api/blog/${slug}`, { cache: "no-store" })

	if (!res.ok) redirect("/blog/article")

	return res.json()
}
