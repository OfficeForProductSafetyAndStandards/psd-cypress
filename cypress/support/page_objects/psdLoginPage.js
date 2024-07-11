require('@cypress/xpath');

class PSDLoginPage
{
    /****************** page objects *****************/

    elements = {
        signinButton : () => cy.xpath("//a[@href='/sign-in']", { timeout: 10000 }).should('be.visible'),
        emailAddressField : () => cy.xpath("//input[@id='user-email-field']", { timeout: 10000 }).should('be.visible'),
        passwordField : () => cy.xpath("//input[@id='user-password-field']", { timeout: 10000 }).should('be.visible'),
        continueButton : () => cy.xpath("//button[contains(text(), 'Continue')]", { timeout: 10000 }).should('be.visible')

    }

    /******************** Getters & Setters *******************/

    /**
     * Navigate to sign in page
     */
    navigateToSignIn() 
    {
        cy.visit(Cypress.env("URL"));
    }

    /**
     * Click on Signin button
     */
    clickSigninButton()
    {
        this.elements.signinButton().click();
    }

    /**
     * Enter email address
     * @param {*} email 
     */
    enterEmailAddress(email)
    {
        this.elements.emailAddressField().clear();
        this.elements.emailAddressField().type(email);
    }

    /**
     * Enter password
     * @param {*} password 
     */
    enterPassword(password)
    {
        this.elements.passwordField().clear();
        this.elements.passwordField().type(password);
    }

    /**
     * Click on Continue button
     */
    clickContinueButton()
    {
        this.elements.continueButton().click();
    }

}

export default PSDLoginPage;