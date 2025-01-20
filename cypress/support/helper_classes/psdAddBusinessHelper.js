import PSDCreateBusinessPage from "../page_objects/psdCreateBusinessPage";
import PSDBasePage from "../page_objects/psdBasePage";

class PSDAddBusinessHelper {

    /**
     * Create a new business with the given data
     * @param {*} dataTable 
     */
    addNewBusiness(dataTable) {
        const psdCreateBusinessPage = new PSDCreateBusinessPage();
        psdCreateBusinessPage.clickAddNewBusinessButton();
        psdCreateBusinessPage.addBusinessDetails(dataTable);
        psdCreateBusinessPage.addBusinessAddress(dataTable);
        psdCreateBusinessPage.addBusinessContactDetails(dataTable);
        psdCreateBusinessPage.clickUseBusinessDetails();
        psdCreateBusinessPage.addBusinessRole(dataTable);
    }


}

export default PSDAddBusinessHelper;