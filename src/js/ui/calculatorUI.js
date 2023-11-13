import * as dom from "../modules/utils/domManipulation.js";
import * as visitors from "../modules/commands/visitors/domVisitor.js";

const currencyCharacter = "R";

/**
 * Reinitializes the calculator UI
 * @param {Command} command - The command that defines the structure of the calculator
 */
const handleResetClicked = (visitor) => {
  visitor.resetInputElements();
  visitor.resetOutputElements();

  // Change to clear fields
};

/**
 * Initializes the input section of the calculator UI, which is a container element with ID: 'input-section'.
 *
 * @param {object[]} inputDefinitions - An array of input field definitions.
 */
const initializeInputSection = (visitor, command) => {
  const inputSection = document.querySelector("#input-section");
  dom.cleanParentElement(inputSection);

  inputSection.append(visitor.inputContainerElement);

  const submitButton = dom.createElement("input", {
    type: "button",
    value: "Submit",
    id: "submit-button",
    onclick: () => handleSubmit(command),
  });

  const resetButton = dom.createElement("input", {
    type: "button",
    value: "Reset",
    id: "reset-button",
    onclick: () => handleResetClicked(visitor),
  });

  inputSection.append(submitButton, resetButton);
};

/**
 * Initializes the output section of the calculator UI, which is a container element with id: 'output-section'.
 *
 * @param {IODomBuilderVisitor} visitor - The visitor that builds the UI
 */
const initializeOutputSection = (visitor) => {
  const outputSection = document.querySelector("#output-section");
  dom.cleanParentElement(outputSection);

  outputSection.append(visitor.outputContainerElement);
};

/**
 * Initialize the calculators input and output fields depending on the input and output definitions containted in the command input
 *
 * @param {*} command - The command containing the logic of what will be calculated.
 */
export const initializeCalculator = (command) => {
  const visitor = command.accept(new visitors.IODomBuilderVisitor());

  initializeInputSection(visitor, command);
  initializeOutputSection(visitor);
};

/**
 *
 * @param {object} results -
 * @param {Array<DefineOutputCommand>} outputDefinitions -
 */
const displayCalculationResults = (results, command) => {
  return command.accept(new visitors.OutputDisplayerVisitor(results, currencyCharacter));
};

/**
 * Filter a given object of input data and return only the values which have corresponding keys of a provided definitions list
 *
 * @param {object} inputData input data from the client, which will be filtered to only the keys that inputDefinitio
 * @param {Array} inputDefinitions Array of inputDefinition objects
 * @returns {object} object with the same key:value data, filtered to only inputDefinitions' keys, where applicable
 */
export const filterInputDataToDefinitions = (inputData, inputDefinitions) => {
  const filteredData = {};
  for (const { reference } of inputDefinitions) {
    if (inputData.hasOwnProperty(reference)) {
      filteredData[reference] = inputData[reference];
    } else {
      throw new Error(`No expected input data found with name: ${reference}`);
    }
  }
  return filteredData;
};

/**
 * Calculate results based on validated input data.
 * @param {object} inputData - The validated input data.
 * @param {Command} - The command to execute calculation on the input data
 * @returns {object} An object containing output results.
 */
export const handleCalculateResults = (inputData, command) => {
  return command.execute(inputData);
};

const getInputData = (command) => {
  const inputCollectionVisitor = command.accept(new visitors.InputCollectorVisitor());

  return filterInputDataToDefinitions({ ...inputCollectionVisitor.collectedInputData }, inputCollectionVisitor.inputDefinitions);
};

/**
 * Handles the form submission event and calculates the results.
 * @param {IODomBuilderVisitor} visitor - The visitor containing the input and output definitions
 * @param {Command} command - The command to be executed to calculate the results.
 */
const handleSubmit = (command) => {
  const dataSheet = getInputData(command);
  handleCalculateResults(dataSheet, command);
  displayCalculationResults(dataSheet, command);
};
