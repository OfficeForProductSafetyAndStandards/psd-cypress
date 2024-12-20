/// <reference types="cypress" />

import PSDAddBusinessHelper from "../helper_classes/psdAddBusinessHelper";
import PSDBusinessPage from "../page_objects/psdBusinessPage";
import PSDViewNotificationDetailsPage from "../page_objects/psdViewNotificationDetailsPage";
import PSDBasePage from "../page_objects/psdBasePage";


/********************** Step definitions **********************/

Given("the user adds a new business with the following data:", function (dataTable) {
    PSDBasePage.followLink("Search for or add a business");

    const psdAddBusinessHelper = new PSDAddBusinessHelper();
    psdAddBusinessHelper.addNewBusiness(dataTable);
    
    const psdBusinessPage = new PSDBusinessPage();
    psdBusinessPage.clickNoAddAnotherBusinessAndContinue();
    cy.wait(1000);
})

When("the user create and add the following additional businesses to the notification:", function (dataTable) {
    const psdViewNotificationDetailsPage = new PSDViewNotificationDetailsPage();
    psdViewNotificationDetailsPage.clickAddOrRemoveBusiness();

    const psdBusinessPage = new PSDBusinessPage();
    psdBusinessPage.clickYesAddAnotherBusinessForAdditionalBusinessAndContinue();
    cy.wait(1000);

    const psdAddBusinessHelper = new PSDAddBusinessHelper();

    dataTable.hashes().forEach((row, index, rows) => {
        psdAddBusinessHelper.addNewBusiness(dataTable);

        if (index < rows.length - 1) {            
            psdBusinessPage.clickYesAddAnotherBusinessForAdditionalBusinessAndContinue();
            cy.wait(1000);
        } else {
            psdBusinessPage.clickNoAddAnotherBusinessForAdditionalBusinessAndContinue();
            cy.wait(1000);
        }
    })
})

Then("the user should see the following business details:", function (dataTable) {
    const psdViewNotificationDetailsPage = new PSDViewNotificationDetailsPage();
    psdViewNotificationDetailsPage.assertBusinessDetailsPresent(dataTable);
})

When("the user clicks on Add a new business", function () {
    const psdBusinessPage = new PSDBusinessPage();
    psdBusinessPage.clickAddNewBusinessButton();
})

When("the user adds the following business details:", function (dataTable) {
    const psdBusinessPage = new PSDBusinessPage();
    psdBusinessPage.addBusinessDetails(dataTable);
})

When("the user adds following business address details:", function (dataTable) {
    const psdBusinessPage = new PSDBusinessPage();
    psdBusinessPage.addBusinessAddress(dataTable);
})

When("the user adds the following business contact details:", function (dataTable) {
    const psdBusinessPage = new PSDBusinessPage();
    psdBusinessPage.addBusinessContactDetails(dataTable);
})

When("the user clicks on Use business details", function () {
    const psdBusinessPage = new PSDBusinessPage();
    psdBusinessPage.clickUseBusinessDetails();
})

When("the user adds the following business roles:", function (dataTable) {
    const psdBusinessPage = new PSDBusinessPage();
    psdBusinessPage.addBusinessRole(dataTable);
})

