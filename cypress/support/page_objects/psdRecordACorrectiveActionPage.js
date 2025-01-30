/// <reference types="cypress" />

import PSDBasePage from "../page_objects/psdBasePage";

class PSDRecordCorrectiveActionPage {

    /****************** page objects *****************/

    elements = {
        correctiveActionTakenYesRadioButton: () => cy.get('input#corrective-action-taken-form-corrective-action-taken-yes-no-true-field', { timeout: 10000 }).should('exist'),
        correctiveActionTakenNoRadioButton: () => cy.get('input#corrective-action-taken-form-corrective-action-taken-yes-no-field', { timeout: 10000 }).should('exist'),
        saveAndContinueButton: () => cy.contains('button', 'Save and continue', { timeout: 10000 }).should('exist'),
        saveAndCompleteTasksInThisSectionButton: () => cy.contains('button', 'Save and complete tasks in this section', { timeout: 10000 }).should('exist'),

        recallFromEndUsersYesRadioButton: () => cy.get('input#corrective-action-form-has-online-recall-information-has-online-recall-information-yes-field', { timeout: 10000 }).should('exist'),
        recallFromEndUsersNoRadioButton: () => cy.get('input#corrective-action-form-has-online-recall-information-has-online-recall-information-no-field', { timeout: 10000 }).should('exist'),
        locationOfRecallInformationField: () => cy.get('input#corrective-action-form-online-recall-information-field', { timeout: 10000 }).should('exist'),
        
        actionDateDayField: () => cy.get('input#corrective_action_form_date_decided_3i, input#corrective_action_date_decided_3i', { timeout: 10000 }).should('exist'),
        actionDateMonthField: () => cy.get('input#corrective_action_form_date_decided_2i, input#corrective_action_date_decided_2i', { timeout: 10000 }).should('exist'),
        actionDateYearField: () => cy.get('input#corrective_action_form_date_decided_1i, input#corrective_action_date_decided_1i', { timeout: 10000 }).should('exist'),
        
        correctiveActionLegislationDropdown: () => cy.get('input#corrective-action-form-legislation-field, input#corrective-action-legislation-field', { timeout: 10000 }).should('exist'),
        correctiveActionMandatoryYesRadioButton: () => cy.get('input#corrective-action-form-measure-type-mandatory-field, input#corrective-action-measure-type-mandatory-field', { timeout: 10000 }).should('exist'),
        correctiveActionMandatoryNoRadioButton: () => cy.get('input#corrective-action-form-measure-type-voluntary-field, input#corrective-action-measure-type-voluntary-field', { timeout: 10000 }).should('exist'),
        correctiveActionFurtherDetailsField: () => cy.get('textarea#corrective-action-form-details-field, textarea#corrective-action-details-field', { timeout: 10000 }).should('exist'),
        anyFilesRelatedToActionYesRadioButton: () => cy.get('input#corrective-action-form-related-file-true-field, input#corrective-action-related-file-true-field', { timeout: 10000 }).should('exist'),
        anyFilesRelatedToActionNoRadioButton: () => cy.get('input#corrective-action-form-related-file-field, input#corrective-action-related-file-field', { timeout: 10000 }).should('exist'),
        chooseFileButton: () => cy.get('input#corrective-action-form-document-field, input#corrective-action-file-file-field', { timeout: 10000 }).should('exist'),
        addCorrectiveActionButton: () => cy.contains('button', 'Add corrective action', { timeout: 10000 }).should('exist'),

        addAnotherActionYesRadioButton: () => cy.get('input#record-a-corrective-action-form-add-another-corrective-action-true-field', { timeout: 10000 }).should('exist'),
        addAnotherActionNoRadioButton: () => cy.get('input#record-a-corrective-action-form-add-another-corrective-action-field', { timeout: 10000 }).should('exist'),
        continueButton: () => cy.contains('button', 'Continue', { timeout: 10000 }).should('exist')
    }

    /************ Getters & Setters *************/

    /**
     * Click on "Yes" radio button for "Have you taken a corrective action for the unsafe or non-compliant product(s)?"
     */
    clickYesCorrectiveActionTaken() {
        this.elements.correctiveActionTakenYesRadioButton().click();
    }

    /**
     * Click on "No" radio button for "Have you taken a corrective action for the unsafe or non-compliant product(s)?"
     */
    clickNoCorrectiveActionTaken() {
        this.elements.correctiveActionTakenNoRadioButton().click();
    }

    /**
     * Click on "Save and continue" button
     */
    clickSaveAndContinue() {
        this.elements.saveAndContinueButton().click();
    }

    /**
     * Set reason for 'No' corrective action taken 
     * @param {*} reason 
     */
    setReasonForNoCorrectiveActionTaken(reason) {
        PSDBasePage.clickRadioButtonForTheLabelText(reason);
    }

