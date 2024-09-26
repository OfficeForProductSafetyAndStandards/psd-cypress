require('@cypress/xpath');

class PSDMenuPage
{
    /****************** page objects *****************/

    elements = {
        homeLink: () => cy.xpath("//a[contains(text(), 'Home')]", { timeout: 10000 }).should('be.visible'),
        notificationsLink: () => cy.xpath("//a[contains(text(), 'Notifications')]", { timeout: 10000 }).should('be.visible'),
        businessesLink: () => cy.xpath("//a[contains(text(), 'Businesses')]", { timeout: 10000 }).should('be.visible'),
        productsLink: () => cy.xpath("//a[contains(text(), 'Products')]", { timeout: 10000 }).should('be.visible'),
        yourTeamLink: () => cy.xpath("//a[contains(text(), 'Your team')]", { timeout: 10000 }).should('be.visible'),
        yourAccountLink: () => cy.xpath("//a[contains(text(), 'Your account')]", { timeout: 10000 }).should('be.visible'),
        signOutLink: () => cy.xpath("//a[contains(text(), 'Sign out')]", { timeout: 10000 }).should('be.visible')
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
        }
    }

}

export default PSDMenuPage;