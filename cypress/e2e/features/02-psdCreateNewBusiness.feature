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
            | Random            | Auto Test notification summary | Product is unsafe  | random             | Harm to health  | Product non-compliant                | Random                   | No              |

        Examples:
            | DoesProductHasBarcode | IsProductCounterfeit | ProductMarking | ProductName | MarketBeforeJan2021 | ExpBarcode | ExpMarketDate              | ExpCounterfeit                                      | ExpProductMarking |
            | No                    | No                   | No             | Random      | No                  |            | On or after 1 January 2021 | No - This product record is about a genuine product | None              |



