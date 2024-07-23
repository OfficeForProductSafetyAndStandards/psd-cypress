require('@cypress/xpath');

class PSDNotificationsPage
{

    /****************** page objects *****************/

    elements = {
        createNewNotificationButton: () => cy.xpath("//a[contains(text(), 'Create a new product safety notification')]", { timeout: 10000 }).should('exist')

    }

    /******************** Getters & Setters *******************/

    /**
     * Click on the Create a new product safety notification button
     */
    clickCreateNewProductSafetyNotification() {
        this.elements.createNewNotificationButton().click();
    }


}

export default PSDNotificationsPage;