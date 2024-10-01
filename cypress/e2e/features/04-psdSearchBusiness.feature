@SmokeTest
Feature: Search for a business
    As a logged in user
    I should be able to search for a business
    So that I can see the business information


    Background: User log into PSD application

        Given the user logs into PSD system
        And the user navigates to "businesses" url in PSD

    # 0 Results displayed when searched with non-existing business name
    Scenario Outline: 1. Verify that no notifications are displayed when non available with the given notification title

        When the user search for "<SearchText>" business

        Then the user should see the "0 businesses matching keyword(s) <SearchText>, were found." text for the business search results

        Examples:
            | SearchText              |
            | Test business 123123123 |


    # Search using Business using Tradining name
    # Search using Business using Registered or Legal name
    # Search using Company number
    Scenario Outline: 2. Verify that a user can search for a business using Trading name, Registered or Legal name and Company number

        When the user search for "<SearchText>" business

        Then the user should see the "1 business matching keyword(s) <SearchText>, was found." text for the business search results

        Examples:
            | SearchText                     |
            # Trading name
            | AutoTestPSDBusiness_55569      |
            # Registered or Legal name
            | AutoTestPSDBusinessLegal_25688 |
            # Company number
            | 3185717722                     |


    # Search using Business Type & Primary Location
    Scenario Outline: 3. Verify that a user can search for a business using Business Type filters

        When the user apply the following business search filters:
            | FilterType   | FilterLabel   |
            | <FilterType> | <FilterLabel> |

        Then the user should see the business search results

        Examples:
            | FilterType       | FilterLabel    |
            | Business Type    | Retailer       |
            | Primary Location | United Kingdom |

    
    # Search using combinations of filters
    Scenario Outline: 4. Verify that a user can search for a business using combination of different filters

        When the user search for "<SearchText>" business with the following filters:
            | FilterType    | FilterLabel    |
            | <FilterType1> | <FilterLabel1> |
            | <FilterType2> | <FilterLabel2> |

        Then the user should see the "1 business matching keyword(s) <SearchText>, and matching selected filters was found." text for the business search results
        And the user should see the following data in the "<BusinessName>" business search result row:
            | Key             |
            | <BusinessName>  |
            | <CompanyNumber> |

        Examples:
            | SearchText                     | FilterType1   | FilterLabel1 | FilterType2      | FilterLabel2 | BusinessName              | CompanyNumber |
            # Trading name
            | AutoTestPSDBusiness_55569      | Business Type | Retailer     | Primary Location | Nauru        | AutoTestPSDBusiness_55569 | 3185717722    |
            # Registered or Legal name
            | AutoTestPSDBusinessLegal_25688 | Business Type | Retailer     | Primary Location | Nauru        | AutoTestPSDBusiness_55569 | 3185717722    |
            # Company number
            | 3185717722                     | Business Type | Retailer     | Primary Location | Nauru        | AutoTestPSDBusiness_55569 | 3185717722    |

    
    # Search with wrong filters will return 0 results
    Scenario Outline: 5. Verify that when a user search for a business with wrong filters the no results displayed

        When the user search for "<SearchText>" business with the following filters:
            | FilterType    | FilterLabel    |
            | <FilterType1> | <FilterLabel1> |
            | <FilterType2> | <FilterLabel2> |

        Then the user should see the "0 businesses matching keyword(s) <ExpectedText>, and matching selected filters were found." text for the business search results

        Examples:
            | SearchText                | FilterType1   | FilterLabel1 | FilterType2      | FilterLabel2   | ExpectedText              |
            # Wrong Business Type with business name
            | AutoTestPSDBusiness_55569 | Business Type | Manufacturer | Primary Location | Nauru          | AutoTestPSDBusiness_55569 |
            # Wrong Primary Location with business name
            | AutoTestPSDBusiness_55569 | Business Type | Retailer     | Primary Location | United Kingdom | AutoTestPSDBusiness_55569 |
            # Wrong Business Type with company number
            | 3185717722                | Business Type | Manufacturer | Primary Location | Nauru          | 3185717722                |
