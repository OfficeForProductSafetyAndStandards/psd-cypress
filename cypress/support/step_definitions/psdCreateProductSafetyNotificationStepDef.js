/// <reference types="cypress" />

import PSDMenuPage from "../page_objects/psdMenuPage";
import PSDCommonPage from "../page_objects/psdCommonPage";
import PSDNotificationsPage from "../page_objects/psdNotificationsPage";
import PSDProductsPage from "../page_objects/psdProductsPage";
import PSDAddNotificationAndProductSafetyDetailsPage from "../page_objects/psdAddNotificationAndProductSafetyDetailsPage";
import PSDAddProductIdentificationDetailsPage from "../page_objects/psdAddProductIdentificationDetailsPage";
import PSDCreateNotificationHelper from "../helper_classes/psdCreateNotificationHelper";
import PSDAddSupportingImagesPage from "../page_objects/psdAddSupportingImagesPage";
import PSDAddSupportingDocumentsPage from "../page_objects/psdAddSupportingDocumentsPage";
import PSDEvaluateNotificationRiskLevelPage from "../page_objects/psdEvaluateNotificationRiskLevelPage";


/********************** Step definitions **********************/

Given("the user start to create a new product safety notification", function () {
    const psdMenuPage = new PSDMenuPage();
    psdMenuPage.navigateToNotificationsPage();    

    const psdNotificationsPage = new PSDNotificationsPage();
    psdNotificationsPage.clickCreateNewProductSafetyNotification();
})

Given("the user search and add {string} product to the notification", function (productName) {
    const psdCommonPage = new PSDCommonPage();    
    psdCommonPage.followLink("Search for or add a product");

    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.searchAndSelectProduct(productName);
})

Given("the user search and add the following products to the notification:", function (dataTable) {
    const psdCommonPage = new PSDCommonPage();
    psdCommonPage.followLink("Search for or add a product");

    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.searchAndSelectProduct(dataTable);
})

Given("the user add the following notification and product safety details:", function (dataTable) {
    const psdCommonPage = new PSDCommonPage();
    psdCommonPage.followLink("Add notification details");

    const psdNotificationAndProductSafetyPage = new PSDAddNotificationAndProductSafetyDetailsPage();
    psdNotificationAndProductSafetyPage.addNotificationDetails(dataTable);
    psdNotificationAndProductSafetyPage.addProductSafetyAndComplianceDetails(dataTable);
    psdNotificationAndProductSafetyPage.addNumberOfAffectedProducts(dataTable);
})

Given("the user add the following product identification and evidence details:", function (dataTable) {
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