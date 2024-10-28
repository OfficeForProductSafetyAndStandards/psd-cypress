Feature: Add, Edit and Remove image in a PSD product record
    As a owner of a PSD product
    I want to be able to eAdd, edit and remove an image in a product record
    So that I have imaged added, edited, removed in the product record that can be used for a notification


    Background: Log into PSD

        Given the user logs into PSD system


    @SmokeTest
    Scenario Outline: Verify that an image can be added to a product that is added to a notification

        Given the user creates a product record with the following data:
            | DoesProductHasBarcode | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit | ProductMarking | ManufacturerBrandName | ProductName | UploadProductImage | MarketBeforeJan2021 | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | No                    | Random        | Random          | Random             | No                   | No             | Random                | Random      | No                 | No                  | ASIN                    | as.co.uk | Random          | desc                 |
        And the user start to create a new product safety notification
        And the user search and add the following products to the notification:
            | ProductName |
            | Random      |
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
        And the user follows "Check the notification details and submit" link
        And the user submit the notification
        And the user navigates to "Products" page from the header menu
        And the user follows "All products - Search" link
        And the user search and view the "Random" product

        When the user add "<ImageName>" image to the product

        Then the user should see the following message on the page:
            | Message                |
            | The image was uploaded |
        And the user should see the following images added to the product:
            | ImageName   | ImageHref   |
            | <ImageName> | <ImageHref> |

        When the user deletes the product image
        Then the user should see the following message on the page:
            | Message                            |
            | The image was successfully removed |
        Examples:
            | ImageName                  | ImageHref                   |
            | file_example_JPG_500kB.jpg | /file_example_JPG_500kB.jpg |

