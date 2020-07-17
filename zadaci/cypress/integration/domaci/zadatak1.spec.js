describe('Testing Wikipedia', () => {
    it('search form', () => {
        // Visit  Wikipedia website
        cy.visit('https://www.wikipedia.org');

        // Enter value Cypress into input field
        cy.get("input[type='search']")
            .type('Cypress');

        // Click search button
        cy.get("button[type='submit']")
            .click();

        // Verify URL
        cy.url().should('include', '/Cypress')

        // Verify heading
        cy.get('#firstHeading')
            .should('have.text', 'Cypress')
    })
})