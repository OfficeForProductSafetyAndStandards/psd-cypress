Feature: Create PSD product record
    As a logged in user of the PSD service
    I want to be able to create a product record
    So that I have the product record created that can be used for a notification


    @SmokeTest
    Scenario Outline: Create a product record

        Given the user logs into PSD system

        When the user creates a product record with the following data:
            | DoesProductHasBarcode   | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit   | ProductMarking   | ManufacturerBrandName | ProductName | UploadProductImage | MarketBeforeJan2021   | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | <DoesProductHasBarcode> | Random        | Random          | Random             | <IsProductCounterfeit> | <ProductMarking> | Random                | Random      | No                 | <MarketBeforeJan2021> | ASIN                    | as.co.uk | Random          | desc                 |

        Then the user should see the following message on the page:
            | message                |
            | Product record created |
            | PSD reference number   |
        And the PSD reference number should match the pattern "psd-\d+"
        And the user click on the link "View the product record"
        And the user should see the following product data on view product page:
            | key                       | value               |
            | Brand name                | Random              |
            | Product name              | Random              |
            | Category                  | Random              |
            | Subcategory               | Random              |
            | Barcode                   | <ExpBarcode>        |
            | Description               | desc                |
            | Webpage                   | as.co.uk            |
            | Market date               | <ExpMarketDate>     |
            | Country of origin         | Random              |
            | Counterfeit               | <ExpCounterfeit>    |
            | Product marking           | <ExpProductMarking> |
            | Other product identifiers | ASIN                |

        Examples:
            | DoesProductHasBarcode | IsProductCounterfeit | ProductMarking | MarketBeforeJan2021 | ExpBarcode | ExpMarketDate              | ExpCounterfeit                                           | ExpProductMarking |
            | No                    | No                   | No             | No                  |            | On or after 1 January 2021 | No - This product record is about a genuine product      | None              |
            | Yes                   | Yes                  | UKCA           | Yes                 | Random     | Before 1 January 2021      | Yes - This is a product record for a counterfeit product | UKCA              |
            | No                    | Unsure               | Unknown        | Unable to ascertain |            | Unable to ascertain        | Unsure                                                   | Unknown           |



