PSD Cypress test automation framework
=====================================

This directory contains e2e acceptance tests and Accessibility tests using Cypress, Cypress-axe, Cucumber and JavaScript. 

# Pre-requisites
- Download and setup <a href="https://nodejs.org/en/download" target="_blank">NodeJS</a>
- Download and setup <a href="https://code.visualstudio.com/download" target="_blank">Visual Studio Code</a>
- Install `Cucumber (Gherkin) Full Support` plugin from `File -> Preferences -> Extensions (On Windows)`. `Code -> Settings -> Extensions (On Mac)`
- Familiarise yourself with <a href="https://cucumber.io/docs/gherkin" target="_blank">Gherkin Syntax</a> and <a href="https://cucumber.io/docs/cucumber/step-definitions" target="_blank">Step Definitions</a>
- <a href="https://docs.cypress.io/app/get-started/why-cypress" target="_blank">Cypress Documentation</a>
- Add the following settings into VS Code Settings.json
```
{
    "trxviewer.enableSourceMaps": true,
    "javascript.format.insertSpaceAfterConstructor": true,
    "cucumberautocomplete.onTypeFormat": true,
    "cucumberautocomplete.steps": [

        "cypress/support/step_definitions/*.js"
    ],
    "cucumberautocomplete.syncfeatures": "**/*.feature",
    "cucumberautocomplete.strictGherkinCompletion": false,
    "editor.quickSuggestions": {
        "other": "on",
        "comments": "on",
        "strings": "on"
    },
    "cucumberautocomplete.pages": {},
    "cucumberautocomplete.customParameters": [],        
    "files.autoSave": "afterDelay",
    "launch": {
        "configurations": [],
        "compounds": []
    }
}
```

# Setting-up Cypress e2e test project
- Clone <a href="https://github.com/OfficeForProductSafetyAndStandards/psd-cypress.git" target="_blank">psd-cypress</a>
- Open the project in VS Code
- Navigate to `cypress` directory (This directory contains Cypress installation)

# Install Cypress
- Open a new terminal in VS Code (Note that the path is psd-cypress)
- Run `npm install cypress` (This will install Cypress and all dependenciesfrom package.json)
- Run `npx cypress open` (This will open Cypress runner window)
- Select `E2E Testing` on Cypress runner window. Once selected it will display the 'Choose a browser' window
- Select `Chrome` and click `Start E2E Testing in Chrome` button (this will open a new Chrome browser window with the list of tests)
- Now you can run the individual tests by clicking on the test name
