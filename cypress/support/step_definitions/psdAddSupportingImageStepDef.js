/// <reference types="cypress" />

import PSDViewNotificationDetailsPage from "../page_objects/psdViewNotificationDetailsPage";
import PSDBasePage from "../page_objects/psdBasePage";
import PSDAddSupportingImagesPage from "../page_objects/psdAddSupportingImagesPage";

/********************** Step definitions **********************/


When("the user adds the following supporting images to the notification:", function (dataTable) {
    const psdViewNotificationDetailsPage = new PSDViewNotificationDetailsPage();
    psdViewNotificationDetailsPage.clickChangeLinkForGivenField("Supporting images");

    PSDBasePage.followLink("Add a notification image");

    const psdAddSupportingImagesPage = new PSDAddSupportingImagesPage();
    psdAddSupportingImagesPage.uploadAdditionalSupportingImages(dataTable);
})

Then("the user should see the following supporting images displayed:", function (dataTable) {
    const psdViewNotificationDetailsPage = new PSDViewNotificationDetailsPage();
    psdViewNotificationDetailsPage.assertSupportingImagesDisplayedOnPage(dataTable);
})
