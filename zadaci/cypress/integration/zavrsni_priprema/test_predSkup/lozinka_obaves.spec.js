describe('Lozinka i obavestenja', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.signIn('predSkup@gmail.com', 'Bar6slova')
        cy.url().should('include', '/pocetna')
    })

    it('Pozitivan test promene lozinke', () => {

        cy.get(':nth-child(3) > .nav-link').click()
        cy.get('#staraLozinka')
            .type('Bar5slova')
            .should('have.value', 'Bar5slova')
        cy.get('#novaLozinka')
            .type('Bar6slova')
            .should('have.value', 'Bar6slova')
        cy.get('#potvrdaNoveLozinke')
            .type('Bar6slova')
            .should('have.value', 'Bar6slova')
        cy.get('.center > .btn').click()

        cy.get('.toast-message')
            .should('have.text', ' Lozinka uspesno izmenjena! ')

    })

    it('Negativan test promene lozinke - prazno polje i neispravna lozinka', () => {

        cy.get(':nth-child(3) > .nav-link').click()
        cy.get('#staraLozinka')
            .type('Bar5slova').clear()
        cy.get(':nth-child(2) > .invalid-feedback')
            .should('have.text', 'Ovo polje je obavezno!')

        cy.get('#novaLozinka')
            .type('Bar')
            .should('have.value', 'Bar')
        cy.get(':nth-child(1) > .invalid-feedback')
            .should('have.text', 'Neispravna lozinka! Pogledajte napomenu.')

        cy.get('#potvrdaNoveLozinke')
            .type('5')
            .should('have.value', '5')

        cy.get('.ng-invalid.ng-dirty > :nth-child(2) > .invalid-feedback')
            .should('have.text', 'Lozinke se ne poklapaju!')

        cy.get('.center > .btn')
            .should('be.disabled')
    })

    it('Funkcionalnosti stranice - dodavanje obavestenja', () => {

        cy.get(':nth-child(4) > a').click()
        cy.url().should('include', '/zgrada/1/obavestenja')

        cy.get('#dodajObavestenje').click()
        cy.get('#tekstObavestenja').click()
            .type('dlfjasldfjskal')
        cy.get('#dodajObavestenje').click()
        cy.get('.toast-message')
            .should('have.text', ' Obavestenje uspesno dodato! ')

        cy.get('#tekstObavestenja').click()
            .type('dsljfdsa;')
            .clear()
        cy.get('#dodajObavestenje')
            .should('be.disabled')
    })

    it('Funkcionalsnoti stranice - izmena i brisanje obavestenja', () => {

        cy.get(':nth-child(4) > a').click()
        cy.url().should('include', '/zgrada/1/obavestenja')

        //izmena
        cy.get(':nth-child(4) > .row > table > tbody > :nth-child(3) > td > :nth-child(1) > :nth-child(1) > #izmeniObavestenje').click()

        cy.get(':nth-child(4) > .row > table > tbody > :nth-child(2) > td > #noviTekst')
            .type('fldsjafsa')
        cy.get(':nth-child(4) > .row > table > tbody > :nth-child(3) > td > :nth-child(1) > :nth-child(2) > .operacije').click()


        //brisanje
        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(3) > td > :nth-child(1) > :nth-child(4) > .operacije').click()
        cy.get('.toast-message')
            .should("have.text", ' Uspesno izbrisano obavestenje ')

        //nepostojece obavestenje
        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(3) > td > .ng-star-inserted > :nth-child(1) > #izmeniObavestenje').click()
        cy.get(':nth-child(3) > .row > table > tbody > :nth-child(3) > td > .ng-star-inserted > :nth-child(4) > .operacije').click
        cy.get('.toast-message')
            .should("have.text", ' Nepostojece Obavestenje! ')
    })

})    
