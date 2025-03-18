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
			include: {
				mealPlanRecipes: {
					include: { recipe: { include: { category: true } } },
				},
			},
			orderBy: { date: "asc" },
		})

		//console.log("[MEALPLAN DETAIL] ", meals)
		return NextResponse.json(meals)
	} catch (err) {
		if (err instanceof Error) console.log("[MEALPLAN DETAIL] ", err.message)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
