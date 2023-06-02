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

        //search by relevance of products available
        cy.get("input[aria-describedby='search-hint']").type("Face Conditioner")
        cy.get("button[data-module='govuk-button']").click()

        //confirm that search results are brought back on default settings
        let productNumber = cy.get("p[class='govuk-body']").contains("products matching keyword")
        cy.wait(3000)

        //run sorting tests
        cy.get("select[id=sort_by]").eq(0).select("Name A–Z")
        cy.wait(3000)

        //click on retired radio button
        cy.get("#retired").check()
        cy.get("button[type='submit']").click()

        //confirm that therer are no retired products
        cy.get("div[aria-label='Products']").should("not.exist")

    })
})