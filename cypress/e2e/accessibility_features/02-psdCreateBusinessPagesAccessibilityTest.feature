@AccessibilityTest
Feature: PSD Business pages accessibility tests
    As a logged in user of the PSD service
    I should validate all business pages
    So that the pages do not have any accessibility violations and are accessible by all


    Background: Log into PSD

        Given the user logs into PSD system


    Scenario Outline: 1. Verify accessibility violations on business search pages

        Given the user navigates to "Businesses" page from the header menu
        When the user validates the page for accessibility violations
        Then there should be no violations

        When the user follows the "<TeamBusinessesLink>" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        When the user follows the "<AllBusinessesLink>" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        Examples:
            | TeamBusinessesLink | AllBusinessesLink       |
            | Team businesses    | All businesses - Search |


    Scenario Outline: 2. Verify accessibility violations on create business pages

        Given the user starts to create a new product safety notification
        And the user searches for and adds the following products to the notification:
            | ProductName   |
            | <ProductName> |
        And the user adds the following notification and product safety details:
            | NotificationTitle | NotificationSummary            | NotificationReason | ProductPrimaryHarm | ProductHarmInfo | ProductIncompleteMarkingsDescription | OverseasRegulatorCountry | ReferenceNumber |
            | Random            | Auto Test notification summary | Product is unsafe  | Random             | Harm to health  | Product non-compliant                | Random                   | No              |

        # Business search page coming from Notification
        And the user follows the "Search for or add a business" link
        When the user validates the page for accessibility violations
        Then there should be no violations

        # Business details page
        When the user clicks on Add a new business
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Add business addresses page
        When the user adds the following business details:
            | TradingName | LegalName | CompanyNumber |
            | Random      | Random    | Random        |
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Add business contact details page
        When the user adds following business address details:
            | AddressLine1 | Postcode | Country |
            | Line1        | AA1 1AA  | Random  |
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Use this business details page
        When the user adds the following business contact details:
            | ContactFullName | ContactEmail         |
            | QA Tester       | QAtester@example.com |
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Add the business's role page
        When the user clicks on Use business details
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Add another business page
        When the user adds the following business roles:
            | BusinessRole |
            | Manufacturer |
        And the user validates the page for accessibility violations
        Then there should be no violations

        Examples:
            | ProductName           |
            | AutoTestPSDProd_40698 |


    Scenario Outline: 3. Verify accessibility violations on edit business pages

        Given the user navigates to "Businesses" page from the header menu
        And the user follows the "All businesses - Search" link

        # Full details page
        When the user searches for the "<BusinessName>" business
        And the user follows the "<BusinessName>" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Edit Full details page
        When the user follows the "Edit details" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Locations page
        When the user follows the "<BusinessName>" link
        And the user follows the "Locations (1)" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Add Locations page
        When the user follows the "Add location" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Edit Locations page
        When the user follows the "<BusinessName>" link
        And the user follows the "Locations (1)" link
        And the user follows the "Edit location" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Remove Locations page
        When the user follows the "<BusinessName>" link
        And the user follows the "Locations (1)" link
        And the user follows the "Remove location" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Contacts page
        When the user follows the "<BusinessName>" link
        And the user follows the "Contacts (1)" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Add Contacts page
        When the user follows the "Add contact" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Edit Contacts page
        When the user follows the "<BusinessName>" link
        And the user follows the "Contacts (1)" link
        And the user follows the "Edit contact" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Remove Contacts page
        When the user follows the "<BusinessName>" link
        And the user follows the "Contacts (1)" link
        And the user follows the "Remove contact" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Notifications page
        When the user follows the "<BusinessName>" link
        And the user follows the "Notifications (1)" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        # Products page
        When the user follows the "Products (1)" link
        And the user validates the page for accessibility violations
        Then there should be no violations

        Examples:
            | BusinessName                |
            | Accessibility Test Business |
