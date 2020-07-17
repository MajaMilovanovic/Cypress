describe('Login/registration testing ', () => {

   /* beforeEach(() => {
        cy.visit('/')
        cy.signIn('admin@gmail.com', 'Bar5slova')

    })*/

    it('Pozitivan login test.', () => {
        cy.visit('/')
        cy.signIn('admin@gmail.com', 'Bar5slova')
    
        cy.get('.nav > :nth-child(1) > .nav-link')
            .should('have.class', 'active')
            .and('have.text', 'admin@gmail.com\u00a0\u00a0\u00a0')
    })

   it('Registracija - Mejl bez @', () => {
        cy.visit('/')
        cy.signIn('maja.com', 'Bar5slova')
        cy.get('body > app-root > app-logovanje > div > form > fieldset > div.alert.alert-dismissible.alert-danger')
            .should('contain', 'Email nije validnog formata!')
    })

    it('Registracija - Lozinka bez broja', () => {
        cy.visit('/')
        cy.signIn('admin@gmail.com', 'BarPslova')
        cy.get('strong')
            .should('contain', 'Lozinka nije validnog formata (Mora biti bar jedno veliko slovo, veliko malo slovo i broj i minimalne duzine 6)!')
    })

    it('Nema korisnika u bazi', () => {
        cy.visit('/')
        cy.signIn('maja@gmail.com', 'Bar5slova')
        cy.get('strong')
            .should('have.text', 'Pogresan email ili lozinka!')
    })
})