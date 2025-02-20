import { redirect } from "next/navigation"

export const fetchArticles = async (): Promise<TArticle[]> => {
	const res = await fetch(`${process.env.BASE_URL}/api/blog/`, {
		cache: "no-store",
	})

	if (!res.ok) redirect("/blog/article")

	return res.json()
}
