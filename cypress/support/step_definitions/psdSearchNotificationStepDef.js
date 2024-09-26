/// <reference types="cypress" />

import PSDNotificationsPage from "../page_objects/psdNotificationsPage"

/********************** Step definitions **********************/

When("the user search for {string} notification", function (notificationTitle) {
    const psdNotificationPage = new PSDNotificationsPage();
    psdNotificationPage.searchForNotification(notificationTitle);
})

When("the user search for a notification with the following data:", function (dataTable) {
    const psdNotificationPage = new PSDNotificationsPage();
    psdNotificationPage.searchForNotificationUsingFilters(dataTable);
})

Then("the user should see the following data in the {string} notification search result row:", function (notificationTitle, dataTable) {
    const psdNotificationPage = new PSDNotificationsPage();
    psdNotificationPage.verifyTheGivenDataInNotificationRow(notificationTitle, dataTable);
})

When("the user search for the {string} notification with the following filters:", function (notificationTitle, dataTable) {
    const psdNotificationPage = new PSDNotificationsPage();
    psdNotificationPage.setNotificationSearchFilters(dataTable);
    psdNotificationPage.searchForNotification(notificationTitle);
})

When("the user apply the following notification search filters:", function (dataTable) {
    const psdNotificationPage = new PSDNotificationsPage();
    psdNotificationPage.setNotificationSearchFilters(dataTable);
    psdNotificationPage.clickApplySearchFilters();
})

Then("the user should see the following data in all the notification search results:", function (dataTable) {
    const psdNotificationPage = new PSDNotificationsPage();
    psdNotificationPage.verifyGivenDataInTheNotificationSearchResultsTable(dataTable);
})

Then("the user should see the following notification owners in the search results:", function (dataTable) {
    const psdNotificationPage = new PSDNotificationsPage();
    psdNotificationPage.verifyGivenNotificationOwnerInTheSearchResultsRow(dataTable);
})