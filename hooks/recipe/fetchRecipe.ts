import { redirect } from "next/navigation"

export const fetchRecipe = async (slug: string): Promise<TRecipe> => {
	const res = await fetch(`/api/recipe/${slug}`, { cache: "no-store" })

	if (!res.ok) redirect("/recipe")

	return res.json()
}
