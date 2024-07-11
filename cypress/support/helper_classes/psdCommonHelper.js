
class PSDCommonHelper
{
    /**
     * Navigate to PSD landing page
     */
    navigateToPSDLandingPage() {
        cy.visit(Cypress.env("URL"));
    }
}

export default PSDCommonHelper;