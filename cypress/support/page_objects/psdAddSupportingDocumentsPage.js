/// <reference types="cypress" />

import PSDBasePage from "../page_objects/psdBasePage";

class PSDAddSupportingDocumentsPage {

    /****************** page objects *****************/

    elements = {
        documentTitleField: () => cy.get('input#document-form-title-field', { timeout: 10000 }).should('exist'),
        chooseFileButton: () => cy.get('input#document-form-document-field', { timeout: 10000 }).should('exist'),
        uploadDocumentButton: () => cy.contains('button', 'Upload document', { timeout: 10000 }).should('exist'),
        finishUploadingDocumentsButton: () => cy.get("button[name='final']", { timeout: 10000 }).should('exist')
    }

    /************ Getters & Setters *************/

    /**
     * Enter document title
     * @param {*} title 
     */
    enterDocumentTitle(title) {
        this.elements.documentTitleField().clear();
        this.elements.documentTitleField().type(title);
    }

    /**
     * Upload the document
     * @param {*} documentName 
     */
    uploadDocument(documentName) {
        this.elements.chooseFileButton().attachFile(documentName);
        this.elements.uploadDocumentButton().click();
    }

    /**
     * Click on Finish uploading documents button
     */
    clickFinishUploadingDocuments() {
        this.elements.finishUploadingDocumentsButton().click();
    }

    /************* Public Methods ***************/

    /**
     * Add the given supporting document
     * @param {*} dataTable 
     */
    addSupportingDocuments(dataTable) {
        cy.wait(3000);
        PSDBasePage.followLink("Add supporting documents");

        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            if (headers.includes('SupportingDocumentTitle') && row.SupportingDocumentTitle) {
                this.enterDocumentTitle(row.SupportingDocumentTitle);
            }
            if (headers.includes('SupportingDocument') && row.SupportingDocument) {
                this.uploadDocument(row.SupportingDocument);
            }
        })
        this.clickFinishUploadingDocuments();
    }

}

export default PSDAddSupportingDocumentsPage;