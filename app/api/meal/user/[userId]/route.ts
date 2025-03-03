import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

interface TMealProps {
	params: Promise<{ userId: string }>
}

export async function GET(req: NextRequest, { params }: TMealProps) {
	const { userId } = await params

	try {
		const meals = await db.mealPlan.findMany({ where: { userId: userId } })

		//console.log('[RECIPE DETAIL] ', recipe);
		return NextResponse.json(meals)
	} catch (err) {
		console.log("[RECIPE DETAIL] ", err)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
