/// <reference types="cypress" />

import PSDRandomTestDataHelper from '../helper_classes/psdRandomTestDataHelper';

class PSDCreateProductRecordPage 
{
    /****************** page objects *****************/

    elements = {
        barcodeYesRadioButton : () => cy.get('input#product-duplicate-check-form-has-barcode-true-field', { timeout: 10000 }).should('exist'),
        barcodeNoRadioButton : () => cy.get('input#product-duplicate-check-form-has-barcode-false-field', { timeout: 10000 }).should('exist'),
        barcodeNumberTextField : () => cy.get('input#product-duplicate-check-form-barcode-field', { timeout: 10000 }).should('exist'),        
        continueButton: () => cy.contains('button', 'Continue', { timeout: 10000 }).should('exist'),

        productCategoryDropdown : () => cy.get('select#product-category-field', { timeout: 10000 }).should('exist'),
        productSubcategoryTextField : () => cy.get('input#product-subcategory-field', { timeout: 10000 }).should('exist'),
        productCounterfeitYesRadioButton : () => cy.get('input#product-authenticity-counterfeit-field', { timeout: 10000 }).should('exist'),
        productCounterfeitNoRadioButton : () => cy.get('input#product-authenticity-genuine-field', { timeout: 10000 }).should('exist'),
        productCounterfeitUnsureRadioButton : () => cy.get('input#product-authenticity-unsure-field', { timeout: 10000 }).should('exist'),
        productMarkingYesRadioButton : () => cy.get('input#product-has-markings-markings-yes-field', { timeout: 10000 }).should('exist'),
        productMarkingNoRadioButton : () => cy.get('input#product-has-markings-markings-no-field', { timeout: 10000 }).should('exist'),
        productMarkingUnknownRadioButton : () => cy.get('input#product-has-markings-markings-unknown-field', { timeout: 10000 }).should('exist'),
        productMarkingUKCACheckbox : () => cy.get('input#product-markings-ukca-field', { timeout: 10000 }).should('exist'),
        productMarkingUKNICheckbox : () => cy.get('input#product-markings-ukni-field', { timeout: 10000 }).should('exist'),
        productMarkingCECheckbox : () => cy.get('input#product-markings-ce-field', { timeout: 10000 }).should('exist'),
        manufacturerBrandNameTextField : () => cy.get('input#product-brand-field', { timeout: 10000 }).should('exist'),
        productNameTextField : () => cy.get('input#product-name-field', { timeout: 10000 }).should('exist'),
        fileUploadButton : () => cy.get('input#product-image-field', { timeout: 10000 }).should('exist'),
        marketBefore2021YesRadioButton : () => cy.get('input#product-when-placed-on-market-before-2021-field', { timeout: 10000 }).should('exist'),
        marketBefore2021NoRadioButton : () => cy.get('input#product-when-placed-on-market-on-or-after-2021-field', { timeout: 10000 }).should('exist'),
        marketBefore2021UnknownRadioButton : () => cy.get('input#product-when-placed-on-market-unknown-date-field', { timeout: 10000 }).should('exist'),
        productBarcodeNumberTextField : () => cy.get('input#product-barcode-field', { timeout: 10000 }).should('exist'),
        productIdentifiersTextField : () => cy.get('textarea#product-product-code-field', { timeout: 10000 }).should('exist'),
        webpageTextField : () => cy.get('input#product-webpage-field', { timeout: 10000 }).should('exist'),
        countryOfOriginDropdown : () => cy.get('select#product-country-of-origin-field', { timeout: 10000 }).should('exist'),
        productDescriptionTextField : () => cy.get('textarea#product-description-field', { timeout: 10000 }).should('exist'),
        saveButton : () => cy.contains('button', 'Save', { timeout: 10000 }).should('exist')

    }

    /******************** Getter & Setters *******************/

    /**
     * Click on Yes radio button for product barcode number
     */
    clickProductBarcodeYesRadioButton() 
    {
        this.elements.barcodeYesRadioButton().click();
    }

    /**
     * Click on No radio button for product barcode number
     */
    clickProductBarcodeNoRadioButton() 
    {
        this.elements.barcodeNoRadioButton().click();
    }

    /**
     * Enter barcode in the barcode text field
     * @param {*} barcode 
     */
    enterBarcodeNumber(barcode) 
    {
        this.elements.barcodeNumberTextField().clear();
        if (barcode === 'Random' || barcode === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var barcodeNumber = psdrandomgenerator.generateRandomNumber(12);
            cy.wrap(barcodeNumber).as('barcodeNumber');
            this.elements.barcodeNumberTextField().type(barcodeNumber);
            cy.log("BarcodeNumber = " + barcodeNumber);
        } else {
            this.elements.barcodeNumberTextField().type(barcode);
        }
    }

    /**
     * Click on continue button
     */
    clickOnContinueButton()
    {
        this.elements.continueButton().click();
    }

