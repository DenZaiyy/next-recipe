import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const categories = await db.category.findMany()

		return NextResponse.json(categories)
	} catch (err) {
		if (err instanceof Error) {
			console.log("[CATEGORIES] ", err.message)
		}
		return new NextResponse("Internal Error", { status: 500 })
	}
}
