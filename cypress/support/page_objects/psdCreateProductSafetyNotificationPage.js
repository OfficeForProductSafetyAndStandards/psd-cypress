require('@cypress/xpath');

class PSDCreateProductSafetyNotificationPage
{

    /****************** page objects *****************/

    elements = {
        createProductRecordButton : () => cy.xpath("//a[@href='/products/duplicate-check']", { timeout: 10000 }).should('be.visible')

    }

    /****************** Getters & Setters *****************/

    

}

export default PSDCreateProductSafetyNotificationPage;