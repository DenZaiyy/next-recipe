import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const articles = await db.article.findMany({
			where: { published: true },
			include: {
				tags: { include: { tag: true } },
				comments: { orderBy: { createdAt: "desc" } },
			},
		})

		return NextResponse.json(articles)
	} catch (err) {
		console.log("[ARTICLES] ", err)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
