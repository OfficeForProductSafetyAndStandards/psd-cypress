/// <reference types="cypress" />

import PSDBasePage from "../page_objects/psdBasePage";

class PSDAddProductIdentificationDetailsPage {

    /****************** page objects *****************/

    elements = {
        batchNumberAddLink: () => cy.contains('dt.govuk-summary-list__key', 'Batch numbers', { timeout: 10000 }).parent('div.govuk-summary-list__row').find('a.govuk-link').should('contain', 'Add'),
        batchNumberField: () => cy.get('input#batch-number-field', { timeout: 10000 }).should('exist'),
        saveButton: () => cy.contains('button', 'Save', { timeout: 10000 }).should('exist'),
        cancelLink: () => cy.contains('a', 'Cancel', { timeout: 10000 }).should('exist'),

        customsCodesAddLink: () => cy.contains('dt.govuk-summary-list__key', 'Customs codes', { timeout: 10000 }).parent('div.govuk-summary-list__row').find('a.govuk-link').should('contain', 'Add'),
        customsCodeField: () => cy.get('input#customs-code-field', { timeout: 10000 }).should('exist'),

        ucrNumbersAddLink: () => cy.contains('dt.govuk-summary-list__key', 'Unique Consignment Reference (UCR) numbers', { timeout: 10000 }).parent('div.govuk-summary-list__row').find('a.govuk-link').should('contain', 'Add'),
        ucrNumberField: () => cy.get('input#investigation-product-ucr-numbers-attributes-0-number-field', { timeout: 10000 }).should('exist'),
        continueButton: () => cy.contains('button', 'Continue', { timeout: 10000 }).should('exist')
    }

    /************ Getters & Setters *************/

    /**
     * Click on "Add" link for the batch number
     */
    clickAddBatchNumberLink() {
        this.elements.batchNumberAddLink().click();
    }

    /**
     * Click on Save button
     */
    clickSaveButton() {
        this.elements.saveButton().click();
    }

    /**
     * Click on "Cancel" link
     */
    clickCancelLink() {
        this.elements.cancelLink().click();
    }

    /**
     * Click on "Add" link for customs codes
     */
    clickAddCustomsCodeLink() {
        this.elements.customsCodesAddLink().click();
    }

    /**
     * Click on "Add" link for UCR numbers
     */
    clickAddUCRNumbersLink() {
        this.elements.ucrNumbersAddLink().click();
    }    

    /**
     * Add batch number
     * @param {*} batchNumber 
     */
    addBatchNumber(batchNumber) {
        this.clickAddBatchNumberLink();
        this.elements.batchNumberField().clear();
        this.elements.batchNumberField().type(batchNumber);
        this.clickSaveButton();
    }

    /**
     * Add customs codes
     * @param {*} customsCode 
     */
    addCustomsCodes(customsCode) {
        this.clickAddCustomsCodeLink();
        this.elements.customsCodeField().clear();
        this.elements.customsCodeField().type(customsCode);
        this.clickSaveButton();
    }

    /**
     * Add UCR number
     * @param {*} ucrNumber 
     */
    addUCRNumbers(ucrNumber) {
        this.clickAddUCRNumbersLink();
        this.elements.ucrNumberField().clear();
        this.elements.ucrNumberField().type(ucrNumber);
        this.clickSaveButton();
    }

    /************ Public Methods ************/

    /**
     * Add Product identification details
     * @param {*} dataTable 
     */
    addProductIdentificationDetails(dataTable) {
        PSDBasePage.followLink("Add product identification details"); 

        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            if (headers.includes('BatchNumber') && row.BatchNumber) {
                this.addBatchNumber(row.BatchNumber);
            } 
            if (headers.includes('CustomsCode') && row.CustomsCode) {
                this.addCustomsCodes(row.CustomsCode);
            }
            if (headers.includes('UCRNumber') && row.UCRNumber) {
                this.addUCRNumbers(row.UCRNumber);
            }                        
        })
        this.elements.continueButton().click();
    }

}

export default PSDAddProductIdentificationDetailsPage;