import React from "react"
import { CircleUser, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { apiCommentService } from "@/services/commentService"

interface ICommentProps {
	comment: TCommentRecipe | TCommentArticle
}

export const Comment: React.FC<ICommentProps> = ({ comment }) => {
	const { user } = useUser()

	const handleDelete = async () => {
		const isConfirmed = confirm(
			"Êtes-vous sûr de vouloir supprimer ce commentaire ?",
		)

		if (!isConfirmed) return

		//check if the comment is from an article or a recipe
		await apiCommentService.deleteComment(comment.id)
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
				<div className={"flex gap-2 capitalize"}>
					{comment.avatarUrl ? (
						<Image
							src={comment.avatarUrl}
							width={30}
							height={30}
							alt={`avatar of ${comment.userName}`}
							className="rounded-full border border-gray-600 w-[25px] h-[25px]"
						/>
					) : (
						<CircleUser stroke={"rgba(228, 106, 88, 0.7)"} />
					)}
					{comment.userName}
				</div>
				<div className={"text-foreground/50 text-sm"}>
					{formatDate(comment.createdAt)}
				</div>
				<p className={"text-foreground text-lg"}>{comment.content}</p>
			</div>
		</div>
	)
}
