/// <reference types="cypress" />

import PSDBasePage from "../page_objects/psdBasePage";

class PSDEvaluateNotificationRiskLevelPage {

    /****************** page objects *****************/

    elements = {
        saveAndCompleteTasksInThisSectionButton: () => cy.contains('button', 'Save and complete tasks in this section', { timeout: 10000 }).should('exist')
    }

    /************ Getters & Setters *************/

    /**
     * Click on "Save and complete tasks in this section" button
     */
    clickSaveAndCompleteTasksInThisSection() {
        this.elements.saveAndCompleteTasksInThisSectionButton().click();
    }

    /**
     * Set the given risk level for the notification
     * @param {*} level 
     */
    setNotificationRiskLevel(level) {
        PSDBasePage.clickRadioButtonForTheLabelText(level);
    }

    /********** Public Methods *********/

    /**
     * Add notification risk level
     * @param {*} dataTable 
     */
    addNotificationRiskLevel(dataTable) {
        cy.wait(3000);
        PSDBasePage.followLink("Evaluate notification risk level");

        dataTable.hashes().forEach((row) => {
            this.setNotificationRiskLevel(row.EvaluateRiskLevel);
        })
        this.clickSaveAndCompleteTasksInThisSection();
    }

}

export default PSDEvaluateNotificationRiskLevelPage;