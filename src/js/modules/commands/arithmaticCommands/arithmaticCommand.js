import * as validation from '../../utils/validation.js';
import {Command} from '../command.js';

/**
 * @class
 * @param {Function} func - The arithmetic function to be executed.
 * @param {number} resultReference - Reference to the result position in the values array.
 * @param {...number} inputReferences - References to the operands' positions in the values array.
 */
export class ArithmeticCommand extends Command {
  constructor(func, resultReference, ...inputReferences) {
      super(...inputReferences)
      this.func = func;
      this.resultReference = resultReference;
  }

  execute(values) {
      const inputValues = [];
      for (const reference of this.inputReferences) {
          inputValues.push(this.getKnownValidNumber(values, reference));
      }

      const result = this.func(...inputValues);

      return this.setConstant(values, this.resultReference, result);
  }

  /**
* Validates if a specific key is present in the values object and is a valid number.
* @param {Object} values - The object to search for the key and validate the associated value.
* @param {string} name - The key to search for in the values object.
* @throws {Error} Throws an error if the key is not found or if the associated value is not a valid number.
* @returns {number} The validated number associated with the provided key.
*/
  getKnownValidNumber(values, name) {
      const found = this.getKnownValue(values, name);
      try {
          return validation.validNumber(found);
      } catch {
          throw new Error(`${name} has non numeric value`);
      }
  }
}