import Image from "next/image";

interface IRecipeCardProps {
    recipe: TRecipe
}

export const RecipeCard = ({ recipe }: IRecipeCardProps) => {
    return (
        <div className="rounded-sm relative">
            <div className="h-[80px] overlow-hidden">
                <Image src={recipe.image} alt={recipe.title} width={500} height={500} />
            </div>
            <div className="p-4 flex flex-col gap-4">
                <h2 className="text-white text-xl font-bold">{recipe.title}</h2>
                <p className="text-white text-sm">{recipe.duration} min</p>
                <button className="rounded border border-white px-4 py-2 text-white">View recipe</button>
            </div>
        </div>
    )
}