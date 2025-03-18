import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

interface TMealPlanRecipeProps {
	params: Promise<{
		mealPlanId: string
		userId: string
		mealPlanRecipeId: string
	}>
}

export async function DELETE(
	req: NextRequest,
	{ params }: TMealPlanRecipeProps,
) {
	const { userId, mealPlanId, mealPlanRecipeId } = await params

	if (!userId || !mealPlanId || !mealPlanRecipeId) {
		return new NextResponse("Missing required fields", { status: 400 })
	}

	try {
		const mealPlan = await db.mealPlan.findUnique({
			where: { id: mealPlanId, userId: userId },
		})

		if (!mealPlan) {
			return new NextResponse("MealPlan not found", { status: 404 })
		}

		if (mealPlan.userId !== userId) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		await db.mealPlanRecipe.delete({ where: { id: mealPlanRecipeId } })

		return new NextResponse("mealPlanRecipe deleted successfully", {
			status: 200,
		})
	} catch (err) {
		if (err instanceof Error)
			console.log("[MEAL_PLAN_RECIPE DELETE] ", err.message)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
