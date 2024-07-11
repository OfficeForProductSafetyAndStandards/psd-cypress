import LoginPage from "../page_objects/psdLoginPage";


class PSDLoginHelper 
{
    login( emailId ) {

        // cy.visit(Cypress.env("URL"));
        const loginpage = new LoginPage();
        loginpage.navigateToSignIn();
        loginpage.clickSigninButton();       

        cy.readFile("cypress/userDetails/loginDetails.json").then((loginDetails) => {
            loginpage.enterEmailAddress(loginDetails.email)
            loginpage.enterPassword(loginDetails.password);
        })

        loginpage.clickContinueButton();
    }
    
}

export default PSDLoginHelper;