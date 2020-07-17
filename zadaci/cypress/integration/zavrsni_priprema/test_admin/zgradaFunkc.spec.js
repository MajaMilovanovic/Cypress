describe('Application testing Zgrada br. 1 ', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.signIn('admin@gmail.com', 'Bar5slova')
        cy.get('#opcije > :nth-child(1) > a').click()
        cy.get(':nth-child(2) > .btn > b').click()
        cy.get(':nth-child(1) > .col-md-6 > a').click()
    })

    it('Testiranje pregleda 1. zgrade u tabeli', () => {

        cy.get('.container > :nth-child(3) > :nth-child(2) > a').click()
        cy.url().should('include', 'stanar/2')
        cy.get('.col-md-9 > a').click()
        cy.get(':nth-child(1) > td.col-md-2 > .btn').click()
        cy.url().should('include', 'stan/1')
    })

    it('Testiranje linije sa opcijama', () => {

        cy.get('.nav-tabs > li > a').should(($list) => {
            expect($list).to.have.length(5)
            expect($list.eq(0)).to.have.text('Stanovi')
            expect($list.eq(1)).to.have.text('Obavestenja')
            expect($list.eq(2)).to.have.text('Predlozi tacke dnevnog reda')
            expect($list.eq(3)).to.have.text('Sastanci skupstine')
            expect($list.eq(4)).to.have.text('Kvarovi')
        })
    })

    it('Testiranje obavestenja 1. zgrade', () => {

        cy.get('.nav > :nth-child(2) > .nav-link').click()

        cy.url().should('include', '/1/obavestenja')

        cy.get(':nth-child(2) > .row > table > tbody > :nth-child(2) > td > #stariTekst')
            .should('have.text', 'Od petka ce racun za grejanje biti znato veci zbog hladnijih temperatura.')

        cy.get('#prikaz')
            .should('have.value', '10')
        cy.get('#prikaz')
            .select('2')
        cy.get('#prikaz')
            .should('have.value', '2')

        cy.get('div>table>tbody')
            .find('tr')
            .its('length').should('not.be.gte', 2)

        cy.contains('Marko Markovic').parent('td').within(() => {
            cy.get('span.lower-impact-text').contains(' je postavio/la obavestenje u ')
            cy.get('i').contains('00:00 06.12.2015')
            cy.get(':nth-child(2) > .row > table > tbody > :nth-child(2) > td')
                .contains('Od petka ce racun za grejanje biti znato veci zbog hladnijih temperatura.')
        })
    })

    it('Testiranje opcije sastanaka skupstine', () => {
        cy.get('.nav > :nth-child(4) > .nav-link').click()
        cy.url().should('include', '/sastanci')

        cy.get('.custom-select')
            .select('Buduci Sastanci')
        cy.get('.custom-select')
            .should('have.value', '2: 1')


        /* cy.get('.custom-select')
             .select('Prosli Sastanci')
         cy.get('.custom-select')
             .should('have.value', '3: 2')
         cy.get('.super-high-impact-text')
             .should('have.text', 'SASTANAK JE ZAVRSEN')
 
         cy.get('.custom-select')
             .select('Buduci Sastanci')
         cy.get('.custom-select')
             .should('have.value', '2: 1')*/
        cy.get('.operacije').should('have.text', 'Pregledaj tacke').click()
            .url().should('include', '/7/tacke')

        cy.get('a[href$="/15/anketa"]')
            .should('have.text', 'Pregledaj anketu')
            .click()

        cy.get('#13').click()

    })

     it('Test check dugmeta u opciji Kvarovi', () => {
 
         cy.get('.nav > :nth-child(5) > .nav-link').click()
 
         cy.get('label > .ng-untouched').check()
         cy.get('label > .ng-untouched').uncheck()
     })

})
