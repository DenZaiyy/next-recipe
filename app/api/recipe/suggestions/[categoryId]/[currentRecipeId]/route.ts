import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

interface TSuggestProps {
	params: Promise<{ categoryId: string; currentRecipeId: string }>
}

export async function GET(req: NextRequest, { params }: TSuggestProps) {
	const { categoryId, currentRecipeId } = await params

	try {
		// Fetch the total number of available recipes in this category, excluding the current one
		const availableRecipesCount = await db.recipe.count({
			where: { categoryId: categoryId, NOT: { id: currentRecipeId } },
		})

		// Determine how many recipes we can take. If there are fewer than 3 available, take what's available
		const numberOfRecipesToFetch = Math.min(3, availableRecipesCount)

		// If there are no recipes to suggest, return an empty array
		if (numberOfRecipesToFetch === 0) {
			return NextResponse.json([])
		}

		// Randomly skip recipes if more than 1 recipe is available
		const skipValue =
			availableRecipesCount > 1
				? Math.floor(
						Math.random() *
							(availableRecipesCount - numberOfRecipesToFetch),
					)
				: 0

		const suggestions = await db.recipe.findMany({
			take: numberOfRecipesToFetch,
			skip: skipValue,
			where: { categoryId: categoryId, NOT: { id: currentRecipeId } },
			include: { category: true },
		})

		//console.log("[SUGGESTIONS] ", suggestions)
		return NextResponse.json(suggestions)
	} catch (err) {
		console.log("[SUGGESTIONS] ", err)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