    /**
     * Select given category from Product category
     * @param {*} category 
     */
    selectProductCategory(category)
    {
        if (category.toLowerCase() === 'random') {
            this.elements.productCategoryDropdown().then($dropdown => {
                cy.wrap($dropdown).find('option').then(options => {
                    if (options.length > 0) {
                        const randomIndex = Math.floor(Math.random() * options.length);
                        cy.wrap($dropdown).select(options[randomIndex].value);
                        cy.wrap(options[randomIndex].value).as('productCategory');
                    } else {
                        throw new Error('No options available in the dropdown');
                    }
                })
            })
        } else {
            this.elements.productCategoryDropdown().select(category);
        }       
    }

    /**
     * Enter Product subcategory
     * @param {*} subcategory 
     */
    enterProductSubcategory(subcategory)
    {
        this.elements.productSubcategoryTextField().clear();
        if (subcategory === 'Random' || subcategory === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var subCat = 'AutoTestPSDSubCat_' + psdrandomgenerator.generateRandomNumber(5);
            cy.wrap(subCat).as('productSubcategory');
            this.elements.productSubcategoryTextField().type(subCat);
            cy.log('ProductSubcategory = ' + subCat);
        } else {
            this.elements.productSubcategoryTextField().type(subcategory);
        }        
    }

    /**
     * Click on Product counterfeit Yes radio button
     */
    clickProductCounterfeitYesRadioButton()
    {
        this.elements.productCounterfeitYesRadioButton().click();
    }

    /**
     * Click on Product counterfeit No radio button
     */
    clickProductCounterfeitNoRadioButton()
    {
        this.elements.productCounterfeitNoRadioButton().click();
    }

    /**
     * Click on Product counterfeit Unsure radio button
     */
    clickProductCounterfeitUnsureRadioButton()
    {
        this.elements.productCounterfeitUnsureRadioButton().click();
    }

    /**
     * Click on Product marking Yes radio button
     */
    clickProductMarkingYesRadioButton()
    {
        this.elements.productMarkingYesRadioButton().click();
    }

    /**
     * Click on Product marking No radio button
     */
    clickProductMarkingNoRadioButton()
    {
        this.elements.productMarkingNoRadioButton().click();
    }

    /**
     * Click on Product marking Unknown radio button
     */
    clickProductMarkingUnknownRadioButton()
    {
        this.elements.productMarkingUnknownRadioButton().click();
    }

    /**
     * Check Product marking UKCA
     */
    checkProductMarkingUKCACheckbox() 
    {
        this.elements.productMarkingUKCACheckbox().check();
    }

    /**
     * Check Product marking UKNI
     */
    checkProductMarkingUKNICheckbox() 
    {
        this.elements.productMarkingUKNICheckbox().check();
    }

    /**
     * Check Product marking CE
     */
    checkProductMarkingCECheckbox() 
    {
        this.elements.productMarkingCECheckbox().check();
    }

    /**
     * Enter given text in the Manufacturer Brand name field
     * @param {*} brandName 
     */
    enterManufacturerBrandName(brandName) 
    {
        this.elements.manufacturerBrandNameTextField().clear();
        if (brandName === 'Random' || brandName === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var brand = 'AutoTestPSDMfrBrand_' + psdrandomgenerator.generateRandomNumber(5);
            cy.wrap(brand).as('productMfrBrandName');
            this.elements.manufacturerBrandNameTextField().type(brand);
            cy.log('Product Manufacturer Brand = ' + brand);
        } else {
            this.elements.manufacturerBrandNameTextField().type(brandName);
        }
    }

    /**
     * Enter Product name
     * @param {*} productName 
     */
    enterProductName(productName) 
    {
        this.elements.productNameTextField().clear();
        if (productName === 'Random' || productName === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var name = 'AutoTestPSDProd_' + psdrandomgenerator.generateRandomNumber(5);
            cy.wrap(name).as('productName');
            this.elements.productNameTextField().type(name);
            cy.log('Product Name = ' + name);
        } else {
            this.elements.productNameTextField().type(productName);
        }
    }

    /**
     * Upload Product image
     * @param {*} image 
     */
    uploadProductImage(image)
    {
        this.elements.fileUploadButton().click().attachFile(image);
    }

    /**
     * Click Yes for Product placed on the market before 1 January 2021
     */
    clickProductMarketedBefore1January2021YesRadioButton()
    {
        this.elements.marketBefore2021YesRadioButton().click();
    }

    /**
     * Click No for Product placed on the market before 1 January 2021
     */
    clickProductMarketedBefore1January2021NoRadioButton()
    {
        this.elements.marketBefore2021NoRadioButton().click();
    }

    /**
     * Click Unable to ascertain for Product placed on the market before 1 January 2021
     */
    clickProductMarketedBefore1January2021UnableToAscertainRadioButton()
    {
        this.elements.marketBefore2021UnknownRadioButton().click();
    }

