import { db } from "@/lib/db"
import { clerkClient, getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

type TArticleCommentProps = { params: Promise<{ slug: string }> }

export async function POST(req: NextRequest, { params }: TArticleCommentProps) {
	const { slug } = await params
	const { userId } = getAuth(req)

	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	}

	const client = await clerkClient()

	const user = await client.users.getUser(userId)

	const formData = await req.formData()
	const schema = z.string()

	const content = schema.parse(formData.get("content"))

	if (!content) {
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

		const comment = await db.commentArticle.create({
			data: {
				content,
				userId,
				userName: user.username, // Using the provided username
				avatarUrl: user.imageUrl,
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
