import Image from "next/image"
import { Download, Heart } from "lucide-react"
import { Category } from "@/components/Category"
import { Duration } from "@/components/Duration"
import { DifficultyGauge } from "@/components/DifficultyGauge"
import { useFavorites } from "@/hooks/recipe/useFavorites"

interface RecipeHeaderProps {
	recipe: TRecipe
}

export const RecipeHeader = ({ recipe }: RecipeHeaderProps) => {
	const { toggleFavorite, isFavorite } = useFavorites()

	return (
		<div className="w-full rounded-lg bg-header md:h-[400px] flex flex-col md:flex-row md:justify-between">
			<div className="flex flex-col p-4 w-full md:w-1/2 items-center justify-center gap-4">
				<h1 className="text-2xl md:text-4xl font-bold">
					{recipe.title}
				</h1>

				<div className="flex gap-4 items-center">
					{recipe.category && (
						<div>
							<Category
								category={recipe.category}
								size="text-lg"
							/>
						</div>
					)}

					{recipe.duration && (
						<div>
							<Duration
								duration={recipe.duration}
								size={24}
								textSize="text-lg"
							/>
						</div>
					)}

					{recipe.difficulty && (
						<div className="flex">
							<DifficultyGauge difficulty={recipe.difficulty} />
						</div>
					)}
				</div>

				<div className="flex gap-2">
					<button className="text-white text-sm font-medium flex gap-2 items-center rounded-full bg-secondary px-4 py-2 group">
						<Download className="group-hover:scale-110 duration-200" />
						Download
					</button>

					<button
						className="text-white text-sm font-medium flex gap-2 items-center rounded-full bg-secondary px-4 py-2 group duration-300"
						onClick={() => toggleFavorite(recipe)}
					>
						<Heart
							fill={isFavorite(recipe.id) ? "red" : "none"}
							className="group-hover:scale-110 duration-200"
						/>
						Favorite
					</button>
				</div>
			</div>

			{recipe.image && (
				<div className="md:w-1/2 h-full">
					<Image
						src={recipe.image}
						alt={recipe.title}
						width={300}
						height={300}
						className="h-full w-full object-cover rounded-lg"
					/>
				</div>
			)}
		</div>
	)
}
