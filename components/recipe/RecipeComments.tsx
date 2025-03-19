import { MessageSquareQuote } from "lucide-react"
import { Comment } from "@/components/Comment"
import { AddComment } from "@/components/AddComment"
import { useUser } from "@clerk/nextjs"

interface RecipeCommentsProps {
	comments: TCommentRecipe[]
	recipeSlug: string
}

export const RecipeComments = ({
	comments,
	recipeSlug,
}: RecipeCommentsProps) => {
	const { user, isSignedIn } = useUser()

	return (
		<div className="w-full flex flex-col gap-4 my-4">
			{comments.length > 0 && (
				<div>
					<h2>
						<MessageSquareQuote /> Comments
						<small>({comments.length})</small>
					</h2>
					<div className={"flex flex-col gap-2"}>
						{comments.map((comment) => (
							<Comment comment={comment} key={comment.id} />
						))}
					</div>
				</div>
			)}

			{(user || isSignedIn) && (
				<AddComment
					action={`/api/recipe/${recipeSlug}/comment`}
					redirect={`/recipe/${recipeSlug}`}
				/>
			)}
		</div>
	)
}
