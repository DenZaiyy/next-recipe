"use client"

import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect, useState } from "react"
import { apiMealService } from "@/services/mealService"
import { CategoryRecipe } from "@/components/meal/CategoryRecipe"
import { useForm } from "@/hooks/meal/useForm"

const MealPlanner = () => {
	const { user, isSignedIn, isLoaded } = useUser()
	const { handleSubmit, isSubmitted } = useForm()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [categories, setCategories] = useState<TCategory[]>([])

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

	if (!isLoaded) {
		return <div>Loading...</div>
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
						<div className="flex flex-col gap-2">
							<label htmlFor="date" className="capitalize">
								Select date:
							</label>
							<input
								type="date"
								name="date"
								id="date"
								required
								className="border border-foreground p-1 rounded-md text-foreground w-max bg-background"
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
						{isSubmitted ? (
							<p className="text-green-600">
								Meal plan created successfully!
							</p>
						) : (
							<button
								type="submit"
								className="px-4 py-2 bg-green-600 text-white text-md rounded-md w-max capitalize"
							>
								Validate meal plan
							</button>
						)}
					</form>
				)}
			</div>
		</div>
	)
}

export default MealPlanner
