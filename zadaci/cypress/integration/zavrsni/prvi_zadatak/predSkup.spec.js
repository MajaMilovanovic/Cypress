describe('Izmena prijave kvara', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.signIn('predSkup@gmail.com', 'Bar5slova')
        cy.url().should('include', '/pocetna')
        cy.get(':nth-child(4) > a').click()
        cy.url().should('include', '/zgrada/1/obavestenja')
    })

    it('Stranica zgrade predsednika skupstine', () => {

        cy.get(':nth-child(4) > .nav-link').click()

        cy.get('a[href="/zgrada/1/kvar/1"]').click()

        cy.get('#tekstKomentara')
            .type('Dobar dan')

        cy.get('#button_komentar').click()
        cy.get('.toast-message')
            .should('have.text', ' Komentar uspesno dodat ')

        cy.get('.kom_2_izmeni > .operacije').click()
        cy.get('#kom_2_novi_tekst')
            .type('Dobro vece')

        cy.get('.kom_2_potvrdi > .operacije').click()
        cy.get('.toast-message')
            .should('have.text', ' Komentar uspesno izmenjen ')

        cy.get('.kom_2_brisi > .operacije').click()
        cy.get('.toast-message')
            .should('have.text', ' Komentar uspesno izbrisan ')

        cy.get('.btn-secondary').click()
        cy.url().should('include', '/logovanje')

    })
})