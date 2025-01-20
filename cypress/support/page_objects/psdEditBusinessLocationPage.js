/// <reference types="cypress" />

import PSDBasePage from "./psdBasePage";


class PSDEditBusinessLocationPage {

    /****************** Page objects *****************/

    elements ={
        locationNamefield: () => cy.get('input#location-name-field', { timeout: 10000 }).should('exist'),

        buildingAndStreetLine1Field: () => cy.get('input#location-address-line-1-field', { timeout: 10000 }).should('exist'),
        buildingAndStreetLine2Field: () => cy.get('input#location-address-line-2-field', { timeout: 10000 }).should('exist'),
        townField: () => cy.get('input#location-city-field', { timeout: 10000 }).should('exist'),
        countyField: () => cy.get('input#location-county-field', { timeout: 10000 }).should('exist'),
        postcodeField: () => cy.get('input#location-postal-code-field', { timeout: 10000 }).should('exist'),
        countryDropdown: () => cy.get('select#location-country-field', { timeout: 10000 }).should('exist'),

        saveButton: () => cy.contains('input', 'Save', { timeout: 10000 }).should('exist'),

        removeLocationButton: () => cy.contains('input', 'Remove location', { timeout: 10000 }).should('exist')
    }

    /******************** Getters & Setters *******************/

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

    /**
     * Click on Remove location button
     */
    removeBusinessLocation(locationName) {
        // Find and click Remove location link using the location name
        cy.contains('th', locationName)
            .closest('div')
            .find('a')
            .contains('Remove location')
            .should('exist')
            .click();

        this.elements.removeLocationButton().click();
    }

    /************* Public Methods ***************/

    /**
     * Add a new business location
     * @param {*} dataTable 
     */
    addBusinessLocation(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {   
            if (headers.includes('LocationName') && row.LocationName) {
                this.elements.locationNamefield().clear();
                this.elements.locationNamefield().type(row.LocationName);
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
        })
        this.clickSaveButton();
    }

    /**
     * Edit the given business location
     * @param {*} locationName 
     * @param {*} dataTable 
     */
    editBusinessLocation(locationName, dataTable) {
        // Find and click Remove location link using the location name
        cy.contains('th', locationName)
            .closest('div')
            .find('a')
            .contains('Edit location')
            .should('exist')
            .click();

        this.addBusinessLocation(dataTable);
    }
    
}

export default PSDEditBusinessLocationPage;