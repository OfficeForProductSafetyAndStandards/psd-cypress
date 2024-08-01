/// <reference types="cypress" />

import 'cypress-file-upload';

class PSDAddTestReportPage {

    /****************** page objects *****************/

    elements = {
        opssFundedYesRadioButton: () => cy.get('input#set-test-result-funding-on-case-form-opss-funded-true-field', { timeout: 10000 }).should('exist'),
        opssFundedNoRadioButton: () => cy.get('input#set-test-result-funding-on-case-form-opss-funded-field', { timeout: 10000 }).should('exist'),
        saveAndContinueButton: () => cy.contains('button', 'Save and continue', { timeout: 10000 }).should('exist'),

        tradingStandardsOfficerSampleReferenceNumberField: () => cy.get('input#set-test-result-certificate-on-case-form-tso-certificate-reference-number-field', { timeout: 10000 }).should('exist'),
        testCertificateDayField: () => cy.get('input#set_test_result_certificate_on_case_form_tso_certificate_issue_date_day', { timeout: 10000 }).should('exist'),
        testCertificateMonthField: () => cy.get('input#set_test_result_certificate_on_case_form_tso_certificate_issue_date_month', { timeout: 10000 }).should('exist'),
        testCertificateYearField: () => cy.get('input#set_test_result_certificate_on_case_form_tso_certificate_issue_date_year', { timeout: 10000 }).should('exist'),

        whichLegislationDropdown: () => cy.get('select#test-result-form-legislation-field', { timeout: 10000 }).should('exist'),
        whichStandardField: () => cy.get('input#test-result-form-standards-product-was-tested-against-field', { timeout: 10000 }).should('exist'),
        testDateDayField: () => cy.get('input#test_result_form_date_day', { timeout: 10000 }).should('exist'),
        testDateMonthField: () => cy.get('input#test_result_form_date_month', { timeout: 10000 }).should('exist'),
        testDateYearField: () => cy.get('input#test_result_form_date_year', { timeout: 10000 }).should('exist'),
        testResultPassRadioButton: () => cy.get('input#test-result-form-result-passed-field', { timeout: 10000 }).should('exist'),
        testResultFailRadioButton: () => cy.get('input#test-result-form-result-failed-field', { timeout: 10000 }).should('exist'),
        testResultFailInformationField: () => cy.get('textarea#test-result-form-failure-details-field', { timeout: 10000 }).should('exist'),
        testResultOtherRadioButton: () => cy.get('input#test-result-form-result-other-field', { timeout: 10000 }).should('exist'),
        testResultFurtherDetailsField: () => cy.get('textarea#test-result-form-details-field', { timeout: 10000 }).should('exist'),
        addTestReportButton: () => cy.contains('button', 'Add test report', { timeout: 10000 }).should('exist'),
        chooseFileButton: () => cy.get('input#test-result-form-document-field', { timeout: 10000 }).should('exist'),

        addAnotherTestReportYesRadioButton: () => cy.get('input#add-test-reports-form-add-another-test-report-true-field', { timeout: 10000 }).should('exist'),
        addAnotherTestReportNoRadioButton: () => cy.get('input#add-test-reports-form-add-another-test-report-field', { timeout: 10000 }).should('exist'),
        continueButton: () => cy.contains('button', 'Continue', { timeout: 10000 }).should('exist')
    }

    /************ Getters & Setters *************/

    /**
     * Click "Yes" radio button for funded by OPSS question
     */
    clickYesFundedByOPSS() {
        this.elements.opssFundedYesRadioButton().click();
    }

    /**
     * Click "No" radio button for funded by OPSS question
     */
    clickNoFundedByOPSS() {
        this.elements.opssFundedNoRadioButton().click();
    }

    /**
     * Click on "Save and continue" button
     */
    clickSaveAndContinue() {
        this.elements.saveAndContinueButton().click();
    }

    /**
     * Enter the given number in the Trading standards office sample reference number field
     * @param {*} refNumber 
     */
    enterTradingStandardsOfficerSampleReferenceNumber(refNumber) {
        this.elements.tradingStandardsOfficerSampleReferenceNumberField().clear();
        this.elements.tradingStandardsOfficerSampleReferenceNumberField().type(refNumber);
    }

    /**
     * Enter the given date in the Test certificate issued date fields
     * @param {*} date 
     */
    enterTestCertificateIssuedDate(date) {
        const [day, month, year] = date.split('/');
        this.elements.testCertificateDayField().clear();
        this.elements.testCertificateDayField().type(day);
        this.elements.testCertificateMonthField().clear();
        this.elements.testCertificateMonthField().type(month);
        this.elements.testCertificateYearField().clear();
        this.elements.testCertificateYearField().type(year);
    }

    /**
     * Select the relevant legislation from the "Under which legislation?" dropdown
     * @param {*} legislation 
     */
    selectRelevantLegislation(legislation) {
        if (legislation.toLowerCase() === 'random') {
            this.elements.whichLegislationDropdown().then($dropdown => {
                cy.wrap($dropdown).find('option').then(options => {
                    if (options.length > 0) {
                        const randomIndex = Math.floor(Math.random() * options.length);
                        cy.wrap($dropdown).select(options[randomIndex].value);
                        cy.wrap(options[randomIndex].text).as('testReportLegislation');
                        cy.log('Test report legislation = ' + options[randomIndex].text);
                    } else {
                        throw new Error('No options available in the test report relevant legislation dropdown');
                    }
                })
            })
        } else {
            this.elements.whichLegislationDropdown().select(legislation);
        }
    }

