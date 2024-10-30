Feature: Search for PRISM Risk assessments
    As a logged in user
    I want to be able to search for the PRISM risk assessments
    So that I can view the required risk assessment

    Background: Log into PSD

        Given the user logs into PSD system


    @SmokeTest
    Scenario Outline: Verify that a user can search for PRISM risk assessment using the product name

        Given the user navigates to "Risk assessments" page from the header menu
        And the user follows "All risk assessments - Search" link

        When the user search for "<ProductName>" product

        Then the user should see the "1 risk assessment matching keyword(s) <ProductName>, was found." text for the search results
        And the user should see the following text on the page:
            | Text                  |
            | <ProductName>         |
            | Test-CR2              |
            | 25 September 2024     |
            | View assessment       |
            | Add to a notification |

        Examples:
            | ProductName           |
            | AutoTestPSDProd_99984 |