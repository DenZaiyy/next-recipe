"use client"

import React, { use, useEffect, useState } from "react"
import { formatDate } from "@/lib/utils"
import { MessageSquareQuote, NotebookText } from "lucide-react"
import { Comment } from "@/components/Comment"
import { AddComment } from "@/components/AddComment"
import { useUser } from "@clerk/nextjs"
import { apiBlogService } from "@/services/blogService"

interface IArticleDetailProps {
	params: Promise<{ slug: string }>
}

const ArticleDetail = ({ params }: IArticleDetailProps) => {
	const { slug } = use(params)

	const [article, setArticle] = useState<TArticle>()

	const { user, isSignedIn } = useUser()

	useEffect(() => {
		const loadArticle = async () => {
			try {
				const data = await apiBlogService.getArticle(slug)
				setArticle(data)
			} catch (error) {
				console.error("[RECIPE DETAIL] ", error)
			}
		}

		loadArticle()
	}, [slug])

	return (
		<>
			{article && (
				<div className={"py-8 px-16 flex flex-col gap-16"}>
					<div className=" mx-auto min-h-[400px] w-full flex flex-col items-center justify-center gap-4">
						{article.tags && article.tags.length > 0 && (
							<div className="flex gap-2">
								{article.tags.map((tag) => (
									<span
										key={tag.tag.id}
										className="block py-2 px-4 rounded-full bg-secondary text-sm"
									>
										{tag.tag.name}
									</span>
								))}
							</div>
						)}
						<h1 className="text-4xl text-foreground font-bold mb-4">
							{article.title}
						</h1>
						<p>{formatDate(article.createdAt)}</p>
					</div>

					<div className="w-3/4 mx-auto">
						<h2>
							<NotebookText />
							Introduction
						</h2>
						<p className="text-justify">{article.content}</p>
					</div>

					<div className="w-3/4 mx-auto">
						<h2>
							<MessageSquareQuote /> Comments{" "}
							<small>
								({article.comments && article.comments.length})
							</small>
						</h2>
						<div className="flex flex-col gap-2">
							{article.comments &&
								article.comments.map((comment, index) => (
									<Comment key={index} comment={comment} />
								))}
						</div>
					</div>

					<div className="w-3/4 mx-auto">
						{(user || isSignedIn) && (
							<AddComment
								action={`/api/blog/${article?.slug}/comment`}
							/>
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default ArticleDetail
