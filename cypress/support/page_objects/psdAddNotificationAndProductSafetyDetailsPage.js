import { should } from 'chai';

require('@cypress/xpath');

class PSDAddNotificationAndProductSafetyDetailsPage
{
    /****************** page objects *****************/

    elements = {
        notificationTitleField: () => cy.xpath("//input[@id='change-notification-details-form-user-title-field']", { timeout: 10000 }).should('exist'),
        notificationSummaryField: () => cy.xpath("//textarea[@id='change-notification-details-form-description-field']", { timeout: 1000 }).should('exist'),
        productUnsafeAndNoncompliantRadioButton: () => cy.xpath("//input[@id='change-notification-details-form-reported-reason-unsafe-or-non-compliant-field']", { timeout: 1000 }).should('exist'),
        productSafeAndCompliantRadioButton: () => cy.xpath("//input[@id='change-notification-details-form-reported-reason-safe-and-compliant-field']", { timeout: 1000 }).should('exist'),
        saveAndContinueButton: () => cy.xpath("//button[contains(text(), 'Save and continue')]", { timeout: 1000 }).should('exist'),
        saveAsDraftButton: () => cy.xpath("//button[contains(text(), 'Save as draft')]", { timeout: 1000 }).should('exist'),

        productHarmCheckbox: () => cy.xpath("//input[@id='change-notification-product-safety-compliance-details-form-unsafe-true-field']", { timeout: 1000 }).should('exist'),
        productPrimaryHarmDropdown: () => cy.xpath("//select[@id='change-notification-product-safety-compliance-details-form-primary-hazard-field']", { timeout: 1000 }).should('exist'),
        productHarmAdditionalInformationField: () => cy.xpath("//textarea[@id='change-notification-product-safety-compliance-details-form-primary-hazard-description-field']", { timeout: 1000 }).should('exist'),
        productIncompleteMarkingsCheckbox: () => cy.xpath("//input[@id='change-notification-product-safety-compliance-details-form-noncompliant-true-field']", { timeout:1000 }).should('exist'),
        productDescribeNoncomplianceIssuesField: () => cy.xpath("//textarea[@id='change-notification-product-safety-compliance-details-form-noncompliance-description-field']", { timeout:1000 }).should('exist'),
        safetyIssueReportedbyOverseasRegulatorYesRadioButton: () => cy.xpath("//input[@id='change-notification-product-safety-compliance-details-form-is-from-overseas-regulator-true-field']", { timeout:1000 }).should('exist'),
        safetyIssueReportedbyOverseasRegulatorCountryDropdown: () => cy.xpath("//select[@id='change-notification-product-safety-compliance-details-form-overseas-regulator-country-field']", { timeout:1000 }).should('exist'),
        safetyIssueReportedbyOverseasRegulatorNoRadioButton: () => cy.xpath("//input[@id='change-notification-product-safety-compliance-details-form-is-from-overseas-regulator-field']", { timeout:1000 }).should('exist'),
        referenceNumberYesRadioButton: () => cy.xpath("//input[@id='change-notification-product-safety-compliance-details-form-add-reference-number-true-field']", { timeout:1000 }).should('exist'),
        referenceNumberField: () => cy.xpath("//input[@id='change-notification-product-safety-compliance-details-form-reference-number-field']", { timeout:1000 }).should('exist'),
        referenceNumberNoRadioButton: () => cy.xpath("//input[@id='change-notification-product-safety-compliance-details-form-add-reference-number-field']", { timeout:1000 }).should('exist'),

        exactNumberRadioButton: () => cy.xpath("//label[contains(text(), 'Exact number')]/preceding-sibling::input", { timeout:1000 }).should('exist'),
        exactAffectedNumberField: () => cy.xpath("//label[contains(text(), 'How many units are affected?')]/following-sibling::input[contains(@name, 'exact_units')]", { timeout: 1000 }).should('exist'),
        approximateNumberRadioButton: () => cy.xpath("//label[contains(text(), 'Approximate number')]/preceding-sibling::input", { timeout:1000 }).should('exist'),
        approximateAffectedNumberField: () => cy.xpath("//label[contains(text(), 'How many units are affected?')]/following-sibling::input[contains(@name, 'approx_units')]", { timeout: 1000 }).should('exist'),
        unknownRadioButton: () => cy.xpath("//label[contains(text(), 'Unknown')]/preceding-sibling::input", { timeout:1000 }).should('exist'),
        notrelevantRadioButton: () => cy.xpath("//label[contains(text(), 'Not relevant')]/preceding-sibling::input", { timeout:1000 }).should('exist'),
        saveAndCompleteTasksInThisSectionButton: () => cy.xpath("//button[contains(text(), 'Save and complete tasks in this section')]", { timeout: 1000 }).should('exist')

    }