    /**
     * Click on "Save and complete tasks in this section" button
     */
    clickSaveAndCompleteTasksInThisSection() {
        this.elements.saveAndCompleteTasksInThisSectionButton().click();
    }

    /**
     * Click the radio button for the given action taken for "What action is being taken?"
     * @param {*} action 
     */
    setWhatActionIsBeingTaken(action) {
        PSDBasePage.clickRadioButtonForTheLabelText(action);
    }

    /**
     * Click the "Yes" radio button for "Has the business responsible published product recall information online?"
     */
    clickYesBusinessResponsiblePublishedProductRecall() {
        this.elements.recallFromEndUsersYesRadioButton().click();
    }

    /**
     * Click the "No" radio button for "Has the business responsible published product recall information online?"
     */
    clickNoBusinessResponsiblePublishedProductRecall() {
        this.elements.recallFromEndUsersNoRadioButton().click();
    }

    /**
     * Enter the given url in the "Location of recall information" field
     * @param {*} url 
     */
    enterLocationOfRecallInformationUrl(url) {
        this.elements.locationOfRecallInformationField().clear();
        this.elements.locationOfRecallInformationField().type(url);
    }

    /**
     * Enter the given date in the "What date did the action come in to effect?" fields
     * @param {*} date 
     */
    enterActionDate(date) {
        const [day, month, year] = date.split('/');
        this.elements.actionDateDayField().clear();
        this.elements.actionDateDayField().type(day);
        this.elements.actionDateMonthField().clear();
        this.elements.actionDateMonthField().type(month);
        this.elements.actionDateYearField().clear();
        this.elements.actionDateYearField().type(year);
    }

    /**
     * Select the given option for "Under which legislation?"
     * @param {*} legislation 
     */
    selectCorrectiveActionLegislation(legislation) {
        this.elements.correctiveActionLegislationDropdown().click();
        if (legislation.toLowerCase() === 'random') {
            cy.get('ul#corrective-action-form-legislation-field__listbox > li, ul#corrective-action-legislation-field__listbox > li').then($lis => {
                const itemCount = $lis.length;
                const randomIndex = Math.floor(Math.random() * itemCount);
                const selectedText = $lis[randomIndex].innerText;
                cy.wrap(selectedText).as('correctiveActionLegislation');
                cy.wrap($lis[randomIndex]).click();
                cy.log('Corrective action legislation = ' + selectedText);
            })
        } else {
            cy.get('ul#corrective-action-form-legislation-field__listbox > li, ul#corrective-action-legislation-field__listbox > li').contains(legislation).click();
        }        
    }

    /**
     * Click the radio button for the business under "Which business is responsible?"
     * @param {*} businessName 
     */
    setResponsibleBusiness(businessName) {
        if (businessName.toLowerCase() === 'random') {
            cy.get('@businessName').then(business => {
                PSDBasePage.clickRadioButtonForTheLabelText(business.trim());
            })
        } else {
            PSDBasePage.clickRadioButtonForTheLabelText(businessName);
        }        
    }

    /**
     * Click 'Yes' radio button for "Is the corrective action mandatory?" 
     */
    clickYesCorrectiveActionMandatory() {
        this.elements.correctiveActionMandatoryYesRadioButton().click();
    }

    /**
     * Click 'No' radio button for "Is the corrective action mandatory?" 
     */
    clickNoCorrectiveActionMandatory() {
        this.elements.correctiveActionMandatoryNoRadioButton().click();
    }

    /**
     * Set the given radio button for the "Is the corrective action mandatory?"
     * @param {*} text 
     */
    setIsCorrectiveActionMandatory(text) {
        if (text.toLowerCase() === 'yes') {
            this.clickYesCorrectiveActionMandatory();
        } else {
            this.clickNoCorrectiveActionMandatory();
        }
    }

    /**
     * Select the given region for "In which geographic regions has this corrective action been taken?"
     * @param {*} region 
     */
    checkGeographicregionsForCorrectiveActionTaken(region) {
        const regionsArray = region.split(',');
        regionsArray.forEach(region => {
            PSDBasePage.clickRadioButtonForTheLabelText(region);
        })
    }

    /**
     * Enter the given text into "Further details (optional)" field
     * @param {*} text 
     */
    enterCorrectiveActionFurtherDetails(text) {
        this.elements.correctiveActionFurtherDetailsField().clear();
        this.elements.correctiveActionFurtherDetailsField().type(text);
    }

    /**
     * Click 'Yes' for "Are there any files related to the action?"
     */
    clickYesFilesRelatedToAction() {
        this.elements.anyFilesRelatedToActionYesRadioButton().click();
    }

    /**
     * Click 'No' for "Are there any files related to the action?"
     */
    clickNoFilesRelatedToAction() {
        this.elements.anyFilesRelatedToActionNoRadioButton().click();
    }

