// import * as ioDefinitionCommands from '../modules/commands/io-definition-command.js';

/**
 * Executes all the stored commands onto the provided data sheet.
 * @param {object} dataSheet - The data sheet containing input values.
 * @returns {object} An object containing PAYE, UIF, and Net Salary.
 */
const executeCalculationCommands = (dataSheet, command) => {
    return command.execute(dataSheet);
};

/**
 * Extract defined output results from the data sheet.
 * @param {object} dataSheet - The data sheet containing calculated results.
 * @param {Array} outputDefinitions - An array of output definitions.
 * @returns {object} An object containing output data.
 */
const getOutputResultsFromDatasheet = (dataSheet, command) => {
    const outputDefinitions = command.getOutputDefinitions();
    const results = {};

    for (const definition of outputDefinitions) {
        const reference = definition.reference;
        if (!reference in dataSheet)
            throw new Error(`Required output, ${reference}, was not found within the data sheet references.`);
        results[reference] = dataSheet[reference];
    }

    return results;
}

/**
 * Get input definitions for the defined commands.
 * @returns {Array} An array of input definition objects.
 */
export const extractInputDefinitions = (command) => {
    const definitionsList = command.getInputDefinitions();
    return definitionsList;
}

/**
 * Get output definitions for the defined commands.
 * @returns {Array} An array of output definition objects.
 */
export const extractOutputDefinitions = (command) => {
    const definitionsList = command.getOutputDefinitions();
    return definitionsList;
}

/**
 * Filter a given object of input data and return only the values which have corresponding keys of a provided definitions list
 * 
 * @param {object} inputData input data from the client, which will be filtered to only the keys that inputDefinitio
 * @param {Array} inputDefinitions Array of inputDefinition objects
 * @returns {object} object with the same key:value data, filtered to only inputDefinitions' keys, where applicable
 */
export const filterInputDataToDefinitions = (inputData, commands) => {
    const inputDefinitions = extractInputDefinitions(commands);
    const filteredData = {}
    for (const { reference } of inputDefinitions) {
        if (inputData.hasOwnProperty(reference)) {
            filteredData[reference] = inputData[reference]
        } else {
            throw new Error(`No expected input data found with name: ${reference}`);
        }
    }
    return filteredData;
}

/**
 * Calculate results based on validated input data.
 * @param {object} inputData - The validated input data.
 * @returns {object} An object containing output results.
 */
export const handleCalculateResults = (inputData, command) => {
    // const dataSheet = filterInputDataToDefinitions(inputData, command);
    // let result = {};
    // dataSheet = command.execute(dataSheet);
    // result = getOutputResultsFromDatasheet(dataSheet, command);

    return command.execute(filterInputDataToDefinitions(inputData, command));
}
