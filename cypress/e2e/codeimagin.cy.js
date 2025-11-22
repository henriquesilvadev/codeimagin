describe('CodeImag.in E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/')
        // Wait a bit for page to load and dismiss cookie banner if visible
        cy.wait(500)
        cy.get('.cookie-accept-btn').then($btn => {
            if ($btn.is(':visible')) {
                cy.wrap($btn).eq(0).click()
            }
        })
    })

    it('should load the homepage successfully', () => {
        cy.contains('CodeImag.in').should('be.visible')
        cy.get('.navbar').should('be.visible')
    })

    it('should have search bar visible', () => {
        cy.get('input[placeholder*="Digite uma linguagem"]').should('be.visible')
        cy.get('button').contains('Buscar').should('be.visible')
    })

    it('should open Code Editor modal', () => {
        cy.get('#codeEditorFab', { timeout: 10000 }).click({ force: true })
        cy.get('#codeEditorModal').should('be.visible')
        cy.get('#codeEditorTextarea').should('be.visible')
    })

    it('should close Code Editor modal', () => {
        cy.get('#codeEditorFab').click({ force: true })
        cy.get('#codeEditorClose').click()
        cy.get('#codeEditorModal').should('have.class', 'hidden')
    })

    it('should open Code Dojo sidebar', () => {
        cy.get('#codeDojoToggle', { timeout: 10000 }).click({ force: true })
        cy.get('#codeDojoSidebar').should('have.class', 'active')
    })

    it('should have creators map section', () => {
        cy.get('#creatorsMap', { timeout: 10000 }).should('exist')
        cy.get('#mapSearchInput').should('be.visible')
    })

    it('should navigate using navbar links', () => {
        cy.get('a[href="#about"]').click()
        cy.url().should('include', '#about')
    })

    it('should have footer visible', () => {
        cy.get('.footer').should('exist')
        cy.contains('CodeImag.in').should('be.visible')
    })
})
