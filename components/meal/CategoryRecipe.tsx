import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { RecipeModal } from "./RecipeModal"

interface ICategoryRecipeProps {
	category: TCategory
}

export const CategoryRecipe = ({ category }: ICategoryRecipeProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [selectedCategory, setSelectedCategory] = useState<TCategory>()
	const [selectedRecipes, setSelectedRecipes] = useState<TRecipe[]>([])

	const handleOpenModal = (category: TCategory) => {
		setSelectedCategory(category)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const handleAddRecipes = (recipes: TRecipe[]) => {
		setSelectedRecipes((prev) => {
			// Filtrer pour éviter les doublons
			const existingIds = prev.map((r) => r.id)
			const newRecipes = recipes.filter(
				(r) => !existingIds.includes(r.id),
			)
			return [...prev, ...newRecipes]
		})
	}

	const handleRemoveRecipe = (id: string) => {
		setSelectedRecipes((prev) => prev.filter((r) => r.id !== id))
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
				{selectedRecipes.length > 0 ? (
					<div className={"flex flex-col gap-2"}>
						{selectedRecipes.map((recipe) => (
							<label
								htmlFor={`recipes-${category.name.toLowerCase()}`}
								key={recipe.id}
								className="bg-gray-500 p-2 flex justify-between items-center text-sm rounded-md"
							>
								{recipe.title}
								<div
									onClick={() =>
										handleRemoveRecipe(recipe.id)
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
									name={`recipes-${category.name.toLowerCase()}`}
									id={`recipes-${category.name.toLowerCase()}`}
									value={recipe.slug}
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
