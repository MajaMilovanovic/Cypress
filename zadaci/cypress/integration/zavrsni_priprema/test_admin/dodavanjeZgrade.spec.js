describe('Application testing ', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.signIn('admin@gmail.com', 'Bar5slova')
        cy.get(':nth-child(2) > .nav-link').click()
        cy.url().should('include', '/zgrade');
    })

    it('Pozitivno dodavanje zgrade', () => {
 
         cy.get('input[name=mesto]')
             .type('Novi Sad')
             .should('have.value', 'Novi Sad')
         cy.get('#ulica')
             .type('Masarikova')
             .should('have.value', 'Masarikova')
         cy.get('#broj')
             .type('26')
             .should('have.value', '26')
         cy.get('#brojStanova')
             .type('24')
             .should('have.value', '24')
 
         cy.get('button[type=submit').click()
 
 
     })

    it('Test pregled zgrade', () => {

        cy.get(':nth-child(2) > .btn > b').click()
        cy.url().should('include', '/pregled')
        //provera rada broja prikazanih zgrada
        cy.get('#prikaz')
            .should('have.value', '5')

        cy.get('#prikaz')
            .select('10')
        cy.get('#prikaz')
            .should('have.value', '10')
        cy.get('tbody')
            .find('tr')
            .its('length').should('not.be.gte', 10)
    })

    it('Test search input polja', () => {

        cy.get(':nth-child(2) > .btn > b').click()
        cy.url().should('include', '/pregled')

        cy.get('#ulicaBroj').click()
            .type('Mas')
        cy.get('.row > .btn').click()

        cy.get('tbody')
            .contains('td', 'Mas')
    })

    it('Test search input polja - ulica/broj', () => {
  
          cy.get(':nth-child(2) > .btn > b').click()
          cy.url().should('include', '/pregled')
  //test parcijalnog naziva ulice
          cy.get('#ulicaBroj').click()
              .type('Mas')
          cy.get('.row > .btn').click()
  
          cy.get('tbody')
              .contains('td', 'Mas')
  //test broj zgrade
          cy.get('#ulicaBroj')
              .clear()
              .click()
              .type('26')
          cy.get('.row > .btn').click()
  
          cy.get('tbody')
              .contains('td', '26')
  //test ulica koja nije u bazi
          cy.get('#ulicaBroj').clear().click()
              .type('Jovana Jovanovica')
          cy.get('.row > .btn').click()
  
          cy.get('h2')
              .should('have.text', 'Nijedna zgrada sa trazenim kriterijumima nije prondajena!')
  
  
      })
  
      it('Test search input polja - mesto', () => {
   
           cy.get(':nth-child(2) > .btn > b').click()
           cy.url().should('include', '/pregled')
   
           cy.get('#mesto').click()
               .type('Novi Sad')
           cy.get('.row > .btn').click()
   
          cy.get('tbody')
              .contains('td', 'Novi Sad')
       })
   //registracija
       it('Negativan test - prazno polje "Mesto"', () => {
   
           cy.get('input[name=mesto]')
               .type('Novi Sad')
               .clear()
           cy.get('.invalid-feedback')
               .should('have.text', 'Ovo polje ne sme biti prazno!')
   
           cy.get('#ulica')
               .type('Masarikova')
               .should('have.value', 'Masarikova')
           cy.get('#broj')
               .type('27')
               .should('have.value', '27')
           cy.get('#brojStanova')
               .type('24')
               .should('have.value', '24')
   
           cy.get('button[type=submit')
               .should('be.disabled')
   
       })
   
       it('Negativan test - prazno polje "ulica"', () => {
   
           cy.get('input[name=mesto]')
               .type('Novi Sad')
               .should('have.value', 'Novi Sad')
   
           cy.get('#ulica')
               .type('Masarikova')
               .clear()
           cy.get('.invalid-feedback')
               .should('have.text', 'Ovo polje ne sme biti prazno!')
   
           cy.get('#broj')
               .type('27')
               .should('have.value', '27')
           cy.get('#brojStanova')
               .type('24')
               .should('have.value', '24')
   
           cy.get('button[type=submit')
               .should('be.disabled')
   
       })
   
       it('Negativan test - broj u polju "Mesto"', () => {
   
           cy.get('input[name=mesto]')
               .type('5')
               .should('have.value', '5')
   
           cy.get('#ulica')
               .type('Masarikova')
               .should('have.value', 'Masarikova')
   
           cy.get('#broj')
               .type('27')
               .should('have.value', '27')
           cy.get('#brojStanova')
               .type('24')
               .should('have.value', '24')
   
           cy.get('button[type=submit').click()
           cy.get(' #toast-container > div > div')
               .should('have.value', ' Zgrada je uspesno dodata ')
         
       })

     it('Reset parametara iz input polja', () => {
 
         cy.get('input[name=mesto]')
             .type('Novi Sad')
             .should('have.value', 'Novi Sad')
         cy.get('#ulica')
             .type('Masarikova')
             .should('have.value', 'Masarikova')
         cy.get('#broj')
             .type('26')
             .should('have.value', '26')
         cy.get('#brojStanova')
             .type('24')
             .should('have.value', '24')
 
         cy.get('.btn-danger').click()
 
         cy.get('input[name=mesto]')
             .should('have.value', '')
         cy.get('#ulica')
             .should('have.value', '')
         cy.get('#broj')
             .should('have.value', '')
         cy.get('#brojStanova')
             .should('have.value', '')
 
     })

})