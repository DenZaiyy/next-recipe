import { RecipesSlider } from "@/components/RecipesSlider"
import "./style.css"
import { apiRecipeService } from "@/services/recipeService"

const RecipePage = async () => {
	const recipes = await apiRecipeService.getRecipes()

	return (
		<>
			<h1 className="text-4xl text-foreground font-bold mb-4">
				Latest Recipes
			</h1>

			<div className={""}>
				{recipes.length > 0 && <RecipesSlider recipes={recipes} />}
			</div>
		</>
	)
}

export default RecipePage
