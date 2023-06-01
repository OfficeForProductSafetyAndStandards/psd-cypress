/// <reference types="cypress" />

describe("Create a Product, add a Case and upload pictures ", function() {

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

        //generate random number to add to case title
        let numberGen = Math.round(Math.random() * 5000)

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
        cy.get("input[id='subcategory']").type(this.data.productSubCategoryTitle)

        //yes, product is counterfeit
        cy.get("input[value='counterfeit']").check()

        //yes, has UKCA, UKNI or CE marking
        cy.get("#has_markings").check()
        cy.get("#markings").check()

        //manufacturers brand name
        cy.get("#product_brand").type(this.data.brandName)
        cy.get("#name").type(this.data.productName + numberGen)

        //yes, product placed before 01-01-2021
        cy.get("#when_placed_on_market").check()

        //barcode number
        cy.get("#barcode").type(this.data.barcode)

        //product identifier
        cy.get("#product_product_code").type(this.data.productIdentifier)

        //enter webpage
        cy.get("#product_webpage").type(this.data.productWebpage)

        //select country of origin
        //cy.get("#product_country_of_origin").click()
        cy.get("select[id=product_country_of_origin]").select("United Kingdom").should("have.value", 'country:GB')

        //describe product
        cy.get("#product_description").type(this.data.productDescription)

        //save
        cy.get("input[data-cy='save']").click()

        //confirm product created
        cy.get("h1[class='govuk-panel__title']").contains("Product record created")

        //view the product page
        cy.contains("View the product record").click()
        
        cy.contains("Create a new case for this product").click()

        //product is not safe
        cy.get("#case_is_safe").check()
        cy.get("input[name='commit']").click()

        //product is unsafe
        cy.get("#reported_reason").check()
        cy.get("#hazard_type").select("Chemical").should("have.value", "Chemical")
        cy.get("#hazard_description").type("This is a hazard")
        cy.get("input[type='submit']").click()

        //no reference number
        cy.get("#investigation_has_complainant_reference_false").check()
        cy.get("input[type='submit']").click()

        //Enter case name
        cy.get("#user_title").type("Chemical Burn Report--" + numberGen)
        cy.get("input[type='submit']").click()
        cy.contains("View the case").click()

        //add image
        cy.get(".govuk-grid-column-full > .govuk-summary-list > :nth-child(3) > .govuk-summary-list__actions > .govuk-link").click()
        cy.get("#document").selectFile("cypress/images/Screenshot Image 1.png")

        cy.get("#title").type("Image attached")
        cy.get("#description").type("This is a description of the image")
        cy.get("button[data-module='govuk-button']").click()

        //confirm image description is visible on page
        cy.contains("This is a description of the image")
        cy.contains("Sign out").click()

    })
})