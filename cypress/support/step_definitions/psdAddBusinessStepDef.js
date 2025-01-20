/// <reference types="cypress" />

import PSDAddBusinessHelper from "../helper_classes/psdAddBusinessHelper";
import PSDCreateBusinessPage from "../page_objects/psdCreateBusinessPage";
import PSDViewNotificationDetailsPage from "../page_objects/psdViewNotificationDetailsPage";
import PSDBasePage from "../page_objects/psdBasePage";


/********************** Step definitions **********************/

Given("the user adds a new business with the following data:", function (dataTable) {
    PSDBasePage.followLink("Search for or add a business");

    const psdAddBusinessHelper = new PSDAddBusinessHelper();
    psdAddBusinessHelper.addNewBusiness(dataTable);
    
    const psdCreateBusinessPage = new PSDCreateBusinessPage();
    psdCreateBusinessPage.clickNoAddAnotherBusinessAndContinue();
    cy.wait(1000);
})

When("the user create and add the following additional businesses to the notification:", function (dataTable) {
    const psdViewNotificationDetailsPage = new PSDViewNotificationDetailsPage();
    psdViewNotificationDetailsPage.clickAddOrRemoveBusiness();

    const psdCreateBusinessPage = new PSDCreateBusinessPage();
    psdCreateBusinessPage.clickYesAddAnotherBusinessForAdditionalBusinessAndContinue();
    cy.wait(1000);

    const psdAddBusinessHelper = new PSDAddBusinessHelper();

    dataTable.hashes().forEach((row, index, rows) => {
        psdAddBusinessHelper.addNewBusiness(dataTable);

        if (index < rows.length - 1) {            
            psdCreateBusinessPage.clickYesAddAnotherBusinessForAdditionalBusinessAndContinue();
            cy.wait(1000);
        } else {
            psdCreateBusinessPage.clickNoAddAnotherBusinessForAdditionalBusinessAndContinue();
            cy.wait(1000);
        }
    })
})

Then("the user should see the following business details:", function (dataTable) {
    const psdViewNotificationDetailsPage = new PSDViewNotificationDetailsPage();
    psdViewNotificationDetailsPage.assertBusinessDetailsPresent(dataTable);
})

When("the user clicks on Add a new business", function () {
    const psdCreateBusinessPage = new PSDCreateBusinessPage();
    psdCreateBusinessPage.clickAddNewBusinessButton();
})

When("the user adds the following business details:", function (dataTable) {
    const psdCreateBusinessPage = new PSDCreateBusinessPage();
    psdCreateBusinessPage.addBusinessDetails(dataTable);
})

When("the user adds following business address details:", function (dataTable) {
    const psdCreateBusinessPage = new PSDCreateBusinessPage();
    psdCreateBusinessPage.addBusinessAddress(dataTable);
})

When("the user adds the following business contact details:", function (dataTable) {
    const psdCreateBusinessPage = new PSDCreateBusinessPage();
    psdCreateBusinessPage.addBusinessContactDetails(dataTable);
})

When("the user clicks on Use business details", function () {
    const psdCreateBusinessPage = new PSDCreateBusinessPage();
    psdCreateBusinessPage.clickUseBusinessDetails();
})

When("the user adds the following business roles:", function (dataTable) {
    const psdCreateBusinessPage = new PSDCreateBusinessPage();
    psdCreateBusinessPage.addBusinessRole(dataTable);
})

