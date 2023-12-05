import * as validation from "../../../utils/validation.js";
import { Command } from "../command.js";

export class ArithmeticCommand extends Command {
  /**
   * @param {Function} func - The arithmetic function to be executed when execute is called.
   * @param {string} result_reference - Reference to the result position in the data_sheet array.
   * @param {...string} input_reference - References to the operands' positions in the data_sheet array.
   */
  constructor(func, result_reference, ...input_references) {
    super();
    //Validate input_references string list
    try{
      if(func.length > input_references.length){
        throw new Error(`Not enough input references provided. Required: ${func.length}. Provided: ${input_references.length}`)
      }
      this.input_references = validation.valid_strings_array([...input_references]);
    } catch(error) {
      throw("Invalid list of values for input_references.", error.message)
    }
    
    this.name = null;
    this.result_reference = validation.valid_string(result_reference);
    this.func = validation.valid_function(func);
  }

  /**
   * Collect data from the data_sheet to calculate a result of the assigned function 
   * this.result_reference will be used as the key to store the result inside data_sheet
   * this.input_references will be used as keys to locate any required input data from data_sheet
   * @param {object} data_sheet - Object from which referenced values will be collected and stored into
   * @returns {object} - Returns the data_sheet after the changes in data have been made.
   */
  execute(data_sheet) {
    const input_values = [];
    for (const reference of this.input_references) {
      input_values.push(this.get_known_valid_number(data_sheet, reference));
    }
    const result = this.func(...input_values);

    return this.set_constant(data_sheet, this.result_reference, result);
  }

  /**
   * Validates if a specific key is present in the data_sheet object and is a valid number.
   * @param {Object} data_sheet - The object to search for the key and validate the associated value.
   * @param {string} name - The key to search for in the data_sheet object.
   * @throws {Error} Throws an error if the key is not found or if the associated value is not a valid number.
   * @returns {number} The validated number associated with the provided key.
   */
  get_known_valid_number(data_sheet, name) {
    const found = this.get_known_value(data_sheet, name);
    try {
      return validation.valid_number(found);
    } catch {
      throw new Error(`${name} in the data_sheet has a non numeric value. Type is: ${found}`);
    }
  }
}
