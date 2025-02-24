import { useState, useEffect } from "react"
import toast from "react-hot-toast"

export const useFavorites = () => {
	const [favorites, setFavorites] = useState<TRecipe[]>([])

	useEffect(() => {
		// Charger les favoris au montage du composant
		const storedFavorites = JSON.parse(
			localStorage.getItem("favorites") || "[]",
		)
		setFavorites(storedFavorites)
	}, [])

	const toggleFavorite = (recipe: TRecipe) => {
		const isFavorite = favorites.some((fav) => fav.id === recipe.id)
		let newFavorites: TRecipe[]

		if (isFavorite) {
			newFavorites = favorites.filter((fav) => fav.id !== recipe.id)
			toast.success(`${recipe.title} retiré des favoris`)
		} else {
			newFavorites = [...favorites, recipe]
			toast.success(`${recipe.title} ajouté aux favoris`)
		}

		localStorage.setItem("favorites", JSON.stringify(newFavorites))
		setFavorites(newFavorites)
	}

	const isFavorite = (recipeId: string) => {
		return favorites.some((fav) => fav.id === recipeId)
	}

	return { favorites, toggleFavorite, isFavorite }
}
