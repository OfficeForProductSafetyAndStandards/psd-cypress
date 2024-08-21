/// <reference types="cypress" />

class PSDNotificationsPage
{

    /****************** page objects *****************/

    elements = {
        createNewNotificationButton: () => cy.contains('a', 'Create a new product safety notification', { timeout: 10000 }).should('exist'),
        pageContent : () => cy.get('section#page-content', { timeout: 10000 }).should('exist')

    }

    /******************** Getters & Setters *******************/

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


}

export default PSDNotificationsPage;