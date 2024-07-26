import PSDCommonPage from "../page_objects/psdCommonPage";
import PSDBusinessPage from "../page_objects/psdBusinessPage";

class PSDAddBusinessHelper {

    /**
     * Create a new business with the given data
     * @param {*} dataTable 
     */
    addNewBusiness(dataTable) {
        const psdCommonPage = new PSDCommonPage();
        psdCommonPage.followLink("Search for or add a business");
    
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