/// <reference types="cypress" />

import PSDCreateProductHelper from "../helper_classes/psdCreateProductHelper";
import PSDViewProductRecordPage from "../page_objects/psdViewProductRecordPage";
import PSDProductsPage from "../page_objects/psdProductsPage";
import PSDEditProductRecordHelper from "../helper_classes/psdEditProductRecordHelper";

/********************** Step definitions **********************/

When("the user edits the product record with the following data:", function (dataTable) {
    const psdViewProductRecordPage = new PSDViewProductRecordPage();
    psdViewProductRecordPage.clickEditThisProductRecord();

    const psdEditProductRecordHelper = new PSDEditProductRecordHelper();
    psdEditProductRecordHelper.editProductRecord(dataTable);
})