/// <reference types="cypress" />

import PSDEditBusinessFullDetailsPage from "../page_objects/psdEditBusinessFullDetailsPage";
import PSDBusinessDetailPage from "../page_objects/psdBusinessDetailsPage";
import PSDBasePage from "../page_objects/psdBasePage";
import PSDEditBusinessLocationPage from "../page_objects/psdEditBusinessLocationPage";
import PSDEditBusinessContactsPage from "../page_objects/psdEditBusinessContactsPage";


/********************** Step definitions **********************/

When("the user edits the full business details with the following data:", function (dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickFulldetailsTab();
    PSDBasePage.followLink('Edit details');
    const psdEditBusinessFullDetailsPage = new PSDEditBusinessFullDetailsPage();
    psdEditBusinessFullDetailsPage.editFullBusinessDetails(dataTable);
})

Then("the user should see the following edited business full details:", function (dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickFulldetailsTab();
    psdBusinessDetailsPage.assertEditedBusinessFullDetails(dataTable);
})

When("the user adds a new business location with the following data:", function (dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickLocationsTab();
    PSDBasePage.followLink('Add location'); 
    const psdEditBusinessLocationPage = new PSDEditBusinessLocationPage();
    psdEditBusinessLocationPage.addBusinessLocation(dataTable);
})

When("the user edits the {string} business location with the following data:", function (locationName, dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickLocationsTab();
    const psdEditBusinessLocationPage = new PSDEditBusinessLocationPage();
    psdEditBusinessLocationPage.editBusinessLocation(locationName, dataTable);
})

When("the user removes {string} business location", function (locationName) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickLocationsTab();
    const psdEditBusinessLocationPage = new PSDEditBusinessLocationPage();
    psdEditBusinessLocationPage.removeBusinessLocation(locationName);
})

When("the user adds a new business contacts with the following data:", function (dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickContactsTab();
    PSDBasePage.followLink('Add contact');
    const psdEditBusinessContactsPage = new PSDEditBusinessContactsPage();
    psdEditBusinessContactsPage.addBusinessContacts(dataTable);
})

When("the user edits the {string} business contact with the following data:", function (contactName, dataTable) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickContactsTab();
    const psdEditBusinessContactsPage = new PSDEditBusinessContactsPage();
    psdEditBusinessContactsPage.editBusinessContact(contactName, dataTable);
})

When("the user removes {string} business contact", function (contactName) {
    const psdBusinessDetailsPage = new PSDBusinessDetailPage();
    psdBusinessDetailsPage.clickContactsTab();
    const psdEditBusinessContactsPage = new PSDEditBusinessContactsPage();
    psdEditBusinessContactsPage.removeBusinessContact(contactName);
})