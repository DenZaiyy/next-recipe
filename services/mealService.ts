import { redirect } from "next/navigation"

export interface MealService {
	getRecipes: (categoryId: string) => Promise<TRecipe[]>
	getCategories: () => Promise<TCategory[]>
	getMealPlanByUser: (userId: string) => Promise<TMealPlan[]>
}

export const apiMealService: MealService = {
	getRecipes: async (categoryId: string): Promise<TRecipe[]> => {
		const res = await fetch(`/api/meal/${categoryId}`, {
			cache: "no-store",
		})

		if (!res.ok) redirect("/meal")

		return res.json()
	},
	getCategories: async (): Promise<TCategory[]> => {
		const res = await fetch(`/api/category`, { cache: "no-store" })

		if (!res.ok) redirect("/meal")

		return res.json()
	},
	getMealPlanByUser: async (userId: string): Promise<TMealPlan[]> => {
		const res = await fetch(`/api/meal/user/${userId}`, {
			cache: "no-store",
		})

		if (!res.ok) redirect("/meal")

		return res.json()
	},
}
