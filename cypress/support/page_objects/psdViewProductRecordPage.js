require('@cypress/xpath');

class PSDViewProductRecordPage
{

    /****************** page objects *****************/

    elements = {
        pageContent : () => cy.xpath("//section[@id='page-content']", { timeout: 10000 }).should('exist')

    }

    /******************** Getter & Setters *******************/

    /**
     * Assert that the given product data is displayed correctly on the view product record page
     * @param {*} dataTable 
     */
    assertProductdetails(dataTable) {
        dataTable.hashes().forEach((row) => {
            if (row.key.toLowerCase() === 'barcode' && row.value.toLowerCase() === 'random') {
                cy.get('@barcodeNumber').then((barcodeNumber) => {
                    this.elements.pageContent().xpath("//dt[contains(text(), '"+ row.key + "')]/following-sibling::dd").should('have.text', barcodeNumber);
                })
            } else if (row.key.toLowerCase() === 'subcategory' && row.value.toLowerCase() === 'random') {
                cy.get('@productSubcategory').then((subcat) => {
                    this.elements.pageContent().xpath("//dt[contains(text(), '"+ row.key + "')]/following-sibling::dd").should('have.text', subcat);
                })
            } else if (row.key.toLowerCase() === 'brand name' && row.value.toLowerCase() === 'random') {
                cy.get('@productMfrBrandName').then((brand) => {
                    this.elements.pageContent().xpath("//dt[contains(text(), '"+ row.key + "')]/following-sibling::dd").should('have.text', brand);
                })
            } else if (row.key.toLowerCase() === 'product name' && row.value.toLowerCase() === 'random') {
                cy.get('@productName').then((productName) => {
                    this.elements.pageContent().xpath("//dt[contains(text(), '"+ row.key + "')]/following-sibling::dd").should('have.text', productName);
                })
            } else if (row.key.toLowerCase() === 'category' && row.value.toLowerCase() === 'random') {
                cy.get('@productCategory').then((productCategory) => {
                    this.elements.pageContent().xpath("//dt[contains(text(), '"+ row.key + "')]/following-sibling::dd").should('have.text', productCategory);
                })
            } else if (row.key.toLowerCase() === 'country of origin' && row.value.toLowerCase() === 'random') {
                cy.get('@countryOfOrigin').then((countryOfOrigin) => {
                    this.elements.pageContent().xpath("//dt[contains(text(), '"+ row.key + "')]/following-sibling::dd").should('have.text', countryOfOrigin);
                })
            } else {
                this.elements.pageContent().xpath("//dt[contains(text(), '"+ row.key + "')]/following-sibling::dd").should('have.text', row.value);
            }
        })        
    }


}

export default PSDViewProductRecordPage;