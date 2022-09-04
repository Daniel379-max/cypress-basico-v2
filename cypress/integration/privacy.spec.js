Cypress._.times(3, () => {
    it('testa aa pagina independente', () => {
        cy.visit('/src/privacy.html')

        cy.contains('Talking About Testing').should('be.visible')
    })
})