/// <reference types="cypress" />

import PSDBasePage from "./psdBasePage";

class PSDAddAdditionalProductToNotificationPage
{

    /****************** page objects *****************/

    elements = {
        productReferenceField: () => cy.get('input#find-product-form-reference-field', { timeout: 10000 }).should('exist'),
        continueButton: () => cy.contains('button', 'Continue', { timeout: 10000 }).should('exist'),
        yesConfirmProductRadioButton: () => cy.get('input#confirm-product-form-correct-yes-field', { timeout: 10000 }).should('exist'),
        noEnterReferenceNumberAgainRadioButton: () => cy.get('input#confirm-product-form-correct-no-field', { timeout: 10000 }).should('exist'),
        saveAndContinueButton: () => cy.contains('button', 'Save and continue', { timeout: 10000 }).should('exist'),
        cancelLink: () => cy.contains('a', 'Cancel', { timeout: 10000 }).should('exist')
    }

    /******************** Getters & Setters *******************/

    /**
     * Enter the given product reference number in the product reference field
     * @param {*} referenceNumber 
     */
    enterProductReferenceNumber(referenceNumber) {
        this.elements.productReferenceField().clear();
        if (referenceNumber.toLowerCase() === 'random') {
            cy.get('@productNumber').then((number) => {                
                this.elements.productReferenceField().type(`${number} {enter}`);
            })
        } else {
            this.elements.productReferenceField().type(`${referenceNumber} {enter}`);
        }
    }

    /**
     * Enter the given product reference number in the product reference field and click Continue button
     * @param {*} referenceNumber 
     */
    submitProductReferenceNumber(referenceNumber) {
        this.enterProductReferenceNumber(referenceNumber);
        // this.elements.continueButton().click;
    }

    /**
     * Check the Yes radio button
     */
    checkYesConfirmProductRadioButton() {
        this.elements.yesConfirmProductRadioButton().check();
    }

    /**
     * Check No - Enter the PSD reference number again radio button
     */
    checkNoEnterReferenceNumberAgainRadioButton() {
        this.elements.noEnterReferenceNumberAgainRadioButton().check();
    }

    /**
     * Check Yes/No for the confirm product record and click Save and Continue button
     * @param {*} option 
     */
    confirmProductRecordToBeAdded(option) {
        if (option.toLowerCase() === 'no') {
            this.checkNoEnterReferenceNumberAgainRadioButton();
        } else {
            this.checkYesConfirmProductRadioButton();
        }
        this.elements.saveAndContinueButton().click();
    }

}

export default PSDAddAdditionalProductToNotificationPage;