    /**
     * Enter product barcode
     * @param {*} barcode 
     */
    enterProductBarcode(barcode) 
    {
        this.elements.productBarcodeNumberTextField().clear();
        if (barcode === 'Random' || barcode === 'random') {
            const psdrandomgenerator = new PSDRandomTestDataHelper();
            var barcodeNumber = psdrandomgenerator.generateRandomNumber(12);
            cy.wrap(barcodeNumber).as('productBarcodeNumber');
            this.elements.productBarcodeNumberTextField().type(barcodeNumber);
        } else {
            this.elements.productBarcodeNumberTextField().type(barcode);
        }
    }

    /**
     * Enter the given text into product identifier field
     * @param {*} identifier 
     */
    enterProductIdentifiers(identifier)
    {
        this.elements.productIdentifiersTextField().clear();
        this.elements.productIdentifiersTextField().type(identifier);
    }

    /**
     * Enter the given text in the webpage text field
     * @param {*} webpageUrl 
     */
    enterWebpage(webpageUrl) 
    {
        this.elements.webpageTextField().clear();
        this.elements.webpageTextField().type(webpageUrl);
    }

    /**
     * Select the given country from the dropdown
     * @param {*} country 
     */
    selectCountryOfOrigin(country) 
    {     
        if (country.toLowerCase() === 'random') {
            this.elements.countryOfOriginDropdown().then($dropdown => {
                cy.wrap($dropdown).find('option').then(options => {
                    if (options.length > 0) {
                        const randomIndex = Math.floor(Math.random() * options.length);
                        cy.wrap($dropdown).select(options[randomIndex].value);
                        cy.wrap(options[randomIndex].text).as('countryOfOrigin');
                        cy.log('Country of Origin = ' + options[randomIndex].text);
                    } else {
                        throw new Error('No options available in the dropdown');
                    }
                })
            })
        } else {
            this.elements.countryOfOriginDropdown().select(country);
        }          
    }

    /**
     * Enter the given text in the Description of Product field
     * @param {*} description 
     */
    enterProductionDescription(description)
    {
        this.elements.productDescriptionTextField().clear();
        this.elements.productDescriptionTextField().type(description);
    }

    /**
     * Click on teh Save button
     */
    clickSaveButton()
    {
        this.elements.saveButton().click();
    }

    /************* Methods ***************/

    /**
     * Select the given randio button for the "Do you have the product barcode number?"
     * Enter barcode number when "Yes" radio button is selected
     * @param {*} dataTable 
     */
    setProductBarcodeStatusAndNumber(dataTable)
    {
        dataTable.hashes().forEach((row) => {
            switch (row.DoesProductHasBarcode) {
                case "Yes":
                    this.clickProductBarcodeYesRadioButton();
                    this.enterBarcodeNumber(row.BarcodeNumber);                    
                    break;                            
                default:
                    this.clickProductBarcodeNoRadioButton();
                    break;
            }
        })
    }

    /**
     * click the given radio button for the "Is the product counterfeit?"
     * @param {*} status 
     */
    setProductCounterfeitStatus(status) 
    {
        switch (status) {
            case "Yes":
                this.clickProductCounterfeitYesRadioButton();
                break;            
            case "Unsure":
                this.clickProductCounterfeitUnsureRadioButton();
                break;        
            default:
                this.clickProductCounterfeitNoRadioButton();
                break;
        }
    }

    /**
     * Set the given value for "Does the product have UKCA, UKNI, or CE marking?"
     * @param {*} marking 
     */
    setProductMarking(marking)
    {
        switch (marking) {
            case "UKCA":
                this.clickProductMarkingYesRadioButton();
                this.checkProductMarkingUKCACheckbox();
                break;
            case "UKNI":
                this.clickProductMarkingYesRadioButton();
                this.checkProductMarkingUKNICheckbox();
                break;
            case "CE":
                this.clickProductMarkingYesRadioButton();
                this.checkProductMarkingCECheckbox();                
                break;              
            case "Unknown":
                this.clickProductMarkingUnknownRadioButton();
                break;
            default:
                this.clickProductMarkingNoRadioButton();
                break;
        }
    }

    /**
     * Select the given radio button for "Was the product placed on the market before 1 January 2021?"
     * @param {*} option 
     */
    setWasProductplacedOnTheMarketBefore1January2021(option)
    {
        switch (option) {
            case "Yes":
                this.clickProductMarketedBefore1January2021YesRadioButton();
                break;           
            case "Unable to ascertain":
            case "Unknown":
                this.clickProductMarketedBefore1January2021UnableToAscertainRadioButton();
                break;
            default:
                this.clickProductMarketedBefore1January2021NoRadioButton();
                break;
        }
    }

    

}

export default PSDCreateProductRecordPage;