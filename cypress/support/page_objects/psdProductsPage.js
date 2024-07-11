require('@cypress/xpath');

class PSDProductsPage
{
    /****************** page objects *****************/

    elements = {
        createProductRecordButton : () => cy.xpath("//a[@href='/products/duplicate-check']", { timeout: 10000 }).should('be.visible')

    }

    /****************** Getters & Setters *****************/

    /**
     * Click on Create a product record button
     */
    clickCreateAProductRecordButton()
    {
        this.elements.createProductRecordButton().click();
    }

}

export default PSDProductsPage;