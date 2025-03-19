import React from "react"
import { CircleUser, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { apiBlogService } from "@/services/blogService"
import { apiRecipeService } from "@/services/recipeService"

interface ICommentProps {
	comment: TComment
}

export const Comment: React.FC<ICommentProps> = ({ comment }) => {
	const { user } = useUser()

	console.log(user)

	const handleDelete = async () => {
		const isConfirmed = confirm(
			"Êtes-vous sûr de vouloir supprimer ce commentaire ?",
		)

		if (!isConfirmed) return

		//check if the comment is from an article or a recipe
		if (comment.recipe) {
			await apiRecipeService.deleteComment(
				comment.recipe.slug,
				comment.id,
			)
		} else {
			await apiBlogService.deleteComment(comment.article.slug, comment.id)
		}
	}

	return (
		<div
			className={
				"p-6 shadow-sm border border-gray-600 bg-header relative rounded-md"
			}
		>
			{comment.userId === user?.id && (
				<div
					className={"absolute top-[50%] translate-y-[-50%] right-4"}
				>
					<button
						className={
							"flex gap-2 p-2 text-sm items-center text-white font-bold bg-red-600 rounded-md"
						}
						onClick={handleDelete}
					>
						<Trash2 size={20} /> Delete
					</button>
				</div>
			)}
			<div className={"flex flex-col text-foreground"}>
				<div className={"flex gap-2 items-center capitalize"}>
					{user && user.imageUrl ? (
						<Image
							src={user.imageUrl}
							width={30}
							height={30}
							alt={`avatar of ${comment.userName}`}
							className="rounded-full border border-gray-600"
						/>
					) : (
						<CircleUser stroke={"rgba(228, 106, 88, 0.7)"} />
					)}
					{comment.userName} (<small>{comment.userId}</small>)
				</div>
				<div className={"text-foreground/50 text-sm"}>
					{formatDate(comment.createdAt)}
				</div>
				<p className={"text-foreground text-lg"}>{comment.content}</p>
			</div>
		</div>
	)
}
