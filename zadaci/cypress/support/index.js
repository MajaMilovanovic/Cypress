// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  // now this runs prior to every test
  // across all files no matter what
  cy.log('-----------PRE SVAKOG TESTA-------------')
})


// ako u cypress.json navedemo:
// "baseUrl": "http://localhost:8080"
// onda se u testovima, kada navedemo cy.visit('/') gadja ta putanja
