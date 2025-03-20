import { db } from "@/lib/db"
import { clerkClient, getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

type TRecipeCommentProps = { params: Promise<{ slug: string }> }

export async function POST(req: NextRequest, { params }: TRecipeCommentProps) {
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
		const recipe = await db.recipe.findUnique({ where: { slug } })

		if (!recipe) {
			return NextResponse.json(
				{ error: "Recipe not found" },
				{ status: 404 },
			)
		}

		const comment = await db.commentRecipe.create({
			data: {
				content,
				userId,
				userName: user.username, // Using the provided username
				avatarUrl: user.imageUrl,
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
