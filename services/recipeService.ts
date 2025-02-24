import { redirect } from "next/navigation"

export interface RecipeService {
	getRecipes: () => Promise<TRecipe[]>
	getRecipe: (slug: string) => Promise<TRecipe>
	getSuggestions: (
		cateogryId: string,
		currentRecipeId: string,
	) => Promise<TRecipe[]>
}

export const apiRecipeService: RecipeService = {
	getRecipes: async (): Promise<TRecipe[]> => {
		const res = await fetch(`${process.env.BASE_URL}/api/recipe/`, {
			cache: "no-store",
		})

		if (!res.ok) redirect("/recipe")

		return res.json()
	},
	getRecipe: async (slug: string): Promise<TRecipe> => {
		const res = await fetch(`/api/recipe/${slug}`, { cache: "no-store" })

		if (!res.ok) redirect("/recipe")

		return res.json()
	},
	getSuggestions: async (
		categoryId: string,
		currentRecipeId: string,
	): Promise<TRecipe[]> => {
		const res = await fetch(
			`/api/recipe/suggestions/${categoryId}/${currentRecipeId}`,
			{ cache: "no-store" },
		)

		if (!res.ok) redirect("/recipe")

		return res.json()
	},
}
