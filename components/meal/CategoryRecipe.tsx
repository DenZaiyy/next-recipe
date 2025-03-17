import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { RecipeModal } from "./RecipeModal"

interface ICategoryRecipeProps {
	category: TCategory
}

export const CategoryRecipe = ({ category }: ICategoryRecipeProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [selectedCategory, setSelectedCategory] = useState<TCategory>()
	const [mealPlanRecipes, setMealPlanRecipes] = useState<
		{ mealType: string; order: number; recipe: TRecipe }[]
	>([])

	const handleOpenModal = (category: TCategory) => {
		setSelectedCategory(category)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const handleAddRecipes = (recipes: TRecipe[], mealType: string) => {
		setMealPlanRecipes((prev) => {
			// Filtrer pour éviter les doublons
			const existingIds = prev
				.filter((item) => item.mealType === mealType)
				.map((item) => item.recipe.id)

			// Déterminer l'ordre de départ pour les nouvelles recettes
			const startOrder =
				prev.filter((item) => item.mealType === mealType).length + 1

			// Créer les nouveaux éléments
			const newItems = recipes
				.filter((recipe) => !existingIds.includes(recipe.id))
				.map((recipe, index) => ({
					mealType,
					order: startOrder + index,
					recipe,
				}))

			return [...prev, ...newItems]
		})
	}

	// Fonction pour supprimer une recette
	const handleRemoveRecipe = (recipeId: string, mealType: string) => {
		setMealPlanRecipes((prev) => {
			// Supprimer la recette spécifique
			const filteredItems = prev.filter(
				(item) =>
					!(
						item.recipe.id === recipeId &&
						item.mealType === mealType
					),
			)

			// Réorganiser les ordres pour cette catégorie de repas
			return filteredItems.map((item) => {
				if (item.mealType === mealType) {
					// Trouver le nouvel ordre pour cet élément
					const newOrder = filteredItems.filter(
						(i) =>
							i.mealType === mealType &&
							i.recipe.id <= item.recipe.id,
					).length

					return { ...item, order: newOrder }
				}
				return item
			})
		})
	}

	return (
		<div className="block rounded-md p-4 bg-gray-600 text-foreground w-1/3">
			<div className="flex justify-between items-center">
				<span className="font-bold text-lg">
					{category && category.name}
				</span>
				<div
					className="p-1 bg-blue-400 rounded-md cursor-pointer"
					onClick={() => handleOpenModal(category)}
				>
					<Plus size={24} strokeWidth={1.5} />
				</div>
			</div>
			<div className="mt-3">
				{mealPlanRecipes.length > 0 ? (
					<div className={"flex flex-col gap-2"}>
						{mealPlanRecipes
							.filter(
								(item) =>
									item.mealType ===
									category.name.toLowerCase(),
							)
							.sort((a, b) => a.order - b.order)
							.map((item) => (
								<label
									htmlFor={`recipe-${item.recipe.id}`}
									key={item.recipe.id}
									className="bg-gray-500 p-2 flex justify-between items-center text-sm rounded-md"
								>
									{item.recipe.title}
									<div
										onClick={() =>
											handleRemoveRecipe(
												item.recipe.id,
												item.mealType,
											)
										}
									>
										<Trash2
											size={20}
											strokeWidth={1.5}
											stroke={"red"}
											className={"cursor-pointer"}
										/>
									</div>
									<input
										type="hidden"
										name="mealPlanRecipes[][order]"
										value={item.order}
										readOnly={true}
									/>
									<input
										type="hidden"
										name="mealPlanRecipes[][mealType]"
										value={item.mealType}
										readOnly={true}
									/>
									<input
										type="hidden"
										name="mealPlanRecipes[][recipeId]"
										value={item.recipe.id}
										readOnly={true}
									/>
								</label>
							))}
					</div>
				) : (
					<p className="text-xs text-gray-400">
						No recipes added yet.
					</p>
				)}
			</div>
			<RecipeModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onAddRecipes={handleAddRecipes}
				category={selectedCategory!}
			/>
		</div>
	)
}
