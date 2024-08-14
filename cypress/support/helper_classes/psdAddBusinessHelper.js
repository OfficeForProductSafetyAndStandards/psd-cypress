import PSDBusinessPage from "../page_objects/psdBusinessPage";
import PSDBasePage from "../page_objects/psdBasePage";

class PSDAddBusinessHelper {

    /**
     * Create a new business with the given data
     * @param {*} dataTable 
     */
    addNewBusiness(dataTable) {
        PSDBasePage.followLink("Search for or add a business");
    
        const psdBusinessPage = new PSDBusinessPage();
        psdBusinessPage.clickAddNewBusinessButton();
        psdBusinessPage.addBusinessDetails(dataTable);
        psdBusinessPage.addBusinessAddress(dataTable);
        psdBusinessPage.addBusinessContactDetails(dataTable);
        psdBusinessPage.clickUseBusinessDetails();
        psdBusinessPage.addBusinessRole(dataTable);
        psdBusinessPage.clickNoAddAnotherBusinessAndContinue();
    }


}

export default PSDAddBusinessHelper;