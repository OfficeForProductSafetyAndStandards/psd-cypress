Feature: Create PSD new business
    As a logged in user of the PSD service
    I want to be able to create a new business
    So that I have the business record created that can be used for a notification

    Background: User Log into PSD application

        Given the user logs into PSD system

    @SmokeTest
    Scenario Outline: 1. Create a new business

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

        When the user adds a new business with the following data:
            | TradingName   | LegalName   | CompanyNumber   | AddressLine1   | AddressLine2   | Town   | County   | Postcode   | Country   | ContactFullName   | ContactJobTitle   | ContactEmail   | ContactPhone   | BusinessRole   |
            | <TradingName> | <LegalName> | <CompanyNumber> | <AddressLine1> | <AddressLine2> | <Town> | <County> | <Postcode> | <Country> | <ContactFullName> | <ContactJobTitle> | <ContactEmail> | <ContactPhone> | <BusinessRole> |
        And the user navigates to "Businesses" page from the header menu
        And the user follows the "All businesses - Search" link
        And the user searches for and views the "<TradingName>" business

        Then the user should see the following business full details:
            | Key                      | Value                                                                |
            | Trading name             | <TradingName>                                                        |
            | Registered or legal name | <LegalName>                                                          |
            | Company number           | <CompanyNumber>                                                      |
            | Address                  | <AddressLine1>, <AddressLine2>, <Town>, <Postcode>, <Country>        |
            | Contact                  | <ContactFullName>, <ContactJobTitle>, <ContactPhone>, <ContactEmail> |
        And the user should see the following business locations details:
            | Key                       | Value                                                         |
            | Registered office address | <AddressLine1>, <AddressLine2>, <Town>, <Postcode>, <Country> |
        And the user should see the following business contacts details:
            | Text              |
            | <ContactFullName> |
            | <ContactJobTitle> |
            | <ContactPhone>    |
            | <ContactEmail>    |
        And the user should see the following business notifications details:
            | Key             | Value            |
            | Notification ID | Random           |
            | Title           | <TradingName>    |
            | Owner           | PSD QA1 OPSS IMT |
            | Relationship    | <BusinessRole>   |
        And the user should see the following business products details:
            | Key        | Value  |
            | Product ID | Random |
            | Name       | Random |
            | Brand      | Random |

        Examples:
            | TradingName | LegalName | CompanyNumber | AddressLine1                             | AddressLine2                             | Town                               | County                               | Postcode | Country        | ContactFullName                            | ContactJobTitle                            | ContactEmail                                 | ContactPhone | BusinessRole |
            | Random      | Random    | Random        | Line1                                    | Line2                                    | QA Town                            | QA County                            | AA1 1AA  | United Kingdom | QA Automation tester                       | PSD QA                                     | PSDQA@example.com                            | 0123456789   | Retailer     |
            | Random      | Random    | Random        | <script>alert('Address line1');</script> | <script>alert('Address line2');</script> | <script>alert('QA Town');</script> | <script>alert('QA County');</script> | AA1 1AA  | United Kingdom | <script>alert('ContactFullName');</script> | <script>alert('ContactJobTitle');</script> | <script>alert('PSDQA@example.com');</script> | 0123456789   | Retailer     |
