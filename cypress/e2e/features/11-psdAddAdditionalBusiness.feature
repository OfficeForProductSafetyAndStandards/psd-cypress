Feature: Add an additional business to an existing notification
    As a logged in user of the PSD service and the team member for the assigned team
    I want to be able to add an additional business to an existing notification
    So that I have the additional business added to a notification


    Background: Log into PSD

        Given the user logs into PSD system


    @SmokeTest
    Scenario Outline: Verify that a user can add an additional business to an existing notification

        Given the user creates a product record with the following data:
            | DoesProductHasBarcode | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit | ProductMarking | ManufacturerBrandName | ProductName | UploadProductImage | MarketBeforeJan2021 | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | No                    | Random        | Random          | Random             | No                   | No             | Random                | Random      | No                 | No                  | ASIN                    | as.co.uk | Random          | desc                 |
        And the user starts to create a new product safety notification
        And the user searches for and adds the following products to the notification:
            | ProductName |
            | Random      |
        And the user adds the following notification and product safety details:
            | NotificationTitle | NotificationSummary            | NotificationReason | ProductPrimaryHarm | ProductHarmInfo | ProductIncompleteMarkingsDescription | OverseasRegulatorCountry | ReferenceNumber |
            | Random            | Auto Test notification summary | Product is unsafe  | Random             | Harm to health  | Product non-compliant                | Random                   | No              |
        And the user adds a new business with the following data:
            | TradingName | LegalName | CompanyNumber | AddressLine1 | Postcode | Country | BusinessRole |
            | Random      | Random    | Random        | Line1        | AA1 1AA  | Random  | Retailer     |
        And the user adds the following product identification and evidence details:
            | BatchNumber | WasTheTestFundedByOPSS | TestReportRelevantLegislation | TestStandard | DateOfTest | TestResult | TestReportFurtherDetails | TestReportFile | SupportingImage            | SupportingDocumentTitle | SupportingDocument | DateOfAssessment | RiskLevel    | AssessedBy               | RiskAssessmentFile | RiskAssessmentDetails | EvaluateRiskLevel |
            | 1231231232  | No                     | Random                        | OPSS         | 10/04/2024 | Pass       | QA Auto Test             | docx.docx      | file_example_JPG_500kB.jpg | Auto test doc           | docx.docx          | 10/04/2024       | Serious risk | OPSS Incident Management | docx.pdf           | Auto test assessment  | Serious risk      |
        And the user adds a corrective action with the following details:
            | TakenCorrectiveAction | ActionBeingTaken          | ActionDate | Legislation | ResponsibleBusiness | IsActionMandatory | GeographicRegions   | FurtherDetails | UploadActionFiles | FileName  |
            | Yes                   | Import rejected at border | 10/2/2024  | Random      | Random              | Yes               | Local,Great Britain | QA Auto test   | Yes               | docx.docx |
        And the user follows the "Check the notification details and submit" link
        And the user submits the notification
        And the user navigates to "Notifications" page from the header menu
        And the user follows the "All notifications – Search" link
        And the user searches for and views the "Random" notification

        When the user create and add the following additional businesses to the notification:
            | TradingName                     | LegalName                     | CompanyNumber                     | AddressLine1 | Postcode | Country   | BusinessRole   |
            | <AdditionalBusinessTradingName> | <AdditionalBusinessLegalName> | <AdditionalBusinessCompanyNumber> | Line1        | AA1 1AA  | <Country> | <BusinessRole> |

        Then the user should see the following business details:
            | Key                               | Value                             |
            | Trading Name                      | <AdditionalBusinessTradingName>   |
            | Business role in the supply chain | <BusinessRole>                    |
            | Registered or legal name          | <AdditionalBusinessLegalName>     |
            | Companies House number            | <AdditionalBusinessCompanyNumber> |
            | Address                           | <Country>                         |

        Examples:
            | AdditionalBusinessTradingName | AdditionalBusinessLegalName | AdditionalBusinessCompanyNumber | Country        | BusinessRole      |
            | Random                        | Random                      | Random                          | Western Sahara | Fulfillment house |