import * as string_manipulation from "../../utils/stringManipulation.js";

/**
 * @class
 * @param {Function} func - The arithmetic function to be executed.
 * @param {number} result_reference - Reference to the result position in the dataSheet array.
 * @param {...number} input_references - References to the operands' positions in the dataSheet array.
 */
export class Command {
  constructor() {}

  /**
   * Adds a Command object to this Commands subCommands array
   *
   * @param {Command} sub_command - Command to be added to the sub_command array
   */
  add_sub_command(sub_command) {}

  /**
   * Validates if a specific key is present in the dataSheet object.
   * @param {Object} data_sheet - The object to search for the key.
   * @param {string} name - The key to search for in the dataSheet object.
   * @throws {Error} Throws an error if the key is not found.
   * @returns {any} The value associated with the provided key.
   */
  get_known_value(data_sheet, name) {
    const found = data_sheet[name];
    if (found == undefined) {
      // console.log("Searching for " + name + " inside ", data_sheet, this.constructor.name);
      throw new Error(`${name} was not found`);
    }
    return found;
  }

  /**
   * Sets a value for a key in the dataSheet object if the key is not already defined.
   * @param {Object} data_sheet - The object to set the key-value pair.
   * @param {string} name - The key to set the value for.
   * @param {any} value - The value to set for the key.
   * @throws {Error} Throws an error if the key is already defined.
   * @returns {Object} The data_sheet object with the updated key-value pair.
   */
  set_constant(data_sheet, name, value) {
    if (name in data_sheet) {
      throw new Error(`${name} is already defined. Attempted to set ${name} as ${value}`);
    }
    data_sheet[name] = value;
    return data_sheet;
  }

  execute() {
    throw new Error("Execute method needs to be implemented by a derived class before being called");
  }

  /**
   * Accept a Visitor class to access and visit the current instance of the Command class
   * @param {Visitor} visitor - Visitor class to visit the command
   */
  accept(visitor) {
    const visit_function_name = "visit_" + string_manipulation.camel_case_to_snake_case(this.constructor.name);
    visitor[visit_function_name](this);
  }
}
