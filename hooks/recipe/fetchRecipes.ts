import {redirect} from "next/navigation";


export const fetchRecipes = async (): Promise<TRecipe[]> => {
    const res = await fetch(`${process.env.BASE_URL}/api/recipe/`, {
        cache: 'no-store'
    })

    if(!res.ok) redirect('/recipe')

    return res.json();
}