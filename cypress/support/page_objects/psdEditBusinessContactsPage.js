/// <reference types="cypress" />

import PSDBasePage from "./psdBasePage";

class PSDEditBusinessContactsPage {

    /****************** Page objects *****************/

    elements = {
        contactsNameField: () => cy.get('input#contact-name-field', { timeout: 10000 }).should('exist'),
        contactsEmailField: () => cy.get('input#contact-email-field', { timeout: 10000 }).should('exist'),
        contactsTelephoneField: () => cy.get('input#contact-phone-number-field', { timeout: 10000 }).should('exist'),
        contactsJobTitleField: () => cy.get('input#contact-job-title-field', { timeout: 10000 }).should('exist'),

        saveButton: () => cy.contains('button', 'Save', { timeout: 10000 }).should('exist'),

        removeContactButton: () => cy.contains('button', 'Remove contact', { timeout: 10000 }).should('exist')
    }

    /******************** Getters & Setters *******************/

    /**
     * Click on Save button
     */
    clickSaveButton() {
        this.elements.saveButton().click();
    }

    /**
     * Add new business contact details
     * @param {*} dataTable 
     */
    addBusinessContacts(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {            
            if (headers.includes('ContactFullName') && row.ContactFullName) {
                this.elements.contactsNameField().clear();
                this.elements.contactsNameField().type(row.ContactFullName);
            }
            if (headers.includes('ContactEmail') && row.ContactEmail) {
                this.elements.contactsEmailField().clear();
                this.elements.contactsEmailField().type(row.ContactEmail);
            }
            if (headers.includes('ContactPhone') && row.ContactPhone) {
                this.elements.contactsTelephoneField().clear();
                this.elements.contactsTelephoneField().type(row.ContactPhone);
            }
            if (headers.includes('ContactJobTitle') && row.ContactJobTitle) {
                this.elements.contactsJobTitleField().clear();
                this.elements.contactsJobTitleField().type(row.ContactJobTitle);
            }
        })
        this.clickSaveButton();
    }

    /**
     * Edit the given business contact details
     * @param {*} contactName 
     * @param {*} dataTable 
     */
    editBusinessContact(contactName, dataTable) {
        // Find and click Edit contact link using the contact name
        cy.contains('th', contactName)
            .closest('div')
            .find('a')
            .contains('Edit contact')
            .should('exist')
            .click();

        this.addBusinessContacts(dataTable);
    }

    /**
     * Remove given business contact
     * @param {*} contactName 
     */
    removeBusinessContact(contactName) {
        // Find and click Remove contact link using the contact name
        cy.contains('th', contactName)
            .closest('div')
            .find('a')
            .contains('Remove contact')
            .should('exist')
            .click();

        this.elements.removeContactButton().click();
    }

}

export default PSDEditBusinessContactsPage;