import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

interface TMealPlanIdProps {
	params: Promise<{ mealPlanId: string; userId: string }>
}

export async function DELETE(req: NextRequest, { params }: TMealPlanIdProps) {
	const { userId } = await auth()
	const { mealPlanId } = await params

	try {
		// check if comment are create by connected user before deleting
		const mealplan = await db.mealPlan.findUnique({
			where: { id: mealPlanId },
		})

		if (!mealplan) {
			return new NextResponse("MealPlan not found", { status: 404 })
		}

		if (mealplan.userId !== userId) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		await db.mealPlan.delete({ where: { id: mealPlanId } })

		return new NextResponse("Comment deleted successfully", { status: 200 })
	} catch (err) {
		if (err instanceof Error) console.log("[MEALPLAN DELETE] ", err.message)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
