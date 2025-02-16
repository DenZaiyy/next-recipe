//import { fetchRecipes } from "@/hooks/recipe/fetchRecipes";
import { Slider } from "@/components/Slider";
import {recipes} from "@/lib/data";
import './style.css'

const RecipePage = async () => {
    //const recipes = await fetchRecipes();

    return (
        <>
            <h1 className="text-4xl text-white font-bold mb-4">
                Latest Recipes
            </h1>

            {recipes.length > 0 && <Slider recipes={recipes} />}
        </>
    );
};

export default RecipePage;
