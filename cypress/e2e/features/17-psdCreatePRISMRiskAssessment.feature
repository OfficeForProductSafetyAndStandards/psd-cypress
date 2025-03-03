Feature: Create a PRISM risk assessment
    As a logged in user of the PSD service
    I want to be able to create a PRISM risk assessment
    So that I can add it to a notification


    Background: Log into PSD

        Given the user logs into PSD system


    @SmokeTest
    Scenario Outline: 1. Verify that a user can create a PRISM risk assessment for a product

        Given the user creates a product record with the following data:
            | DoesProductHasBarcode | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit | ProductMarking | ManufacturerBrandName | ProductName | UploadProductImage | MarketBeforeJan2021 | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | No                    | Random        | Random          | Random             | No                   | No             | Random                | Random      | No                 | No                  | ASIN                    | as.co.uk | Random          | desc                 |
        And the user starts to create a new prism risk assessment for the "Random" product with the following data:
            | SeriousHazard | AnyFactorsToIndicateLessSerious |
            | Yes           | No                              |
        When the user adds the following product evaluation details:
            | AssessmentTitle        | NameOfAssessor       | NameOfAssessmentOrg         |
            | QA AutoTest Assessment | QA AutoTest Assessor | QA Auto Test Assessment Org |

        When the user adds the following risk assessment outcome details:
            | LevelOfUncertainty   | HasSensitivityAnalysisUndertaken   | SensitivityAnalysisInfo   |
            | <LevelOfUncertainty> | <HasSensitivityAnalysisUndertaken> | <SensitivityAnalysisInfo> |

        When the user adds the following nature of the risk details:
             

        Examples:
            | ProductName | LevelOfUncertainty | HasSensitivityAnalysisUndertaken | SensitivityAnalysisInfo                       |
            | Random      | High               | Yes                              | QA Auto Test Sensitivity Analysis Information |