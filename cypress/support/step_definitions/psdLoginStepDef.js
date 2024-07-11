/// <reference types="Cypress" />

import LoginPage from "../page_objects/psdLoginPage";
import LoginHelper from "../helper_classes/psdLoginHelper";



/********************** Step definitions **********************/

Given("the user navigates to PSD login page", function () {
    cy.visit(Cypress.env("URL"));
})

Given("the user logs into PSD system", function() {
    const loginhelper = new LoginHelper();
    loginhelper.login();
    cy.wait(25000);
})

