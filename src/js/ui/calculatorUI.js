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
const addInputFieldByDefinition = (containerElement, inputDefinition, inputElementId = '') => {
    const { reference, text, dataType, validationType, properties } = inputDefinition;
    validation.validString(dataType);
    validation.validString(reference);
    validation.validString(text);

    const inputFieldContainer = dom.createContainerWithLabel(text, inputElementId, ['form-control']);
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
const initializeInputSection = (command) => {    
    const inputDefinitions = command.getInputDefinitions();

    const inputSection = document.querySelector('#input-section');
    dom.cleanParentElement(inputSection);
    const inputFieldIds = []

    for (const definition of inputDefinitions) {
        const inputFieldId = definition.reference + '-input'
        addInputFieldByDefinition(inputSection, definition, inputFieldId);
        inputFieldIds.push(inputFieldId);
    }

    const submitButton = dom.createElement('input', {
        type: 'button',
        value: 'Submit',
        id: 'submit-button',
        onclick: () => handleSubmit(command),
    });

    const resetButton = dom.createElement('input', {
        type: 'button',
        value: 'Reset',
        id: 'reset-button',
        onclick: () => handleResetClicked(command),
    });

    inputSection.append(submitButton);
    inputSection.append(resetButton);
}

const handleResetClicked = (command) => {
    initializeCalculator(command);
}

/**
 * Initializes the output section of the calculator UI, which is a container element with ID: 'output-section'.
 *
 * @param {object[]} inputDefinitions - An array of output field definitions.
 */
const initializeOutputSection = (command) => {
    const outputDefinitions = command.getOutputDefinitions();
    const outputSection = document.querySelector('#output-section');

    dom.cleanParentElement(outputSection);
    for (const definition of outputDefinitions) {
        const outputFieldId = definition.reference + '-result';
        const outputFieldContainer = dom.createContainerWithLabel(definition.text, outputFieldId, ['result']);
        const resultText = dom.createElement('p', { id: outputFieldId});

        outputFieldContainer.append(resultText);
        outputSection.append(outputFieldContainer);
    }
}


export const initializeCalculator = (command) => {    
    initializeInputSection(command);
    initializeOutputSection(command);
}


const displayCalculationResults = (results, outputDefinitions) => {
    const ui = document.querySelector('#calculator');
    for (const { reference } of outputDefinitions) {
        const outputElementId = reference + '-result';
        const outputElement = document.querySelector(`#${outputElementId}`);
        const value = results[reference];

        outputElement.innerHTML = `${currencyCharacter} ${value.toFixed(2)}`;
    }
}

/**
 * Handles the form submission event and calculates the results.
 *
 * @param {string[]} inputElementIds - An array of input element IDs.
 */
const handleSubmit = (command) => {
    const inputDefinitions = command.getInputDefinitions();
    const outputDefinitions = command.getOutputDefinitions();
    const inputData = {};

    for (const {reference} of inputDefinitions) {
        const id = reference + '-input'
        const inputElement = document.querySelector(`#${id}`);
        const name = inputElement.name;
        let value = inputElement.value;

        if ('dataType' in inputElement && inputElement['dataType'] === 'number') {
            value = parseFloat(value);
        }

        inputData[name] = value;
    }
    const results = calc.handleCalculateResults(inputData, command);

    displayCalculationResults(results, outputDefinitions);
}