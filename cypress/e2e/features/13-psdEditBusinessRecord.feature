@SmokeTest
Feature: Edit PSD business record
    As a same team member of the PSD team who created the business record
    I want to be able to edit the business
    So that I have the business record updated

    Background: User Log into PSD application and create a new business

        Given the user logs into PSD system
        And the user creates a product record with the following data:
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
            | TradingName | LegalName | CompanyNumber | AddressLine1 | AddressLine2 | Town    | County    | Postcode | Country        | ContactFullName      | ContactJobTitle | ContactEmail      | ContactPhone | BusinessRole |
            | Random      | Random    | Random        | Line1        | Line2        | QA Town | QA County | AA1 1AA  | United Kingdom | QA Automation tester | PSD QA          | PSDQA@example.com | 0123456789   | Retailer     |
        And the user navigates to "Businesses" page from the header menu
        And the user follows the "All businesses - Search" link
        And the user searches for and views the "Random" business


    Scenario Outline: 1. Verify that a same team member can edit the business full details

        When the user edits the full business details with the following data:
            | TradingName   | LegalName   | CompanyNumber   | AddressLine1   | AddressLine2   | Town   | County   | Postcode   | Country   | ContactFullName   | ContactJobTitle   | ContactEmail   | ContactPhone   |
            | <TradingName> | <LegalName> | <CompanyNumber> | <AddressLine1> | <AddressLine2> | <Town> | <County> | <Postcode> | <Country> | <ContactFullName> | <ContactJobTitle> | <ContactEmail> | <ContactPhone> |

        Then the user should see the following edited business full details:
            | Key                      | Value                                                                |
            | Trading name             | <TradingName>                                                        |
            | Registered or legal name | <LegalName>                                                          |
            | Company number           | <CompanyNumber>                                                      |
            | Address                  | <AddressLine1>, <AddressLine2>, <Town>, <Postcode>, <Country>        |
            | Contact                  | <ContactFullName>, <ContactJobTitle>, <ContactPhone>, <ContactEmail> |

        Examples:
            | TradingName | LegalName | CompanyNumber | AddressLine1                            | AddressLine2                            | Town                                      | County                                      | Postcode | Country        | ContactFullName                                  | ContactJobTitle                                  | ContactEmail                                       | ContactPhone |
            | Random      | Random    | Random        | Edited Line1                            | Edited Line2                            | Edited QA Town                            | Edited QA County                            | ED1 1ED  | American Samoa | Edited QA Automation tester                      | Edited PSD QA                                    | EditedPSDQA@example.com                            | 9876543210   |
            | Random      | Random    | Random        | <script>alert('Edited line1');</script> | <script>alert('Edited line2');</script> | <script>alert('Edited QA Town');</script> | <script>alert('Edited QA County');</script> | ED1 1ED  | American Samoa | <script>alert('EditedContactFullName');</script> | <script>alert('EditedContactJobTitle');</script> | <script>alert('EditedPSDQA@example.com');</script> | 9876543210   |


    Scenario Outline: 2. Verify that a same team member can add a new business location

        When the user adds a new business location with the following data:
            | LocationName   | AddressLine1   | AddressLine2   | Town   | County   | Postcode   | Country   |
            | <LocationName> | <AddressLine1> | <AddressLine2> | <Town> | <County> | <Postcode> | <Country> |

        Then the user should see the following business locations details:
            | Key                       | Value                                          |
            | Registered office address | Line1, Line2, QA Town, AA1 1AA, United Kingdom |
        And the user should see the following business locations details:
            | Key                   | Value                                                         |
            | New Business location | <AddressLine1>, <AddressLine2>, <Town>, <Postcode>, <Country> |

        Examples:
            | LocationName                                     | AddressLine1                         | AddressLine2                         | Town                                   | County                                   | Postcode | Country   |
            | New Business location                            | New line1                            | New line2                            | New town                               | New county                               | NW1 1CT  | Ascension |
            | <script>alert('New Business location');</script> | <script>alert('New line1');</script> | <script>alert('New line2');</script> | <script>alert('New QA Town');</script> | <script>alert('New QA County');</script> | NW1 1CT  | Ascension |


    Scenario Outline: 3. Verify that a same team member can edit a business location

        When the user edits the "Registered office address" business location with the following data:
            | LocationName   | AddressLine1   | AddressLine2   | Town   | County   | Postcode   | Country   |
            | <LocationName> | <AddressLine1> | <AddressLine2> | <Town> | <County> | <Postcode> | <Country> |

        Then the user should see the following business locations details:
            | Key            | Value                                                         |
            | <LocationName> | <AddressLine1>, <AddressLine2>, <Town>, <Postcode>, <Country> |

        Examples:
            | LocationName                                                | AddressLine1                            | AddressLine2                            | Town                                      | County                                      | Postcode | Country      |
            | Edited Registered office address                            | Edited line1                            | Edited line2                            | Edited town                               | Edited county                               | ED1 1ED  | Baker Island |
            | <script>alert('Edited Registered office address');</script> | <script>alert('Edited line1');</script> | <script>alert('Edited line2');</script> | <script>alert('Edited QA Town');</script> | <script>alert('Edited QA County');</script> | ED1 1ED  | Baker Island |


    Scenario Outline: 4. Verify that a same team member can remove a business location

        Given the user adds a new business location with the following data:
            | LocationName   | AddressLine1   | AddressLine2   | Town   | County   | Postcode   | Country   |
            | <LocationName> | <AddressLine1> | <AddressLine2> | <Town> | <County> | <Postcode> | <Country> |

        When the user removes "<LocationName>" business location

        Then the user should see the following message on the page:
            | Message                            |
            | Location was successfully deleted. |

        Examples:
            | LocationName          | AddressLine1 | AddressLine2 | Town     | County     | Postcode | Country   |
            | New Business location | New line1    | New line2    | New town | New county | NW1 1CT  | Ascension |


    Scenario Outline: 5. Verify that a same team member can add a new business contact

        When the user adds a new business contacts with the following data:
            | ContactFullName   | ContactJobTitle   | ContactEmail   | ContactPhone   |
            | <ContactFullName> | <ContactJobTitle> | <ContactEmail> | <ContactPhone> |

        Then the user should see the following business contacts details:
            | Text              |
            | <ContactFullName> |
            | <ContactJobTitle> |
            | <ContactPhone>    |
            | <ContactEmail>    |

        Examples:
            | ContactFullName                                     | ContactJobTitle                       | ContactEmail                                    | ContactPhone |
            | New QA Automation tester                            | New PSD QA                            | NewPSDQA@example.com                            | 9876543210   |
            | <script>alert('New QA Automation tester');</script> | <script>alert('New PSD QA');</script> | <script>alert('NewPSDQA@example.com');</script> | 9876543210   |

    Scenario Outline: 6. Verify that a same team member can edit a business contact

        When the user edits the "QA Automation tester" business contact with the following data:
            | ContactFullName   | ContactJobTitle   | ContactEmail   | ContactPhone   |
            | <ContactFullName> | <ContactJobTitle> | <ContactEmail> | <ContactPhone> |

        Then the user should see the following business contacts details:
            | Text              |
            | <ContactFullName> |
            | <ContactJobTitle> |
            | <ContactPhone>    |
            | <ContactEmail>    |

        Examples:
            | ContactFullName                                        | ContactJobTitle                          | ContactEmail                                       | ContactPhone |
            | Edited QA Automation tester                            | Edited PSD QA                            | EditedPSDQA@example.com                            | 9876543210   |
            | <script>alert('Edited QA Automation tester');</script> | <script>alert('Edited PSD QA');</script> | <script>alert('EditedPSDQA@example.com');</script> | 9876543210   |

    Scenario Outline: 7. Verify that a same team member can remove a business contact

        Given the user adds a new business contacts with the following data:
            | ContactFullName   | ContactJobTitle   | ContactEmail   | ContactPhone   |
            | <ContactFullName> | <ContactJobTitle> | <ContactEmail> | <ContactPhone> |

        When the user removes "<ContactFullName>" business contact

        Then the user should see the following message on the page:
            | Message                           |
            | Contact was successfully deleted. |

        Examples:
            | ContactFullName          | ContactJobTitle | ContactEmail         | ContactPhone |
            | New QA Automation tester | New PSD QA      | NewPSDQA@example.com | 9876543210   |