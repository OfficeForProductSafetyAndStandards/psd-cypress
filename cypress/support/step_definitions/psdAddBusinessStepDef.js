/// <reference types="cypress" />

import PSDAddBusinessHelper from "../helper_classes/psdAddBusinessHelper";


/********************** Step definitions **********************/

Given("the user adds a new business with the following data:", function (dataTable) {
    const psdAddBusinessHelper = new PSDAddBusinessHelper();
    psdAddBusinessHelper.addNewBusiness(dataTable);
    cy.wait(1000);
})