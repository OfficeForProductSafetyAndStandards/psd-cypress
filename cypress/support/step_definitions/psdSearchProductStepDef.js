/// <reference types="cypress" />

import PSDProductsPage from "../page_objects/psdProductsPage";
import PSDBusinessSearchPage from "../page_objects/psdBusinessSearchPage";
import PSDViewProductRecordPage from "../page_objects/psdViewProductRecordPage";


/**************** Step definitions ********************/

When("the user searches for the {string} product", function (productName) {
    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.searchForAProduct(productName);
})

When("the user searches for and views the {string} product", function (productName) {
    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.searchForAProduct(productName);
    psdProductsPage.clickProductNameLinkInSearchResultsTable();
    cy.wait(2000);

    const psdViewProductRecordPage = new PSDViewProductRecordPage();
    psdViewProductRecordPage.clickShowAllSections();

})

When("the user applies the following product search filters:", function (dataTable) {
    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.setProductSearchFilters(dataTable);
    psdProductsPage.clickApplySearchFilters();
})

When("the user searches for the {string} product with the following filters:", function (productName, dataTable) {
    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.setProductSearchFilters(dataTable);
    psdProductsPage.searchForAProduct(productName);
})

Then("the user should see the following data in all the product search results:", function (dataTable) {
    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.verifyGivenDataInTheProductSearchResultsTable(dataTable);
})

Then("the user should see the product search results", function () {
    const psdBusinessSearchPage = new PSDBusinessSearchPage();
    psdBusinessSearchPage.verifySearchResultsTextWithRegex('products using the current filters, were found');
    psdBusinessSearchPage.verifySearchResultTableBodyContainsRows('have.length.greaterThan', 0);
})