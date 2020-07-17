describe('Test funkcionalnosti "Stanari"', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.signIn('admin@gmail.com', 'Bar5slova')
        cy.get('#opcije > :nth-child(2) > a').click()
        cy.url().should('include', '/stanari');
    })

    it('Pozitivan test registracije stanara', () => {

        cy.get('#email').click()
            .type('tc@gmail.com')
            .should('have.value', 'tc@gmail.com')
        cy.get('#lozinka').click()
            .type('Bar5slova')
            .should('have.value', 'Bar5slova')
        cy.get('#ime').click()
            .type('Maja')
            .should('have.value', 'Maja')
        cy.get('#prezime').click()
            .type('Milovanovic')
            .should('have.value', 'Milovanovic')

        cy.get('button[type=submit').click()
        cy.get('.toast-message')
            .should('have.text', ' Uspesno ste registrovali stanara! ')
    })

    it('Negativan test registracije stanara - email postoji', () => {

        cy.get('#email').click()
            .type('admin@gmail.com')
            .should('have.value', 'admin@gmail.com')
        cy.get('#lozinka').click()
            .type('Bar5slova')
            .should('have.value', 'Bar5slova')
        cy.get('#ime').click()
            .type('Maja')
            .should('have.value', 'Maja')
        cy.get('#prezime').click()
            .type('Milovanovic')
            .should('have.value', 'Milovanovic')

        cy.get('button[type=submit').click()

        cy.get('.toast-message')
            .should('have.text', 'E-mail adresa: admin@gmail.com je zauzeta!')
    })

    it('Negativan test registracije- prazno polje Email', () => {
        cy.get('#email')
            .type('m@g.com')
            .clear()
        cy.get('.invalid-feedback')
            .should('have.text', 'Ovo polje ne sme biti prazno!')

        cy.get('#lozinka').click()
            .type('Bar5slova')
            .should('have.value', 'Bar5slova')
        cy.get('#ime').click()
            .type('Maja')
            .should('have.value', 'Maja')
        cy.get('#prezime').click()
            .type('Milovanovic')
            .should('have.value', 'Milovanovic')

        cy.get('button[type=submit')
            .should('be.disabled')
    })

    it('Negativan test lozinka - bez velikih slova', () => {
        //isto i za bez malih slova i bez broja
        cy.get('#email').click()
            .type('admin@gmail.com')
            .should('have.value', 'admin@gmail.com')
        cy.get('#lozinka').click()
            .type('bar5slova')
            .should('have.value', 'bar5slova')
        cy.get('.invalid-feedback')
            .should('have.text', 'Neispravna lozinka!')
        cy.get('#ime').click()
            .type('Maja')
            .should('have.value', 'Maja')
        cy.get('#prezime').click()
            .type('Milovanovic')
            .should('have.value', 'Milovanovic')

        cy.get('button[type=submit')
            .should('be.disabled')
    })

    it('Reset parametara iz input polja', () => {

        cy.get('#email').click()
            .type('admin@gmail.com')
            .should('have.value', 'admin@gmail.com')
        cy.get('#lozinka').click()
            .type('Bar5slova')
            .should('have.value', 'Bar5slova')
        cy.get('#ime').click()
            .type('Maja')
            .should('have.value', 'Maja')
        cy.get('#prezime').click()
            .type('Milovanovic')
            .should('have.value', 'Milovanovic')
        cy.get('.btn-danger').click()

        cy.get('#email').click()
            .should('have.value', '')
        cy.get('#lozinka').click()
            .should('have.value', '')
        cy.get('#ime').click()
            .should('have.value', '')
        cy.get('#prezime').click()
            .should('have.value', '')
    })

    it('Testiranje opcije pregleda stanara', () => {

        cy.get('.active > .btn > b').click()
        cy.url().should('include', '/stanari')

        cy.get(':nth-child(2) > .btn > b').click()

        cy.get('#prikaz')
            .select('25')
        cy.get('#prikaz')
            .should('have.value', '25')

        cy.get('tbody')
            .find('tr')
            .its('length').should('not.be.gte', 25)
    })

})