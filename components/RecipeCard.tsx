import Image from "next/image";
import {ArrowRight, Clock11, HeartPulse, Leaf} from "lucide-react";

interface IRecipeCardProps {
    recipe: TRecipe
}

export const RecipeCard = ({ recipe }: IRecipeCardProps) => {
    console.log(recipe)
    return (
        <div className="rounded-md overflow-hidden relative w-[300px] h-auto bg-header">
            <div className="absolute flex gap-2 top-2 right-2 rounded-full bg-white/50 p-2">
                <Leaf size={24} color={"#000"} strokeWidth={1} fill={"#088500"}/>
                <HeartPulse size={24} color={"#000"} strokeWidth={1} fill={"rgb(255,0,0)"}/>
            </div>
            <div className="overflow-hidden">
                <Image src={recipe.image} alt={recipe.title} className="w-full aspect-auto" width={300} height={300} />
            </div>
            <div className="p-4 flex flex-col gap-4">
                <h2 className="text-white text-xl font-bold">{recipe.title}</h2>
                <div>
                    {recipe.categories.map((category) => <p key={category.category.id} className={`text-white text-sm p-2 rounded-md w-max ${category.category.name === "Starter" ? "bg-green-700" : category.category.name === "Dessert" ? "bg-pink-700" : "bg-blue-700"}`}>{category.category.name}</p>)}
                </div>
                <span className="text-white text-sm flex gap-2"><Clock11 /> {recipe.duration} min</span>
                <button className="rounded border border-white px-4 py-2 text-white font-medium flex gap-2 w-max">View recipe <ArrowRight /></button>
            </div>
        </div>
    )
}