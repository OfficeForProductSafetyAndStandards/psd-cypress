Feature: Search for a notification
    As a logged in user
    I should be able to search for a notification
    So that I can see the notification information

    Background: User log into PSD application

        Given the user logs into PSD system

    @SmokeTest
    Scenario Outline: 1. Verify that no notifications are displayed when non available with the given notification title

        Given the user navigates to "notifications" url in PSD

        When the user searches for the "<NotificationTitle>" notification

        Then the user should see the following message on the page:
            | Message                                                                                                 |
            | 0 notifications matching keyword(s) <NotificationTitle>, using the current filters, were found. |

        Examples:
            | NotificationTitle           |
            | Test Notification 123123123 |


    # Search using Notification status 'Open'
    # Search using Notification priority 'Serious', 'High', 'Medium', 'Low' & 'Not Set'
    @SmokeTest
    Scenario Outline: 2. Verify that a user can search for a given notification using 'Open' notification status

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
            | BatchNumber | WasTheTestFundedByOPSS | TestReportRelevantLegislation | TestStandard | DateOfTest | TestResult | TestReportFurtherDetails | TestReportFile | SupportingImage            | SupportingDocumentTitle | SupportingDocument | DateOfAssessment | RiskLevel   | AssessedBy               | RiskAssessmentFile | RiskAssessmentDetails | EvaluateRiskLevel |
            | 1231231232  | No                     | Random                        | OPSS         | 10/04/2024 | Pass       | QA Auto Test             | docx.docx      | file_example_JPG_500kB.jpg | Auto test doc           | docx.docx          | 10/04/2024       | <RiskLevel> | OPSS Incident Management | docx.pdf           | Auto test assessment  | Serious risk      |
        And the user adds a corrective action with the following details:
            | TakenCorrectiveAction | ActionBeingTaken          | ActionDate | Legislation | ResponsibleBusiness | IsActionMandatory | GeographicRegions   | FurtherDetails | UploadActionFiles | FileName  |
            | Yes                   | Import rejected at border | 10/2/2024  | Random      | Random              | Yes               | Local,Great Britain | QA Auto test   | Yes               | docx.docx |
        And the user follows the "Check the notification details and submit" link
        And the user submits the notification

        When the user follows the "Manage notifications" link
        And the user follows the "All notifications – Search" link
        And the user searches for the "Random" notification with the following filters:
            | FilterType            | FilterLabel            |
            | Notification status   | Open                   |
            | Notification priority | <NotificationPriority> |
        
        Then the user should see the following data in the "Random" notification search result row:
            | Key                      |
            | notificationNumber       |
            | Notification             |
            | PSD QA1 OPSS IMT         |
            | ProductPrimaryHarm       |
            | 1 product                |
            | <RiskLevel> notification |

        Examples:
            | url           | DoesProductHasBarcode | IsProductCounterfeit | ProductMarking | ProductName | MarketBeforeJan2021 | ExpBarcode | ExpMarketDate              | ExpCounterfeit                                      | ExpProductMarking | RiskLevel      | NotificationPriority |
            | notifications | No                    | No                   | No             | Random      | No                  |            | On or after 1 January 2021 | No - This product record is about a genuine product | None              | Serious risk   | Serious              |
            | notifications | No                    | No                   | No             | Random      | No                  |            | On or after 1 January 2021 | No - This product record is about a genuine product | None              | High risk      | High                 |
            | notifications | No                    | No                   | No             | Random      | No                  |            | On or after 1 January 2021 | No - This product record is about a genuine product | None              | Medium risk    | Medium               |
            | notifications | No                    | No                   | No             | Random      | No                  |            | On or after 1 January 2021 | No - This product record is about a genuine product | None              | Low risk       | Low                  |
            | notifications | No                    | No                   | No             | Random      | No                  |            | On or after 1 January 2021 | No - This product record is about a genuine product | None              | Not conclusive | Not Set              |


    # Notification search
    # Search using Notification status 'Closed'
    @SmokeTest
    Scenario Outline: 3. Verify that a user can search for a notification using 'Closed' notification status

        Given the user navigates to "notifications" url in PSD

        When the user searches for the "<NotificationTitle>" notification with the following filters:
            | FilterType          | FilterLabel  |
            | Notification status | Closed       |
            | Type                | Notification |

        Then the user should see the following message on the page:
            | Message   |
            | <Message> |

        Examples:
            | NotificationTitle | Message                                                                         |
            | dsdsd             | 1 notification matching keyword(s) dsdsd, using the current filters, was found. |


    # Search using Notification owner 'Me'
    Scenario Outline: 4. Verify that a user can search for a notification using Notification owner "Me" filter

        Given the user navigates to "notifications" url in PSD

        When the user applies the following search filters to the notification:
            | FilterType         | FilterLabel         |
            | Notification owner | <NotificationOwner> |

        Then the user should see the following notification owners in the search results:
            | ExpectedText           |
            | <ExpNotificationOwner> |

        Examples:
            | NotificationOwner | ExpNotificationOwner |
            | Me                | PSD QA1 OPSS IMT     |


    # Search using Notification owner 'Me and my team'
    Scenario Outline: 5. Verify that a user can search for a notification using Notification owner 'Me and my team' filter

        Given the user navigates to "notifications" url in PSD

        When the user applies the following search filters to the notification:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following notification owners in the search results:
            | ExpectedText     |
            | PSD QA1 OPSS IMT |
            | OPSS             |

        Examples:
            | FilterType         | FilterLabel    |
            | Notification owner | Me and my team |

    @SmokeTest
    # Search using Notification owner 'Others'
    Scenario Outline: 6. Verify that a user can search for a notification using Notification owner 'Others' filter

        Given the user navigates to "notifications" url in PSD

        When the user applies the following search filters to the notification:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following data in all the notification search results:
            | ExpectedText      |
            | PSD QA1 OPSS IMT2 |

        Examples:
            | FilterType         | FilterLabel               |
            | Notification owner | Others, PSD QA1 OPSS IMT2 |


    @SmokeTestX
    # Search using Teams added to the notification 'My team'
    Scenario Outline: 7. Verify that a user can search for a notification using Teams added to the notification 'My team' filter

        Given the user navigates to "notifications" url in PSD

        When the user applies the following search filters to the notification:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following data in all the notification search results:
            | ExpectedText      |
            | PSD QA1 OPSS IMT2 |

        Examples:
            | FilterType                      | FilterLabel |
            | Teams added to the notification | My team     |


    @SmokeTestX
    # Search using Teams added to the notification 'Others'
    Scenario Outline: 8. Verify that a user can search for a notification using Teams added to the notification 'Others' filter

        Given the user navigates to "notifications" url in PSD

        When the user applies the following search filters to the notification:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following data in all the notification search results:
            | ExpectedText |
            | OPSS Testing |

        Examples:
            | FilterType                      | FilterLabel          |
            | Teams added to the notification | Others, OPSS Testing |


    @SmokeTestX
    # Search using Created by 'Me', 'Me and my team' & 'Others'
    Scenario Outline: 9. Verify that a user can search for a notification using Created by filters

        Given the user navigates to "notifications" url in PSD

        When the user applies the following search filters to the notification:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following data in all the notification search results:
            | ExpectedText   |
            | <ExpectedText> |

        Examples:
            | FilterType | FilterLabel               | ExpectedText      |
            # | Created by | Me                        | PSD QA1 OPSS IMT  |
            | Created by | Me and my team            | PSD QA1 OPSS IMT  |
            # | Created by | Others, PSD QA1 OPSS IMT2 | PSD QA1 OPSS IMT2 |


    @SmokeTest1
    # Search using Type 'Notification', 'Allegation', 'Enquiry' & 'Project'
    Scenario Outline: 10. Verify that a user can search for a notification using Type filters

        Given the user navigates to "notifications" url in PSD

        When the user applies the following search filters to the notification:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following data in all the notification search results:
            | ExpectedText   |
            | <ExpectedText> |

        Examples:
            | FilterType | FilterLabel  | ExpectedText |
            | Type       | Notification | Notification |
            | Type       | Allegation   | Allegation   |
            | Type       | Enquiry      | Enquiry      |
            | Type       | Project      | Project      |


    @SmokeTest1
    # Search using Notification hazard type 'Asphyxiation', 'Burns' etc..
    Scenario Outline: 11. Verify that a user can search for a notification using Notification hazard type filters

        Given the user navigates to "notifications" url in PSD

        When the user applies the following search filters to the notification:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following data in all the notification search results:
            | ExpectedText   |
            | <ExpectedText> |

        Examples:
            | FilterType               | FilterLabel       | ExpectedText      |
            | Notification hazard type | Asphyxiation      | Asphyxiation      |
            | Notification hazard type | Burns             | Burns             |
            | Notification hazard type | Damage to hearing | Damage to hearing |
            | Notification hazard type | Electric shock    | Electric shock    |

    @SmokeTest1
    # Search using Reported reason 'Non-compliant', 'Unsafe', 'Unsafe and non-compliant' & 'Safe and compliant'
    Scenario Outline: 12. Verify that a user can search for a notification using Reported reason filters

        Given the user navigates to "notifications" url in PSD

        When the user applies the following search filters to the notification:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following data in all the notification search results:
            | ExpectedText   |
            | <ExpectedText> |

        Examples:
            | FilterType      | FilterLabel              | ExpectedText |
            | Reported reason | Non-compliant            | Notification |
            | Reported reason | Unsafe                   | Notification |
            | Reported reason | Unsafe and non-compliant | Notification |
            | Reported reason | Safe and compliant       | Notification |

    @SmokeTest1
    # Search using Notification priority 'Serious', 'High', 'Medium', 'Low' & 'Not Set'
    Scenario Outline: 13. Verify that a user can search for notifications using priority

        Given the user navigates to "notifications" url in PSD

        When the user applies the following search filters to the notification:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following data in all the notification search results:
            | ExpectedText   |
            | <ExpectedText> |

        Examples:
            | FilterType            | FilterLabel | ExpectedText              |
            | Notification priority | Serious     | Serious risk notification |
            | Notification priority | High        | High risk notification    |
            | Notification priority | Medium      | Notification              |
            | Notification priority | Low         | Notification              |
            | Notification priority | Not Set     | Notification              |


# Search using Created from
# Search using Created up to
