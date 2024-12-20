@AccessibilityTest
Feature: PSD products pages accessibility tests
    As a logged in user of the PSD service
    I should validate all products pages
    So that the pages do not have any accessibility violations and are accessible by all


    Background: Log into PSD

        Given the user logs into PSD system

    Scenario Outline: 1. Verify accessibility violations on products pages

        Given the user navigates to "Products" page from the header menu
        When the user validates the page for accessibility violations
        Then there should be no violations

        When the user follows the "<TeamProductsLink>" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        When the user follows the "<AllProductsLink>" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        Examples:
            | TeamProductsLink | AllProductsLink       |
            | Team products    | All products - Search |


    Scenario Outline: 2. Verify accessibility violations on create product record pages

        # Duplicate check page
        Given the user navigates to "Products" page from the header menu
        And the user follows the "Create a product record" link
        And the user selects "Yes" for duplicate check barcode number
        When the user validates the page for accessibility violations
        Then there should be no violations

        # Enter product details page
        When the user selects "No" for duplicate check barcode number
        And the user clicks on Continue button
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Success page
        Given the user creates a product record with the following data:
            | DoesProductHasBarcode   | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit   | ProductMarking   | ManufacturerBrandName | ProductName   | UploadProductImage | MarketBeforeJan2021 | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | <DoesProductHasBarcode> | Random        | Random          | Random             | <IsProductCounterfeit> | <ProductMarking> | Random                | <ProductName> | No                 | No                  | ASIN                    | as.co.uk | Random          | desc                 |
        When the user validates the page for accessibility violations
        Then there should be no violations

        # View product record page
        When the user follows the "View the product record" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        Examples:
            | DoesProductHasBarcode | IsProductCounterfeit | ProductMarking | ProductName |
            | No                    | No                   | No             | Random      |

    
    Scenario Outline: 3. Verify accessibility violations on edit product record pages

        # Edit product record page
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
        And the user adds a corrective action with the following details:
            | TakenCorrectiveAction | ActionBeingTaken          | ActionDate | Legislation | ResponsibleBusiness | IsActionMandatory | GeographicRegions   | FurtherDetails | UploadActionFiles | FileName  |
            | Yes                   | Import rejected at border | 10/2/2024  | Random      | Random              | Yes               | Local,Great Britain | QA Auto test   | Yes               | docx.docx |
        And the user follows the "Check the notification details and submit" link
        And the user submits the notification
        And the user navigates to "Products" page from the header menu
        And the user follows the "All products - Search" link
        And the user searches for and views the "Random" product
        When the user validates the page for accessibility violations
        Then there should be no violations

        # Edit success page
        When the user edits the product record with the following data:
            | ProductCategory       | ProductSubcategory       | ProductMarking       | MarketBeforeJan2021       | BarcodeNumber | OtherProductIdentifiers       | Webpage       | CounrtyOfOrigin       | DescriptionOfProduct       |
            | <EditProductCategory> | <EditProductSubcategory> | <EditProductMarking> | <EditMarketBeforeJan2021> | <EditBarcode> | <EditOtherProductIdentifiers> | <EditWebpage> | <EditCounrtyOfOrigin> | <EditDescriptionOfProduct> |
        And the user validates the page for accessibility violations
        Then there should be no violations

        Examples:
            | EditProductCategory | EditProductSubcategory   | EditProductMarking | EditMarketBeforeJan2021 | EditBarcode | EditOtherProductIdentifiers | EditWebpage       | EditCounrtyOfOrigin | EditDescriptionOfProduct   |
            | Furniture           | Edited Furniture Sub cat | Unknown            | Unable to ascertain     | 13246587    | Edited identifiers          | Editedexample.com | United Kingdom      | Edited product Description |

