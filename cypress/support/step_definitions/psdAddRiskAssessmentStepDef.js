/// <reference types="cypress" />

import PSDCreateNotificationHelper from "../helper_classes/psdCreateNotificationHelper";
import PSDViewNotificationDetailsPage from "../page_objects/psdViewNotificationDetailsPage";
import PSDAddRiskAssessmentPage from "../page_objects/psdAddRiskAssessmentPage";

/********************** Step definitions **********************/

When("the user adds additional risk assessment with the following data:", function (dataTable) {
    const psdViewNotificationDetailsPage = new PSDViewNotificationDetailsPage();
    psdViewNotificationDetailsPage.clickChangeLinkForGivenField("Risk assessments");
    psdViewNotificationDetailsPage.clickAddLinkForGivenHeading('Risk assessments');

    const psdCreateNotificationHelper = new PSDCreateNotificationHelper();
    psdCreateNotificationHelper.addAdditionalRiskAssessmentToANotification(dataTable);
})

When("the user selects {string} for do you want to match this nitification risk level", function (option) {
    const psdAddRiskAssessmentPage = new PSDAddRiskAssessmentPage();
    psdAddRiskAssessmentPage.matchNotificationRiskLevelToRiskAssessmentLevel(option);
})