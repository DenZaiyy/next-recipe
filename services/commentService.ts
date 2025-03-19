import { redirect } from "next/navigation"

export interface CommentService {
	deleteComment: (commentId: string) => Promise<void>
}

export const apiCommentService: CommentService = {
	deleteComment: async (commentId: string): Promise<void> => {
		const res = await fetch(`/api/comment/${commentId}`, {
			method: "DELETE",
			cache: "no-store",
		})

		if (!res.ok) redirect("/")
		return
	},
}
