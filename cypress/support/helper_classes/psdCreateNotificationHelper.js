import PSDAddTestReportPage from "../page_objects/psdAddTestReportPage";
import PSDCommonPage from "../page_objects/psdCommonPage";
import PSDAddRiskAssessmentPage from "../page_objects/psdAddRiskAssessmentPage";

class PSDCreateNotificationHelper {

    /************* Public methods **************/

    /**
     * Helper method to add Test report details for a notification
     * @param {*} dataTable 
     */
    addTestReportToANotification(dataTable) {
        const psdCommonPage = new PSDCommonPage();
        psdCommonPage.followLink("Add test reports");

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
        const psdCommonPage = new PSDCommonPage();
        cy.wait(3000);
        psdCommonPage.followLink("Add risk assessments");

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


}

export default PSDCreateNotificationHelper;