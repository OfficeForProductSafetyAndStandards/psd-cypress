/// <reference types="cypress" />

import PSDMenuPage from "../page_objects/psdMenuPage";

When("the user navigates to {string} page from the header menu", function (menuOption) {
    const psdMenuPage = new PSDMenuPage();
    psdMenuPage.navigateViaHeaderMenu(menuOption);
})