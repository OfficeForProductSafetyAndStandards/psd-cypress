/// <reference types="cypress" />

import PSDAddAdditionalProductToNotificationPage from "../page_objects/psdAddAdditionalProductToNotificationPage"

/********************** Step definitions **********************/

When("the user adds an additional product with the {string} reference number to the notification", function (referenceNumber) {
    const psdAddAdditionalProductToNotificationPage = new PSDAddAdditionalProductToNotificationPage();
    psdAddAdditionalProductToNotificationPage.submitProductReferenceNumber(referenceNumber);
    psdAddAdditionalProductToNotificationPage.confirmProductRecordToBeAdded("Yes");
})
