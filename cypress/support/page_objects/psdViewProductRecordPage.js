/// <reference types="cypress" />

class PSDViewProductRecordPage
{

    /****************** page objects *****************/

    elements = {
        pageContent : () => cy.get('section#page-content', { timeout: 10000 }).should('exist'),
        editThisProductRecordButton : () => cy.contains('a', 'Edit this product record', { timeout: 10000 }).should('exist')

    }

    /******************** Getter & Setters *******************/

    /**
     * Assert that the given product data is displayed correctly on the view product record page
     * @param {*} dataTable 
     */
    assertProductdetails(dataTable) {
        dataTable.hashes().forEach((row) => {
            if (row.Key.toLowerCase() === 'barcode' && row.Value.toLowerCase() === 'random') {
                cy.get('@barcodeNumber').then((barcodeNumber) => {
                    this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('have.text', barcodeNumber);
                })
            } else if (row.Key.toLowerCase() === 'subcategory' && row.Value.toLowerCase() === 'random') {
                cy.get('@productSubcategory').then((subcat) => {
                    this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('have.text', subcat);
                })
            } else if (row.Key.toLowerCase() === 'brand name' && row.Value.toLowerCase() === 'random') {
                cy.get('@productMfrBrandName').then((brand) => {
                    this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('have.text', brand);
                })
            } else if (row.Key.toLowerCase() === 'product name' && row.Value.toLowerCase() === 'random') {
                cy.get('@productName').then((productName) => {
                    this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('have.text', productName);
                })
            } else if (row.Key.toLowerCase() === 'category' && row.Value.toLowerCase() === 'random') {
                cy.get('@productCategory').then((productCategory) => {
                    this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('have.text', productCategory);
                })
            } else if (row.Key.toLowerCase() === 'country of origin' && row.Value.toLowerCase() === 'random') {
                cy.get('@countryOfOrigin').then((countryOfOrigin) => {
                    this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('have.text', countryOfOrigin);
                })
            } else {
                this.elements.pageContent().find('dt').contains(row.Key).next('dd').should('have.text', row.Value);
            }
        })        
    }

    /**
     * Click on Edit this product record button
     */
    clickEditThisProductRecord() {
        this.elements.editThisProductRecordButton().click();
    }


}

export default PSDViewProductRecordPage;