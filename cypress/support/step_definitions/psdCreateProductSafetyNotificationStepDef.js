/// <reference types="Cypress" />

import PSDMenuPage from "../page_objects/psdMenuPage";
import PSDCommonPage from "../page_objects/psdCommonPage";
import PSDNotificationsPage from "../page_objects/psdNotificationsPage";
import PSDProductsPage from "../page_objects/psdProductsPage";
import PSDAddNotificationAndProductSafetyDetailsPage from "../page_objects/psdAddNotificationAndProductSafetyDetailsPage";

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