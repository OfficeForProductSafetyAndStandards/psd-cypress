/// <reference types="cypress" />

class PSDAddRiskAssessmentPage {

    /****************** page objects *****************/

    elements = {
        addLegacyRiskAssessmentButton: () => cy.contains('a', 'Add legacy risk assessment', { timeout: 10000 }).should('exist'),

        assessmentDateDayField: () => cy.get('input#risk_assessment_form_assessed_on_3i', { timeout: 10000 }).should('exist'),
        assessmentDateMonthField: () => cy.get('input#risk_assessment_form_assessed_on_2i', { timeout: 10000 }).should('exist'),
        assessmentDateYearField: () => cy.get('input#risk_assessment_form_assessed_on_1i', { timeout: 10000 }).should('exist'),
        assessedByTeamDropdown: () => cy.get('select#risk-assessment-form-assessed-by-team-id-field', { timeout: 10000 }).should('exist'),
        organisationNameField: () => cy.get("input[name='risk_assessment_form[assessed_by_other]']", { timeout: 10000 }).should('exist'),
        chooseFileButton: () => cy.get('input#risk-assessment-form-risk-assessment-file-field', { timeout: 10000 }).should('exist'),
        furtherDetailsField: () => cy.get('textarea#risk-assessment-form-details-field', { timeout: 10000 }).should('exist'),
        addRiskAssessmentButton: () => cy.contains('button', 'Add risk assessment', { timeout: 10000 }).should('exist'),

        addAnotherRiskAssessmentYesRadioButton: () => cy.get('input#add-another-risk-assessment-form-add-another-risk-assessment-true-field', { timeout: 10000 }).should('exist'),
        addAnotherRiskAssessmentNoRadioButton: () => cy.get('input#add-another-risk-assessment-form-add-another-risk-assessment-field', { timeout: 10000 }).should('exist'),
        continueButton: () => cy.contains('button', 'Continue', { timeout: 10000 }).should('exist')
    }

    /************ Getters & Setters *************/

    /**
     * Click on "Add legacy risk assessment" button
     */
    clickAddLegacyRiskAssessment() {
        this.elements.addLegacyRiskAssessmentButton().click();
    }

    /**
     * Enter the given date in the risk assessment date fields
     * @param {*} date 
     */
    enterRiskAssessmentDate(date) {
        const [day, month, year] = date.split('/');
        this.elements.assessmentDateDayField().clear();
        this.elements.assessmentDateDayField().type(day);
        this.elements.assessmentDateMonthField().clear();
        this.elements.assessmentDateMonthField().type(month);
        this.elements.assessmentDateYearField().clear();
        this.elements.assessmentDateYearField().type(year);
    }

    /**
     * Set the given risk level for the notification
     * @param {*} level 
     */
    setRiskLevel(level) {
        cy.contains('label', level, { timeout: 10000 })
                .invoke('attr', 'for')
                .then((id) => {
                    cy.get(`#${id}`).should('exist').click();
                })
    }

    /**
     * Set the given assessed by for the notification
     * @param {*} assessedBy 
     */
    setWhoCompletedTheAssessment(assessedBy) {
        cy.contains('label', assessedBy, { timeout: 10000 })
                .invoke('attr', 'for')
                .then((id) => {
                    cy.get(`#${id}`).should('exist').click();
                })
    }

    /**
     * Select the given option or a random option from the risk assessed by dropdown
     * @param {*} teamName 
     */
    selectAssessedByTeam(teamName) {
        if (teamName.toLowerCase() === 'random') {
            this.elements.assessedByTeamDropdown().then($dropdown => {
                cy.wrap($dropdown).find('option').then(options => {
                    if (options.length > 0) {
                        const randomIndex = Math.floor(Math.random() * options.length);
                        cy.wrap($dropdown).select(options[randomIndex].value);
                        cy.wrap(options[randomIndex].text).as('RiskAssessedByTeam');
                        cy.log('RiskAssessedByTeam = ' + options[randomIndex].text);
                    } else {
                        throw new Error('No options available in the risk assessed by dropdown');
                    }
                })
            })
        } else {
            this.elements.assessedByTeamDropdown().select(teamName);
        }
    }

    /**
     * Enter the given text in the Organisation name field
     * @param {*} orgName 
     */
    enterOrganisationName(orgName) {
        this.elements.organisationNameField().clear();
        this.elements.organisationNameField().type(orgName);
    }

    /**
     * Attach the given file to Upload risk assessment 
     * @param {*} fileName 
     */
    uploadRiskAssessment(fileName) {
        this.elements.chooseFileButton().attachFile(fileName);
    }

    /**
     * Enter the given text in the Further details field
     * @param {*} text 
     */
    enterFurtherDetails(text) {
        this.elements.furtherDetailsField().clear();
        this.elements.furtherDetailsField().type(text);
    }

    /**
     * Click on "Add risk assessment" button
     */
    clickAddRiskAssessment() {
        this.elements.addRiskAssessmentButton().click();
    }

    /**
     * Click on "Yes" radio button for add another  risk assessment
     */
    clickYesAddAnotherRiskAssessment() {
        this.elements.addAnotherRiskAssessmentYesRadioButton().click();
    }

    /**
     * Click "No" radio button for add another risk assessment
     */
    clickNoToAddAnotherRiskAssessment() {
        this.elements.addAnotherRiskAssessmentNoRadioButton().click();
    }

    /**
     * Click on "Continue" button
     */
    clickContinue() {
        this.elements.continueButton().click();
    }

    /************ Public Methods **************/

    /**
     * Add the Legacy Risk assessment details
     * @param {*} dataTable 
     */
    addLegacyRiskAssessmentDetails(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        this.clickAddLegacyRiskAssessment();

        data.forEach(row => {            
            if (headers.includes('DateOfAssessment') && row.DateOfAssessment) {
                this.enterRiskAssessmentDate(row.DateOfAssessment);
            }
            if (headers.includes('RiskLevel') && row.RiskLevel) {
                this.setRiskLevel(row.RiskLevel);
            }
            if (headers.includes('AssessedBy') && row.AssessedBy) {
                this.setWhoCompletedTheAssessment(row.AssessedBy);
            }
            if (headers.includes('AssessedByTeam') && row.AssessedByTeam) {
                this.selectAssessedByTeam(row.AssessedByTeam);
            }
            if (headers.includes('AssessedByOrgName') && row.AssessedByOrgName) {
                this.enterOrganisationName(row.AssessedByOrgName);
            }
            if (headers.includes('RiskAssessmentFile') && row.RiskAssessmentFile) {
                this.uploadRiskAssessment(row.RiskAssessmentFile);
            }
            if (headers.includes('RiskAssessmentDetails') && row.RiskAssessmentDetails) {
                this.enterFurtherDetails(row.RiskAssessmentDetails);
            }
        })
        this.clickAddRiskAssessment();
    }

}

export default PSDAddRiskAssessmentPage;