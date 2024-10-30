/// <reference types="cypress" />

class PSDMenuPage
{
    /****************** page objects *****************/

    elements = {
        homeLink: () => cy.contains('a', 'Home', { timeout: 10000 }).should('exist'),
        notificationsLink: () => cy.contains('a', 'Notifications', { timeout: 10000 }).should('exist'),
        businessesLink: () => cy.contains('a', 'Businesses', { timeout: 10000 }).should('exist'),
        productsLink: () => cy.contains('a', 'Products', { timeout: 10000 }).should('exist'),
        riskAssessmentsLink: () => cy.contains('a', 'Risk assessments', { timeout: 10000 }).should('exist'),
        yourTeamLink: () => cy.contains('a', 'Your team', { timeout: 10000 }).should('exist'),
        yourAccountLink: () => cy.contains('a', 'Your account', { timeout: 10000 }).should('exist'),
        signOutLink: () => cy.contains('a', 'Sign out', { timeout: 10000 }).should('exist')

    }

    /******************** methods *******************/

    /**
     * Navigate to Home page
     */
    navigateToHomePage()
    {
        this.elements.homeLink().click();
    }

    /**
     * Navigate to Notifications page
     */
    navigateToNotificationsPage()
    {
        this.elements.notificationsLink().click();
    }

    /**
     * Navigate to Businesses page
     */
    navigateToBusinessesPage()
    {
        this.elements.businessesLink().click();
    }

    /**
     * Navigate to Products page
     */
    navigateToProductsPage()
    {
        this.elements.productsLink().click();
    }

    /**
     * Navigate to Your team page
     */
    navigateToYourTeamPage()
    {
        this.elements.yourTeamLink().click();
    }

    /**
     * Navigate to Your account page
     */
    navigateToYourAccountPage()
    {
        this.elements.yourAccountLink().click();
    }

    /**
     * Sign out of PSD system
     */
    signout()
    {
        this.elements.signOutLink().click();
    }

    /**
     * Navigate to Risk Assessments page
     */
    navigateToRiskAssessmentsPage()
    {
        this.elements.riskAssessmentsLink().click();
    }

    /************** Public methods *****************/

    /**
     * Navigate to the given page via header menu
     * @param {*} menuOption 
     */
    navigateViaHeaderMenu(menuOption) {
        switch (menuOption) {
            case "Home":
                this.navigateToHomePage();
                break;           
            case "Notifications":
                this.navigateToNotificationsPage();
                break;
            case "Businesses":
                this.navigateToBusinessesPage();
                break;
            case "Products":
                this.navigateToProductsPage();
                break;
            case "Your account":
                this.navigateToYourAccountPage();
                break;
            case "Your team":
                this.navigateToYourTeamPage();
                break;
            case "Risk assessments":
                this.navigateToRiskAssessmentsPage();
                break;
        }
    }

}

export default PSDMenuPage;