import * as commandFunctions from '../payroll-functions/south-african-tax-calculations.js';
import * as validation from '../utils/validation.js';
import * as dom from '../utils/dom-creation.js';

const UIElements = {
    inputs: [],
    outputs: []
};

const currencyCharacter = "R";

const addInputField = (containerElement, { labelText, elementType, elementAttributes, options = [] }) => {
    const inputName = validation.validString(elementAttributes.name);
    const inputLabelText = validation.validString(labelText);

    const inputFieldContainer = dom.createContainerWithLabel(inputLabelText, inputName, ['form-control']);
    const inputElement = dom.createElement(elementType, elementAttributes);

    if (elementType == 'select') {
        dom.initializeSelect(options, inputElement);
    }

    inputFieldContainer.append(inputElement);
    UIElements.inputs.push(inputElement);
    containerElement.append(inputFieldContainer);
}

/**
 * Displays the data for the tax calculation
 *      Removes the hidden attribute from the results container
 * 
 * @param {{paye: number, uif: number, netSalary: number}} |
 *      paye: PAYE after deducting tax rebates |
 *      uif: UIF for the period | 
 *      netSalary: Salary after deductions for the period 
 */
const displayCalculationResults = (results) => {
    for(const {name} of results.expectedOutput){
        const outputElementId = name + '-result';
        const outputElement = document.querySelector(`#${outputElementId}`);
        const value = results.outputData[name];

        outputElement.innerHTML = `${currencyCharacter} ${value.toFixed(2)}`;
    }
}

/**
 * Collects the data from the submitted form and has the PAYE data calculated and displayed on the results page
 * 
 */
const onSubmit = (inputElements) => {
    const inputData = [];
    for (const inputElement of inputElements) {
        const name = inputElement.name;
        let value = inputElement.value;
        inputData.push({ name, value });
    }

    const results = calculateResults(inputData);
    displayCalculationResults(results);
}

const calculateResults = (inputData) => {
    //**Currently does not use commands to update for input data
    const dataSheet = {}

    commandFunctions.executeIOCommands(dataSheet);
    updateDataSheet(dataSheet, inputData);

    commandFunctions.executeCalculationCommands(dataSheet);
    console.log('Datasheet after commands: ', dataSheet);
    return getDataSheetResultData(dataSheet);
}

const updateDataSheet = (dataSheet, inputData) => {
    //**Currently does not use commands to update for input data
    for (const data of inputData) {
        const requiredInput = dataSheet.requiredInput.find((obj) => obj.elementAttributes.name == data.name);

        if (!requiredInput) {
            throw new Error(`Data sheet does not contain a required input with the reference: ${data.name}`);
        }
        if (requiredInput.dataType == 'number') {
            data.value = parseFloat(data.value);
        }
        dataSheet[data.name] = data.value;

        //Adding commands gives the issue that multiple commands are saved when repeated submissions
        // commandFunctions.addInputData(data);
    }
}

const getDataSheetResultData = (dataSheet) => {
    const results = {expectedOutput: dataSheet.expectedOutput, outputData: {}};

    for (const outputItem of dataSheet.expectedOutput) {
        const reference = outputItem.name;
        if (!reference in dataSheet)
            throw new Error(`Required output, ${reference}, was not found within the data sheet references.`);
        results.outputData[reference] = dataSheet[reference];
    }
    console.log('getDataSheetResultData', results)
    return results;
}

const initializeInputSection = (containerElement, dataSheet) => {
    const inputsContainer = dom.createElement('div', { id: 'inputSection' });
    for (const item of dataSheet['requiredInput']) {
        // console.log('Item to create', item)
        // let inputItemElement = create(item);
        addInputField(inputsContainer, item);
    }

    const submitButton = dom.createElement('input', {
        type: 'button',
        value: 'Submit',
        id: 'submit-button',
        onclick: () => onSubmit(UIElements.inputs),
    });

    inputsContainer.append(submitButton);

    containerElement.append(inputsContainer);
}

const initializeOutputSection = (containerElement, dataSheet) => {
    const outputFieldListContainer = dom.createElement('div', { id: 'outputSection' });

    for (const item of dataSheet['expectedOutput']) {
        const outputFieldContainer = dom.createContainerWithLabel(item.labelText, item.name , ['result']);
        // const outputFieldContainer = dom.createElement('div', {} ,['result']);
        // const label = dom.createElement('label', {for: item.name});
        // label.innerHTML = item.labelText
        const resultText = dom.createElement('p', {id: item.name + '-result'});

        // outputFieldContainer.append(label);
        outputFieldContainer.append(resultText);
        outputFieldListContainer.append(outputFieldContainer);
        // console.log(item);
    }
    containerElement.append(outputFieldListContainer);
}

/**
 * Initializes the calculator functionality.
 * Populates the period select with the given options and sets up form submission event handling.
 * 
 * @param {{text: string, value: any}[]} periodOptions : array list object filled with text and value of the option
 *      text: Text value of the option
 *      value: Value of the option
 * @param {{max: number, value: number}} taxRebatesBrackets - Tax rebates age backets
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @param {Object[]} taxBrackets - Tax brackets for calculations.
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @param {{percentage: number, ceiling: number}[]} uifOptions - options for calculating the UIF
 *      percentage: Percentage of the total income which will be calculated as UIF
 *      ceiling: Maximum value which can be calculated from monthlyIncome to UIF
 * @param {string} currencyCharacter - Character representing the currency symbol.
 */
export const initializeCalculator = () => {
    const dataSheet = {};
    commandFunctions.executeIOCommands(dataSheet);

    // console.log(UIElements)
    const ui = document.querySelector('#calculator');
    initializeInputSection(ui, dataSheet);
    initializeOutputSection(ui, dataSheet);
}