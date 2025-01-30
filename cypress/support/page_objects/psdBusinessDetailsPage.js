/// <reference types="cypress" />

import PSDBasePage from "./psdBasePage";

class PSDBusinessDetailPage {

    /****************** page objects *****************/

    elements = {
        fulldetailsTab:  () => cy.get('a#tab_full-detail', { timeout: 10000 }).should('exist'),
        fulldetailsTabContent: () => cy.get('div#full-detail', { timeout: 10000 }).should('exist'),
        locationsTab: () => cy.get('a[id*="tab_locations"]', { timeout: 10000 }).should('exist'),
        locationsTabContent: () => cy.get('div[id*="locations"]', { timeout: 10000 }).should('exist'),
        contactsTab: () => cy.get('a[id*="tab_contacts"]', { timeout: 10000 }).should('exist'),
        contactsTabContent: () => cy.get('div[id*="contacts"]', { timeout: 10000 }).should('exist'),
        notificationsTab: () => cy.get('a[id*="tab_notifications"]', { timeout: 10000 }).should('exist'),
        notificationsTabContent: () => cy.get('div[id*="notifications"]', { timeout: 10000 }).should('exist'),
        productsTab: () => cy.get('a[id*="tab_products"]', { timeout: 10000 }).should('exist'),
        productsTabContent: () => cy.get('div[id*="products"]', { timeout: 10000 }).should('exist')

    }

    /******************** Getter & Setters *******************/

    /**
     * Click on Full details tab
     */
    clickFulldetailsTab() {
        this.elements.fulldetailsTab().click();
    }

    /**
     * Assert that the given business full details are displayed on the page
     * @param {*} dataTable 
     */
    assertBusinessFullDetails(dataTable) {        
        dataTable.hashes().forEach((row) => {
            if (row.Key.toLowerCase() == 'trading name' && row.Value.toLowerCase() == 'random') {
                this._verifyBusinessFulldetailWithWrappedData('@businessName', row.Key);
            } else if (row.Key.toLowerCase() === 'registered or legal name' && row.Value.toLowerCase() === 'random') {
                this._verifyBusinessFulldetailWithWrappedData('@businessLegalName', row.Key);
            } else if (row.Key.toLowerCase() === 'company number' && row.Value.toLowerCase() === 'random') {
                this._verifyBusinessFulldetailWithWrappedData('@companiesHouseNumber', row.Key);
            } else {
                this.elements.fulldetailsTabContent().find('dt').contains(row.Key).next('dd').should('contain.text', row.Value);
            }            
        })
    }

    /**
     * Assert that the given edited business full details are displayed on the page
     * @param {*} dataTable 
     */
    assertEditedBusinessFullDetails(dataTable) {        
        dataTable.hashes().forEach((row) => {
            if (row.Key.toLowerCase() == 'trading name' && row.Value.toLowerCase() == 'random') {
                this._verifyBusinessFulldetailWithWrappedData('@editedBusinessTradingName', row.Key);
            } else if (row.Key.toLowerCase() === 'registered or legal name' && row.Value.toLowerCase() === 'random') {
                this._verifyBusinessFulldetailWithWrappedData('@editedBusinessLegalName', row.Key);
            } else if (row.Key.toLowerCase() === 'company number' && row.Value.toLowerCase() === 'random') {
                this._verifyBusinessFulldetailWithWrappedData('@editedCompaniesHouseNumber', row.Key);
            } else {
                this.elements.fulldetailsTabContent().find('dt').contains(row.Key).next('dd').should('contain.text', row.Value);
            }            
        })
    }

    /**
     * Click on Locations tab
     */
    clickLocationsTab() {
        this.elements.locationsTab().click();
    }

    /**
     * Assert the given business locations details
     * @param {*} dataTable 
     */
    assertBusinessLocationsDetails(dataTable) {
        dataTable.hashes().forEach((row) => {
            this.elements.locationsTabContent().find('th').contains(row.Key).next('td').should('contain.text', row.Value);
        })
    }

    /**
     * Click on Contacts tab
     */
    clickContactsTab() {
        this.elements.contactsTab().click();
    }

    /**
     * Assert the given business Contacts details
     * @param {*} dataTable 
     */
    assertBusinessContactsDetails(dataTable) {
        dataTable.hashes().forEach((row) => {
            this.elements.contactsTabContent().should('contain.text', row.Text);
        })
    }

    /**
     * Click on Notifications tab
     */
    clickNotificationsTab() {
        this.elements.notificationsTab().click();
    }

    /**
     * Assert the given business Notifications details
     * @param {*} dataTable 
     */
    assertBusinessNotificationsDetails(dataTable) {
        dataTable.hashes().forEach((row) => {
            if (row.Key.toLowerCase() == 'notification id' && row.Value.toLowerCase() == 'random') {
                this._verifyBusinessNotificationsWithWrapperData('@notificationNumber', row.Key);
            } else if (row.Key.toLowerCase() == 'title' && row.Value.toLowerCase() == 'random') {
                this._verifyBusinessNotificationsWithWrapperData('@notificationTitle', row.Key);
            } else {
                this.elements.notificationsTabContent().find('dt').contains(row.Key).next('dd').should('contain.text', row.Value);
            }
        })
    }

    /**
     * Click on Products tab
     */
    clickProductsTab() {
        this.elements.productsTab().click();
    }

    /**
     * Assert the given business Products details
     * @param {*} dataTable 
     */
    assertBusinessProductsDetails(dataTable) {
        dataTable.hashes().forEach((row) => {
            if (row.Key.toLowerCase() == 'product id' && row.Value.toLowerCase() == 'random') {
                this._verifyBusinessProductsWithWrapperData('@productNumber', row.Key);
            } else if (row.Key.toLowerCase() == 'name' && row.Value.toLowerCase() == 'random') {
                this._verifyBusinessProductsWithWrapperData('@productName', row.Key);
            } else if (row.Key.toLowerCase() == 'brand' && row.Value.toLowerCase() == 'random') {
                this._verifyBusinessProductsWithWrapperData('@productMfrBrandName', row.Key);
            } else {
                this.elements.productsTabContent().find('dt').contains(row.Key).next('dd').should('contain.text', row.Value);
            }
        })
    }

    /*************** Private functions *****************/

    /**
     * Private function to validate the stored data is present on the Business Full details tab
     * @param {*} aliasName 
     * @param {*} rowKey 
     */
    _verifyBusinessFulldetailWithWrappedData(aliasName, rowKey) {
        cy.get(aliasName).then((expData) => {
            this.elements.fulldetailsTabContent().find('dt').contains(rowKey).next('dd').should('contain.text', expData);
        })
    }

    /**
     * Private function to validate the stored data is present on Business Notifications tab
     * @param {*} aliasName 
     * @param {*} rowKey 
     */
    _verifyBusinessNotificationsWithWrapperData(aliasName, rowKey) {
        cy.get(aliasName).then((expData) => {
            this.elements.notificationsTabContent().find('dt').contains(rowKey).next('dd').should('contain.text', expData);
        })
    }

    /**
     * Private function to validate the stored data is present on Business Products tab
     * @param {*} aliasName 
     * @param {*} rowKey 
     */
    _verifyBusinessProductsWithWrapperData(aliasName, rowKey) {
        cy.get(aliasName).then((expData) => {
            this.elements.productsTabContent().find('dt').contains(rowKey).next('dd').should('contain.text', expData);
        })
    }

}

export default PSDBusinessDetailPage;