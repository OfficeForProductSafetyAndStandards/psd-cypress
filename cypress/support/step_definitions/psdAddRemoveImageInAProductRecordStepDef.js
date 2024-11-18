/// <reference types="cypress" />

import PSDProductsPage from "../page_objects/psdProductsPage";
import PSDAddProductImagePage from "../page_objects/psdAddProductImagePage";
import PSDViewProductRecordPage from "../page_objects/psdViewProductRecordPage";

/*************** Step definitions *******************/

When("the user adds {string} image to the product", function (image) {
    const psdViewProductRecordPage = new PSDViewProductRecordPage();
    psdViewProductRecordPage.clickShowImagesLink();
    psdViewProductRecordPage.clickAddImageLink();

    const psdAddProductImagePage = new PSDAddProductImagePage();
    psdAddProductImagePage.attachProductImage(image);
    psdAddProductImagePage.clickUploadButton();
}) 

Then("the user should see the following images added to the product:", function (dataTable) {
    const psdViewProductRecordPage = new PSDViewProductRecordPage();
    psdViewProductRecordPage.clickShowImagesLink();
    psdViewProductRecordPage.verifyTheProductImages(dataTable);
})

When("the user deletes the product image", function () {
    const psdViewProductRecordPage = new PSDViewProductRecordPage();
    psdViewProductRecordPage.clickRemoveThisImageLink();
    psdViewProductRecordPage.clickDeleteImage();
})