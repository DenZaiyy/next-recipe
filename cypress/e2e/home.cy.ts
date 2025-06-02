describe("Homepage to recipes page", () => {
	it("Home to recipe lists", () => {
		cy.visit("/")

		cy.contains("CI/CD avec CircleCI")
		cy.contains("Cypress")

		cy.get(".space-y-2").click()
		cy.get('.flex > [href="/recipe"]').click()
		cy.url().should("include", "recipe")
		cy.contains("Latest Recipes")
		cy.contains("Quiche de courge butternut et jambon")
	})
})

describe("Recipe detail", () => {
	it("Recipe detail", () => {
		cy.visit("/recipe/quiche-de-courge-butternut-et-jambon/")
		cy.contains("Quiche de courge butternut et jambon")
		cy.contains("Instructions")
		cy.contains("Steps")
		cy.contains("Nutritional Infos")
	})
})
