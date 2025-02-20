"use client"

import { useUser } from "@clerk/nextjs"
import { MessageSquareQuote } from "lucide-react"
import React, { useState } from "react"

interface TAddCommentProps {
	action: string
}

export const AddComment: React.FC<TAddCommentProps> = ({ action }) => {
	const [message, setMessage] = useState("")
	const { user } = useUser()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		try {
			const response = await fetch(`${action}`, {
				method: "POST",
				body: formData,
			})

			const data = await response.json()
			setMessage(data.message)
		} catch (err) {
			setMessage(`Error: ${err.message}`)
		}
	}

	return (
		<div>
			<h2>
				<MessageSquareQuote /> Add a comment
			</h2>
			<form onSubmit={handleSubmit} method="post">
				<div className="flex gap-4">
					<textarea
						className="border border-slate-600/50 bg-header text-foreground focus:outline-none rounded-md w-full p-2"
						draggable={false}
						placeholder="Write your comment here..."
						name="content"
						id="content"
					/>
					{user && (
						<div>
							<input
								type="hidden"
								name="userId"
								id="userId"
								value={user?.id}
							/>
							<input
								type="hidden"
								name="username"
								id="username"
								value={user.username}
							/>
						</div>
					)}
					<button
						className="text-foreground text-sm font-medium rounded-md bg-secondary px-4 py-2"
						type="submit"
					>
						Publish
					</button>
					{message && <p>{message}</p>}
				</div>
			</form>
		</div>
	)
}
