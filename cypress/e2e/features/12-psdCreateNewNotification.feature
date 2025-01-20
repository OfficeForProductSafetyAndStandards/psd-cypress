Feature: Create PSD new Notification
    As a logged in user of the PSD service
    I want to be able to create a new Notification
    So that I have the notification

    Background: User Log into PSD application

        Given the user logs into PSD system

    @SmokeTest
    Scenario Outline: 1. Verify that a user can verify and submit a notification

        Given the user creates a product record with the following data:
            | DoesProductHasBarcode   | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit   | ProductMarking   | ManufacturerBrandName | ProductName   | UploadProductImage | MarketBeforeJan2021   | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | <DoesProductHasBarcode> | Random        | Random          | Random             | <IsProductCounterfeit> | <ProductMarking> | Random                | <ProductName> | No                 | <MarketBeforeJan2021> | ASIN                    | as.co.uk | Random          | desc                 |
        And the user starts to create a new product safety notification
        And the user searches for and adds the following products to the notification:
            | ProductName   |
            | <ProductName> |
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
        And the user should see the following text on the page:
            | Text                                      |
            | Check the notification details and submit |
            | NotificationName                          |
            | Notification details                      |

        When the user verifies the following data on submit notification page and submit the notification:
            | Key                               | Value                                                                                                          |
            | Notification number               | Random                                                                                                         |
            | Notification title                | Random                                                                                                         |
            | Notification summary              | Auto Test notification summary                                                                                 |
            | Notification reason               | Unsafe or non-compliant product(s)                                                                             |
            | Specific product safety issues    | Product harm: Random,Harm to health,Product incomplete markings,labeling or other issues,Product non-compliant |
            | Reported by overseas regulator    | Yes: Random                                                                                                    |
            | Internal reference number         | Not provided                                                                                                   |
            | Number of affected products       | BrandName ProductName: Not relevant                                                                            |
            | Batch numbers                     | 1231231232                                                                                                     |
            | Customs codes                     | Not provided                                                                                                   |
            | Business role in the supply chain | Retailer                                                                                                       |
            | Registered or legal name          | Random                                                                                                         |
            | Companies House number            | Random                                                                                                         |
            | Address                           | Line1,AA1 1AA,Random                                                                                           |
            | Contact details                   | Not provided                                                                                                   |
            | Test reports                      | docx.docx (opens in new tab)                                                                                   |
            | Risk assessments                  | Serious risk: BrandName ProductName                                                                            |
            | Supporting images                 | file_example_JPG_500kB.jpg (opens in new tab)                                                                  |
            | Supporting documents              | docx.docx (opens in new tab)                                                                                   |
            | Notification risk level           | Serious risk                                                                                                   |
            | Corrective action                 | Import rejected at border                                                                                      |
            | Effective date                    | 10 February 2024                                                                                               |
            | Legislation                       | Random                                                                                                         |
            | Responsible business              | Random                                                                                                         |
            | Action type                       | Mandatory                                                                                                      |
            | Geographic scope                  | Great Britain                                                                                                  |
            | Further details                   | QA Auto test                                                                                                   |
            | Related file                      | docx.docx (opens in new tab)                                                                                   |

        Then the user should see the following text on the page:
            | Text                                                 |
            | Notification submitted                               |
            | Notification reference number                        |
            | NotificationNumber                                   |
            | You have successfully submitted the notification for |
            | NotificationName                                     |

        Examples:
            | DoesProductHasBarcode | IsProductCounterfeit | ProductMarking | ProductName | MarketBeforeJan2021 | ExpBarcode | ExpMarketDate              | ExpCounterfeit                                      | ExpProductMarking |
            | No                    | No                   | No             | Random      | No                  |            | On or after 1 January 2021 | No - This product record is about a genuine product | None              |


    Scenario Outline: 2. Search and select a notification

        Given the user navigates to "<url>" url in PSD
        And the user selects the "AutoTestPSDNotification_46919" notification to make changes
        And the user follows the "Check the notification details and submit" link

        Then the user should see the following text on the page:
            | Text                                      |
            | Check the notification details and submit |
            | NotificationName                          |
            | Notification details                      |

        Then the user should see the following notification details on the page:
            | Key                            | Value                                                                                                          |
            | Notification number            | Random                                                                                                         |
            | Notification title             | Random                                                                                                         |
            | Notification summary           | Auto Test notification summary                                                                                 |
            | Notification reason            | Unsafe or non-compliant product(s)                                                                             |
            | Specific product safety issues | Product harm: Random,Harm to health,Product incomplete markings,labeling or other issues,Product non-compliant |
            | Number of affected products    | BrandName ProductName: Not relevant                                                                            |

        Examples:
            | url                              |
            | notifications/your-notifications |