    /**
     * Attach the given file to "Are there any files related to the action?"
     * @param {*} fileName 
     */
    uploadFileRelatedToAction(fileName) {
        this.elements.chooseFileButton().attachFile(fileName);
    }

    /**
     * Click on "Add corrective action" button
     */
    clickAddCorrectiveAction() {
        this.elements.addCorrectiveActionButton().click();
    }

    /**
     * Click on "Yes" radio button for "Do you need to add another corrective action?"
     */
    clickYesAddAnotherAction() {
        this.elements.addAnotherActionYesRadioButton().click();
    }

    /**
     * Click "No" radio button for "Do you need to add another corrective action?"
     */
    clickNoToAddAnotherAction() {
        this.elements.addAnotherActionNoRadioButton().click();
    }

    /**
     * Click on "Continue" button
     */
    clickContinue() {
        this.elements.continueButton().click();
    }


    /************** Public Methods ***********/

    /**
     * Add the corrective action details from the given dataTable
     * @param {*} dataTable 
     */
    addCorrectiveAction(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {  
            if (headers.includes('TakenCorrectiveAction') && row.TakenCorrectiveAction.toLowerCase() === 'yes') {
                this.clickYesCorrectiveActionTaken();
                this.clickSaveAndContinue();

                if (headers.includes('ActionBeingTaken') && row.ActionBeingTaken) {
                    this.setWhatActionIsBeingTaken(row.ActionBeingTaken);
                }

                if (headers.includes('ActionDate') && row.ActionDate) {
                    this.enterActionDate(row.ActionDate);
                }

                if (headers.includes('Legislation') && row.Legislation) {
                    this.selectCorrectiveActionLegislation(row.Legislation);
                }

                if (headers.includes('ResponsibleBusiness') && row.ResponsibleBusiness) {
                    this.setResponsibleBusiness(row.ResponsibleBusiness);
                }

                if (headers.includes('IsActionMandatory') && row.IsActionMandatory) {
                    this.setIsCorrectiveActionMandatory(row.IsActionMandatory);
                }

                if (headers.includes('GeographicRegions') && row.GeographicRegions) {
                    this.checkGeographicregionsForCorrectiveActionTaken(row.GeographicRegions);
                }

                if (headers.includes('FurtherDetails') && row.FurtherDetails) {
                    this.enterCorrectiveActionFurtherDetails(row.FurtherDetails);
                }

                if (headers.includes('UploadActionFiles') && row.UploadActionFiles) {
                    if (row.UploadActionFiles.toLowerCase() === 'yes') {
                        this.clickYesFilesRelatedToAction();
                    } else {
                        this.clickNoFilesRelatedToAction();
                    }                    
                }

                if (headers.includes('FileName') && row.FileName) {
                    this.uploadFileRelatedToAction(row.FileName);
                }

                this.clickAddCorrectiveAction();
            } else {
                this.clickNoCorrectiveActionTaken();
                this.setReasonForNoCorrectiveActionTaken(row.ReasonForNoCorrectiveActionTaken);
                this.clickSaveAndContinue();
                this.clickSaveAndCompleteTasksInThisSection();
            }
        })
    }

    /**
     * Add additional corrective action
     * @param {*} dataTable 
     */
    addAdditionalCorrectiveAction(dataTable) {
        const rows = dataTable.hashes();

        rows.forEach((row) => {  
            Object.entries(row).forEach(([header, value]) => {
                switch (header) {
                    case 'ActionBeingTaken':
                        this.setWhatActionIsBeingTaken(row.ActionBeingTaken);
                        break;
                    case 'ActionDate':
                        this.enterActionDate(row.ActionDate);
                        break;
                    case 'Legislation':
                        this.selectCorrectiveActionLegislation(row.Legislation);
                        break;
                    case 'ResponsibleBusiness':
                        this.setResponsibleBusiness(row.ResponsibleBusiness);
                        break;
                    case 'IsActionMandatory':
                        this.setIsCorrectiveActionMandatory(row.IsActionMandatory);
                        break;
                    case 'GeographicRegions':
                        this.checkGeographicregionsForCorrectiveActionTaken(row.GeographicRegions);
                        break;
                    case 'FurtherDetails':
                        this.enterCorrectiveActionFurtherDetails(row.FurtherDetails);
                        break;
                    case 'UploadActionFiles':
                        if (row.UploadActionFiles.toLowerCase() === 'yes') {
                            this.clickYesFilesRelatedToAction();
                        } else {
                            this.clickNoFilesRelatedToAction();
                        }
                        break;
                    case 'FileName':
                        this.uploadFileRelatedToAction(row.FileName);
                        break;
                }
            })
            this.clickAddCorrectiveAction();   
        })
    }

}

export default PSDRecordCorrectiveActionPage;