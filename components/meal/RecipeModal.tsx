import { apiMealService } from "@/services/mealService"
import { useEffect, useState } from "react"
import styles from "./modal.module.css"

interface ISelectProps {
	isOpen: boolean
	onClose: () => void
	onAddRecipes: (recipes: TRecipe[]) => void
	category: TCategory
}

export const RecipeModal = ({
	isOpen,
	onClose,
	onAddRecipes,
	category,
}: ISelectProps) => {
	const [recipes, setRecipes] = useState<TRecipe[]>([])
	const [selectedRecipes, setSelectedRecipes] = useState<TRecipe[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const getRecipes = async () => {
			if (isOpen && category) {
				setIsLoading(true)
				try {
					const data = await apiMealService.getRecipes(category.id)
					if (data) {
						setRecipes(data)
					}
				} catch (e) {
					console.error("Error: ", e)
				} finally {
					setIsLoading(false)
				}
			}
		}

		getRecipes()
	}, [isOpen, category])

	useEffect(() => {
		if (!isOpen) {
			setSelectedRecipes([])
		}
	}, [isOpen])

	// Gérer le changement de sélection
	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const selectedOptions = Array.from(event.target.selectedOptions)
		const selectedRecipeIds = selectedOptions.map((option) => option.value)

		// Trouver les recettes complètes à partir des IDs sélectionnés
		const newSelectedRecipes = recipes.filter((recipe) =>
			selectedRecipeIds.includes(recipe.id.toString()),
		)

		setSelectedRecipes(newSelectedRecipes)
	}

	const handleSubmit = () => {
		onAddRecipes(selectedRecipes)
		onClose()
	}

	if (!isOpen) return null

	return (
		<div className={styles.darkBG}>
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className="font-bold capitalize">Select recipes</h5>
					</div>
					<select
						name={`recipes-${category.name.toLowerCase()}`}
						id={`recipes-${category.name.toLowerCase()}`}
						multiple
						className={styles.modalSelect}
						size={4}
						onChange={handleSelectChange}
						value={selectedRecipes.map((recipe) =>
							recipe.id.toString(),
						)}
					>
						{isLoading ? (
							<option disabled>Loading...</option>
						) : recipes.length > 0 ? (
							recipes.map((recipe: TRecipe) => (
								<option
									key={recipe.id}
									value={recipe.id}
									className={styles.modalOption}
								>
									{recipe.title}
								</option>
							))
						) : (
							<option disabled>No recipes found</option>
						)}
					</select>

					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								className={styles.cancelBtn}
								onClick={onClose}
							>
								Cancel
							</button>
							<button
								className={styles.submitBtn}
								onClick={handleSubmit}
								disabled={selectedRecipes.length === 0}
							>
								Add selected
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
