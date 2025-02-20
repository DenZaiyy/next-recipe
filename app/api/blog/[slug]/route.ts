import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

interface TArticleProps {
	params: Promise<{ slug: string }>
}

export async function GET(req: NextRequest, { params }: TArticleProps) {
	const { slug } = await params

	try {
		const article = await db.article.findUnique({
			where: { slug: slug },
			include: {
				tags: { include: { tag: true } },
				comments: { orderBy: { createdAt: "desc" } },
			},
		})

		//console.log('[RECIPE DETAIL] ', recipe);
		return NextResponse.json(article)
	} catch (err) {
		console.log("[ARTICLE DETAIL] ", err)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
