/// <reference types="cypress" />

class PSDPrismRiskAssessmentPage {

    /****************** page objects *****************/

    elements = {
        startNewRiskAssessmentButton: () => cy.contains('a', 'Start a new risk assessment', { timeout: 10000 }).should('exist'),

        seriousRiskExistYesRadioButon: () => cy.get('input#risk-assessment-risk-type-serious-risk-field', { timeout:10000 }).should('exist'),
        seriousRiskExistNoRadioButon: () => cy.get('input#risk-assessment-risk-type-normal-risk-field', { timeout:10000 }).should('exist'),
        continueButton: () => cy.contains('button', 'Continue', { timeout: 10000 }).should('exist'),

        factorsToSayLessRiskYesRadioButton: () => cy.get('input#risk-assessment-less-than-serious-risk-true-field', { timeout:10000 }).should('exist'),
        describeFactorsToSayLessRiskTextField: () => cy.get('textarea#risk-assessment-serious-risk-rebuttable-factors-field', { timeout:10000 }).should('exist'),
        factorsToSayLessRiskNoRadioButton: () => cy.get('input#risk-assessment-less-than-serious-risk-field', { timeout:10000 }).should('exist'),



    }

    /******************** Setters & Getters *******************/

    /**
     * Click on Start a new risk assessment button
     */
    clickStartNewRiskAssessmentButton() {
        this.elements.startNewRiskAssessmentButton().click();
    }

    /**
     * Select the given radio button for "Is the product or hazard of a type where a serious risk can generally be deemed to exist?"
     * @param {*} option 
     */
    setSeriousRiskDeemedToExist(option) {
        if (option.toLowerCase() === 'yes') {
            this.elements.seriousRiskExistYesRadioButon().click();
        } else {
            this.elements.seriousRiskExistNoRadioButon().click();
        } 
        this.elements.continueButton().click();       
    }

    /**
     * Select the given radio button for "Are there any factors to indicate the product risk to be less than serious?"
     * @param {*} option 
     * @param {*} riskFactors 
     */
    setFactorsToSayLessRisk(option, riskFactors = 'null') {
        if (option.toLowerCase() === 'yes') {
            this.elements.factorsToSayLessRiskYesRadioButton().click();
            this.elements.describeFactorsToSayLessRiskTextField().clear();
            this.elements.describeFactorsToSayLessRiskTextField().type(riskFactors);
        } else {
            this.elements.factorsToSayLessRiskNoRadioButton().click();
        }
        this.elements.continueButton().click();
    }


}

export default PSDPrismRiskAssessmentPage;