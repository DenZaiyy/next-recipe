interface TIngredient {
	id: string
	name: string
	image: string
}

interface TStep {
	id: string
	stepNumber: number
	content: string
}

interface TUser {
	id: string
	email: string
	image: string
	username: string
	createdAt: Date
}

interface TArticle {
	id: string
	title: string
	content: string
	tags: TTagArticle[]
	image?: string
	slug: string
	user: TUser
	createdAt: Date
	updatedAt?: Date
	comments?: TCommentArticle[]
}

interface TCommentRecipe {
	id: string
	content: string
	userId?: string
	userName?: string
	avatarUrl?: string
	createdAt: Date
	updatedAt?: Date
	article?: TArticle
}

interface TCommentArticle {
	id: string
	content: string
	userId?: string
	userName?: string
	avatarUrl?: string
	createdAt: Date
	updatedAt?: Date
	article?: TArticle
}

/* interface TRecipeComment extends TComment {
	recipe: TRecipe
}

interface TArticleComment extends TComment {
	article: TArticle
} */

interface TTag {
	id: string
	name: string
	recipes: TTagRecipe[]
}

interface TTool {
	id: string
	name: string
	image: string
	recipes: TToolRecipe[]
}

interface TCategory {
	id: string
	name: string
	recipes: TRecipe[]
}

interface TRecipe {
	id: string
	title: string
	image: string
	instructions: string
	duration: number
	difficulty: number
	slug: string
	isVegan: boolean
	isHealthy: boolean
	createdAt: Date
	updatedAt?: Date
	ingredients: TIngredientRecipe[]
	tools: TToolRecipe[]
	steps: TStep[]
	category: TCategory
	comments?: TCommentRecipe[]
	mealPlan?: TMealPlan[]
}

interface TMealPlan {
	id: string
	date: Date
	userId: string
	createdAt: Date
	updatedAt?: Date
	mealPlanRecipes: TMealPlanRecipe[]
}

interface TMealPlanRecipe {
	id: string
	mealPlan: TMealPlan
	recipe: TRecipe
	mealType: string
	order: number
}

interface TTagRecipe {
	id: string
	recipe: TRecipe
	tag: TTag
}

interface TTagArticle {
	id: string
	article: TArticle
	tag: TTag
}

interface TToolRecipe {
	id: string
	tool: TTool
	recipe: TRecipe
}

interface TIngredientRecipe {
	id: string
	recipe: TRecipe
	ingredient: TIngredient
	unit_measure: string
	quantity: number
}

interface IMealPlanRecipes {
	mealType: string
	order: number
	recipeId: string
}
