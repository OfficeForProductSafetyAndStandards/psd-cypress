/// <reference types="cypress" />

import PSDBasePage from "../page_objects/psdBasePage";
import PSDCreateNotificationHelper from "../helper_classes/psdCreateNotificationHelper";
import PSDViewNotificationDetailsPage from "../page_objects/psdViewNotificationDetailsPage";


/********************** Step definitions **********************/

Given("the user adds a corrective action with the following details:", function (dataTable) {
    cy.wait(1000);
    PSDBasePage.followLink("Record a corrective action");
    const psdCreateNotificationHelper = new PSDCreateNotificationHelper();
    psdCreateNotificationHelper.addACorrectiveActionToANotification(dataTable);
})

When("the user adds additional corrective action with the following details:", function (dataTable) {
    const psdViewNotificationDetailsPage = new PSDViewNotificationDetailsPage();
    psdViewNotificationDetailsPage.clickAddCorrectiveActionButton();

    const psdCreateNotificationHelper = new PSDCreateNotificationHelper();
    psdCreateNotificationHelper.addAdditionalCorrectiveActionToANotification(dataTable);
})

Then("the user should see the following corrective action details in {string} card:", function (uniqueText, dataTable) {
    const psdViewNotificationDetailsPage = new PSDViewNotificationDetailsPage();
    psdViewNotificationDetailsPage.assertCorrectiveActionDetailsDisplayedOnPage(uniqueText, dataTable);
})