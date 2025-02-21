@SmokeTest
Feature: Create PSD product record
    As a logged in user of the PSD service
    I want to be able to create a product record
    So that I have the product record created that can be used for a notification

    Background: Log into PSD

        Given the user logs into PSD system


    Scenario Outline: 1. Create a product record

        When the user creates a product record with the following data:
            | DoesProductHasBarcode   | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit   | ProductMarking   | ManufacturerBrandName | ProductName | UploadProductImage | MarketBeforeJan2021   | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | <DoesProductHasBarcode> | Random        | Random          | Random             | <IsProductCounterfeit> | <ProductMarking> | Random                | Random      | No                 | <MarketBeforeJan2021> | ASIN                    | as.co.uk | Random          | desc                 |

        Then the user should see the following message on the page:
            | Message                |
            | Product record created |
            | PSD reference number   |
        And the PSD reference number should match the pattern "psd-\d+"
        And the user clicks on the link "View the product record"
        And the user should see the following product data on view product page:
            | Key                       | Value               |
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


    Scenario Outline: 2. Verify that the newly created product is displayed in Your products page

        When the user creates a product record with the following data:
            | DoesProductHasBarcode   | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit   | ProductMarking   | ManufacturerBrandName | ProductName | UploadProductImage | MarketBeforeJan2021   | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | <DoesProductHasBarcode> | Random        | Random          | Random             | <IsProductCounterfeit> | <ProductMarking> | Random                | Random      | No                 | <MarketBeforeJan2021> | ASIN                    | as.co.uk | Random          | desc                 |

        Then the user should see the following message on the page:
            | Message                |
            | Product record created |
            | PSD reference number   |
        And the PSD reference number should match the pattern "psd-\d+"
        And the user clicks on the link "View the product record"
        And the user should see the following product data on view product page:
            | Key                       | Value               |
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
      

    @SmokeTest
    Scenario Outline: 3. Verify that the user can search for the newly created product

        Given the user creates a product record with the following data:
            | DoesProductHasBarcode   | BarcodeNumber | ProductCategory | ProductSubcategory | IsProductCounterfeit   | ProductMarking   | ManufacturerBrandName | ProductName | UploadProductImage | MarketBeforeJan2021   | OtherProductIdentifiers | Webpage  | CounrtyOfOrigin | DescriptionOfProduct |
            | <DoesProductHasBarcode> | Random        | Random          | Random             | <IsProductCounterfeit> | <ProductMarking> | Random                | Random      | No                 | <MarketBeforeJan2021> | ASIN                    | as.co.uk | Random          | desc                 |

        Then the user should see the following message on the page:
            | Message                |
            | Product record created |
            | PSD reference number   |

        Given the user navigates to "/all-products" url in PSD
        When the user searches for the "Random" product

        And the PSD reference number should match the pattern "psd-\d+"
        And the user searches for and views the "Random" product
        And the user should see the following product data on view product page:
            | Key                       | Value               |
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
      
