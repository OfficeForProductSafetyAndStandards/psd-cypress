@SmokeTest
Feature: Search for a product record
    As a logged in user
    I should be able to search for a product
    So that I can see the product information


    Background: User log into PSD application

        Given the user logs into PSD system
        And the user navigates to "products/all-products" url in PSD


    # 0 Results displayed when searched with non-existing product name
    Scenario Outline: 1. Verify that no products are displayed when non available with the given product name

        When the user searches for the "<SearchText>" product

        Then the user should see the "0 products matching keyword(s) Test product 123123123, using the current filters, were found." text for the search results

        Examples:
            | SearchText             |
            | Test product 123123123 |


    # Search using different Category
    Scenario Outline: 2. Verify that a user can search for different Category products using Category filters

        When the user applies the following product search filters:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following data in all the product search results:
            | ExpectedText  |
            | <FilterLabel> |

        Examples:
            | FilterType | FilterLabel       |
            | Category   | Chemical products |


    # Search using Product record status (Active, Retired, All)
    Scenario Outline: 3. Verify that a user can search for a product using different product records statuses filters

        When the user applies the following product search filters:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the product search results

        Examples:
            | FilterType            | FilterLabel |
            | Product record status | Active      |
            | Product record status | All         |


    # Search using Product record status (Active, Retired, All)
    Scenario Outline: 4. Verify that a user can search for a product using different product records statuse Retired filters

        When the user applies the following product search filters:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the following data in all the product search results:
            | ExpectedText           |
            | Retired product record |

        Examples:
            | FilterType            | FilterLabel |
            | Product record status | Retired     |


    # Search using Country of Origin
    Scenario Outline: 5. Verify that a user can search for a product using Country of Origin filters

        When the user applies the following product search filters:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the product search results

        Examples:
            | FilterType        | FilterLabel    |
            | Country of origin | United Kingdom |


    # Search using Notification type (Notification, Allegation (currently PSD 1.0 only), Enquiry (currently PSD 1.0 only), Project (currently PSD 1.0 only))
    Scenario Outline: 6. Verify that a user can search for a product using Notification type filters

        When the user applies the following product search filters:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the product search results

        Examples:
            | FilterType        | FilterLabel  |
            | Notification type | Notification |
            | Notification type | Allegation   |
            | Notification type | Enquiry      |
            | Notification type | Project      |


    Scenario Outline: 7. Verify that the user can search for the product using a combinations of different filters

        When the user searches for the "<SearchText>" product with the following filters:
            | FilterType            | FilterLabel           |
            | Category              | <Category>            |
            | Product record status | <ProductRecordStatus> |
            | Country of origin     | <CountryOfOrigin>     |
            | Notification type     | <NotificationType>    |

        Then the user should see the "<ExpectedText>" text for the search results

        Examples:
            | SearchText            | Category          | ProductRecordStatus | CountryOfOrigin | NotificationType | ExpectedText                                                                                 |
            | AutoTestPSDProd_48695 | Lighting chains   | Active              | Oman            | Notification     | 1 product matching keyword(s) AutoTestPSDProd_48695, using the current filters, was found.   |
            | AutoTestPSDProd_48695 | Chemical products | Active              | Oman            | Notification     | 0 products matching keyword(s) AutoTestPSDProd_48695, using the current filters, were found. |
            | AutoTestPSDProd_48695 | Lighting chains   | Retired             | Oman            | Notification     | 0 products matching keyword(s) AutoTestPSDProd_48695, using the current filters, were found. |
            | AutoTestPSDProd_48695 | Lighting chains   | Active              | Abu Dhabi       | Notification     | 0 products matching keyword(s) AutoTestPSDProd_48695, using the current filters, were found. |
            | AutoTestPSDProd_48695 | Lighting chains   | Active              | Oman            | Allegation       | 0 products matching keyword(s) AutoTestPSDProd_48695, using the current filters, were found. |
