/// <reference types="cypress" />

import PSDRandomTestDataHelper from "../helper_classes/psdRandomTestDataHelper";
import PSDBasePage from "./psdBasePage";

class PSDCreateBusinessPage {

    /****************** Page objects *****************/

    elements = {
        addNewBusinessButton: () => cy.contains('a', 'Add a new business', { timeout: 10000 }).should('exist'),

        tradingNameField: () => cy.get('input#add-business-details-form-trading-name-field', { timeout: 10000 }).should('exist'),
        legalNameField: () => cy.get('input#add-business-details-form-legal-name-field', { timeout: 10000 }).should('exist'),
        companyNumberField: () => cy.get('input#add-business-details-form-company-number-field', { timeout: 10000 }).should('exist'),
        saveAndContinueButton: () => cy.contains('button', 'Save and continue', { timeout: 10000 }).should('exist'),

        addressLine1Field: () => cy.get('input#add-location-form-address-line-1-field', { timeout: 10000 }).should('exist'),
        addressLine2Field: () => cy.get('input#add-location-form-address-line-2-field', { timeout: 10000 }).should('exist'),
        townField: () => cy.get('input#add-location-form-city-field', { timeout: 10000 }).should('exist'),
        countyField: () => cy.get('input#add-location-form-county-field', { timeout: 10000 }).should('exist'),
        postcodeField: () => cy.get('input#add-location-form-postal-code-field', { timeout: 10000 }).should('exist'),
        countryDropdown: () => cy.get('select#add-location-form-country-field', { timeout: 10000 }).should('exist'),

        contactFullNameField: () => cy.get('input#add-contact-form-name-field', { timeout: 10000 }).should('exist'),
        contactJobTitleField: () => cy.get('input#add-contact-form-job-title-field', { timeout: 10000 }).should('exist'),
        contactEmailField: () => cy.get('input#add-contact-form-email-field', { timeout: 10000 }).should('exist'),
        contactPhoneField: () => cy.get('input#add-contact-form-phone-number-field', { timeout: 10000 }).should('exist'),

        useBusinessDetailsButton: () => cy.contains('button', 'Use business details', { timeout: 10000 }).should('exist'),

        addAnotherBusinessYesRadioButton: () => cy.get('input#search-for-or-add-a-business-form-add-another-business-true-field', { timeout: 10000 }).should('exist'),
        addAnotherBusinessNoRadioButton: () => cy.get('input#search-for-or-add-a-business-form-add-another-business-field', { timeout: 10000 }).should('exist'),
        continueButton: () => cy.contains('button', 'Continue', { timeout: 10000 }).should('exist'),

        addAdditionalBusinessAddAnotherBusinessYesRadioButton: () => cy.get('input#add-another-business-true-field', { timeout: 10000 }).should('exist'),
        addAdditionalBusinessAddAnotherBusinessNoRadioButton: () => cy.get('input#add-another-business-field', { timeout: 10000 }).should('exist')
    }

    /******************** Getters & Setters *******************/

    /**
     * Click on the "Add a new business" button
     */
    clickAddNewBusinessButton() {
        this.elements.addNewBusinessButton().click();
    }

    /**
     * Enter the Trading name for the business
     * @param {*} businessName 
     */
    enterTradingName(businessName) {
        this.elements.tradingNameField().clear();
        if (businessName.toLowerCase() === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var name = 'AutoTestPSDBusiness_' + psdrandomgenerator.generateRandomNumber(5);
            cy.wrap(name).as('businessName');
            this.elements.tradingNameField().type(name);
            cy.log('Business Name = ' + name);
        } else {
            this.elements.tradingNameField().type(businessName);
        }
    }

    /**
     * Enter the usiness legal name
     * @param {*} legalName 
     */
    enterLegalName(legalName) {
        this.elements.legalNameField().clear();
        if (legalName.toLowerCase() === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var name = 'AutoTestPSDBusinessLegal_' + psdrandomgenerator.generateRandomNumber(5);
            cy.wrap(name).as('businessLegalName');
            this.elements.legalNameField().type(name);
            cy.log('Business Legal Name = ' + name);
        } else {
            this.elements.legalNameField().type(legalName);
        }
    }

    /**
     * Enter the Companies house number
     * @param {*} companyNumber 
     */
    enterCompaniesHouseNumber(companyNumber) {
        this.elements.companyNumberField().clear();
        if (companyNumber.toLowerCase() === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var number = psdrandomgenerator.generateRandomNumber(10);
            cy.wrap(number).as('companiesHouseNumber');
            this.elements.companyNumberField().type(number);
            cy.log('Companies house number = ' + number);
        } else {
            this.elements.companyNumberField().type(companyNumber);
        }
    }

