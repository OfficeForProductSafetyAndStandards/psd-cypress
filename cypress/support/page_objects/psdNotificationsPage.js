/// <reference types="cypress" />

import PSDBasePage from "./psdBasePage";

class PSDNotificationsPage
{

    /****************** page objects *****************/

    elements = {
        createNewNotificationButton: () => cy.contains('a', 'Create a new product safety notification', { timeout: 10000 }).should('exist'),
        pageContent : () => cy.get('section#page-content', { timeout: 10000 }).should('exist'),
        searchTextField : () => cy.get('input#q', { timeout: 10000 }).should('exist'),
        searchButton : () => cy.get('button.g-button.g-!-margin-bottom-0', { timeout: 10000 }).should('exist'),
        notificationSearchResultsTable : () => cy.get('div[aria-label="Notifications"]>table', { timeout: 10000 }).should('exist'),
        applyButton : () => cy.get('input[value="Apply"]', { timeout: 10000 }).should('exist'),
        notificationOwnerOtherPersonOrTeamDropdown : () => cy.get('select#case_owner_is_someone_else_id', { timeout: 10000 }).should('exist'),
        teamsAddedToTheNotificationOthersTeamNameDropdown : () => cy.get('select#case_owner_is_someone_else_id', { timeout: 10000 }).should('exist')

    }

    /*************** Properties ********************/

    notificationSearchResultsNotificationOwnerCss = 'td[headers*="caseowner"]';