    /*************** Properties ***************/

    /******************** Getters & Setters *******************/

    /**
     * Enter the given text in to Notification Title field
     * @param {*} notificationTitle 
     */
    enterNotificationTitle(notificationTitle) {
        this.elements.notificationTitleField().clear();

        if (notificationTitle.toLowerCase() === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var title = 'AutoTestPSDNotification_' + psdrandomgenerator.generateRandomNumber(5);
            cy.wrap(title).as('notificationTitle');
            this.elements.notificationTitleField().type(title);
            cy.log('Notification Title = ' + title);
        } else {
            this.elements.notificationTitleField().type(notificationTitle);
        }
    }

    /**
     * Enter the given text in the Notification summary field
     * @param {*} notificationSummary 
     */
    enterNotificationSummary(notificationSummary) {
        this.elements.notificationSummaryField().clear();
        this.elements.notificationSummaryField().type(notificationSummary);
    }

    /**
     * Click "A product is unsafe or non-compliant" radio button
     */
    clickProductIsUnsafeAndNoncompliant() {
        this.elements.productUnsafeAndNoncompliantRadioButton().click();
    }

    /**
     * Click "A product is safe and compliant" radio button
     */
    clickProductIsSafeAndCompliant() {
        this.elements.productSafeAndCompliantRadioButton().click();
    }

    /**
     * Click on "Save and continue" button
     */
    clickSaveAndContinue() {
        this.elements.saveAndContinueButton().click();
    }

    /**
     * Click on "Save as draft" button
     */
    clickSaveAsDraft() {
        this.elements.saveAsDraftButton().click();
    }

    /**
     * Add the product harm information
     * @param {*} primaryHarm 
     * @param {*} harmInfo 
     */
    addProductHarm(primaryHarm, harmInfo) {
        this.elements.productHarmCheckbox().check();

        if (primaryHarm.toLowerCase() === 'random') {
            this.elements.productPrimaryHarmDropdown().then($dropdown => {
                cy.wrap($dropdown).find('option').then(options => {
                    if (options.length > 0) {
                        const randomIndex = Math.floor(Math.random() * options.length);
                        cy.wrap($dropdown).select(options[randomIndex].value);
                        cy.wrap(options[randomIndex].text).as('productPrimaryHarm');
                        cy.log('Product Primary Harm = ' + options[randomIndex].text);
                    } else {
                        throw new Error('No options available in the Product Primary Harm dropdown');
                    }
                })
            })
        } else {
            this.elements.productPrimaryHarmDropdown().select(primaryHarm);
        }

        this.elements.productHarmAdditionalInformationField().clear();
        this.elements.productHarmAdditionalInformationField().type(harmInfo);
    }

    /**
     * Add "Product incomplete markings, labeling or other issues"
     * @param {*} issueDescription 
     */
    addProductIncompleteMarking(issueDescription) {
        this.elements.productIncompleteMarkingsCheckbox().check();
        this.elements.productDescribeNoncomplianceIssuesField().clear();
        this.elements.productDescribeNoncomplianceIssuesField().type(issueDescription);
    }

    /**
     * Select the Overseas regulator yes or no. Select the country is selected Yes
     * @param {*} country 
     */
    selectReportedOverseasRegulator(country) {
        if (country.toLowerCase() !== 'no') {
            this.elements.safetyIssueReportedbyOverseasRegulatorYesRadioButton().click();
            if (country.toLowerCase() === 'random') {
                this.elements.safetyIssueReportedbyOverseasRegulatorCountryDropdown().then($dropdown => {
                    cy.wrap($dropdown).find('option').then(options => {
                        if (options.length > 0) {
                            const randomIndex = Math.floor(Math.random() * options.length);
                            cy.wrap($dropdown).select(options[randomIndex].value);
                            cy.wrap(options[randomIndex].text).as('reportedOverseasRegulatorCountry');
                            cy.log('Reported by Overseas regulator country = ' + options[randomIndex].text);
                        } else {
                            throw new Error('No options available in the Reported by Overseas regulator country dropdown');
                        }
                    })
                })
            } else {
                this.elements.safetyIssueReportedbyOverseasRegulatorCountryDropdown().select(country);
            }
        } else {
            this.elements.safetyIssueReportedbyOverseasRegulatorNoRadioButton().click();
        }
    }

