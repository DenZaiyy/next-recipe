import Image from "next/image"

interface TabsItemsCardProps {
	ingredientRecipe?: TIngredientRecipe
	toolRecipe?: TToolRecipe
}

export const RecipeTabsItemsCard = ({
	ingredientRecipe,
	toolRecipe,
}: TabsItemsCardProps) => {
	return (
		<div className="flex flex-col items-center gap-2">
			<Image
				src={
					ingredientRecipe
						? ingredientRecipe.ingredient.image
						: toolRecipe
							? toolRecipe.tool.image
							: ""
				}
				alt={
					ingredientRecipe
						? ingredientRecipe.ingredient.name
						: toolRecipe
							? toolRecipe.tool.name
							: "N/A"
				}
				width={100}
				height={100}
				className="rounded-lg w-[100px] h-[100px] md:h-[150px] md:w-[150px] object-fill"
			/>
			<h3 className="font-bold text-md md:text-xl text-center">
				{ingredientRecipe
					? ingredientRecipe.ingredient.name
					: toolRecipe
						? toolRecipe.tool.name
						: "N/A"}
			</h3>
			{ingredientRecipe && ingredientRecipe.quantity > 0 && (
				<p className="text-sm md:text-md text-gray-400 text-center">
					{ingredientRecipe.quantity} {ingredientRecipe.unit_measure}
				</p>
			)}
		</div>
	)
}
