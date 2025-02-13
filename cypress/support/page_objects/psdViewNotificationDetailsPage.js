/// <reference types="cypress" />

import PSDBasePage from "./psdBasePage";


class PSDViewNotificationDetailsPage {

    /****************** page objects *****************/

    elements = {
        addOrRemoveBusinessButton: () => cy.contains('a', 'Add or Remove business', { timeout: 10000 }).should('exist'),
        pageContent: () => cy.get('main#main-content', { timeout: 10000 }).should('exist'),
        addCorrectiveActionButton: () => cy.contains('a', 'Add corrective action', { timeout: 10000 }).should('exist')
    }

    /******************** Getters & Setters *******************/

    /**
     * Click on Add or Remove business button
     */
    clickAddOrRemoveBusiness() {
        this.elements.addOrRemoveBusinessButton().click();
    }

    /**
     * Click on Add corrective action button
     */
    clickAddCorrectiveActionButton() {
        this.elements.addCorrectiveActionButton().click();
    }

    /**
     * Assert that the given business daetails are displayed correctly on notification details page
     * @param {*} dataTable 
     */
    assertBusinessDetailsPresent(uniqueText, dataTable) {
        dataTable.hashes().forEach((row) => {
            if (row.Key.toLowerCase() === 'trading name' && row.Value.toLowerCase() === 'random') {
                cy.get('@businessName').then((businessName) => {
                    this.elements.pageContent().should('contain.text', businessName);
                })             
            } else if (row.Key.toLowerCase() === 'registered or legal name' && row.Value.toLowerCase() === 'random') {
                this._verifyNotificationDetailsWithWrappedData('@businessLegalName', row.Key, uniqueText);
            } else if (row.Key.toLowerCase() === 'companies house number' && row.Value.toLowerCase() === 'random') {
                this._verifyNotificationDetailsWithWrappedData('@companiesHouseNumber', row.Key, uniqueText);
            } else {
                this.elements.pageContent().should('contain.text', row.Value);
            }            
        })
    }

    /**
     * Assert that the given Corrective action details are displayed correctly
     * @param {*} dataTable 
     */
    assertCorrectiveActionDetailsDisplayedOnPage(uniqueText, dataTable) {
        dataTable.hashes().forEach((row) => {
            if (row.Key.toLowerCase() === 'responsible business' && row.Value.toLowerCase() === 'random') {
                this._verifyNotificationDetailsWithWrappedData('@businessName', row.Key, uniqueText);
            } else if (row.Key.toLowerCase() === 'legislation' && row.Value.toLowerCase() === 'random') {
                this._verifyNotificationDetailsWithWrappedData('@correctiveActionLegislation', row.Key, uniqueText);
            } else if (row.Key.toLowerCase() === 'date added' && row.Value.toLowerCase() === 'today') {
                const today = new Date();
                const formattedDate = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                cy.contains(uniqueText).closest('dl').find('dt').contains(row.Key).next('dd').should('contain.text', formattedDate);
            } else {
                cy.contains(uniqueText).closest('dl').find('dt').contains(row.Key).next('dd').should('contain.text', row.Value);

            }
        })        
    }

    /**
     * Click on the 'Change' link for the given label
     * @param {*} lableName 
     */
    clickChangeLinkForGivenField(lableName) {        
        // Find and click Remove contact link using the contact name
        cy.contains('dt', lableName)
            .closest('div')
            .find('a')
            .contains('Change')
            .should('exist')
            .click();
    }

    /**
     * Click on 'Add' link for the given heading text. 
     * This is PSD 1.0 screen. This method might need to be delete once all PSD 1.0 screens are removed.
     * @param {*} heading 
     */
    clickAddLinkForGivenHeading(heading) {
        cy.contains('h3', heading)
            .closest('section')
            .find('a')
            .contains('Add')
            .should('exist')
            .click();
    }

    /**
     * Assert that the given supporting images are displayed correctly on the page
     * @param {*} dataTable 
     */
    assertSupportingImagesDisplayedOnPage(dataTable) {
        cy.wait(3000);
        dataTable.hashes().forEach((row) => {

            cy.get(`dd figure a img[src*="${row.SupportingImage}"]`).then(($img) => {                
                cy.wrap($img).should('be.visible');
                const width = $img[0].getBoundingClientRect().width;
                const height = $img[0].getBoundingClientRect().height;
                expect(width).to.be.greaterThan(0);
                expect(height).to.be.greaterThan(0);
            })
        })
    }

    /*************** Private functions *****************/

    /**
     * Private function to validate the stored data is present on the page
     * @param {*} aliasName 
     * @param {*} rowKey 
     */
    _verifyNotificationDetailsWithWrappedData(aliasName, rowKey, uniqueText) {
        cy.get(aliasName).then((expData) => {
            cy.contains(uniqueText).closest('dl').find('dt').contains(rowKey).next('dd').should('contain.text', expData);
        })
    }

    // /**
    //  * Private function to validate the stored data is present on the page
    //  * @param {*} aliasName 
    //  * @param {*} rowKey 
    //  */
    // _verifyCorrectiveActionDetailsWithWrappedData(aliasName, rowKey, uniqueText) {
    //     cy.get(aliasName).then((expData) => {
    //         cy.contains(uniqueText).closest('dl').find('dt').contains(rowKey).next('dd').should('contain.text', expData);
    //     })
    // }
}

export default PSDViewNotificationDetailsPage;