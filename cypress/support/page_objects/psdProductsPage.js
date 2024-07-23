require('@cypress/xpath');

class PSDProductsPage
{
    
    /****************** page objects *****************/

    elements = {
        createProductRecordButton : () => cy.xpath("//a[@href='/products/duplicate-check']", { timeout: 10000 }).should('exist'),
        searchTextField: () => cy.xpath("//input[@id='q-field']", {timeout: 1000}).should('exist'),
        searchButton: () => cy.xpath("//span[contains(text(), 'Search')]", {timeout: 1000}).should('exist'),
        addAnotherProductYesRadioButton: () => cy.xpath("//label[contains(text(), 'Yes')]/preceding-sibling::input", {timeout: 1000}).should('exist'),
        addAnotherProductNoRadioButton: () => cy.xpath("//label[contains(text(), 'No')]/preceding-sibling::input", {timeout: 1000}).should('exist'),
        continueButton: () => cy.xpath("//button[contains(text(), 'Continue')]", {timeout: 1000}).should('exist')


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
    searchAndSelectProduct(productName) {
        if (Array.isArray(productName) && productName.every(row => Array.isArray(row))) {
            const rows = dataTable.hashes();
            const numberOfRows = rows.length;

            rows.forEach((row, index) => {
                this.searchForAProduct(row.ProductName);
                let xpath = this.selectProductButtonXpath.replace("elementText", productName);
                cy.xpath(xpath, {timeout: 1000}).should('exist').click();

                if (index !== numberOfRows - 1) {
                    this.clickYesAddAnotherProductAndContinue();
                } else {
                    this.clickNoToAddAnotherProductAndContinue();
                }
            })
        } else {
            searchForAProduct(productName);
            let xpath = this.selectProductButtonXpath.replace("elementText", productName);
            cy.xpath(xpath, {timeout: 1000}).should('exist').click();
            this.clickNoToAddAnotherProductAndContinue();
        }        
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