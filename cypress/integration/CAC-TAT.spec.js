/// <reference types="Cypress"/>



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verificar o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, '
        cy.get("#firstName").type('Daniel')
        cy.get("#lastName").type('Romagnoli')
        cy.get("#email").type('a@a.com')
        cy.get("#phone").type('333333333')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get("#firstName").type('Daniel')
        cy.get("#lastName").type('Romagnoli')
        cy.get("#email").type('a@@a.com')
        cy.get("#phone").type('333333333')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone vazio quando preenchido nao for numerico', () => {
        cy.get('#phone').type('egsgdgs').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get("#firstName").type('Daniel')
        cy.get("#lastName").type('Romagnoli')
        cy.get("#email").type('a@a.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get("#firstName").type('Daniel').should('have.value', 'Daniel').clear().should('have.value', '')
        cy.get("#lastName").type('Romagnoli').should('have.value', 'Romagnoli').clear().should('have.value', '')
        cy.get("#email").type('a@a.com').should('have.value', 'a@a.com').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.error').should('be.visible')
    })

    it('seleciona um produto por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto por seu valor', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto por seu indice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marcar ambos checkbox', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('verifica que a politica de privacidade abre em outra aba', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a pagina e remove o target', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })
})