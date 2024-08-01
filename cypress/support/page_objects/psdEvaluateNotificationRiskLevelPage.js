/// <reference types="cypress" />

import PSDCommonPage from "./psdCommonPage";

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
        cy.contains('label', level, { timeout: 10000 })
                .invoke('attr', 'for')
                .then((id) => {
                    cy.get(`#${id}`).should('exist').click();
                })
    }

    /********** Public Methods *********/

    /**
     * Add notification risk level
     * @param {*} dataTable 
     */
    addNotificationRiskLevel(dataTable) {
        const psdCommonPage = new PSDCommonPage();
        cy.wait(3000);
        psdCommonPage.followLink("Evaluate notification risk level");

        dataTable.hashes().forEach((row) => {
            this.setNotificationRiskLevel(row.EvaluateRiskLevel);
        })
        this.clickSaveAndCompleteTasksInThisSection();
    }

}

export default PSDEvaluateNotificationRiskLevelPage;