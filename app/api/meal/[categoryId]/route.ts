import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

interface TMealProps {
	params: Promise<{ categoryId: string }>
}

export async function GET(req: NextRequest, { params }: TMealProps) {
	const { categoryId } = await params

	try {
		const meals = await db.recipe.findMany({
			where: { categoryId: categoryId },
			include: { category: true },
		})

		//console.log("[MEAL CATEGORY] ", meals)
		return NextResponse.json(meals)
	} catch (err) {
		console.log("[MEAL CATEGORY] ", err)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
