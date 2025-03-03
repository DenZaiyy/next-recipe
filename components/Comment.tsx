import React from "react"
import { CircleUser, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"

interface ICommentProps {
	comment: TComment
}

export const Comment: React.FC<ICommentProps> = ({ comment }) => {
	const { user } = useUser()

	const handleDelete = () => {
		if (
			comment.article &&
			confirm(
				"Êtes-vous sûr de vouloir supprimer ce commentaire du blog?",
			)
		) {
			console.log("test article reponse")
		}
		if (
			comment.recipe &&
			confirm(
				"Êtes-vous sûr de vouloir supprimer ce commentaire de la recette?",
			)
		) {
			console.log("test recette reponse")
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
						onClick={() => handleDelete}
					>
						<Trash2 size={20} /> Delete
					</button>
				</div>
			)}
			<div className={"flex flex-col text-foreground"}>
				<div className={"flex gap-2 items-center capitalize"}>
					<CircleUser stroke={"rgba(228, 106, 88, 0.7)"} />
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
