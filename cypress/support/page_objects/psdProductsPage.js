/// <reference types="cypress" />

import PSDBasePage from "./psdBasePage";

class PSDProductsPage {

    /****************** page objects *****************/

    elements = {
        createProductRecordButton: () => cy.contains('a', 'Create a product record', { timeout: 10000 }).should('exist'),
        searchTextField: () => cy.get('input#q', { timeout: 10000 }).should('exist'),
        searchButton: () => cy.contains('span', 'Search', { timeout: 10000 }).should('exist').parent(),
        addAnotherProductYesRadioButton: () => cy.get('input#search-for-or-add-a-product-form-add-another-product-true-field', { timeout: 10000 }).should('exist'),
        addAnotherProductNoRadioButton: () => cy.get('input#search-for-or-add-a-product-form-add-another-product-field', { timeout: 10000 }).should('exist'),
        continueButton: () => cy.contains('button', 'Continue', { timeout: 10000 }).should('exist'),
        categoryDropdown: () => cy.get('select#category', { timeout: 10000 }).should('exist'),
        applyButton : () => cy.get('input[value="Apply"]', { timeout: 10000 }).should('exist'),
        productSearchResultsTable : () => cy.get('div[aria-label="Products"]>table', { timeout: 10000 }).should('exist')





        // productSearchResultsTableBody : () => cy.get('tbody.govuk-table__body', { timeout: 10000 }).should('exist')

    }

    /************** Properties **************/

    selectProductButtonXpath = "//p[contains(text(), 'elementText')]/parent::th/following-sibling::td//button[contains(text(), 'Select')]";

    /****************** Getters & Setters *****************/

    /**
     * Click on Create a product record button
     */
    clickCreateAProductRecordButton() {
        this.elements.createProductRecordButton().click();
    }

    /**
     * Search for a given product
     * @param {*} productName 
     */
    searchForAProduct(productName) {
        this.elements.searchTextField().clear();
        if (productName.toLowerCase() === 'random') {
            cy.get('@productName').then((product) => {
                this.elements.searchTextField().type(product);
            })
        } else {
            this.elements.searchTextField().type(productName);
        }
        this.elements.searchTextField().type('{enter}');
    }

    /**
     * Search for the given product and click on select button
     * Pass dataTable to search and add multiple products
     * @param {*} productName 
     */
    searchAndSelectProduct(dataTable) {
        const rows = dataTable.hashes();
        const numberOfRows = rows.length;

        rows.forEach((row, index) => {
            this.searchForAProduct(row.ProductName);

            cy.contains('button', 'Select', { timeout: 10000 }).should('exist').click();

            if (index === numberOfRows - 1) {
                this.clickNoToAddAnotherProductAndContinue();                
            } else {
                this.clickYesAddAnotherProductAndContinue();
            }
        })                
    }

    /**
     * Select "Yes" add another product and continue
     */
    clickYesAddAnotherProductAndContinue() {
        this.elements.addAnotherProductYesRadioButton().click();
        this.elements.continueButton().click();
    }

    /**
     * Select "No" to add another product and continue
     */
    clickNoToAddAnotherProductAndContinue() {
        this.elements.addAnotherProductNoRadioButton().click();
        this.elements.continueButton().click();
    }

    /**
     * Set the given filters for the product search
     * @param {*} dataTable 
     */
    setProductSearchFilters(dataTable) {
        dataTable.hashes().forEach((row) => {
            if (row.FilterType.toLowerCase() === 'category') {
                this.elements.categoryDropdown().select(row.FilterLabel);
            } else if (row.FilterType.toLowerCase() === 'product record status') {
                PSDBasePage.checkCheckboxForTheLabelText(row.FilterLabel);
            } else {
                cy.contains('span', row.FilterType, { timeout: 10000 }).should('exist').click();
                PSDBasePage.checkCheckboxForTheLabelText(row.FilterLabel); 
            }                      
        })        
    }

    /**
     * Click on Apply button for product search filters
     */
    clickApplySearchFilters() {
        this.elements.applyButton().click();
    }

    /**
     * Verify that all the product search results rows contains the given text
     * @param {*} dataTable 
     */
    verifyGivenDataInTheProductSearchResultsTable(dataTable) {
        const expectedTexts = dataTable.hashes().map(row => row.ExpectedText);

        expectedTexts.forEach((expectedText) => {
            this.elements.productSearchResultsTable().each(($tbody) => {
                expect($tbody.text().trim()).to.contain(expectedText);
            })
        })
    }


    // // TODO: Fix the below method and the locator from the top of the page
    // /**
    //  * Verify that the Product search results table contains given number of rows
    //  * @param {*} expNumberOfRows 
    //  */
    // verifyProductSearchResultTableBodyContainsRows(condition, expNumberOfRows) {
    //     this.elements.productSearchResultsTableBody()
    //         .find('tr')
    //         .should(condition, expNumberOfRows);
    // }

}

export default PSDProductsPage;