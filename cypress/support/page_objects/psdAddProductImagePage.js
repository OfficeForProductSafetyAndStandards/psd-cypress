/// <reference types="cypress" />

class PSDAddProductImagePage {

    /****************** page objects *****************/

    elements = {
        chooseFileButton : () => cy.get('input#image-upload-file-upload-field', { timeout: 10000 }).should('exist'),
        uploadButton : () => cy.contains('button', 'Upload', { timeout: 10000 }).should('exist')
    }

    /******************** Getter & Setters *******************/

    /**
     * Click on Choose file button
     */
    clickChooseFileButton() {
        this.elements.chooseFileButton().click();
    }

    /**
     * Upload Product image
     * @param {*} image 
     */
    attachProductImage(image)
    {
        this.elements.chooseFileButton().click().attachFile(image);
    }

    /**
     * Click on Upload button
     */
    clickUploadButton() {
        this.elements.uploadButton().click();
    }

    /**
     * Upload product image
     * @param {*} image 
     */
    uploadProductImage(image) {
        this.attachProductImage(image);
        this.clickUploadButton();
    }

}

export default PSDAddProductImagePage;