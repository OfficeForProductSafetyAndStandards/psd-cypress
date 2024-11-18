import CreateProductPage from "../page_objects/psdCreateProductRecordPage";
import MenuPage from "../page_objects/psdMenuPage";
import ProductsPage from "../page_objects/psdProductsPage";

class PSDCreateProductRecordHelper
{

    /**
     * Helper method to create a product record with the given product details
     * @param {*} dataTable 
     */
    createProductRecord(dataTable)
    {
        const menupage = new MenuPage();
        const createproductpage = new CreateProductPage();
        const productspage = new ProductsPage();

        menupage.navigateToProductsPage();

        productspage.clickCreateAProductRecordButton();

        createproductpage.setProductBarcodeStatusAndNumber(dataTable);
        createproductpage.clickOnContinueButton();
        dataTable.hashes().forEach((row) => {
            createproductpage.selectProductCategory(row.ProductCategory);
            createproductpage.enterProductSubcategory(row.ProductSubcategory);
            createproductpage.setProductCounterfeitStatus(row.IsProductCounterfeit);
            createproductpage.setProductMarking(row.ProductMarking);
            createproductpage.enterManufacturerBrandName(row.ManufacturerBrandName);
            createproductpage.enterProductName(row.ProductName);
            createproductpage.setWasProductplacedOnTheMarketBefore1January2021(row.MarketBeforeJan2021);
            createproductpage.enterProductIdentifiers(row.OtherProductIdentifiers);
            createproductpage.enterWebpage(row.Webpage);
            createproductpage.selectCountryOfOrigin(row.CounrtyOfOrigin);
            createproductpage.enterProductionDescription(row.DescriptionOfProduct);
        })
        createproductpage.clickSaveButton();
        createproductpage.saveProductNumber();
    }


}

export default PSDCreateProductRecordHelper;