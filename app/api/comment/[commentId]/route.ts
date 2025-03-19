import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

interface TCommentIdProps {
	params: Promise<{ commentId: string; userId: string }>
}

export async function DELETE(req: NextRequest, { params }: TCommentIdProps) {
	const { userId } = await auth()
	const { commentId } = await params

	try {
		// check if comment are create by connected user before deleting
		const commentRecipe = await db.commentRecipe.findUnique({
			where: { id: commentId },
		})

		const commentArticle = await db.commentArticle.findUnique({
			where: { id: commentId },
		})

		const comment = commentRecipe || commentArticle

		if (!comment) {
			return new NextResponse("Comment not found", { status: 404 })
		}

		if (comment.userId !== userId) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		if (commentRecipe) {
			await db.commentRecipe.delete({ where: { id: commentId } })
		} else {
			await db.commentArticle.delete({ where: { id: commentId } })
		}

		return new NextResponse("Comment deleted successfully", { status: 200 })
	} catch (err) {
		console.log("[COMMENT DELETE] ", err)
		return new NextResponse("Internal Error", { status: 500 })
	}
}
