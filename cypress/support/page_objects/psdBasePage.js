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

    /**
     * Check the respective checkbox for the given label text
     * @param {*} label 
     */
    static checkCheckboxForTheLabelText(label) {
        cy.contains('label', label, { timeout: 10000 })
            .invoke('attr', 'for')
            .then((id) => {
                cy.get(`#${id}`).should('exist').check();
            })
    }

    /**
     * Click on the button using the given button label
     * @param {*} buttonLable 
     */
    static clickButton(buttonLable) {
        cy.contains('button', buttonLable, { timeout: 10000 })
            .should('exist')
            .click();
    }

}

export default PSDBasePage;