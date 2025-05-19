describe('Visit sign-in page', () => {
    it('passes', () => {
      cy.visit('https://next-recipe-denzaiyy.vercel.app/sign-in')
  
      cy.url().should('include', '/sign-in')
  
      cy.contains('S\'identifier')
      cy.get('#identifier-field').type('denzaiyy@outlook.fr')
      cy.get('#identifier-field').should('have.value', 'denzaiyy@outlook.fr')
    })
  })