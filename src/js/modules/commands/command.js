/**
 * @class
 * @param {Function} func - The arithmetic function to be executed.
 * @param {number} result_reference - Reference to the result position in the dataSheet array.
 * @param {...number} input_references - References to the operands' positions in the dataSheet array.
 */
export class Command {
  constructor(...input_references) {
    this.input_references = [...input_references];
  }

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
      console.log(data_sheet)
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

  accept(visitor) {
    throw new Error("The accept() method needs to be implemented in the subclass.");
  }

  factory() {
    throw new Error("The factory() method needs to be implemented in the subclass");
  }
}
