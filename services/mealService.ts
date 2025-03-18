import { redirect } from "next/navigation"

export interface MealService {
	getRecipes: (categoryId: string) => Promise<TRecipe[]>
	getCategories: () => Promise<TCategory[]>
	getMealPlanByUser: (userId: string) => Promise<TMealPlan[]>
	deleteMealPlan: (userId: string, mealPlanId: string) => Promise<void>
	deleteMealPlanRecipe: (
		userId: string,
		mealPlanId: string,
		recipeId: string,
	) => Promise<void>
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

		if (!res.ok) redirect(`/meal/${userId}`)

		return res.json()
	},
	deleteMealPlan: async (
		userId: string,
		mealPlanId: string,
	): Promise<void> => {
		const res = await fetch(`/api/meal/user/${userId}/${mealPlanId}`, {
			method: "DELETE",
			cache: "no-store",
		})

		if (!res.ok) redirect("/meal")

		return
	},
	deleteMealPlanRecipe: async (
		userId: string,
		mealPlanId: string,
		mealPlanRecipeId: string,
	): Promise<void> => {
		const res = await fetch(
			`/api/meal/user/${userId}/${mealPlanId}/${mealPlanRecipeId}`,
			{ method: "DELETE", cache: "no-store" },
		)

		if (!res.ok) redirect("/meal")

		return
	},
}