    /**
     * Select Yes/no for the Reference number. Enter Reference number if Yes.
     * @param {*} reference 
     */
    addReferenceNumber(reference) {
        if (reference.toLowerCase() !== 'no') {
            this.elements.referenceNumberYesRadioButton().click();
            this.elements.referenceNumberField().clear();
            this.elements.referenceNumberField().type(reference);
        } else {
            this.elements.referenceNumberNoRadioButton().click();
        }
    }

    /************* Public Methods ***************/

    /**
     * Add notification details and click "Save and continue" button
     * @param {*} dataTable 
     */
    addNotificationDetails(dataTable) {
        dataTable.hashes().forEach((row) => {
            this.enterNotificationTitle(row.NotificationTitle);
            this.enterNotificationSummary(row.NotificationSummary);

            if (row.NotificationReason.toLowerCase() === 'product is safe') {
                this.clickProductIsSafeAndCompliant();
            } else {
                this.clickProductIsUnsafeAndNoncompliant();
            }
        })

        this.clickSaveAndContinue();
    }

    /**
     * Add product safety and compliance details
     * @param {*} dataTable 
     */
    addProductSafetyAndComplianceDetails(dataTable) {

        dataTable.hashes().then((rows) => {
            const headers = Object.keys(rows[0]);

            rows.forEach(row => {
                // Add Product harm information is given
                if (headers.includes('ProductPrimaryHarm')) {
                    this.addProductHarm(row.ProductPrimaryHarm, row.ProductHarmInfo);
                } 
                
                // Add Product incomplete markings, labeling or other issues if given
                if (headers.includes('ProductIncompleteMarkingsDescription')) {                    
                    this.addProductIncompleteMarking(row.ProductIncompleteMarkingsDescription);
                } 

                this.selectReportedOverseasRegulator(row.OverseasRegulatorCountry);
                this.addReferenceNumber(row.ReferenceNumber);
            })

            // // Add Product harm information is given
            // if (headers.includes('ProductPrimaryHarm')) {
            //     rows.forEach(row => {
            //         this.addProductHarm(row.ProductPrimaryHarm, row.ProductHarmInfo);
            //     })
            // }

            // // Add Product incomplete markings, labeling or other issues if given
            // if (headers.includes('ProductIncompleteMarkingsDescription')) {
            //     rows.forEach(row => {
            //         this.addProductIncompleteMarking(row.ProductIncompleteMarkingsDescription);
            //     })
            // }

            // rows.forEach(row => {
            //     this.selectReportedOverseasRegulator(row.OverseasRegulatorCountry);
            //     this.addReferenceNumber(row.ReferenceNumber);
            // })
        })
        this.clickSaveAndContinue();       
    }

    /**
     * Add the number of affected products
     * @param {*} dataTable 
     */
    addNumberOfAffectedProducts(dataTable) {
        dataTable.hashes().then((rows) => {
            const headers = Object.keys(rows[0]);

            rows.forEach(row => {
                if (headers.includes('ExactNumber')) {
                    this.elements.exactNumberRadioButton().click();
                    this.elements.exactAffectedNumberField().clear();
                    this.elements.exactAffectedNumberField().type(row.ExactNumber);
                } else if (headers.includes('ApproximateNumber')) {
                    this.elements.approximateNumberRadioButton().click();
                    this.elements.approximateAffectedNumberField().clear();
                    this.elements.approximateAffectedNumberField().type(row.ApproximateNumber);
                } else if (headers.includes('Unknown')) {
                    this.elements.unknownRadioButton().click();
                } else {
                    this.elements.notrelevantRadioButton().click();
                }
            })
        })
        this.elements.saveAndCompleteTasksInThisSectionButton().click();
    }


}

export default PSDAddNotificationAndProductSafetyDetailsPage;