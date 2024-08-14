import PSDAddTestReportPage from "../page_objects/psdAddTestReportPage";
import PSDAddRiskAssessmentPage from "../page_objects/psdAddRiskAssessmentPage";
import PSDRecordCorrectiveActionPage from "../page_objects/psdRecordACorrectiveActionPage";
import PSDBasePage from "../page_objects/psdBasePage";

class PSDCreateNotificationHelper {

    /************* Public methods **************/

    /**
     * Helper method to add Test report details for a notification
     * @param {*} dataTable 
     */
    addTestReportToANotification(dataTable) {
        PSDBasePage.followLink("Add test reports");

        const psdAddTestReportPage = new PSDAddTestReportPage();
        const data = dataTable.hashes();

        data.forEach((row, index) => {
            psdAddTestReportPage.setWasTheTestFundedByOPSS(dataTable);
            psdAddTestReportPage.addTestCertificateDetails(dataTable);
            psdAddTestReportPage.addTestReportDetails(dataTable);
            if (index < data.length - 1) {
                psdAddTestReportPage.clickYesAddAnotherTestReport();
                psdAddTestReportPage.clickContinue();
            } else {
                psdAddTestReportPage.clickNoToAddAnotherTestReport();
                psdAddTestReportPage.clickContinue();
            }
        })
    }

    /**
     * Helper method to add Risk Assessment details to a notification
     * @param {*} dataTable 
     */
    addRiskAssessmentToANotification(dataTable) {
        cy.wait(3000);
        PSDBasePage.followLink("Add risk assessments");

        const psdAddRiskAssessmentPage = new PSDAddRiskAssessmentPage();
        const data = dataTable.hashes();

        data.forEach((row, index) => {
            psdAddRiskAssessmentPage.addLegacyRiskAssessmentDetails(dataTable);
            if (index < data.length - 1) {
                psdAddRiskAssessmentPage.clickYesAddAnotherRiskAssessment();
                psdAddRiskAssessmentPage.clickContinue();
            } else {
                psdAddRiskAssessmentPage.clickNoToAddAnotherRiskAssessment();
                psdAddRiskAssessmentPage.clickContinue();
            }
        })
    }

    /**
     * Helper method to add corrective action to a notification
     * @param {*} dataTable 
     */
    addACorrectiveActionToANotification(dataTable) {
        cy.wait(3000);
        PSDBasePage.followLink("Record a corrective action");

        const psdActionPage = new PSDRecordCorrectiveActionPage();
        const data = dataTable.hashes();

        data.forEach((row, index) => {
            psdActionPage.addCorrectiveAction(dataTable);
            if (index < data.length - 1) {
                psdActionPage.clickYesAddAnotherAction();
                psdActionPage.clickContinue();
            } else {
                psdActionPage.clickNoToAddAnotherAction();
                psdActionPage.clickContinue();
            }
        })
    }


}

export default PSDCreateNotificationHelper;