    /******************** Getters & Setters *******************/
T
    /**
     * Click on the Create a new product safety notification button
     */
    clickCreateNewProductSafetyNotification() {
        this.elements.createNewNotificationButton().click();
        cy.url().then((currentUrl) => {
            const number = currentUrl.match(/\/notifications\/(\d+-\d+)\//)[1];
            cy.wrap(number).as('notificationNumber');
        })
    }

    /**
     * Click on the "Make changes" link for the given notification title
     * @param {*} title 
     */
    clickMakeChangesForGivenNotificationTitle(title) {
        this.elements.pageContent().find('td').contains(title).parent().find('td').next().find('a').contains('Make changes').click();
    }

    /**
     * Click on the "Delete" link for the given notification title
     * @param {*} title 
     */
    clickDeleteLinkForGivenNotificationTitle(title) {
        this.elements.pageContent().find('td').contains(title).parent().find('td').next().find('a').contains('Delete').click();
    }

    /**
     * Set notification search filters
     * @param {*} dataTable 
     */
    setNotificationSearchFilters(dataTable) {
        dataTable.hashes().forEach((row) => {
            cy.contains('span', row.FilterType, { timeout: 10000 }).should('exist').click();
            
            if (row.FilterType.toLowerCase() === 'notification owner' & row.FilterLabel.toLowerCase().includes('others')) {
                const filterArray = FilterLabel.split(',').map(item => item.trim());
                PSDBasePage.checkCheckboxForTheLabelText(filterArray[0]);
                this.selectNotificationOwnerOtherPersonOrTeamName(filterArray[1]);
            } else if (row.FilterType.toLowerCase() === 'teams added to the notification' & row.FilterLabel.toLowerCase().includes('others')) {
                const filterArray = FilterLabel.split(',').map(item => item.trim());
                PSDBasePage.checkCheckboxForTheLabelText(filterArray[0]);
                this.selectTeamsAddedToTheNotificationOthersTeamName(filterArray[1]);
            } else {
                PSDBasePage.checkCheckboxForTheLabelText(row.FilterLabel);
            }
        })        
    }

    /**
     * Search for the give notification
     * @param {*} searchText 
     */
    searchForNotification(searchText) {
        this.elements.searchTextField().clear();
        if (searchText.toLowerCase() === 'random') {
            cy.get('@notificationTitle').then((title) => {
                this.elements.searchTextField().type(title);
            })            
        } else {
            this.elements.searchTextField().type(searchText);
        }
        this.elements.searchTextField().type('{enter}');        
    }

    /**
     * Search for the given notification using the filters
     * @param {*} dataTable 
     */
    searchForNotificationUsingFilters(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            if (headers.includes('FilterType') && row.FilterType) {
                cy.contains('span', row.FilterType, { timeout: 10000 }).should('exist').click();
                PSDBasePage.checkCheckboxForTheLabelText(row.FilterLabel);
            }     
            this.searchForNotification(row.NotificationTitle);       
        })
    }

    /**
     * Verify that the given text is present in the given notification row
     * @param {*} notificationTitle 
     * @param {*} dataTable 
     */
    verifyTheGivenDataInNotificationRow(notificationTitle, dataTable) {
        let notificationRow;
        if (notificationTitle.toLowerCase() === 'random') {
            cy.get('@notificationTitle').then((title) => {
                notificationRow = this.elements.notificationSearchResultsTable().contains('a', title).closest('.govuk-table__body');
                dataTable.hashes().forEach((row) => {
                    if (row.Key.toLowerCase() === 'notificationnumber') {
                        cy.get('@notificationNumber').then((number) => {
                            notificationRow.should('contain.text', number);
                        })
                    } else if (row.Key.toLowerCase() === 'productprimaryharm') {
                        cy.get('@productPrimaryHarm').then((harm) => {
                            notificationRow.should('contain.text', harm);
                        })
                    } else {
                        notificationRow.should('contain.text', row.Key);
                    }
                })
            })            
        } else {
            notificationRow = this.elements.notificationSearchResultsTable().contains('a', notificationTitle).closest('.govuk-table__body');
            dataTable.hashes().forEach((row) => {
                if (row.Key.toLowerCase() === 'notificationnumber') {
                    cy.get('@notificationNumber').then((number) => {
                        notificationRow.should('contain.text', number);
                    })
                } else if (row.Key.toLowerCase() === 'productprimaryharm') {
                    cy.get('@productPrimaryHarm').then((harm) => {
                        notificationRow.should('contain.text', harm);
                    })
                } else {
                    notificationRow.should('contain.text', row.Key);
                }
            })
        }        
    }

    /**
     * Click on 'Apply' button for the search filters
     */
    clickApplySearchFilters() {
        this.elements.applyButton().click();
    }

    /**
     * Verify that all the notification search results rows contains the given text
     * @param {*} dataTable 
     */
    verifyGivenDataInTheNotificationSearchResultsTable(dataTable) {
        const expectedTexts = dataTable.hashes().map(row => row.ExpectedText);

        expectedTexts.forEach((expectedText) => {
            this.elements.notificationSearchResultsTable().each(($tbody) => {
                expect($tbody.text().trim()).to.contain(expectedText);
            })
        })
    }

    /**
     * Verify that the given Notification Owners text is displayed in the search results rows
     * @param {*} dataTable 
     */
    verifyGivenNotificationOwnerInTheSearchResultsRow(dataTable) {
        const expectedTexts = dataTable.hashes().map(row => row.ExpectedText);

        // Ensure the number of expected texts matches the number of rows
        cy.get(this.notificationSearchResultsNotificationOwnerCss).should('have.length', expectedTexts.length)
            .each(($td, index) => {
            cy.wrap($td).should('contain.text', expectedTexts[index].trim());
        });
    }

    /**
     * Select given the person or team name from the Notification owner others dropdown
     * @param {*} name 
     */
    selectNotificationOwnerOtherPersonOrTeamName(name) {
        this.elements.notificationOwnerOtherPersonOrTeamDropdown().select(name);
    }

    /**
     * Select the given team name from the Teams added to the notification others team name
     * @param {*} teamName 
     */
    selectTeamsAddedToTheNotificationOthersTeamName(teamName) {
        this.elements.teamsAddedToTheNotificationOthersTeamNameDropdown().select(teamName);
    }


}

export default PSDNotificationsPage;