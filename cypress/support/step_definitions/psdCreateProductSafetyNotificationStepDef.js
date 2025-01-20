/// <reference types="cypress" />

import PSDMenuPage from "../page_objects/psdMenuPage";
import PSDNotificationsPage from "../page_objects/psdNotificationsPage";
import PSDProductsPage from "../page_objects/psdProductsPage";
import PSDAddNotificationAndProductSafetyDetailsPage from "../page_objects/psdAddNotificationAndProductSafetyDetailsPage";
import PSDAddProductIdentificationDetailsPage from "../page_objects/psdAddProductIdentificationDetailsPage";
import PSDCreateNotificationHelper from "../helper_classes/psdCreateNotificationHelper";
import PSDAddSupportingImagesPage from "../page_objects/psdAddSupportingImagesPage";
import PSDAddSupportingDocumentsPage from "../page_objects/psdAddSupportingDocumentsPage";
import PSDEvaluateNotificationRiskLevelPage from "../page_objects/psdEvaluateNotificationRiskLevelPage";
import PSDBasePage from "../page_objects/psdBasePage";
import PSDSubmitNotificationPage from "../page_objects/psdSubmitNotificationPage";


/********************** Step definitions **********************/

Given("the user starts to create a new product safety notification", function () {
    const psdMenuPage = new PSDMenuPage();
    psdMenuPage.navigateToNotificationsPage();    

    const psdNotificationsPage = new PSDNotificationsPage();
    psdNotificationsPage.clickCreateNewProductSafetyNotification();
})

Given("the user search and add {string} product to the notification", function (productName) {
    PSDBasePage.followLink("Search for or add a product");

    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.searchAndSelectProduct(productName);
})

Given("the user searches for and adds the following products to the notification:", function (dataTable) {
    PSDBasePage.followLink("Search for or add a product");

    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.searchAndSelectProduct(dataTable);
})

Given("the user adds the following notification and product safety details:", function (dataTable) {
    PSDBasePage.followLink("Add notification details");

    const psdNotificationAndProductSafetyPage = new PSDAddNotificationAndProductSafetyDetailsPage();
    psdNotificationAndProductSafetyPage.addNotificationDetails(dataTable);
    psdNotificationAndProductSafetyPage.addProductSafetyAndComplianceDetails(dataTable);
    psdNotificationAndProductSafetyPage.addNumberOfAffectedProducts(dataTable);
})

Given("the user adds the following product identification and evidence details:", function (dataTable) {
    const psdAddProductIdentificationDetailsPage = new PSDAddProductIdentificationDetailsPage();
    psdAddProductIdentificationDetailsPage.addProductIdentificationDetails(dataTable);

    const psdCreateNotificationHelper = new PSDCreateNotificationHelper();
    psdCreateNotificationHelper.addTestReportToANotification(dataTable);

    const psdAddSupportingImagesPage = new PSDAddSupportingImagesPage();
    psdAddSupportingImagesPage.addSupportingImages(dataTable);

    const psdAddSupportingDocumentsPage = new PSDAddSupportingDocumentsPage();
    psdAddSupportingDocumentsPage.addSupportingDocuments(dataTable);

    psdCreateNotificationHelper.addRiskAssessmentToANotification(dataTable);

    const psdEvaluateNotificationRiskLevelPage = new PSDEvaluateNotificationRiskLevelPage();
    psdEvaluateNotificationRiskLevelPage.addNotificationRiskLevel(dataTable);
})

Given("the user adds a corrective action with the following details:", function (dataTable) {
    const psdCreateNotificationHelper = new PSDCreateNotificationHelper();
    psdCreateNotificationHelper.addACorrectiveActionToANotification(dataTable);
})

Given("the user selects the {string} notification to make changes", function (notificationTitle) {
    const psdNotificationsPage = new PSDNotificationsPage();
    psdNotificationsPage.clickMakeChangesForGivenNotificationTitle(notificationTitle);
})

Then("the user should see the following notification details on the page:", function (dataTable) {
    const psdSubmitNotificationPage = new PSDSubmitNotificationPage();
    psdSubmitNotificationPage.assertNotificationDetails(dataTable);
})

When("the user verifies the following data on submit notification page and submit the notification:", function (dataTable) {
    const psdSubmitNotificationPage = new PSDSubmitNotificationPage();
    psdSubmitNotificationPage.assertNotificationDetails(dataTable);
    psdSubmitNotificationPage.clickSubmitNotificationButton();
})

When("the user verifies the following data on submit notification page and save the notification as draft:", function (dataTable) {
    const psdSubmitNotificationPage = new PSDSubmitNotificationPage();
    psdSubmitNotificationPage.assertNotificationDetails(dataTable);
    psdSubmitNotificationPage.clickSaveAsDraftButton();
})

When("the user submits the notification", function () {
    const psdSubmitNotificationPage = new PSDSubmitNotificationPage();
    psdSubmitNotificationPage.clickSubmitNotificationButton();
})
