describe("Page de connexion", () => {
	it("Connexion réussie avec identifiants valides", () => {
		cy.visit("http://localhost:3000/sign-in")
		cy.get("#identifier-field").type("test@example.com")
		cy.get(".cl-formButtonPrimary").click()
		cy.get("#password-field").type("Test12368!")
		cy.get(".cl-formButtonPrimary").click()
		cy.url().should("include", "/")
	})
})
