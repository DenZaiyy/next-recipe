"use client"

import React, { use, useEffect, useState } from "react"
import { fetchRecipe } from "@/hooks/recipe/fetchRecipe"
import { RecipeSuggestions } from "@/components/recipe/RecipeSuggestions"
import { RecipeComments } from "@/components/recipe/RecipeComments"
import { RecipeSteps } from "@/components/recipe/RecipeSteps"
import { RecipeTabs } from "@/components/recipe/RecipeTabs"
import { RecipeHeader } from "@/components/recipe/RecipeHeader"
import { RecipeInstructions } from "@/components/recipe/RecipeInstructions"

interface TRecipeProps {
	params: Promise<{ slug: string }>
}

const RecipeDetail = ({ params }: TRecipeProps) => {
	const { slug } = use(params)

	const [recipe, setRecipe] = useState<TRecipe>()

	useEffect(() => {
		const loadRecipe = async () => {
			try {
				const data = await fetchRecipe(slug)
				setRecipe(data)
			} catch (error) {
				console.error("[RECIPE DETAIL] ", error)
			}
		}

		loadRecipe()
	}, [slug])

	return (
		<div className={"flex flex-col gap-8 md:pt-4 md:px-12"}>
			{recipe && <RecipeHeader recipe={recipe} />}
			<div className="w-full flex flex-col md:flex-row gap-8">
				{recipe && recipe.instructions && (
					<RecipeInstructions instructions={recipe.instructions} />
				)}
				{recipe && (
					<RecipeTabs
						ingredients={recipe.ingredients}
						tools={recipe.tools}
					/>
				)}
			</div>
			{recipe && recipe.steps && <RecipeSteps steps={recipe.steps} />}
			{recipe && recipe.comments && (
				<RecipeComments
					comments={recipe.comments}
					recipeSlug={recipe.slug}
				/>
			)}
			{recipe && <RecipeSuggestions currentRecipe={recipe} />}
		</div>
	)
}

export default RecipeDetail
