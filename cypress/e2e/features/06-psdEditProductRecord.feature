Feature: Edit PSD product record
    As a logged in user of the PSD service
    I want to be able to edit a product record
    So that I have the product record updated that can be used for a notification


    Background: Log into PSD

        Given the user logs into PSD system


    # Only a super user can edit a product that is not yet added to a notification
    Scenario Outline: 1. Verify that a user can edit a product record that is not yet added to a notification

        Given the user creates a product record with the following data:
            | DoesProductHasBarcode | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit | ProductMarking | ManufacturerBrandName | ProductName | UploadProductImage | MarketBeforeJan2021 | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | No                    | Random        | Random          | Random             | No                   | No             | Random                | Random      | No                 | No                  | ASIN                    | as.co.uk | Random          | desc                 |
        And the user clicks on the link "View the product record"

        When the user edits the product record with the following data:
            | ProductCategory       | ProductSubcategory       | ProductMarking       | MarketBeforeJan2021       | BarcodeNumber | OtherProductIdentifiers       | Webpage       | CounrtyOfOrigin       | DescriptionOfProduct       |
            | <EditProductCategory> | <EditProductSubcategory> | <EditProductMarking> | <EditMarketBeforeJan2021> | <EditBarcode> | <EditOtherProductIdentifiers> | <EditWebpage> | <EditCounrtyOfOrigin> | <EditDescriptionOfProduct> |

        Then the user should see the following message on the page:
            | Message                                                 |
            | The product record was updated                          |
            | This is a Product Safety Database (PSD) product record. |
        And the user should see the following product data on view product page:
            | Key                       | Value                         |
            | Brand name                | Random                        |
            | Product name              | Random                        |
            | Category                  | <EditProductCategory>         |
            | Subcategory               | <EditProductSubcategory>      |
            | Barcode                   | <EditBarcode>                 |
            | Description               | <EditDescriptionOfProduct>    |
            | Webpage                   | <EditWebpage>                 |
            | Market date               | <EditMarketBeforeJan2021>     |
            | Country of origin         | <EditCounrtyOfOrigin>         |
            | Counterfeit               | No                            |
            | Product marking           | <EditProductMarking>          |
            | Other product identifiers | <EditOtherProductIdentifiers> |

        Examples:
            | EditProductCategory | EditProductSubcategory                              | EditProductMarking | EditMarketBeforeJan2021 | EditBarcode                         | EditOtherProductIdentifiers                   | EditWebpage                                  | EditCounrtyOfOrigin | EditDescriptionOfProduct                              |
            | Furniture           | Edited Furniture Sub cat                            | Unknown            | Unable to ascertain     | 13246587                            | Edited identifiers                            | Editedexample.com                            | United Kingdom      | Edited product Description                            |
            | Furniture           | <script>alert('Edited Furniture sub cat');</script> | Unknown            | Unable to ascertain     | <script>alert('13246587');</script> | <script>alert('Edited identifiers');</script> | <script>alert('Editedexample.com');</script> | United Kingdom      | <script>alert('Edited product Description');</script> |


    @SmokeTest
    Scenario Outline: 2. Verify that a user can edit a product record that is added to a notification

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
        And the user navigates to "products/all-products" url in PSD
        And the user searches for the "Random" product

        When the user edits the product record with the following data:
            | ProductCategory       | ProductSubcategory       | ProductMarking       | MarketBeforeJan2021       | BarcodeNumber | OtherProductIdentifiers       | Webpage       | CounrtyOfOrigin       | DescriptionOfProduct       |
            | <EditProductCategory> | <EditProductSubcategory> | <EditProductMarking> | <EditMarketBeforeJan2021> | <EditBarcode> | <EditOtherProductIdentifiers> | <EditWebpage> | <EditCounrtyOfOrigin> | <EditDescriptionOfProduct> |

        Then the user should see the following message on the page:
            | Message                                                 |
            | The product record was updated                          |
            | This is a Product Safety Database (PSD) product record. |
            | This product record has been added to 1 notification.   |
        And the user should see the following product data on view product page:
            | Key                       | Value                         |
            | Brand name                | Random                        |
            | Product name              | Random                        |
            | Category                  | <EditProductCategory>         |
            | Subcategory               | <EditProductSubcategory>      |
            | Barcode                   | <EditBarcode>                 |
            | Description               | <EditDescriptionOfProduct>    |
            | Webpage                   | <EditWebpage>                 |
            | Market date               | <EditMarketBeforeJan2021>     |
            | Country of origin         | <EditCounrtyOfOrigin>         |
            | Counterfeit               | No                            |
            | Product marking           | <EditProductMarking>          |
            | Other product identifiers | <EditOtherProductIdentifiers> |

        Examples:
            | EditProductCategory | EditProductSubcategory                              | EditProductMarking | EditMarketBeforeJan2021 | EditBarcode                         | EditOtherProductIdentifiers                   | EditWebpage                                  | EditCounrtyOfOrigin | EditDescriptionOfProduct                              |
            | Furniture           | Edited Furniture Sub cat                            | Unknown            | Unable to ascertain     | 13246587                            | Edited identifiers                            | Editedexample.com                            | United Kingdom      | Edited product Description                            |
            | Furniture           | <script>alert('Edited Furniture sub cat');</script> | Unknown            | Unable to ascertain     | <script>alert('13246587');</script> | <script>alert('Edited identifiers');</script> | <script>alert('Editedexample.com');</script> | United Kingdom      | <script>alert('Edited product Description');</script> |

