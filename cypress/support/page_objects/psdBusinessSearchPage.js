/// <reference types="cypress" />

import PSDBasePage from "../page_objects/psdBasePage";

class PSDBusinessSearchPage {

    /****************** page objects *****************/

    elements = {
        searchTextField: () => cy.get('input#q', { timeout: 10000 }).should('exist'),
        applyButton : () => cy.get('input[value="Apply"]', { timeout: 10000 }).should('exist'),
        searchResultsText : () => cy.get('div.govuk-grid-column-full > p.govuk-body', { timeout: 10000 }).should('exist'),
        businessSearchResultsTableBody : () => cy.get('tbody.govuk-table__body', { timeout: 10000 }).should('exist'),
        businessSearchResultsTableRow : () => cy.get('tbody.govuk-table__body > tr', { timeout: 10000 }).should('exist')

    }



    /******************** Getter & Setters *******************/

    /**
     * Search for the given business
     * @param {*} searchText 
     */
    searchForBusiness(searchText) {
        this.elements.searchTextField().clear();
        if (searchText.toLowerCase() === 'random') {
            cy.get('@businessName').then((name) => {
                this.elements.searchTextField().type(name);
            })            
        } else {
            this.elements.searchTextField().type(searchText);
        }
        this.elements.searchTextField().type('{enter}');  
    }

    /**
     * Set search filter for business search
     * @param {*} dataTable 
     */
    setBusinessSearchFilters(dataTable) {
        dataTable.hashes().forEach((row) => {
            cy.contains('span', row.FilterType, { timeout: 10000 }).should('exist').click();
            PSDBasePage.checkCheckboxForTheLabelText(row.FilterLabel);           
        })
    }

    /**
     * Click on 'Apply' button for the search filters
     */
    clickApplySearchFilters() {
        this.elements.applyButton().click();
    }

    /**
     * Verify that the business search results text match the regular expression
     */
    verifyBusinessSearchResultsTextWithRegex() {
        const regex = new RegExp(`^\\d+ businesses matching selected filters were found\\.$`);
        this.elements.searchResultsText().invoke('text') 
            .then((text) => {
                const normalizedText = text.replace(/\s+/g, ' ').trim(); 
                expect(normalizedText).to.match(regex);
        });
    }

    /**
     * Verify that the given text is displayed for the business search results
     * @param {*} expText 
     */
    verifyBusinessSearchResultsText(expText) {
        this.elements.searchResultsText().invoke('text') 
            .then((text) => {
                const normalizedText = text.replace(/\s+/g, ' ').trim(); 
                expect(normalizedText).to.contain(expText);
        });
    }

    /**
     * Verify that the Business search results table contains given number of rows
     * @param {*} expNumberOfRows 
     */
    verifyBusinessSearchResultTableBodyContainsRows(condition, expNumberOfRows) {
        this.elements.businessSearchResultsTableBody()
            .find('tr')
            .should(condition, expNumberOfRows);
    }

    /**
     * Verify that the given data is present in the business search results row
     * @param {*} businessName 
     * @param {*} dataTable 
     */
    verifyTheGivenDataInBusinessSearchResultsRow(businessName, dataTable) {
        let businessRow;
        if (businessName.toLowerCase() === 'random') {
            cy.get('@businessName').then((name) => {
                businessRow = this.elements.businessSearchResultsTableBody().contains('a', name).closest('.govuk-table__row');
                dataTable.hashes().forEach((row) => {
                    if (row.Key.toLowerCase() === 'companynumber') {
                        cy.get('@companiesHouseNumber').then((number) => {
                            businessRow.should('contain.text', number);
                        })
                    } else {
                        businessRow.should('contain.text', row.Key);
                    }
                })
            })            
        } else {
            businessRow = this.elements.businessSearchResultsTableBody().contains('a', businessName).closest('.govuk-table__row');
            dataTable.hashes().forEach((row) => {
                if (row.Key.toLowerCase() === 'companynumber') {
                    cy.get('@companiesHouseNumber').then((number) => {
                        businessRow.should('contain.text', number);
                    })
                } else {
                    businessRow.should('contain.text', row.Key);
                }
            })
        }        
    }




}

export default PSDBusinessSearchPage;