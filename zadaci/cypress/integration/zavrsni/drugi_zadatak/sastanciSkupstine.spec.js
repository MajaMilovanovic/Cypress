describe('Anketa', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.signIn('predSkup@gmail.com', 'Bar5slova')
        cy.url().should('include', '/pocetna')
        cy.get(':nth-child(4) > a').click()
        cy.url().should('include', '/zgrada/1/obavestenja')
    })

    it('Testiranje funkcionalnosti ankete', () => {

        cy.get('a[href="/zgrada/1/sastanci"]').click()
        cy.get('a[href="/zgrada/1/sastanci/7/tacke"]').click()
        cy.url().should('include', '/zgrada/1/sastanci/7/tacke')

        cy.get('a[href="/zgrada/1/sastanci/7/tacka/15/anketa"]').click()
        cy.get('.stanarOpcija1')
            .select('Marko Markovic - marko@gmail.com')
            .should('have.value', '2: Object')

        cy.get('.dodajStanarOpciju1').click()
        cy.get('.toast-message')
            .should('have.text', ' Dodavanje opcije uspesno ')

        cy.get(':nth-child(2) > .options > .col-md-4 > .btn-danger').click()

    })

})