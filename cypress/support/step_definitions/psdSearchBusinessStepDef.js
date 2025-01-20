/// <reference types="cypress" />

import PSDBusinessSearchPage from "../page_objects/psdBusinessSearchPage";
import PSDBusinessDetailPage from "../page_objects/psdBusinessDetailsPage";

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

When("the user searches for and views the {string} business", function (businessName) {
    const psdBusinessSearchPage = new PSDBusinessSearchPage();
    psdBusinessSearchPage.searchForBusiness(businessName);
    psdBusinessSearchPage.clickBusinessNameLinkInSearchResultsTable();
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

Then("the user should see the following business full details:", function (dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickFulldetailsTab();
    psdBusinessDetailsPage.assertBusinessFullDetails(dataTable);
})

Then("the user should see the following business locations details:", function (dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickLocationsTab();
    psdBusinessDetailsPage.assertBusinessLocationsDetails(dataTable);
})

Then("the user should see the following business contacts details:", function (dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickContactsTab();
    psdBusinessDetailsPage.assertBusinessContactsDetails(dataTable);
})

Then("the user should see the following business notifications details:", function (dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickNotificationsTab();
    psdBusinessDetailsPage.assertBusinessNotificationsDetails(dataTable);
})

Then("the user should see the following business products details:", function (dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickProductsTab();
    psdBusinessDetailsPage.assertBusinessProductsDetails(dataTable);
})