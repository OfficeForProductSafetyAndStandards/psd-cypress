/// <reference types="cypress" />

import PSDProductsPage from "../page_objects/psdProductsPage";
import PSDBusinessSearchPage from "../page_objects/psdBusinessSearchPage";


/**************** Step definitions ********************/

When("the user apply the following product search filters:", function (dataTable) {
    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.setProductSearchFilters(dataTable);
    psdProductsPage.clickApplySearchFilters();
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