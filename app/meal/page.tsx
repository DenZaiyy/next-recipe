"use client"

import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect, useState } from "react"
import { apiMealService } from "@/services/mealService"
import { CategoryRecipe } from "@/components/meal/CategoryRecipe"

const MealPlanner = () => {
	const { user, isSignedIn } = useUser()
	const [message, setMessage] = useState("")
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categories, setCategories] = useState<TCategory[]>([])
	const [breakfastRecipes, setBreakfastRecipes] = useState<TRecipe[]>([])
	const [lunchRecipes, setLunchRecipes] = useState<TRecipe[]>([])
	const [dinnerRecipes, setDinnerRecipes] = useState<TRecipe[]>([])

	useEffect(() => {
		const fetchCategories = async () => {
			setIsLoading(true)
			try {
				const data = await apiMealService.getCategories()

				if (data) setCategories(data)
			} catch (err) {
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCategories()
	}, [])

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		try {
			const response = await fetch(`/api/meal`, {
				method: "POST",
				body: formData,
			})

			const data = await response.json()
			setMessage(data.message)
		} catch (err) {
			if (err instanceof Error) setMessage(`Error: ${err.message}`)
		}
	}

	return (
		<div className="flex flex-col gap-2 p-4">
			<h1 className="text-4xl text-foreground font-bold mb-4 capitalize">
				Meal planner
			</h1>
			{isSignedIn && user && (
				<Link
					href={`/meal/${user.id}`}
					className={
						"px-4 py-2 bg-secondary text-white rounded w-max capitalize"
					}
				>
					My meal plans
				</Link>
			)}
			<div className="mt-4">
				{isLoading ? (
					"Loading..."
				) : (
					<form
						method="post"
						onSubmit={handleSubmit}
						className="flex flex-col gap-4"
					>
						{message && (
							<div className="p-4 bg-secondary text-white rounded-md">
								{message}
							</div>
						)}
						<div className="flex flex-col gap-2">
							<label htmlFor="date" className="capitalize">
								Select date:
							</label>
							<input
								type="date"
								name="date"
								id="date"
								required
								className="border border-foreground p-1 rounded-md text-header w-max"
							/>
						</div>
						<div className="flex gap-3">
							{isLoading
								? "Loading..."
								: categories
									? categories.map((category) => (
											<CategoryRecipe
												category={category}
												key={category.id}
											/>
										))
									: ""}
						</div>
						<input
							type="hidden"
							name="userId"
							value={user?.id ?? ""}
						/>
						<button
							type="submit"
							className="px-4 py-2 bg-green-600 text-white text-md rounded-md w-max capitalize"
						>
							Validate meal plan
						</button>
					</form>
				)}
			</div>
		</div>
	)
}

export default MealPlanner
