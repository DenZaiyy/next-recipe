import React from "react"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

interface IArticleProps {
	article: TArticle
	linkTo: string
}

export const Article: React.FC<IArticleProps> = ({ article, linkTo }) => {
	return (
		<div className={"border border-foreground/50 p-4 rounded-md"}>
			<h3 className={"capitalize font-bold text-2xl"}>{article.title}</h3>
			<small className={"text-foreground/50 text-xs"}>
				{formatDate(article.createdAt)}
			</small>
			<div className="flex gap-2 mt-6">
				{article.tags.map((tag) => (
					<span
						key={tag.tag.id}
						className="block py-2 px-4 rounded-full bg-secondary text-sm"
					>
						{tag.tag.name}
					</span>
				))}
			</div>
			<p className={"mt-4 text-foreground text-sm line-clamp-5"}>
				{article.content}
			</p>
			<Link
				href={linkTo}
				className={
					"text-secondary text-normal font-medium my-4 block hover:underline duration-300"
				}
			>
				Read more...
			</Link>
		</div>
	)
}
