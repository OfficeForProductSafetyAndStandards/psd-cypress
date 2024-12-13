import PSDBusinessPage from "../page_objects/psdBusinessPage";
import PSDBasePage from "../page_objects/psdBasePage";

class PSDAddBusinessHelper {

    /**
     * Create a new business with the given data
     * @param {*} dataTable 
     */
    addNewBusiness(dataTable) {
        const psdBusinessPage = new PSDBusinessPage();
        psdBusinessPage.clickAddNewBusinessButton();
        psdBusinessPage.addBusinessDetails(dataTable);
        psdBusinessPage.addBusinessAddress(dataTable);
        psdBusinessPage.addBusinessContactDetails(dataTable);
        psdBusinessPage.clickUseBusinessDetails();
        psdBusinessPage.addBusinessRole(dataTable);
    }


}

export default PSDAddBusinessHelper;