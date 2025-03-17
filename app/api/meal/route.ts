import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

interface IMealPlanRecipes {
	mealType: string
	order: number
	recipeId: string
}

export async function POST(req: NextRequest) {
	const { userId } = getAuth(req)
	const { date, mealPlanRecipes } = await req.json()

	if (!userId || !date) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 },
		)
	}

	try {
		// D'abord, créer le MealPlan
		const mealPlan = await db.mealPlan.create({
			data: { date: new Date(date), userId: userId },
		})

		// Ensuite, créer les MealPlanRecipe associés
		if (mealPlanRecipes && mealPlanRecipes.length > 0) {
			await db.mealPlanRecipe.createMany({
				data: mealPlanRecipes.map((recipe: IMealPlanRecipes) => ({
					mealPlanId: mealPlan.id,
					recipeId: recipe.recipeId,
					mealType: recipe.mealType,
					order: recipe.order,
				})),
			})
		}

		return NextResponse.json(
			{ mealPlan, redirect: `/meal/user/${userId}` },
			{ status: 201 },
		)
	} catch (err) {
		if (err instanceof Error) {
			console.error("[MEALPLAN_CREATE] ", err.message)
		}
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		)
	}
}
