/// <reference types="cypress" />

const a11yOptions = {
    runOnly: {
      type: 'tag',
      values: ['wcag2aa', 'wcag22aa']
    }
  }
  
  When("the user validates the page for accessibility violations", function () {
    cy.injectAxe();
    cy.configureAxe({
      iframes: true,
      reporter: "v2"
    })
  
  })
  
  Then("there should be no violations", function () {
    cy.checkA11y(null, a11yOptions);  
  })

