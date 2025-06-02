describe("Homepage to recipes page", () => {
	it("Home to recipe lists", () => {
		cy.visit("http://localhost:3000/")

		cy.contains("CI/CD avec CircleCI")
		cy.contains("Cypress")
		cy.get(".space-y-2").click()
		cy.get('nav section ul > [href="/recipe"]').click()
		cy.url().should("include", "recipe")
		cy.get("h1").contains("Latest Recipes")
		cy.get("h2").contains("Quiche de courge butternut et jambon")
	})
})

describe("Recipe detail", () => {
	it("Recipe detail", () => {
		cy.visit(
			"http://localhost:3000/recipe/quiche-de-courge-butternut-et-jambon/",
		)
		cy.get("h1").contains("Quiche de courge butternut et jambon")
		cy.get("h2").contains("Instructions")
		cy.get("h2").contains("Steps")
		cy.get("h2").contains("Nutritional Infos")
	})
})