    /**
     * Enter the given text in the "Which standard was the product tested against?" field
     * @param {*} standard 
     */
    enterTheStandardTheProductTestedAgainst(standard) {
        this.elements.whichStandardField().clear();
        this.elements.whichStandardField().type(standard);
    }

    /**
     * Enter the given date in the "Date of test" fields
     * @param {*} date 
     */
    enterDateOfTest(date) {
        const [day, month, year] = date.split('/');
        this.elements.testDateDayField().clear();
        this.elements.testDateDayField().type(day);
        this.elements.testDateMonthField().clear();
        this.elements.testDateMonthField().type(month);
        this.elements.testDateYearField().clear();
        this.elements.testDateYearField().type(year);
    }

    /**
     * Click "Pass" radio button for "What was the result?"
     */
    clickTestResultPass() {
        this.elements.testResultPassRadioButton().click();
    }

    /**
     * Click "Fail" radio button for "What was the result?"
     */
    clickTestResultFail() {
        this.elements.testResultFailRadioButton().click();
    }

    /**
     * Click "Other" radio button for "What was the result?"
     */
    clickTestResultOther() {
        this.elements.testResultOtherRadioButton().click();
    }

    /**
     * Enter the product failed details when "Fail" is selected for "What was the result?" 
     * @param {*} info 
     */
    enterTestResultFailedInformation(info) {
        this.elements.testResultFailInformationField().clear();
        this.elements.testResultFailInformationField().type(info);
    }

    /**
     * Enter the given text in the further details field
     * @param {*} details 
     */
    enterFurtherDetails(details) {
        this.elements.testResultFurtherDetailsField().clear();
        this.elements.testResultFurtherDetailsField().type(details);
    }

    /**
     * Click on "Add test report" button
     */
    clickAddTestReport() {
        this.elements.addTestReportButton().click();
    }

    /**
     * Upload the given file name from the fixures directory
     * @param {*} fileName 
     */
    uploadTestReportFile(fileName) {
        this.elements.chooseFileButton().attachFile(fileName);
    }

    /**
     * Click on "Yes" radio button for add another report
     */
    clickYesAddAnotherTestReport() {
        this.elements.addAnotherTestReportYesRadioButton().click();
    }

    /**
     * Click "No" radio button for add another report
     */
    clickNoToAddAnotherTestReport() {
        this.elements.addAnotherTestReportNoRadioButton().click();
    }

    /**
     * Click on "Continue" button
     */
    clickContinue() {
        this.elements.continueButton().click();
    }


    /************ Public Methods ************/

    /**
     * Select Yes/No for "Was the test funded under the OPPS sampling protocol for Local Authorities?"
     * @param {*} dataTable 
     */
    setWasTheTestFundedByOPSS(dataTable) {
        dataTable.hashes().forEach((row) => {
            if (row.WasTheTestFundedByOPSS.toLowerCase() === 'yes') {
                this.clickYesFundedByOPSS();
            } else {
                this.clickNoFundedByOPSS();
            }
        })
    }

    /**
     * Add the test certificate details
     * @param {*} dataTable 
     */
    addTestCertificateDetails(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            if (headers.includes('OPSSSampleRefNumber') && row.OPSSSampleRefNumber) {
                this.enterTradingStandardsOfficerSampleReferenceNumber(row.OPSSSampleRefNumber);
            }
            if (headers.includes('TestCertificateDate') && row.TestCertificateDate) {
                this.enterTestCertificateIssuedDate(row.TestCertificateDate);
            }
        })
        this.clickSaveAndContinue();
    }

    /**
     * Add test report details 
     * @param {*} dataTable 
     */
    addTestReportDetails(dataTable) {
        const data = dataTable.hashes();
        const headers = dataTable.raw()[0];

        data.forEach(row => {
            if (headers.includes('TestReportRelevantLegislation') && row.TestReportRelevantLegislation) {
                this.selectRelevantLegislation(row.TestReportRelevantLegislation);
            }
            if (headers.includes('TestStandard') && row.TestStandard) {
                this.enterTheStandardTheProductTestedAgainst(row.TestStandard);
            }
            if (headers.includes('DateOfTest') && row.DateOfTest) {
                this.enterDateOfTest(row.DateOfTest);
            }
            if (headers.includes('TestResult') && row.TestResult) {
                if (row.TestResult.toLowerCase() === 'pass') {
                    this.clickTestResultPass();
                } else if (row.TestResult.toLowerCase() === 'fail') {
                    this.clickTestResultFail();
                    this.enterTestResultFailedInformation(row.TestResultFailInfo);
                } else {
                    this.clickTestResultOther();
                }
            }
            if (headers.includes('TestReportFurtherDetails') && row.TestReportFurtherDetails) {
                this.enterFurtherDetails(row.TestReportFurtherDetails);
            }
            if (headers.includes('TestReportFile') && row.TestReportFile) {
                this.uploadTestReportFile(row.TestReportFile);
            }
        })
        this.clickAddTestReport();
    }

}

export default PSDAddTestReportPage;