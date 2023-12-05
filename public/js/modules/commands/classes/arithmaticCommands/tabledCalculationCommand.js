import { ArithmeticCommand } from "./arithmaticCommand.js";

/**
 * TabledCalculationCommand - Represents a command to perform a calculation based on a table and input values.
 * @class
 * @extends ArithmeticCommand
 * @param {function} func - The calculation function to apply.
 * @param {result_reference} result_reference - The reference to store the result.
 * @param {table_reference} table_reference - Reference to the table for calculation.
 * @param {...input_value_references} input_value_references - References to the input values.
 */
export class TabledCalculationCommand extends ArithmeticCommand {
  constructor(func, result_reference, table_reference, ...input_value_references) {
    super(func, result_reference, table_reference, ...input_value_references);
    // this.table_reference = table_reference;
  }
  
    /**
   * @returns {string} - Returns the reference string for the table used for calculation 
   */
  get table_reference (){
    return this.input_references[0];
  }
  
  /**
   * @returns {string} - Returns the reference string for the initial input value 
   */
  get input_value_reference (){
    return this.input_references[1];
  }

  /**
   * Run the calculation of the assigned function
   * The input data for the function is as follows:
   * table: data from data_sheet with this.table_reference as the property key
   * input_values: data values from data_sheet with this.input_references as the property keys
   * @param {object} data_sheet - Object with 
   * @returns 
   */
  execute(data_sheet) {
    const input_values = [];
    const table = this.get_known_value(data_sheet, this.table_reference);

    for (const reference of this.input_references) {
      if(reference === this.table_reference) continue;
      
      input_values.push(this.get_known_valid_number(data_sheet, reference));
    }

    const result = this.func(table, ...input_values);
    return this.set_constant(data_sheet, this.result_reference, result);
  }
}