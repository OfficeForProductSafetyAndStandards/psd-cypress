/// <reference types="cypress" />

import PSDRandomTestDataHelper from "../helper_classes/psdRandomTestDataHelper";
import PSDBasePage from "./psdBasePage";

class PSDEditBusinessFullDetailsPage {

    /****************** Page objects *****************/

    elements = {
        tradingNameField: () => cy.get('input#business-trading-name-field', { timeout: 10000 }).should('exist'),
        legalNameField: () => cy.get('input#business-legal-name-field', { timeout: 10000 }).should('exist'),
        companyNumberField: () => cy.get('input#business-company-number-field', { timeout: 10000 }).should('exist'),
        
        buildingAndStreetLine1Field: () => cy.get('input#business-locations-attributes-0-address-line-1-field', { timeout: 10000 }).should('exist'),
        buildingAndStreetLine2Field: () => cy.get('input#business-locations-attributes-0-address-line-2-field', { timeout: 10000 }).should('exist'),
        townField: () => cy.get('input#business-locations-attributes-0-city-field', { timeout: 10000 }).should('exist'),
        countyField: () => cy.get('input#business-locations-attributes-0-county-field', { timeout: 10000 }).should('exist'),
        postcodeField: () => cy.get('input#business-locations-attributes-0-postal-code-field', { timeout: 10000 }).should('exist'),
        countryDropdown: () => cy.get('select#business-locations-country-field', { timeout: 10000 }).should('exist'),

        contactsNameField: () => cy.get('input#business-contacts-attributes-0-name-field', { timeout: 10000 }).should('exist'),
        contactsEmailField: () => cy.get('input#business-contacts-attributes-0-email-field', { timeout: 10000 }).should('exist'),
        contactsTelephoneField: () => cy.get('input#business-contacts-attributes-0-phone-number-field', { timeout: 10000 }).should('exist'),
        contactsJobTitleField: () => cy.get('input#business-contacts-attributes-0-job-title-field', { timeout: 10000 }).should('exist'),

        saveButton: () => cy.contains('button', 'Save', { timeout: 10000 }).should('exist')
    }

    /******************** Getters & Setters *******************/

    /**
     * Enter business trading name in the edit trading name field
     * @param {*} tradingName 
     */
    editBusinessTradingName(tradingName) {
        this.elements.tradingNameField().clear();
        if (tradingName.toLowerCase() === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var name = 'EditedBusinessTradingName_' + psdrandomgenerator.generateRandomNumber(5);
            cy.wrap(name).as('EditedBusinessTradingName');
            this.elements.tradingNameField().type(name);
            cy.log('Edited Business Trading name = ' + name);
        } else {
            this.elements.tradingNameField().type(tradingName);
        }
    }

    /**
     * Enter the Business legal name in legal name field
     * @param {*} legalName 
     */
    editBusinessLegalName(legalName) {
        this.elements.legalNameField().clear();
        if (legalName.toLowerCase() === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var name = 'EditedBusinessLegalName_' + psdrandomgenerator.generateRandomNumber(5);
            cy.wrap(name).as('EditedBusinessLegalName');
            this.elements.legalNameField().type(name);
            cy.log('Edited Business Legal name = ' + name);
        } else {
            this.elements.legalNameField().type(legalName);
        }
    }

    /**
     * Enter the Companies house number
     * @param {*} companyNumber 
     */
    editCompaniesHouseNumber(companyNumber) {
        this.elements.companyNumberField().clear();
        if (companyNumber.toLowerCase() === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var number = psdrandomgenerator.generateRandomNumber(10);
            cy.wrap(number).as('editedCompaniesHouseNumber');
            this.elements.companyNumberField().type(number);
            cy.log('Edited Companies house number = ' + number);
        } else {
            this.elements.companyNumberField().type(companyNumber);
        }
    }

    /**
     * Select the country from the country dropdown
     * @param {*} country 
     */
    selectCountry(country) {
        if (country.toLowerCase() === 'random') {
            this.elements.countryDropdown().then($dropdown => {
                cy.wrap($dropdown).find('option').then(options => {
                    if (options.length > 0) {
                        const randomIndex = Math.floor(Math.random() * options.length);
                        cy.wrap($dropdown).select(options[randomIndex].value);
                        cy.wrap(options[randomIndex].text).as('editedBusinessCountry');
                        cy.log('Edited Business country = ' + options[randomIndex].text);
                    } else {
                        throw new Error('No options available in the business address country dropdown');
                    }
                })
            })
        } else {
            this.elements.countryDropdown().select(country);
        }
    }

    /**
     * Click on Save button
     */
    clickSaveButton() {
        this.elements.saveButton().click();
    }

    /************* Public Methods ***************/

    /**
     * Edit the Full details for a business
     * @param {*} dataTable 
     */
    editFullBusinessDetails(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            if (headers.includes('TradingName') && row.TradingName) {
                this.editBusinessTradingName(row.TradingName);
            }
            if (headers.includes('LegalName') && row.LegalName) {
                this.editBusinessLegalName(row.LegalName);
            }
            if (headers.includes('CompanyNumber') && row.CompanyNumber) {
                this.editCompaniesHouseNumber(row.CompanyNumber);
            }
            if (headers.includes('AddressLine1') && row.AddressLine1) {
                this.elements.buildingAndStreetLine1Field().clear();
                this.elements.buildingAndStreetLine1Field().type(row.AddressLine1);
            }
            if (headers.includes('AddressLine2') && row.AddressLine2) {
                this.elements.buildingAndStreetLine2Field().clear();
                this.elements.buildingAndStreetLine2Field().type(row.AddressLine2);
            }
            if (headers.includes('Town') && row.Town) {
                this.elements.townField().clear();
                this.elements.townField().type(row.Town);
            }
            if (headers.includes('County') && row.County) {
                this.elements.countyField().clear();
                this.elements.countyField().type(row.County);
            }
            if (headers.includes('Postcode') && row.Postcode) {
                this.elements.postcodeField().clear();
                this.elements.postcodeField().type(row.Postcode);
            }
            if (headers.includes('Country') && row.Country) {
                this.selectCountry(row.Country);
            }
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

}

export default PSDEditBusinessFullDetailsPage;