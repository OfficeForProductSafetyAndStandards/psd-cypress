/// <reference types="cypress" />

import PSDCommonPage from "./psdCommonPage";

class PSDAddSupportingImagesPage {

    /****************** page objects *****************/

    elements = {
        chooseFileButton: () => cy.get('input#image-upload-file-upload-field', { timeout: 10000 }).should('exist'),
        uploadImageButton: () => cy.contains('button', 'Upload image', { timeout: 10000 }).should('exist'),
        finishUploadingImagesButton: () => cy.get("button[name='final']", { timeout: 10000 }).should('exist')
    }

    /************ Getters & Setters *************/

    /**
     * Upload the given supporting document
     * @param {*} imageName 
     */
    uploadSupportingImage(imageName) {
        this.elements.chooseFileButton().attachFile(imageName);
        this.elements.uploadImageButton().click();
    }

    /**
     * Click on finish uploading images button
     */
    clickFinishUploadingImages() {
        this.elements.finishUploadingImagesButton().click();
    }

    /************* Public methods *************/

    /**
     * Add Supporting images
     * @param {*} dataTable 
     */
    addSupportingImages(dataTable) {
        const psdCommonPage = new PSDCommonPage();
        cy.wait(3000);
        psdCommonPage.followLink("Add supporting images"); 

        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            if (headers.includes('SupportingImage') && row.SupportingImage) {
                this.uploadSupportingImage(row.SupportingImage);
            }
        })
        this.clickFinishUploadingImages();
    }

}

export default PSDAddSupportingImagesPage;