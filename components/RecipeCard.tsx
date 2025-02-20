import Image from "next/image"
import { ArrowRight, HeartPulse, Leaf } from "lucide-react"
import React from "react"
import Link from "next/link"
import { Category } from "@/components/Category"
import { DifficultyGauge } from "@/components/DifficultyGauge"
import { Duration } from "@/components/Duration"

interface IRecipeCardProps {
	recipe: TRecipe
	detailed?: boolean
	active?: boolean
}

export const RecipeCard: React.FC<IRecipeCardProps> = ({
	recipe,
	detailed,
	active,
}) => {
	const difficulty = recipe.difficulty

	return (
		<div
			className={`rounded-md overflow-hidden relative ${detailed ? "w-[200px]" : "w-[300px]"} h-auto ${active ? "opacity-100" : detailed ? "opacity-100" : "opacity-50"} bg-header duration-300 cursor-pointer`}
		>
			{(recipe.isVegan || recipe.isHealthy) && (
				<div className="absolute flex gap-2 top-2 right-2 rounded-full bg-white/50 p-2">
					{recipe.isVegan && (
						<Leaf
							size={24}
							color={"#000"}
							strokeWidth={1}
							fill={"#088500"}
						/>
					)}
					{recipe.isHealthy && (
						<HeartPulse
							size={24}
							color={"#000"}
							strokeWidth={1}
							fill={"rgb(255,0,0)"}
						/>
					)}
				</div>
			)}
			<div className="overflow-hidden">
				<Image
					src={recipe.image}
					alt={recipe.title}
					className="w-full aspect-auto"
					width={detailed ? 100 : 300}
					height={detailed ? 100 : 300}
				/>
			</div>
			<div className="p-4 flex flex-col gap-4">
				<h2
					className={`text-foreground ${detailed ? "text-lg" : "text-2xl"} font-extrabold`}
				>
					{recipe.title}
				</h2>
				{!detailed && recipe.category && (
					<div>
						<Category category={recipe.category} />
					</div>
				)}

				{!detailed && <Duration duration={recipe.duration} size={18} />}
				{!detailed && (
					<div className="flex gap-1">
						<DifficultyGauge difficulty={difficulty} />
					</div>
				)}
				<Link
					href={"/recipe/" + recipe.slug}
					className={`rounded ${detailed ? "border-none" : "border px-4 py-2"} border-foreground text-foreground font-medium flex gap-2 w-max duration-200`}
				>
					View recipe <ArrowRight />
				</Link>
			</div>
		</div>
	)
}
