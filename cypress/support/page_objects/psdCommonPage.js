require('@cypress/xpath');

class PSDCommonPage
{

    /****************** page objects *****************/

    elements = {
        pageBody : () => cy.xpath("//body", { timeout: 10000 }).should('exist')

    }

    /******************** Getter & Setters *******************/

    /**
     * Assert that the given text is present in the page body
     * @param {*} expText 
     */
    assertTextPresentOnPage(expText) {
        this.elements.pageBody().should('contain.text', expText);
    }

    /**
     * Verify that a text with the given regex pattern is present on the page body
     * @param {*} regexPattern 
     */
    assertTextWithRegexPatternPresentOnPage(regexPattern) {
        const regex = new RegExp(regexPattern);
        this.elements.pageBody().invoke('text').should('match', regex);
    }

    /**
     * Method to click on the givem link in Create a product safety notification page
     * @param {*} linkText 
     */
    followLink(linkText) {
        cy.contains(linkText).click();
    }



}

export default PSDCommonPage;