import { useEffect, useState } from "react"
import { RecipeCard } from "@/components/RecipeCard"
import { Lightbulb } from "lucide-react"
import { apiRecipeService } from "@/services/recipeService"

interface RecipeSuggestionsProps {
	currentRecipe: TRecipe
}

export const RecipeSuggestions = ({
	currentRecipe,
}: RecipeSuggestionsProps) => {
	const [suggestions, setSuggestions] = useState<TRecipe[]>([])

	useEffect(() => {
		const loadSuggestions = async () => {
			try {
				const data = await apiRecipeService.getSuggestions(
					currentRecipe.category.id,
					currentRecipe.id,
				)
				setSuggestions(data)
			} catch (error) {
				console.error("[SUGGESTIONS] ", error)
			}
		}

		loadSuggestions()
	}, [currentRecipe])

	return (
		<div>
			<h2>
				<Lightbulb /> Suggestions
			</h2>
			<div className="flex flex-col gap-4">
				{suggestions.map((suggestion) => (
					<RecipeCard
						key={suggestion.id}
						recipe={suggestion}
						detailed={true}
					/>
				))}
			</div>
		</div>
	)
}
