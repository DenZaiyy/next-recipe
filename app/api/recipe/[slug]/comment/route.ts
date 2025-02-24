import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

type TRecipeCommentProps = { params: Promise<{ slug: string }> }

export async function POST(req: Request, { params }: TRecipeCommentProps) {
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
		const recipe = await db.recipe.findUnique({ where: { slug } })

		if (!recipe) {
			return NextResponse.json(
				{ error: "Recipe not found" },
				{ status: 404 },
			)
		}

		const comment = await db.comment.create({
			data: {
				content,
				userId,
				userName: username, // Using the provided username
				recipe: { connect: { id: recipe.id } },
			},
		})

		return NextResponse.json(
			{ comment, redirect: `/recipe/${slug}` },
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
