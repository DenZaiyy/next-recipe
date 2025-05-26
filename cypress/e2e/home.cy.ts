describe("Homepage to recipes page", () => {
	it("Home to recipe lists", () => {
		cy.visit("https://next-recipe-denzaiyy.vercel.app")

		cy.contains("CI/CD avec CircleCI")
		cy.contains("Cypress")

		cy.get('.flex > [href="/recipe"]').click({ force: true })
		cy.url().should("include", "recipe")
		cy.contains("Latest Recipes")
		cy.contains("Quiche de courge butternut et jambon")
	})
})

describe("Recipe detail", () => {
	it("Recipe detail", () => {
		cy.visit(
			"https://next-recipe-denzaiyy.vercel.app/recipe/quiche-de-courge-butternut-et-jambon/",
		)
		cy.contains("Quiche de courge butternut et jambon")
		cy.contains("Instructions")
		cy.contains("Steps")
		cy.contains("Nutritional Infos")
	})
})
