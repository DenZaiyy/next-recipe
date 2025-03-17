import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

interface TMealProps {
	params: Promise<{ userId: string }>
}

export async function GET(req: NextRequest, { params }: TMealProps) {
	const { userId } = await params

	try {
		const meals = await db.mealPlan.findMany({
			where: { userId: userId },
			include: { mealPlanRecipes: { include: { recipe: true } } },
		})

		//console.log("[MEALPLAN DETAIL] ", meals)
		return NextResponse.json(meals)
	} catch (err) {
		console.log("[MEALPLAN DETAIL] ", err)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
