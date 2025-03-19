"use client"

import { MessageSquareQuote } from "lucide-react"
import React, { useState } from "react"

interface TAddCommentProps {
	action: string
	redirect: string
}

export const AddComment: React.FC<TAddCommentProps> = ({
	action,
	redirect,
}) => {
	const [message, setMessage] = useState("")

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		try {
			const response = await fetch(`${action}`, {
				method: "POST",
				body: formData,
			})

			const data = await response.json()
			if (data.redirect) {
				window.location.href = redirect
			}
			setMessage(data.message)
		} catch (err) {
			if (err instanceof Error) {
				setMessage(`Error: ${err.message}`)
			}
		}
	}

	return (
		<div>
			<h2>
				<MessageSquareQuote /> Add a comment
			</h2>
			<form
				onSubmit={handleSubmit}
				method="post"
				className="flex flex-col gap-4"
			>
				{message && <p>{message}</p>}
				<div className="flex gap-4">
					<textarea
						className="border border-slate-600/50 bg-header text-foreground focus:outline-none rounded-md w-full p-2"
						draggable={false}
						placeholder="Write your comment here..."
						name="content"
						id="content"
					/>
					<button
						className="text-foreground text-sm font-medium rounded-md bg-secondary px-4 py-2"
						type="submit"
					>
						Publish
					</button>
				</div>
			</form>
		</div>
	)
}
