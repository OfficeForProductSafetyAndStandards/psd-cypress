/// <reference types="Cypress" />

import CommonHelper from "../helper_classes/psdCommonHelper";
import CommonPage from "../page_objects/psdCommonPage";

/********************** Step definitions **********************/

Given("the user visits the PSD landing page", function () {
    // const commonHelper = new CommonHelper();
    // commonHelper.navigateToPSDLandingPage();
    cy.visit(Cypress.env("URL"));
})

Then("the user should see {string} message on the page", function (expText) {
    const commonpage = new CommonPage();
    commonpage.assertTextPresentOnPage(expText);
})

Then("the PSD reference number should match the pattern {string}", function (regexPattern) {
    const commonpage = new CommonPage();
    commonpage.assertTextWithRegexPatternPresentOnPage(regexPattern);
})

Then("the user should see the following message on the page:", function (dataTable) {
    const commonpage = new CommonPage();
    dataTable.hashes().forEach((row) => {
        commonpage.assertTextPresentOnPage(row.message);
    })
})

When("the user click on the link {string}", function (linkText) {
    cy.contains('a', linkText).click();
})