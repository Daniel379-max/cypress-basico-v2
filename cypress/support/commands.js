Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get("#firstName").type('Daniel')
    cy.get("#lastName").type('Romagnoli')
    cy.get("#email").type('a@a.com')
    cy.get("#phone").type('333333333')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})