    /**
     * Click on "Save and continue" button
     */
    clickSaveAndContinue() {
        this.elements.saveAndContinueButton().click();
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
                        cy.wrap(options[randomIndex].text).as('businessCountry');
                        cy.log('Business country = ' + options[randomIndex].text);
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
     * Click on Use business details button
     */
    clickUseBusinessDetails() {
        this.elements.useBusinessDetailsButton().click();
    }

    /**
     * Check the checkbox for the given business role
     * @param {*} role 
     */
    checkBusinessRoleCheckbox(role) {
        PSDBasePage.clickRadioButtonForTheLabelText(role);
    }

    /**
     * Click on the radio button for the given online marketplace name
     * @param {*} name 
     */
    clickOnlineMarketplaceName(name) {
        PSDBasePage.clickRadioButtonForTheLabelText(name);
    }

    /**
     * Select "Yes" for add another business and click continue
     */
    clickYesAddAnotherBusinessAndContinue() {
        this.elements.addAnotherBusinessYesRadioButton().click();
        this.elements.continueButton().click();
    }

    /**
     * Select "No" for add another business and click continue
     */
    clickNoAddAnotherBusinessAndContinue() {
        this.elements.addAnotherBusinessNoRadioButton().click();
        this.elements.continueButton().click();
    }   
    
    /**
     * Select "Yes" for add another business for adding additional business and click continue
     */
    clickYesAddAnotherBusinessForAdditionalBusinessAndContinue() {
        this.elements.addAdditionalBusinessAddAnotherBusinessYesRadioButton().click();
        this.elements.continueButton().click();
    }

    /**
     * Select "No" for add another business for adding additional business and click continue
     */
    clickNoAddAnotherBusinessForAdditionalBusinessAndContinue() {
        this.elements.addAdditionalBusinessAddAnotherBusinessNoRadioButton().click();
        this.elements.continueButton().click();
    }


    /************* Public Methods ***************/

    /**
     * Add Business details
     * @param {*} dataTable 
     */
    addBusinessDetails(dataTable) {
        dataTable.hashes().forEach((row) => {
            this.enterTradingName(row.TradingName);
            this.enterLegalName(row.LegalName);
            this.enterCompaniesHouseNumber(row.CompanyNumber);
        })
        this.clickSaveAndContinue();
    }

    /**
     * Add the Business address
     * @param {*} dataTable 
     */
    addBusinessAddress(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            if (headers.includes('AddressLine1') && row.AddressLine1) {
                this.elements.addressLine1Field().clear();
                this.elements.addressLine1Field().type(row.AddressLine1);
            } 
            if (headers.includes('AddressLine2') && row.AddressLine2) {
                this.elements.addressLine2Field().clear();
                this.elements.addressLine2Field().type(row.AddressLine2);
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
        })        
        this.clickSaveAndContinue();
    }

    /**
     * Add Business contact details
     * @param {*} dataTable 
     */
    addBusinessContactDetails(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            if (headers.includes('ContactFullName') && row.ContactFullName) {
                this.elements.contactFullNameField().clear();
                this.elements.contactFullNameField().type(row.ContactFullName);
            } 
            if (headers.includes('ContactJobTitle') && row.ContactJobTitle) {
                this.elements.contactJobTitleField().clear();
                this.elements.contactJobTitleField().type(row.ContactJobTitle);
            }
            if (headers.includes('ContactEmail') && row.ContactEmail) {
                this.elements.contactEmailField().clear();
                this.elements.contactEmailField().type(row.ContactEmail);
            }
            if (headers.includes('ContactPhone') && row.ContactPhone) {
                this.elements.contactPhoneField().clear();
                this.elements.contactPhoneField().type(row.ContactPhone);
            }            
        })        
        this.clickSaveAndContinue();
    }

    /**
     * Add the business's role
     * @param {*} role 
     */
    addBusinessRole(dataTable) {
        dataTable.hashes().forEach((row) => {
            this.checkBusinessRoleCheckbox(row.BusinessRole);

            if (row.BusinessRole.toLowerCase() === 'online marketplace') {
                this.clickOnlineMarketplaceName(row.OnlineMarketplaceName);
            }
        })
        this.clickSaveAndContinue();
    }


}

export default PSDCreateBusinessPage;