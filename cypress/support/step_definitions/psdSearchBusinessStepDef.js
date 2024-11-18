/// <reference types="cypress" />

import PSDBusinessSearchPage from "../page_objects/psdBusinessSearchPage";

/********************** Step definitions **********************/

When("the user searches for the {string} business with the following filters:", function (businessName, dataTable) {
    const psdBusinessSearchPage = new PSDBusinessSearchPage();
    psdBusinessSearchPage.setBusinessSearchFilters(dataTable);
    psdBusinessSearchPage.searchForBusiness(businessName);
})

When("the user applies the following business search filters:", function (dataTable) {
    const psdBusinessSearchPage = new PSDBusinessSearchPage();
    psdBusinessSearchPage.setBusinessSearchFilters(dataTable);
    psdBusinessSearchPage.clickApplySearchFilters();
})

When("the user searches for the {string} business", function (businessName) {
    const psdBusinessSearchPage = new PSDBusinessSearchPage();
    psdBusinessSearchPage.searchForBusiness(businessName);
})

Then("the user should see the business search results", function () {
    const psdBusinessSearchPage = new PSDBusinessSearchPage();
    psdBusinessSearchPage.verifySearchResultsTextWithRegex('businesses matching selected filters were found');
    psdBusinessSearchPage.verifySearchResultTableBodyContainsRows('have.length.greaterThan', 0);
})

Then("the user should see the following data in the {string} business search result row:", function (business, dataTable) {
    const psdBusinessSearchPage = new PSDBusinessSearchPage();
    psdBusinessSearchPage.verifyTheGivenDataInBusinessSearchResultsRow(business, dataTable);
})

Then("the user should see the {string} text for the search results", function (expectedText) {
    const psdBusinessSearchPage = new PSDBusinessSearchPage();
    psdBusinessSearchPage.verifySearchResultsText(expectedText);
})