/// <reference types="cypress" />

describe("Login and navigate to the All Products Search page", function() {
    before(function() {
        cy.fixture("productDetails").then(function(data) {
            this.data=data
        })
    })

    it("Navigate to the landing page", function() {
        //cy.visit("https://psd:userRESEARCH@psd-research.london.cloudapps.digital/sign-in");
        cy.visit("http://localhost:3000")

        //cy.get("#email").type("psd.research+ts.admin@beis.goV.uk");
        cy.contains("Sign in to your account").click()

        //read json file and input login details
        cy.readFile("cypress/userDetails/loginDetails.json").then((loginDetails) => {
            cy.get("#email").type(loginDetails.email)
            cy.get("#password").type(loginDetails.password);
        })
        cy.get("#new_user > .govuk-button").click();

        //cy.wait(2000);
        cy.get("#navigation").contains("Products").click();
        //cy.contains("Cases").click();
        cy.contains("Reject analytics cookies").click()

        cy.contains("All products - Search").click()
        
    })
})