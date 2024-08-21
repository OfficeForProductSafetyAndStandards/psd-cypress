/// <reference types="cypress" />

import PSDBasePage from "../page_objects/psdBasePage";

class PSDSubmitNotificationPage {

    /****************** page objects *****************/

    elements = {
        pageContent: () => cy.get('main#main-content', { timeout: 10000 }).should('exist'),
        submitNotificationButton: () => cy.contains('button', 'Submit notification', { timeout: 10000 }).should('exist'),
        saveAsDraftButton: () => cy.contains('button', 'Save as draft', { timeout: 10000 }).should('exist')
    }

    /******************** Getters & Setters *******************/

    /**
     * Assert that the given data is present in the Notification details section on 'Check the notification details and submit' page
     * @param {*} dataTable 
     */
    assertNotificationDetails(dataTable) {
        dataTable.hashes().forEach((row) => {
            if (row.Key.toLowerCase() === 'notification number' && row.Value.toLowerCase() === 'random') {
                this._verifyWithWrappedData('@notificationNumber', row.Key);                
            } else if (row.Key.toLowerCase() === 'notification title' && row.Value.toLowerCase() === 'random') {
                this._verifyWithWrappedData('@notificationTitle', row.Key);
            } else if (row.Key.toLowerCase() === 'specific product safety issues') {
                cy.get('@productPrimaryHarm').then((productPrimaryHarm) => {
                    const rowValue = row.Value.replace('Random', productPrimaryHarm);
                    const elements = rowValue.split(',');
                    elements.forEach((element) => {
                        this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('contain.text', element);
                    })                    
                })
            } else if (row.Key.toLowerCase() === 'reported by overseas regulator' && row.Value.toLowerCase().includes('random')) {
                cy.get('@reportedOverseasRegulatorCountry').then((country) => {
                    const rowValue = row.Value.replace('Random', country)
                    this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('contain.text', rowValue);
                })
            } else if (row.Key.toLowerCase() === 'number of affected products') {
                cy.get('@productMfrBrandName').then((brand) => {
                    cy.get('@productName').then((product) => {
                        var expText = row.Value.replace('BrandName', brand)
                        expText = expText.replace('ProductName', product)
                        this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('contain.text', expText);
                    })
                })                
            } else if (row.Key.toLowerCase() === 'registered or legal name' && row.Value.toLowerCase() === 'random') {
                this._verifyWithWrappedData('@businessLegalName', row.Key);                                
            } else if (row.Key.toLowerCase() === 'companies house number' && row.Value.toLowerCase() === 'random') {
                this._verifyWithWrappedData('@companiesHouseNumber', row.Key);                
            } else if (row.Key.toLowerCase() === 'address') {
                cy.get('@businessCountry').then((businessCountry) => {
                    const rowValue = row.Value.replace('Random', businessCountry);
                    const elements = rowValue.split(',');
                    elements.forEach((element) => {
                        this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('contain.text', element);
                    })
                })                                
            } else if (row.Key.toLowerCase() === 'risk assessments') {
                cy.get('@productMfrBrandName').then((brand) => {
                    cy.get('@productName').then((product) => {
                        var expText = row.Value.replace('BrandName', brand)
                        expText = expText.replace('ProductName', product)
                        this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('contain.text', expText);
                    })
                })                
            } else if (row.Key.toLowerCase() === 'legislation' && row.Value.toLowerCase() === 'random') {
                this._verifyWithWrappedData('@correctiveActionLegislation', row.Key);               
            } else if (row.Key.toLowerCase() === 'responsible business' && row.Value.toLowerCase() === 'random') {
                this._verifyWithWrappedData('@businessName', row.Key);                
            } else {
                this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('contain.text', row.Value);
            }
        })
    }

    /**
     * Click on "Submit notification" button
     */
    clickSubmitNotificationButton() {
        this.elements.submitNotificationButton().click();
    }

    /**
     * Click on "Save as draft" button
     */
    clickSaveAsDraftButton() {
        this.elements.saveAsDraftButton().click();
    }


    /*************** Private functions *****************/

    /**
     * Private function to validate the stored data is present on the page
     * @param {*} aliasName 
     * @param {*} rowKey 
     */
    _verifyWithWrappedData(aliasName, rowKey) {
        cy.get(aliasName).then((expData) => {
            this.elements.pageContent().find('dt').contains(rowKey).next('dd').should('contain.text', expData);
        })
    }


}

export default PSDSubmitNotificationPage;