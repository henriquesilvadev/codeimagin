describe('CodeImag.in E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should load the homepage successfully', () => {
        cy.contains('CodeImag.in').should('be.visible')
        cy.contains('Bem-vindo ao CodeImag.in').should('be.visible')
    })

    it('should search for a programming language', () => {
        cy.get('input[placeholder*="Digite uma linguagem"]').type('JavaScript')
        cy.get('button').contains('Buscar').click()
        cy.wait(1000) // Wait for results to load
    })

    it('should display technology tags', () => {
        cy.get('.language-tags', { timeout: 10000 }).should('be.visible')
        cy.get('.language-tags button', { timeout: 10000 }).should('have.length.greaterThan', 0)
    })

    it('should open and close Code Editor modal', () => {
        cy.get('#codeEditorFab').click()
        cy.get('#codeEditorModal').should('not.have.class', 'hidden')
        cy.get('#codeEditorClose').click()
        cy.get('#codeEditorModal').should('have.class', 'hidden')
    })

    it('should type code in the editor and run it', () => {
        cy.get('#codeEditorFab').click()
        cy.get('#codeEditorTextarea').clear().type('console.log("Hello from Cypress!")')
        cy.get('#runCodeBtn').click()
        cy.get('#codeEditorOutput', { timeout: 5000 }).should('contain', 'Hello from Cypress!')
    })

    it('should open and close Code Dojo sidebar', () => {
        cy.get('#codeDojoToggle').click()
        cy.get('#codeDojoSidebar').should('have.class', 'active')
        cy.get('#sidebarClose').click()
        cy.get('#codeDojoSidebar').should('not.have.class', 'active')
    })

    it('should filter creators map by search', () => {
        cy.scrollTo(0, 1500) // Scroll to map section
        cy.get('#mapSearchInput', { timeout: 10000 }).should('be.visible')
        cy.get('#mapSearchInput').type('Python')
        cy.get('#mapSearchInput').should('have.value', 'Python')
    })

    it('should navigate to About section', () => {
        cy.get('a[href="#about"]').click()
        cy.url().should('include', '#about')
    })

    it('should display books carousel', () => {
        cy.get('#booksCarousel', { timeout: 10000 }).should('be.visible')
    })

    it('should have responsive navbar', () => {
        cy.get('.navbar').should('be.visible')
        cy.get('.navbar-logo').should('contain', 'CodeImag.in')
    })
})
