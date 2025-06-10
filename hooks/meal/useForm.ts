import React, { useState } from "react"
import toast from "react-hot-toast"
import { useUser } from "@clerk/nextjs"
import { apiMealService } from "@/services/mealService"

interface IMealPlanRecipes {
	mealType: string
	order: number
	recipeId: string
}

export const useForm = () => {
	const { user } = useUser()
	const [isSubmitted, setIsSubmitted] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		const date = formData.get("date")

		if (!date) {
			toast.error("Please select a date")
			return
		}

		if (!user) {
			toast.error("Please sign in to create a meal plan")
			return
		}

		// Récupérer tous les champs mealPlanRecipes
		const orders = formData.getAll("mealPlanRecipes[][order]")
		const mealTypes = formData.getAll("mealPlanRecipes[][mealType]")
		const recipeIds = formData.getAll("mealPlanRecipes[][recipeId]")

		const mealPlanRecipes: IMealPlanRecipes[] = []
		for (let i = 0; i < recipeIds.length; i++) {
			mealPlanRecipes.push({
				mealType: mealTypes[i].toString(),
				order: parseInt(orders[i].toString()),
				recipeId: recipeIds[i].toString(),
			})
		}

		if (mealPlanRecipes.length === 0) {
			toast.error("Please select at least one recipe")
			return
		}

		try {
			const response = await fetch(`/api/meal`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ date, mealPlanRecipes }),
			})

			const data = await response.json()

			if (!response.ok) {
				toast.error(data.message)
			}

			toast.success(`Meal Plan created successfully`)

			if (data.redirect) {
				setIsSubmitted(true)
				setTimeout(() => {
					window.location.href = `/meal/${user.id}`
				}, 2000)
			}
		} catch (err) {
			if (err instanceof Error) toast.error(`Error: ${err.message}`)
		}
	}

	const handleDeleteMealPlan = async (userId: string, mealPlanId: string) => {
		const isConfirmed = confirm(
			"Êtes-vous sûr de vouloir supprimer cet élément ?",
		)

		if (!isConfirmed) return

		try {
			if (!userId) {
				return
			}
			await apiMealService.deleteMealPlan(userId, mealPlanId)
			toast.success("Meal plan deleted successfully")
		} catch (err) {
			toast.error("Failed to delete meal plan")
			if (err instanceof Error) console.log(err.message)
		}
	}

	const handleDeleteMealPlanRecipe = async (
		userId: string,
		mealPlanId: string,
		mealPlanRecipeId: string,
	) => {
		const isConfirmed = confirm(
			"Êtes-vous sûr de vouloir supprimer cet élément ?",
		)

		if (!isConfirmed) return

		try {
			if (!userId) {
				return
			}
			await apiMealService.deleteMealPlanRecipe(
				userId,
				mealPlanId,
				mealPlanRecipeId,
			)
			toast.success("Meal plan recipe deleted successfully")
		} catch (err) {
			toast.error("Failed to delete meal plan recipe")
			if (err instanceof Error) console.log(err.message)
		}
	}

	return {
		handleSubmit,
		isSubmitted,
		handleDeleteMealPlan,
		handleDeleteMealPlanRecipe,
	}
}
