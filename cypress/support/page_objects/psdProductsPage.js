require('@cypress/xpath');

class PSDProductsPage {

    /****************** page objects *****************/

    elements = {
        createProductRecordButton: () => cy.xpath("//a[@href='/products/duplicate-check']", { timeout: 10000 }).should('exist'),
        searchTextField: () => cy.xpath("//input[@id='q-field']", { timeout: 10000 }).should('exist'),
        searchButton: () => cy.contains('span', 'Search', { timeout: 10000 }).should('exist').parent(),
        addAnotherProductYesRadioButton: () => cy.xpath("//label[contains(text(), 'Yes')]/preceding-sibling::input", { timeout: 10000 }).should('exist'),
        addAnotherProductNoRadioButton: () => cy.xpath("//label[contains(text(), 'No')]/preceding-sibling::input", { timeout: 10000 }).should('exist'),
        continueButton: () => cy.xpath("//button[contains(text(), 'Continue')]", { timeout: 10000 }).should('exist')
    }

    /************** Properties **************/

    selectProductButtonXpath = "//p[contains(text(), 'elementText')]/parent::th/following-sibling::td//button[contains(text(), 'Select')]";

    /****************** Getters & Setters *****************/

    /**
     * Click on Create a product record button
     */
    clickCreateAProductRecordButton() {
        this.elements.createProductRecordButton().click();
    }

    /**
     * Search for a given product
     * @param {*} productName 
     */
    searchForAProduct(productName) {
        this.elements.searchTextField().clear();
        if (productName.toLowerCase() === 'random') {
            cy.get('@productName').then((product) => {
                this.elements.searchTextField().type(product);
            })
        } else {
            this.elements.searchTextField().type(productName);
        }
        this.elements.searchButton().click();
    }

    /**
     * Search for the given product and click on select button
     * Pass dataTable to search and add multiple products
     * @param {*} productName 
     */
    searchAndSelectProduct(dataTable) {

        const rows = dataTable.hashes();
        const numberOfRows = rows.length;

        rows.forEach((row, index) => {
            this.searchForAProduct(row.ProductName);

            cy.contains('button', 'Select', { timeout: 10000 }).should('exist').click();

            if (index === numberOfRows - 1) {
                this.clickNoToAddAnotherProductAndContinue();                
            } else {
                this.clickYesAddAnotherProductAndContinue();
            }
        })                
    }

    /**
     * Select "Yes" add another product and continue
     */
    clickYesAddAnotherProductAndContinue() {
        this.elements.addAnotherProductYesRadioButton().click();
        this.elements.continueButton().click();
    }

    /**
     * Select "No" to add another product and continue
     */
    clickNoToAddAnotherProductAndContinue() {
        this.elements.addAnotherProductNoRadioButton().click();
        this.elements.continueButton().click();
    }

}

export default PSDProductsPage;