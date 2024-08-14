Feature: Create PSD new business
    As a logged in user of the PSD service
    I want to be able to create a new business
    So that I have the business record created that can be used for a notification


    @SmokeTest
    Scenario Outline: Create new business

        Given the user logs into PSD system
        And the user creates a product record with the following data:
            | DoesProductHasBarcode   | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit   | ProductMarking   | ManufacturerBrandName | ProductName   | UploadProductImage | MarketBeforeJan2021   | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | <DoesProductHasBarcode> | Random        | Random          | Random             | <IsProductCounterfeit> | <ProductMarking> | Random                | <ProductName> | No                 | <MarketBeforeJan2021> | ASIN                    | as.co.uk | Random          | desc                 |
        And the user start to create a new product safety notification
        And the user search and add the following products to the notification:
            | ProductName   |
            | <ProductName> |
        And the user add the following notification and product safety details:
            | NotificationTitle | NotificationSummary            | NotificationReason | ProductPrimaryHarm | ProductHarmInfo | ProductIncompleteMarkingsDescription | OverseasRegulatorCountry | ReferenceNumber |
            | Random            | Auto Test notification summary | Product is unsafe  | Random             | Harm to health  | Product non-compliant                | Random                   | No              |
        And the user add a new business with the following data:
            | TradingName | LegalName | CompanyNumber | AddressLine1 | Postcode | Country | BusinessRole |
            | Random      | Random    | Random        | Line1        | AA1 1AA  | Random  | Retailer     |
        And the user add the following product identification and evidence details:
            | BatchNumber | WasTheTestFundedByOPSS | TestReportRelevantLegislation | TestStandard | DateOfTest | TestResult | TestReportFurtherDetails | TestReportFile | SupportingImage            | SupportingDocumentTitle | SupportingDocument | DateOfAssessment | RiskLevel    | AssessedBy               | RiskAssessmentFile | RiskAssessmentDetails | EvaluateRiskLevel |
            | 1231231232  | No                     | Random                        | OPSS         | 10/04/2024 | Pass       | QA Auto Test             | docx.docx      | file_example_JPG_500kB.jpg | Auto test doc           | docx.docx          | 10/04/2024       | Serious risk | OPSS Incident Management | docx.pdf           | Auto test assessment  | Serious risk      |
        And the user add a corrective action with the following details:
            | TakenCorrectiveAction | ActionBeingTaken          | ActionDate | Legislation | ResponsibleBusiness | IsActionMandatory | GeographicRegions   | FurtherDetails | UploadActionFiles | FileName  |
            | Yes                   | Import rejected at border | 10/2/2024  | Random      | Random              | Yes               | Local,Great Britain | QA Auto test   | Yes               | docx.docx |

        Examples:
            | DoesProductHasBarcode | IsProductCounterfeit | ProductMarking | ProductName | MarketBeforeJan2021 | ExpBarcode | ExpMarketDate              | ExpCounterfeit                                      | ExpProductMarking |
            | No                    | No                   | No             | Random      | No                  |            | On or after 1 January 2021 | No - This product record is about a genuine product | None              |



