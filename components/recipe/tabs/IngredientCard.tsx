import Image from "next/image"

interface IngredientCardProps {
	ingredientRecipe: TIngredientRecipe
}

export const IngredientCard = ({ ingredientRecipe }: IngredientCardProps) => {
	return (
		<div>
			<Image
				src={ingredientRecipe.ingredient.image}
				alt={ingredientRecipe.ingredient.name}
				width={100}
				height={100}
				className="rounded-lg w-[100px] h-[100px] md:h-[150px] md:w-[150px] object-fill"
			/>
			<h3 className="font-bold text-md md:text-xl text-center">
				{ingredientRecipe.ingredient.name}
			</h3>
			<p className="text-sm md:text-md text-gray-400 text-center">
				{ingredientRecipe.quantity} {ingredientRecipe.unit_measure}
			</p>
		</div>
	)
}
