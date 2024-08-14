/// <reference types="cypress" />

class PSDBasePage {

    /*************** Static Methods ************/

    /**
     * Click the respective radio button for the given label text 
     * @param {*} label 
     */
    static clickRadioButtonForTheLabelText(label) {
        cy.contains('label', label, { timeout: 10000 })
                .invoke('attr', 'for')
                .then((id) => {
                    cy.get(`#${id}`).should('exist').click();
                })
    }

    /**
     * Method to click on the givem link in Create a product safety notification page
     * @param {*} linkText 
     */
    static followLink(linkText) {
        cy.contains('a', linkText, { timeout: 10000 }).should('be.visible').click();
    }

}

export default PSDBasePage;