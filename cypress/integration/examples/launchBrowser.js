/// <reference types="cypress" />

describe("Launch the test browser", function() {
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

        //create a new product
        cy.get("a[data-cy='new-product']").click()

        //no barcode
        cy.get("input[data-cy='barcode-no']").check()
        cy.get("input[data-cy='continue']").click()

        //select dropdown
        //cy.get("select").select("Chemical products").should("have.value", "Chemical products")
        cy.get("select").eq(0).select("Chemical products")
        cy.get("input[id='subcategory']").type("Chemical Peel")

        //yes, product is counterfeit
        cy.get("input[value='counterfeit']").check()

        //yes, has UKCA, UKNI or CE marking
        cy.get("#has_markings").check()
        cy.get("#markings").check()

        //manufacturers brand name
        cy.get("#product_brand").type("Face Peel Softner")
        cy.get("#name").type("Face Conditioner")

        //yes, product placed before 01-01-2021
        cy.get("#when_placed_on_market").check()

        //barcode number
        cy.get("#barcode").type("12345678910")

        //product identifier
        cy.get("#product_product_code").type("This is a product code")

        //enter webpage
        cy.get("#product_webpage").type("https://www.amazon.com/bathroom")

        // 

    })
})