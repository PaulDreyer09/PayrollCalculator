import * as dom from "../modules/utils/domManipulation.js";
import * as visitors from "../modules/commands/visitors/domVisitor.js";

const currency_character = "R";

/**
 * Reinitializes the calculator UI
 * @param {Command} command - The command that defines the structure of the calculator
 */
const handle_reset_clicked = (visitor) => {
  visitor.reset_input_elements();
  visitor.reset_output_elements();

  // Change to clear fields
};

/**
 * Initializes the input section of the calculator UI, which is a container element with ID: 'input-section'.
 *
 * @param {object[]} input_definitions - An array of input field definitions.
 */
const initialize_input_section = (visitor, command) => {
  const input_section = document.querySelector("#input-section");
  dom.clean_parent_element(input_section);

  input_section.append(visitor.input_container_element);

  const submit_button = dom.create_element("input", {
    type: "button",
    value: "Submit",
    id: "submit-button",
    onclick: () => handle_submit(command),
  });

  const reset_button = dom.create_element("input", {
    type: "button",
    value: "Reset",
    id: "reset-button",
    onclick: () => handle_reset_clicked(visitor),
  });

  input_section.append(submit_button, reset_button);
};

/**
 * Initializes the output section of the calculator UI, which is a container element with id: 'output-section'.
 *
 * @param {IODomBuilderVisitor} visitor - The visitor that builds the UI
 */
const initialize_output_section = (visitor) => {
  const output_section = document.querySelector("#output-section");
  dom.clean_parent_element(output_section);

  output_section.append(visitor.output_container_element);
};

/**
 * Initialize the calculators input and output fields depending on the input and output definitions contained in the command input
 *
 * @param {*} command - The command containing the logic of what will be calculated.
 */
export const initialize_calculator = (command) => {
  const visitor = command.accept(new visitors.IODomBuilderVisitor());

  initialize_input_section(visitor, command);
  initialize_output_section(visitor);
};

/**
 *
 * @param {object} results -
 * @param {Array<DefineOutputCommand>} output_definitions -
 */
const display_calculation_results = (results, command) => {
  return command.accept(new visitors.OutputDisplayerVisitor(results, currency_character));
};

/**
 * Filter a given object of input data and return only the values which have corresponding keys of a provided definitions list
 *
 * @param {object} input_data input data from the client, which will be filtered to only the keys that input_definition
 * @param {Array} input_definitions Array of input_definition objects
 * @returns {object} object with the same key:value data, filtered to only input_definitions' keys, where applicable
 */
export const filter_input_data_to_definitions = (input_data, input_definitions) => {
  const filtered_data = {};
  for (const { reference } of input_definitions) {
    if (input_data.hasOwnProperty(reference)) {
      filtered_data[reference] = input_data[reference];
    } else {
      throw new Error(`No expected input data found with name: ${reference}`);
    }
  }
  return filtered_data;
};

/**
 * Calculate results based on validated input data.
 * @param {object} input_data - The validated input data.
 * @param {Command} - The command to execute calculation on the input data
 * @returns {object} An object containing output results.
 */
export const handle_calculate_results = (input_data, command) => {
  return command.execute(input_data);
};

const get_input_data = (command) => {
  const input_collection_visitor = command.accept(new visitors.InputCollectorVisitor());

  return filter_input_data_to_definitions({ ...input_collection_visitor.collected_input_data }, input_collection_visitor.input_definitions);
};

/**
 * Handles the form submission event and calculates the results.
 * @param {IODomBuilderVisitor} visitor - The visitor containing the input and output definitions
 * @param {Command} command - The command to be executed to calculate the results.
 */
const handle_submit = (command) => {
  const data_sheet = get_input_data(command);
  handle_calculate_results(data_sheet, command);
  display_calculation_results(data_sheet, command);
};
