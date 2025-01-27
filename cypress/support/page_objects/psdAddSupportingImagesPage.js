/// <reference types="cypress" />

import PSDBasePage from "../page_objects/psdBasePage";

class PSDAddSupportingImagesPage {

    /****************** page objects *****************/

    elements = {
        chooseFileButton: () => cy.get('input#image-upload-file-upload-field', { timeout: 10000 }).should('exist'),
        uploadImageButton: () => cy.contains('button', /Upload( image)?/, { timeout: 10000 }).should('exist'),
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
        cy.wait(1000);
        PSDBasePage.followLink("Add supporting images"); 

        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            if (headers.includes('SupportingImage') && row.SupportingImage) {
                this.uploadSupportingImage(row.SupportingImage);
            }
        })
        this.clickFinishUploadingImages();
    }

    /**
     * Upload additional supporting images to an existing notification
     * @param {*} dataTable 
     */
    uploadAdditionalSupportingImages(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            this.uploadSupportingImage(row.SupportingImage);            
        })
        PSDBasePage.followLink("Finish uploading images");
    }

}

export default PSDAddSupportingImagesPage;