describe("Visit sign-in page", () => {
	it("passes", () => {
		cy.visit("https://next-recipe-denzaiyy.vercel.app/sign-in")

		cy.url().should("include", "/sign-in")

		cy.contains("S'identifier")
		cy.get("#identifier-field").type("test@example.com")
		cy.get("#identifier-field").should("have.value", "test@example.com")
		cy.get(".cl-formButtonPrimary").click({ force: true })
		cy.url().should("include", "/sign-in/factor-one")
		cy.contains("Tapez votre mot de passe")
		cy.get("#password-field").type("Test12368!")
		cy.get("#password-field").should("have.value", "Test12368!")
		cy.get(".cl-formButtonPrimary").click({ force: true })
		cy.url().should("include", "/")
		cy.contains("Functionalities")
	})
})
