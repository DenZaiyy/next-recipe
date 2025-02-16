interface TUser {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
}

interface TIngredient {
    id: string
    name: string;
    image: string
    unit_measure: string;
    quantity: number
    //recipe: TRecipe;
}

interface TStep {
    id: string
    stepNumber: number;
    content: string;
}

interface TComment {
    id: string;
    content: string;
    user: TUser;
    createdAt: Date;
    //recipe: TRecipe;
}

interface TTag {
    id: string;
    name: string;
    //recipes: TTagRecipe[];
}

interface TTool {
    id: string;
    name: string;
    image: string
    //recipes: TToolRecipe[];
}

interface TCategory {
    id: string;
    name: string;
    //recipes: TRecipe[];
}

interface TRecipe {
    id: string;
    title: string;
    image: string;
    instructions: string;
    duration: number;
    difficulty: number;
    slug: string;
    ingredients: TIngredient[];
    tools: TTool[];
    steps: TStep[];
    tags: TTag[];
    category: TCategory;
    comments?: TComment[];
    createdAt: Date;
}

interface TCategoryRecipe {
    id: string;
    category: TCategory;
    recipe: TRecipe;
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
