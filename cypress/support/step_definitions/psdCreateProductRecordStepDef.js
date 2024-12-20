/// <reference types="cypress" />

import PSDCreateProductHelper from "../helper_classes/psdCreateProductHelper";
import PSDViewProductRecordPage from "../page_objects/psdViewProductRecordPage";
import PSDProductsPage from "../page_objects/psdProductsPage";
import PSDCreateProductRecordPage from "../page_objects/psdCreateProductRecordPage"; 

/********************** Step definitions **********************/

Given("the user creates a product record with the following data:", function (dataTable) {
    const createProductHelper = new PSDCreateProductHelper();
    createProductHelper.createProductRecord(dataTable);
})

Then("the user should see the following product data on view product page:", function (dataTable) {
    const viewProductRecordPage = new PSDViewProductRecordPage();
    viewProductRecordPage.assertProductdetails(dataTable);
})

When("the user selects {string} for duplicate check barcode number", function (option) {
    const psdCreateProductRecordPage = new PSDCreateProductRecordPage();
    if (option.toLowerCase() === 'yes') {
        psdCreateProductRecordPage.clickProductBarcodeYesRadioButton();
    } else {
        psdCreateProductRecordPage.clickProductBarcodeNoRadioButton();
    }
})

When("the user clicks on Continue button", function () {
    const psdCreateProductRecordPage = new PSDCreateProductRecordPage();
    psdCreateProductRecordPage.clickOnContinueButton();
})

