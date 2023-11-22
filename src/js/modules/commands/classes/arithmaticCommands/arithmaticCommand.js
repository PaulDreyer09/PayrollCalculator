import * as validation from "../../../utils/validation.js";
import { Command } from "../command.js";

/**
 * @class
 * @param {Function} func - The arithmetic function to be executed.
 * @param {number} result_reference - Reference to the result position in the values array.
 * @param {...number} input_reference - References to the operands' positions in the values array.
 */
export class ArithmeticCommand extends Command {
  constructor(func, result_reference, ...input_references) {
    super();
    this.input_references = [...input_references];
    this.name = null;
    this.func = func;
    this.result_reference = result_reference;
  }

  execute(values) {
    const input_values = [];
    for (const reference of this.input_references) {
      input_values.push(this.get_known_valid_number(values, reference));
    }
    const result = this.func(...input_values);

    return this.set_constant(values, this.result_reference, result);
  }

  /**
   * Validates if a specific key is present in the values object and is a valid number.
   * @param {Object} values - The object to search for the key and validate the associated value.
   * @param {string} name - The key to search for in the values object.
   * @throws {Error} Throws an error if the key is not found or if the associated value is not a valid number.
   * @returns {number} The validated number associated with the provided key.
   */
  get_known_valid_number(values, name) {
    const found = this.get_known_value(values, name);
    try {
      return validation.valid_number(found);
    } catch {
      throw new Error(`${name} has non numeric value`);
    }
  }
}
