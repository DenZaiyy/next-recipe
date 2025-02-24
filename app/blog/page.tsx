import { Article } from "@/components/Article"
import { apiBlogService } from "@/services/blogService"

const BlogHome = async () => {
	const articles = await apiBlogService.getArticles()

	return (
		<div className={"px-8"}>
			<h1 className="text-4xl text-foreground font-bold mb-4">Blog</h1>
			<div className={"grid lg:grid-cols-3 gap-2"}>
				{articles && articles.length > 0 ? (
					articles.map((article) => (
						<Article
							key={article.id}
							article={article}
							linkTo={`/blog/${article.slug}`}
						/>
					))
				) : (
					<p>There is no article</p>
				)}
			</div>
		</div>
	)
}

export default BlogHome
