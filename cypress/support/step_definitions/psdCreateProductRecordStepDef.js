/// <reference types="cypress" />

import PSDCreateProductHelper from "../helper_classes/psdCreateProductHelper";
import PSDViewProductRecordPage from "../page_objects/psdViewProductRecordPage";
import PSDProductsPage from "../page_objects/psdProductsPage";

/********************** Step definitions **********************/

Given("the user creates a product record with the following data:", function (dataTable) {
    const createProductHelper = new PSDCreateProductHelper();
    createProductHelper.createProductRecord(dataTable);
})

Then("the user should see the following product data on view product page:", function (dataTable) {
    const viewProductRecordPage = new PSDViewProductRecordPage();
    viewProductRecordPage.assertProductdetails(dataTable);
})

