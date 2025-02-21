/// <reference types="cypress" />

class PSDPrismRiskAddEvaluationDetailsPage {

    /****************** page objects *****************/

    elements = {
        assessmentTitleField: () => cy.get('input#risk-assessment-name-field', { timeout:10000 }).should('exist'),
        assessorNameField: () => cy.get('input#risk-assessment-assessment-organisation-field', { timeout:10000 }).should('exist'),
        assessmentOrganisationField: () => cy.get('input#risk-assessment-assessment-organisation-field', { timeout:10000 }).should('exist'),
        saveAndCompleteButton: () => cy.contains('button', 'Save and complete tasks in this section', { timeout: 10000 }).should('exist')
    }

     /******************** Setters & Getters *******************/

     /**
      * Set the given values in the evaluation details fields
      * @param {*} dataTable 
      */
     setPrismRiskEvaluationDetails(dataTable) {
        dataTable.hashes().forEach((row) => {
            this.elements.assessmentTitleField().clear();
            this.elements.assessmentTitleField().type(row.AssessmentTitle);

            this.elements.assessorNameField().clear();
            this.elements.assessorNameField().type(row.NameOfAssessor);

            this.elements.assessmentOrganisationField().clear();
            this.elements.assessmentOrganisationField().type(row.NameOfAssessmentOrg);
        })
        this.elements.saveAndCompleteButton().click();
     }




}

export default PSDPrismRiskAddEvaluationDetailsPage;