/// <reference types="Cypress" />

Cypress.Commands.add('selectRandomOptionFromDropdown', ($dropdown) => {
    cy.wrap($dropdown).should('exist');

    cy.wrap($dropdown).find('option').then(options => {
        if (options.length > 0) {
            const randomIndex = Math.floor(Math.random() * options.length);
            cy.wrap($dropdown).select(options[randomIndex].value);
            return options[randomIndex].value
        } else {
            throw new Error('No options available in the dropdown');
        }
    })        
})