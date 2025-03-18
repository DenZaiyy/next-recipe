"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { apiMealService } from "@/services/mealService"
import Image from "next/image"
import {
	Clock9,
	Croissant,
	EggFried,
	Ham,
	Trash2,
	Utensils,
} from "lucide-react"

const MyMealPlanner = () => {
	const { user, isSignedIn } = useUser()

	const [mealPlans, setMealPlans] = useState<TMealPlan[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		// Fetch user meal plans
		const fetchMealPlans = async (userId: string) => {
			try {
				setIsLoading(true)
				const data = await apiMealService.getMealPlanByUser(userId)

				if (data) setMealPlans(data)
			} catch (err) {
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}

		if (user) {
			fetchMealPlans(user.id)
		}
	}, [user])

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
			setMealPlans((prevMealPlans) =>
				prevMealPlans.filter((mealPlan) => mealPlan.id !== mealPlanId),
			)
		} catch (err) {
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
			setMealPlans((prevMealPlans) =>
				prevMealPlans.filter((mealPlan) => mealPlan.id !== mealPlanId),
			)
		} catch (err) {
			if (err instanceof Error) console.log(err.message)
		}
	}

	// Fonction pour formater la date
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		})
	}

	// Fonction pour obtenir l'icône correspondant au type de repas
	const getMealTypeIcon = (mealType: string) => {
		switch (mealType.toLowerCase()) {
			case "breakfast":
				return <Croissant size={18} className="text-secondary" />
			case "lunch":
				return <Ham size={18} className="text-secondary" />
			case "dinner":
				return <EggFried size={18} className="text-secondary" />
			default:
				return <Utensils size={18} className="text-secondary" />
		}
	}

	return (
		<div className="lg:p-8">
			<h1 className="text-2xl font-bold mb-6">Your Meal Plans</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{mealPlans.map((mealPlan) => {
						type MealPlanRecipeType =
							(typeof mealPlan.mealPlanRecipes)[0]
						// Regrouper les recettes par type de repas
						const mealTypeGroups: Record<
							string,
							MealPlanRecipeType[]
						> = {}

						mealPlan.mealPlanRecipes.forEach((recipe) => {
							const mealType = recipe.mealType.toLowerCase()
							if (!mealTypeGroups[mealType]) {
								mealTypeGroups[mealType] = []
							}
							mealTypeGroups[mealType].push(recipe)
						})

						return (
							<div
								key={mealPlan.id}
								className="flex flex-col p-4 bg-header rounded-lg relative border border-header overflow-hidden"
							>
								{(user || isSignedIn) &&
									user.id === mealPlan.userId && (
										<div
											className="absolute top-0 right-0 p-2 bg-background cursor-pointer"
											onClick={() =>
												handleDeleteMealPlan(
													user.id,
													mealPlan.id,
												)
											}
										>
											<Trash2
												size={18}
												className="text-red-600"
											/>
										</div>
									)}

								<h2 className="text-foreground text-lg font-semibold mb-4">
									{formatDate(mealPlan.date.toString())}
								</h2>

								{/* Afficher chaque groupe de type de repas */}
								{Object.entries(mealTypeGroups).map(
									([mealType, recipes]) => (
										<div key={mealType} className="mb-4">
											<h3 className="flex items-center gap-2 text-secondary capitalize mb-2">
												{getMealTypeIcon(mealType)}{" "}
												{mealType}
											</h3>

											<div className="flex flex-col gap-2">
												{recipes
													.sort(
														(a, b) =>
															a.order - b.order,
													)
													.map((recipe) => (
														<div
															key={recipe.id}
															className="relative group"
														>
															{(user ||
																isSignedIn) &&
																user.id ===
																	mealPlan.userId && (
																	<div
																		className="absolute -z-10 top-0 right-0 p-2 rounded-lg bg-background cursor-pointer group-hover:z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"
																		onClick={() =>
																			handleDeleteMealPlanRecipe(
																				user.id,
																				mealPlan.id,
																				recipe.id,
																			)
																		}
																	>
																		<Trash2
																			size={
																				18
																			}
																			className="text-red-600"
																		/>
																	</div>
																)}

															<a
																href={`/recipe/${recipe.recipe.slug}`}
																className="rounded-lg flex justify-between p-2 bg-background items-center overflow-hidden"
															>
																<div>
																	<h3 className="font-medium">
																		{
																			recipe
																				.recipe
																				.title
																		}
																	</h3>
																	<p className="flex gap-1 items-center text-sm text-gray-400">
																		<Clock9
																			size={
																				16
																			}
																		/>
																		{
																			recipe
																				.recipe
																				.duration
																		}{" "}
																		mins
																	</p>
																</div>
																<Image
																	src={
																		recipe
																			.recipe
																			.image
																	}
																	alt={
																		recipe
																			.recipe
																			.title
																	}
																	width={50}
																	height={50}
																	className="h-full w-full max-w-[80px] rounded-md shadow-md object-cover"
																/>
															</a>
														</div>
													))}
											</div>
										</div>
									),
								)}
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default MyMealPlanner
