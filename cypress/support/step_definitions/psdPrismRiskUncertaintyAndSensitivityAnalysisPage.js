/// <reference types="cypress" />

class PSDPrismRiskUncertainityAndSensitivityAnalysisPage {

    /****************** page objects *****************/

    elements = {
        lowLevelOfUncertaintyRadioButton: () => cy.get('input#evaluation-level-of-uncertainty-low-field', { timeout:10000 }).should('exist'),
        mediumLevelOfUncertaintyRadioButton: () => cy.get('input#evaluation-level-of-uncertainty-medium-field', { timeout:10000 }).should('exist'),
        highLevelOfUncertaintyRadioButton: () => cy.get('input#evaluation-level-of-uncertainty-high-field', { timeout:10000 }).should('exist'),

        hasSensitivityAnalysisUndertakenYesRadioButton: () => cy.get('input#evaluation-sensitivity-analysis-true-field', { timeout:10000 }).should('exist'),
        hasSensitivityAnalysisUndertakenNoRadioButton: () => cy.get('input#evaluation-sensitivity-analysis-field', { timeout:10000 }).should('exist'),
        additionalSensitivityAnalysisInfoField: () => cy.get('input#evaluation-sensitivity-analysis-details-field', { timeout:10000 }).should('exist'),

        saveAndCompleteButton: () => cy.contains('button', 'Save and complete tasks in this section', { timeout: 10000 }).should('exist')

    }

    /******************** Setters & Getters *******************/

    /**
     * Set What is the level of uncertainty associated with the risk assessment?
     * @param {*} option 
     */
    setLevelOfUncertaintyAssociatedWithRiskAssessment(option) {
        if (option.toLowerCase() === 'high') {
            this.elements.highLevelOfUncertaintyRadioButton().click();
        } else if (option.toLowerCase() === 'medium') {
            this.elements.mediumLevelOfUncertaintyRadioButton().click();
        } else {
            this.elements.lowLevelOfUncertaintyRadioButton().click();
        }
    }

    /**
     * Set Has sensitivity analysis been undertaken?
     * @param {*} option 
     * @param {*} sensitivityInfo 
     */
    setSensitivityAnalysisUndertaken(option, sensitivityInfo = nill) {
        if (option.toLowerCase() === 'yes') {
            this.elements.hasSensitivityAnalysisUndertakenYesRadioButton().click();
            this.elements.additionalSensitivityAnalysisInfoField().clear();
            this.elements.additionalSensitivityAnalysisInfoField().type(sensitivityInfo);
        } else {
            this.elements.hasSensitivityAnalysisUndertakenNoRadioButton().click();
        }

    }

    /******************** Public Methods *******************/

    /**
     * Add level of uncertainty and sensitivity analysis (Risk assessment outcome) 
     * @param {*} dataTable 
     */
    addLevelOfUncertaintyAndSensitivityAnalysis(dataTable) {
        dataTable.hashes().forEach((row) => {
            this.setLevelOfUncertaintyAssociatedWithRiskAssessment(row.LevelOfUncertainty);
            this.setSensitivityAnalysisUndertaken(row.HasSensitivityAnalysisUndertaken, row.SensitivityAnalysisInfo);
        })
        this.elements.saveAndCompleteButton().click();
    }

}

export default PSDPrismRiskUncertainityAndSensitivityAnalysisPage;