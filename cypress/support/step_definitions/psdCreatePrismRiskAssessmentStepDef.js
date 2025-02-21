/// <reference types="cypress" />

import PSDMenuPage from "../page_objects/psdMenuPage";
import PSDPrismRiskAssessmentPage from "../page_objects/psdPrismRiskAssessmentsPage";
import PSDProductsPage from "../page_objects/psdProductsPage";
import PSDPrismRiskAddEvaluationDetailsPage from "./psdPrismRiskAddEvaluationDetailsPage";
import PSDBasePage from "../page_objects/psdBasePage";

/********************** Step definitions **********************/

Given("the user starts to create a new prism risk assessment", function () {
    const psdMenuPage = new PSDMenuPage();
    psdMenuPage.navigateToRiskAssessmentsPage();

    const psdPrismRiskAssessmentPage = new PSDPrismRiskAssessmentPage();
    psdPrismRiskAssessmentPage.clickStartNewRiskAssessmentButton();
})

Given("the user starts to create a new prism risk assessment for the {string} product", function (productName) {
    const psdMenuPage = new PSDMenuPage();
    psdMenuPage.navigateToRiskAssessmentsPage();

    const psdPrismRiskAssessmentPage = new PSDPrismRiskAssessmentPage();
    psdPrismRiskAssessmentPage.clickStartNewRiskAssessmentButton();

    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.searchForAProduct(productName);
    psdProductsPage.clickProductNameLinkInSearchResultsTable();

    psdPrismRiskAssessmentPage.clickStartNewRiskAssessmentButton();
})

Given("the user starts to create a new prism risk assessment for the {string} product with the following data:", function (productName, dataTable) {
    const psdMenuPage = new PSDMenuPage();
    psdMenuPage.navigateToRiskAssessmentsPage();

    const psdPrismRiskAssessmentPage = new PSDPrismRiskAssessmentPage();
    psdPrismRiskAssessmentPage.clickStartNewRiskAssessmentButton();

    const psdProductsPage = new PSDProductsPage();
    psdProductsPage.searchForAProduct(productName);
    psdProductsPage.clickProductNameLinkInSearchResultsTable();

    psdPrismRiskAssessmentPage.clickStartNewRiskAssessmentButton();

    dataTable.hashes().forEach((row) => {
        psdPrismRiskAssessmentPage.setSeriousRiskDeemedToExist(row.SeriousHazard);
        psdPrismRiskAssessmentPage.setFactorsToSayLessRisk(row.AnyFactorsToIndicateLessSerious, row.FactorDescription)
    })
})

When("the user adds the following product evaluation details:", function (dataTable) {
    PSDBasePage.followLink('Add evaluation details');
    const psdPrismRiskAddEvaluationDetailsPage = new PSDPrismRiskAddEvaluationDetailsPage();
    psdPrismRiskAddEvaluationDetailsPage.setPrismRiskEvaluationDetails(dataTable);
})

When("the user adds the following risk assessment outcome details:", function (dataTable) {
    PSDBasePage.followLink('Add level of uncertainty and sensitivity analysis');

})