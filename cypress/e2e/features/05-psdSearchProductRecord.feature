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

        When the user search for "<SearchText>" product

        Then the user should see the "0 products matching keyword(s) Test product 123123123, using the current filters, were found." text for the search results

        Examples:
            | SearchText             |
            | Test product 123123123 |


    # Search using different Category
    Scenario Outline: 2. Verify that a user can search for different Category products using Category filters

        When the user apply the following product search filters:
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

        When the user apply the following product search filters:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the product search results

        Examples:
            | FilterType            | FilterLabel |
            | Product record status | Active      |
            | Product record status | All         |


    # Search using Product record status (Active, Retired, All)
    Scenario Outline: 4. Verify that a user can search for a product using different product records statuse Retired filters

        When the user apply the following product search filters:
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

        When the user apply the following product search filters:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the product search results

        Examples:
            | FilterType        | FilterLabel    |
            | Country of origin | United Kingdom |

    
    # Search using Notification type (Notification, Allegation (currently PSD 1.0 only), Enquiry (currently PSD 1.0 only), Project (currently PSD 1.0 only))
    Scenario Outline: 6. Verify that a user can search for a product using Notification type filters

        When the user apply the following product search filters:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the product search results

        Examples:
            | FilterType        | FilterLabel  |
            | Notification type | Notification |
            | Notification type | Allegation   |
            | Notification type | Enquiry      |
            | Notification type | Project      |

