export const recipes: TRecipe[] = [
    {
        id: "1",
        title: "Caramel Peanut Fudge Cake",
        image: "https://img.spoonacular.com/recipes/637016-556x370.jpg",
        instructions: "Caramel Peanut Fudge Cake might be just the dessert you are searching for. One portion of this dish contains approximately 16g of protein, 35g of fat, and a total of 459 calories. This recipe serves 10. For $1.24 per serving, this recipe covers 23% of your daily requirements of vitamins and minerals. From preparation to the plate, this recipe takes about 45 minutes. 84 people were glad they tried this recipe. If you have almonds, sugar, cream, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. It is a good option if you're following a gluten free and lacto ovo vegetarian diet. Taking all factors into account, this recipe earns a spoonacular score of 74%, which is solid.",
        duration: 45,
        difficulty: 2,
        slug: "caramel-peanut-fudge-cake",
        ingredients: [
            { id: "1", name: "Almonds", image: "https://spoonacular.com/cdn/ingredients_100x100/almonds.jpg", unit_measure: "g", quantity: 100 },
            { id: "2", name: "Cocoa", image: "https://spoonacular.com/cdn/ingredients_100x100/cocoa-powder.png", unit_measure: "g", quantity: 25 },
            { id: "3", name: "Cream", image: "https://spoonacular.com/cdn/ingredients_100x100/fluid-cream.jpg", unit_measure: "ml", quantity: 500 },
        ],
        tags: [
            { id: "1", name: "Vegetarian" },
            { id: "2", name: "Gluten Free" },
            { id: "3", name: "Dairy Free" },
        ],
        tools: [
            { id: "1", name: "Baking paper", image: "https://spoonacular.com/cdn/equipment_100x100/baking-paper.jpg" },
            { id: "2", name: "Toothpicks", image: "https://spoonacular.com/cdn/equipment_100x100/toothpicks.jpg" },
            { id: "3", name: "Oven", image: "https://spoonacular.com/cdn/equipment_100x100/oven.jpg" },
            { id: "4", name: "Whisk", image: "https://spoonacular.com/cdn/equipment_100x100/whisk.png" },
            { id: "5", name: "Bowl", image: "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg" },
        ],
        steps: [
            { id: "1", stepNumber: 1, content: "Preheat the oven to 350°F (175°C)." },
            { id: "2", stepNumber: 2, content: "In a bowl, combine the almond meal, cocoa, and cream." },
            { id: "3", stepNumber: 3, content: "Spread the mixture evenly onto a baking sheet." },
            { id: "4", stepNumber: 4, content: "Bake for 25 minutes, or until the cake is set." },
            { id: "5", stepNumber: 5, content: "Allow the cake to cool completely before slicing and serving." },
        ],
        category: { id: "1", name: "Starter" },
        comments: [
            {
                id: "1",
                content: "This is a comment",
                user: { id: "1", username: "johndoe", email: "BkPdM@example.com", password: "123456", createdAt: new Date() },
                createdAt: new Date(),
            },
            {
                id: "2",
                content: "Test comment longest ",
                user: { id: "2", username: "denzaiyy", email: "k.grischko@gmail.com", password: "123456", createdAt: new Date() },
                createdAt: new Date(),
            }
        ],
        createdAt: new Date(),
    },
    {
        id: "2",
        title: "Easy Tabouleh",
        image: "https://img.spoonacular.com/recipes/642121-312x231.jpg",
        instructions: "If you want to add more dairy free, lacto ovo vegetarian, and vegan recipes to your recipe box, Easy Tabouleh might be a recipe you should try. This main course has 717 calories, 14g of protein, and 44g of fat per serving. This recipe serves 1 and costs $4.64 per serving. From preparation to the plate, this recipe takes around 45 minutes. 2 people were impressed by this recipe. It is a pretty expensive recipe for fans of middl eastern food. This recipe from Foodista requires bulgur, olive oil, flat leaf parsley, and salt. Taking all factors into account, this recipe earns a spoonacular score of 93%, which is spectacular.",
        duration: 45,
        difficulty: 3,
        slug: "easy-tabouleh",
        ingredients: [
            { id: "1", name: "Bulgur", image: "https://spoonacular.com/cdn/ingredients_100x100/bulgur-wheat.jpg", unit_measure: "g", quantity: 70 },
            { id: "2", name: "Cucumbers", image: "https://spoonacular.com/cdn/ingredients_100x100/cucumber.jpg", unit_measure: "small", quantity: 2 },
            { id: "3", name: "Flat leaf parsley", image: "https://spoonacular.com/cdn/ingredients_100x100/parsley.jpg", unit_measure: "bunch", quantity: 1 },
            { id: "4", name: "Lemon juice", image: "https://spoonacular.com/cdn/ingredients_100x100/lemon-juice.jpg", unit_measure: "", quantity: 0.5 },
            { id: "5", name: "Olive oil", image: "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg", unit_measure: "Tbsps", quantity: 3 },
            { id: "6", name: "Salt", image: "https://spoonacular.com/cdn/ingredients_100x100/salt.jpg", unit_measure: "serving", quantity: 1 },
            { id: "7", name: "Tomato", image: "https://spoonacular.com/cdn/ingredients_100x100/tomato.png", unit_measure: "medium", quantity: 2 },
        ],
        tags: [
            { id: "1", name: "Vegetarian" },
            { id: "3", name: "Dairy Free" },
            { id: "4", name: "Vegan" },
            { id: "5", name: "Very Healthy"}
        ],
        tools: [
            { id: "1", name: "Sieve", image: "https://spoonacular.com/cdn/equipment_100x100/strainer.png" },
            { id: "2", name: "Bowl", image: "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg" },
        ],
        steps: [
            { id: "1", stepNumber: 1, content: "Chop the vegetables and parsley finely. The restaurant version has the veggies diced fairly small and I wanted to stay true to that.Rinse the cracked wheat in a fine mesh sieve and let drain." },
            { id: "2", stepNumber: 2, content: "Combine all ingredients in a large bowl." },
        ],
        category: { id: "2", name: "Main" },
        createdAt: new Date(),
    },

]