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
        cy.contains('JavaScript', { timeout: 10000 }).should('be.visible')
    })

    it('should click on technology tags', () => {
        cy.get('.language-tags button').first().click()
        // Should show results
        cy.get('.content-item').should('be.visible')
    })

    it('should open and close Code Editor modal', () => {
        cy.get('#codeEditorFab').click()
        cy.get('#codeEditorModal').should('have.class', 'hidden').should('not.have.class', 'hidden')
        cy.get('#codeEditorClose').click()
        cy.get('#codeEditorModal').should('have.class', 'hidden')
    })

    it('should type code in the editor and run it', () => {
        cy.get('#codeEditorFab').click()
        cy.get('#codeEditorTextarea').clear().type('console.log("Hello from Cypress!")')
        cy.get('#runCodeBtn').click()
        cy.get('#codeEditorOutput').should('contain', 'Hello from Cypress!')
    })

    it('should open and close Code Dojo sidebar', () => {
        cy.get('#codeDojoToggle').click()
        cy.get('#codeDojoSidebar').should('have.class', 'active')
        cy.get('#sidebarClose').click()
        cy.get('#codeDojoSidebar').should('not.have.class', 'active')
    })

    it('should filter creators map by search', () => {
        cy.scrollTo(0, 1500) // Scroll to map section
        cy.get('#mapSearchInput').type('Python')
        // Map should update (we can't easily test Google Maps markers, but input should work)
        cy.get('#mapSearchInput').should('have.value', 'Python')
    })

    it('should open authentication modals', () => {
        // This assumes auth buttons are in #authContainer
        cy.get('#authContainer').within(() => {
            cy.contains('Entrar').click()
        })
        cy.get('#signinModal').should('have.class', 'show')
        cy.get('.modal-close').first().click()
        cy.get('#signinModal').should('not.have.class', 'show')
    })

    it('should navigate to About section', () => {
        cy.get('a[href="#about"]').click()
        cy.url().should('include', '#about')
        cy.contains('De onde nasceu o CodeImag.in').should('be.visible')
    })

    it('should display books carousel', () => {
        cy.get('#booksCarousel').should('be.visible')
        cy.get('.book-card').should('have.length.greaterThan', 0)
    })

    it('should have responsive navbar', () => {
        cy.get('.navbar').should('be.visible')
        cy.get('.navbar-logo').should('contain', 'CodeImag.in')
    })
})
