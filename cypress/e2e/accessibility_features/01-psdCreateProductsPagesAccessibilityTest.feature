Feature: PSD products pages accessibility tests
    As a logged in user of the PSD service
    I should validate all products pages
    So that the pages do not have any accessibility violations and are accessible by all


    Background: Log into PSD

        Given the user logs into PSD system

    @accessibilityTest
    Scenario Outline: Verify accessibility violations on products pages

        Given the user navigates to "Products" page from the header menu
        When the user validate the page for accessibility violation
        Then there should be no violation

        When the user follows the "<TeamProductsLink>" link
        And the user validate the page for accessibility violation
        Then there should be no violation

        When the user follows the "<AllProductsLink>" link
        And the user validate the page for accessibility violation
        Then there should be no violation

        Examples:
            | TeamProductsLink | AllProductsLink       |
            | Team products    | All products - Search |