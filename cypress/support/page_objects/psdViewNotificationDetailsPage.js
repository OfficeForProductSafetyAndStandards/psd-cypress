/// <reference types="cypress" />

import PSDBasePage from "./psdBasePage";


class PSDViewNotificationDetailsPage {

    /****************** page objects *****************/

    elements = {
        addOrRemoveBusinessButton: () => cy.contains('a', 'Add or Remove business', { timeout: 10000 }).should('exist'),
        pageContent: () => cy.get('main#main-content', { timeout: 10000 }).should('exist')
    }

    /******************** Getters & Setters *******************/

    /**
     * Click on Add or Remove business button
     */
    clickAddOrRemoveBusiness() {
        this.elements.addOrRemoveBusinessButton().click();
    }

    /**
     * Assert that the given business daetails are displayed correctly on notification details page
     * @param {*} dataTable 
     */
    assertBusinessDetailsPresent(dataTable) {

        dataTable.hashes().forEach((row) => {

            if (row.Key.toLowerCase() === 'trading name' && row.Value.toLowerCase() === 'random') {
                cy.get('@businessName').then((businessName) => {
                    this.elements.pageContent().should('contain.text', businessName);
                })             
            } else if (row.Key.toLowerCase() === 'registered or legal name' && row.Value.toLowerCase() === 'random') {
                this._verifyBusinessDetailsWithWrappedData('@businessLegalName', row.Key);
            } else if (row.Key.toLowerCase() === 'companies house number' && row.Value.toLowerCase() === 'random') {
                this._verifyBusinessDetailsWithWrappedData('@companiesHouseNumber', row.Key);
            } else {
                this.elements.pageContent().should('contain.text', row.Value);
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
    _verifyBusinessDetailsWithWrappedData(aliasName, rowKey) {
        cy.get(aliasName).then((expData) => {
            this.elements.pageContent().find('dt').contains(rowKey).next('dd').should('contain.text', expData);
        })
    }
}

export default PSDViewNotificationDetailsPage;