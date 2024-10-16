/// <reference types="cypress" />

class PSDCommonPage {

    /****************** page objects *****************/

    elements = {
        pageBody: () => cy.get('body', { timeout: 10000 }).should('exist')

    }

    /******************** Getter & Setters *******************/

    /**
     * Assert that the given text is present in the page body
     * @param {*} expText 
     */
    assertTextPresentOnPage(expText) {
        if (expText.toLowerCase() === 'notificationname') {
            cy.get('@productMfrBrandName').then((brand) => {
                cy.get('@productName').then((product) => {
                    this.elements.pageBody().should('contain.text', brand + ' ' + product);
                })
            })
        } else if (expText.toLowerCase() === 'notificationnumber') {
            cy.get('@notificationNumber').then((number) => {
                this.elements.pageBody().should('contain.text', number);
            })
        } else {
            this.elements.pageBody().should('contain.text', expText);
        }        
    }

    /**
     * Verify that a text with the given regex pattern is present on the page body
     * @param {*} regexPattern 
     */
    assertTextWithRegexPatternPresentOnPage(regexPattern) {
        const regex = new RegExp(regexPattern);
        this.elements.pageBody().invoke('text').should('match', regex);
    }

}

export default PSDCommonPage;