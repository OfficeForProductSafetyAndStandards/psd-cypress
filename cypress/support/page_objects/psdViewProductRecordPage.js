/// <reference types="cypress" />

class PSDViewProductRecordPage
{

    /****************** page objects *****************/

    elements = {
        pageContent : () => cy.get('section#page-content', { timeout: 10000 }).should('exist'),
        editThisProductRecordButton : () => cy.contains('a', 'Edit this product record', { timeout: 10000 }).should('exist'),
        addImageLink : () => cy.contains('a', 'Add an image', { timeout: 10000 }).should('exist'),
        removeImageLink : () => cy.contains('a', 'Remove this image', { timeout: 10000 }).should('exist'),
        deleteImageButton : () => cy.contains('button', 'Delete image', { timeout: 10000 }).should('exist')

    }

    showImagesLinkCssSelector = 'button[aria-label^="Images ("][aria-label$=") , Show this section"]';

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

    /**
     * Click on the 'Add Image' link
     */
    clickAddImageLink() {
        this.elements.addImageLink().click();
    }

    /**
     * Click on Show images link
     */
    clickShowImagesLink() {
        cy.get(this.showImagesLinkCssSelector)
            .then(($button) => {
                if ($button.is(':visible')) {
                cy.wrap($button).click(); // Click only if the button is visible
                } else {
                // No action if the button is not visible
                cy.log('Show images link is not visible, no action taken');
                }
            });
    }

    /**
     * Verify that the given images are displayed correctly 
     * @param {*} dataTable 
     */
    verifyTheProductImages(dataTable) {
        dataTable.hashes().forEach((row) => {
            const imageName = row.ImageName;
            const imageHref = row.ImageHref;
        
            // Check if the <figcaption> containing the image name exists and is visible
            cy.get('figcaption').each(($figcaption) => {
              if ($figcaption.text().trim() === imageName) {
                cy.wrap($figcaption).should('be.visible');
              }
            });
        
            // Check if the <img> with the src is visible
            cy.get(`a[href*="${imageHref}"]`).should('be.visible');
        });
    }

    /**
     * Click on Remove This Image link
     */
    clickRemoveThisImageLink() {
        this.elements.removeImageLink().click();
    }

    /**
     * 
     */
    clickDeleteImage() {
        this.elements.deleteImageButton().click();
    }


}

export default PSDViewProductRecordPage;