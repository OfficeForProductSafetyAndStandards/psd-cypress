Feature: View all the notifications that are linked to a product
    As a logged in user
    I want to be able to view all notifications that are linked to a product record
    So that I know the notifications that the product is linked to


    Background: Log into PSD

        Given the user logs into PSD system


    @SmokeTest
    Scenario Outline: Verify that a user can view all the notifications that are linked to a product

        Given the user navigates to "Products" page from the header menu
        And the user follows "All products - Search" link

        When the user search and view the "QA Test Prod Eco-design 4" product

        Then the user should see the following message on the page:
            | Message                  |
            | <NotificationTitle1>     |
            | <NotificationNumber1>    |
            | OPSS Incident Management |
            | Open                     |
            | <NotificationTitle2>     |
            | <NotificationNumber2>    |
            | OPSS Incident Management |
            | Open                     |

        When the user follows "<NotificationTitle1>" link

        Then the user should see the following message on the page:
            | Message                                                      |
            | QA Test Prod Eco-design Mfr brand4 QA Test Prod Eco-design 4 |

        When the user navigates to "Products" page from the header menu
        And the user follows "All products - Search" link
        And the user search and view the "QA Test Prod Eco-design 4" product

        When the user follows "<NotificationTitle2>" link

        Then the user should see the following message on the page:
            | Message                                                  |
            | QA Test Prod Gadgets 1 Mfr brand1 QA Test Prod Gadgets 1 |

        Examples:
            | ProductName               | NotificationTitle1                           | NotificationNumber1 | NotificationTitle2                    | NotificationNumber2 |
            | QA Test Prod Eco-design 4 | QA Test Prod Eco-design 4 Notification Title | 2410-0047           | QA Test Prod Gadgets 1 Notification 1 | 2410-0055           |
