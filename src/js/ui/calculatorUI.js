// import * as calc from '../payroll-functions/south-african-tax-calculations.js';
import * as validation from '../modules/utils/validation.js';
import * as dom from '../modules/utils/dom-creation.js';
import * as calc from '../main/calculator.js';

const currencyCharacter = "R";

/**
 * Adds an input field to the specified container element.
 *
 * @param {HTMLElement} containerElement - The container element to which the input field will be added.
 * @param {object} inputDefinition - An object describing the input field.
 * @param {string} [inputElementId=''] - The ID for the input element (optional).
 * 
 * @param {string} inputDefinition.name - The name of the input field.
 * @param {string} inputDefinition.text - The label text for the input field.
 * @param {string} inputDefinition.dataType - The data type of the input field ('number' or 'numberList').
 * @param {number} [inputDefinition.min] - The minimum value for the input field (optional).
 * @param {string[]} [inputDefinition.options] - An array of options {text, value} for 'numberList' input (optional).
 */
const addInputField = (containerElement, inputDefinition, inputElementId = '') => {
    const { reference, text, dataType, validationType, properties } = inputDefinition;
    validation.validString(dataType);
    validation.validString(reference);
    validation.validString(text);

    const inputFieldContainer = dom.createContainerWithLabel(text, reference, ['form-control']);
    const inputElement =
        validationType === 'value' ? dom.createElement('input', {
            type: 'number',
            dataType: 'number',
            id: inputElementId,
            min: properties.min, 
            value: 0,
            name: reference,
        })
            : validationType === 'list' ? dom.createElement('select', {
                dataType: 'number',
                id: inputElementId,
                name: reference
            })
                : false

    if (!inputElement) {
        throw new Error(`Invalid dataType has been provided in input definition for ${reference}(${dataType})`);
    }

    if (validationType === 'list' && 'options' in properties) {
        dom.initializeSelect(properties.options, inputElement);
    }

    inputFieldContainer.append(inputElement);
    containerElement.append(inputFieldContainer);
}


/**
 * Initializes the input section of the calculator UI, which is a container element with ID: 'input-section'.
 *
 * @param {object[]} inputDefinitions - An array of input field definitions.
 */
const initializeInputSection = (inputDefinitions) => {
    const inputSection = document.querySelector('#input-section');
    dom.cleanParentElement(inputSection);
    const inputFieldIds = []
    for (const def of inputDefinitions) {
        console.log('Input Definition: ', def);
        const inputFieldId = def.reference + '-input'
        addInputField(inputSection, def, inputFieldId);
        inputFieldIds.push(inputFieldId);
    }

    const submitButton = dom.createElement('input', {
        type: 'button',
        value: 'Submit',
        id: 'submit-button',
        onclick: () => onSubmit(inputFieldIds),
    });
    const resetButton = dom.createElement('input', {
        type: 'button',
        value: 'Reset',
        id: 'reset-button',
        onclick: () => handleResetClicked(inputDefinitions),
    });

    inputSection.append(submitButton);
    inputSection.append(resetButton);
}

const handleResetClicked = (inputDefinitions) => {
    const outputSection = document.querySelector('#output-section');
    dom.cleanParentElement(outputSection);

    initializeInputSection(inputDefinitions);
}

/**
 * Initializes the output section of the calculator UI, which is a container element with ID: 'output-section'.
 *
 * @param {object[]} inputDefinitions - An array of output field definitions.
 */
const initializeOutputSection = (outputDefinitions) => {
    const outputSection = document.querySelector('#output-section');

    dom.cleanParentElement(outputSection);
    for (const definition of outputDefinitions) {
        const outputFieldContainer = dom.createContainerWithLabel(definition.text, definition.reference, ['result']);
        const resultText = dom.createElement('p', { id: definition.reference + '-result' });

        outputFieldContainer.append(resultText);
        outputSection.append(outputFieldContainer);
    }
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
    const inputDefinitions = calc.handleGetInputDefinitions();
    initializeInputSection(inputDefinitions);
    // initializeOutputSection(ui, outputDefinitions);
}

/**
 * Displays the data for the tax calculation
 *      Removes the hidden attribute from the results container
 * 
 * @param {object} results | result data to display in all the output elements
 */
const displayCalculationResults = (results) => {
    const ui = document.querySelector('#calculator');
    initializeOutputSection(results.outputDefinitions);

    for (const { reference } of results.outputDefinitions) {
        const outputElementId = reference + '-result';
        const outputElement = document.querySelector(`#${outputElementId}`);
        const value = results.outputData[reference];

        outputElement.innerHTML = `${currencyCharacter} ${value.toFixed(2)}`;
    }
}

/**
 * Handles the form submission event and calculates the results.
 *
 * @param {string[]} inputElementIds - An array of input element IDs.
 */
const onSubmit = (inputElementIds) => {
    const inputData = {};

    for (const id of inputElementIds) {
        const inputElement = document.querySelector(`#${id}`);
        const name = inputElement.name;
        let value = inputElement.value;

        if ('dataType' in inputElement && inputElement['dataType'] === 'number') {
            value = parseFloat(value);
        }

        inputData[name] = value;
    }
    console.log('Input data to send for calculation', inputData)
    const results = calc.handleCalculateResults(inputData);
    
    console.log('Results to display: ', results)
    displayCalculationResults(results);
}