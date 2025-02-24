import { db } from "@/lib/db"
import { redirect } from "next/dist/server/api-utils"
import { NextResponse } from "next/server"
import { z } from "zod"

type TArticleCommentProps = { params: Promise<{ slug: string }> }

export async function POST(req: Request, { params }: TArticleCommentProps) {
	const { slug } = await params
	const formData = await req.formData()
	const schema = z.string()

	const userId = schema.parse(formData.get("userId"))
	const content = schema.parse(formData.get("content"))
	const username = schema.parse(formData.get("username"))

	if (!userId || !content || !username) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 },
		)
	}

	try {
		const article = await db.article.findUnique({ where: { slug } })

		if (!article) {
			return NextResponse.json(
				{ error: "Article not found" },
				{ status: 404 },
			)
		}

		const comment = await db.comment.create({
			data: {
				content,
				userId,
				userName: username, // Using the provided username
				article: { connect: { id: article.id } },
			},
		})

		return NextResponse.json(
			{ comment, redirect: `/blog/${slug}` },
			{ status: 201 },
		)
	} catch (err) {
		console.error("[ARTICLE_COMMENT_CREATE]", err)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		)
	}
}
