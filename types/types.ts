interface TUser {
    id: string
    username: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
}

interface TIngredient {
    name: string,
    unit_measure: string,
    recipe: TRecipe
}

interface TComment {
    id: string
    content: string
    userId: string
    createdAt: Date
    recipe: TRecipe
}

interface TTag {
    id: string
    name: string
    recipes: TTagRecipe[]
}

interface TTool {
    id: string
    name: string
    recipes: TToolRecipe[]
}

interface TCategory {
    id: string
    name: string
    recipes: TCategoryRecipe[]
}

interface TRecipe  {
    id: string
    title: string
    image: string
    instructions: string
    duration: number
    slug: string
    ingredients: TIngredient[]
    comments: TComment[]
    tags: TTag[]
    tools: TTool[]
    categories: TCategory[]
    createdAt: Date
}

interface TCategoryRecipe {
    id: string
    category: TCategory
    recipe: TRecipe
}

interface TTagRecipe {
    id: string
    recipe: TRecipe
    tag: TTag
}

interface TToolRecipe {
    id: string
    tool: TTool
    recipe: TRecipe
}