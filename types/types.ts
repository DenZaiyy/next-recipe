interface TIngredient {
    id: string
    name: string;
    image: string
}

interface TStep {
    id: string
    stepNumber: number;
    content: string;
}

interface TComment {
    id: string;
    content: string;
    userId: string
    userName: string
    createdAt: Date;
    recipe: TRecipe;
}

interface TTag {
    id: string;
    name: string;
    recipes: TTagRecipe[];
}

interface TTool {
    id: string;
    name: string;
    image: string
    recipes: TToolRecipe[];
}

interface TCategory {
    id: string;
    name: string;
    recipes: TRecipe[];
}

interface TRecipe {
    id: string;
    title: string;
    image: string;
    instructions: string;
    duration: number;
    difficulty: number;
    slug: string;
    isVegan: boolean
    isHealthy: boolean
    createdAt: Date;
    updatedAt?: Date;
    ingredients: TIngredientRecipe[];
    tools: TToolRecipe[];
    steps: TStep[];
    category: TCategory;
    comments?: TComment[];
}

interface TTagRecipe {
    id: string;
    recipe: TRecipe;
    tag: TTag;
}

interface TToolRecipe {
    id: string;
    tool: TTool;
    recipe: TRecipe;
}

interface TIngredientRecipe {
    id: string
    recipe: TRecipe;
    ingredient: TIngredient;
    unit_measure: string;
    quantity: number
}