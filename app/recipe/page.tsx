import {fetchRecipes} from "@/app/api/recipe/hook/fetchRecipes";
import {Slider} from "@/components/Slider";

const RecipePage = async () => {
    const recipes = await fetchRecipes();

    return (
        <>
            <h1 className="text-4xl text-white font-bold mb-4">Latest Recipes</h1>

            {recipes.length > 0 && <Slider recipes={recipes}/> }
        </>
    )
}

export default RecipePage