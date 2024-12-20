import CreateProductPage from "../page_objects/psdCreateProductRecordPage";
import MenuPage from "../page_objects/psdMenuPage";
import ProductsPage from "../page_objects/psdProductsPage";

class PSDEditProductRecordHelper {

    /**
     * Helper to edit a product record with the given data
     * @param {*} dataTable 
     */
    editProductRecord(dataTable) {
        const createproductpage = new CreateProductPage();
        dataTable.hashes().forEach((row) => {
            createproductpage.selectProductCategory(row.ProductCategory);
            createproductpage.enterProductSubcategory(row.ProductSubcategory);
            createproductpage.setProductMarking(row.ProductMarking);
            createproductpage.setWasProductplacedOnTheMarketBefore1January2021(row.MarketBeforeJan2021);
            createproductpage.enterProductBarcode(row.BarcodeNumber);
            createproductpage.enterProductIdentifiers(row.OtherProductIdentifiers);
            createproductpage.enterWebpage(row.Webpage);
            createproductpage.selectCountryOfOrigin(row.CounrtyOfOrigin);
            createproductpage.enterProductionDescription(row.DescriptionOfProduct);
        })
        createproductpage.clickSaveButton();

    }

}

export default PSDEditProductRecordHelper;