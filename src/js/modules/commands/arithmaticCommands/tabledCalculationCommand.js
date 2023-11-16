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
    super(func, result_reference, ...input_value_references);
    this.table_reference = table_reference;
  }
  
  get inputValueReference (){
    return this.input_value_references;
  }

  execute(values) {
    const input_values = [];
    const table = this.get_known_value(values, this.table_reference);

    for (const reference of this.input_references) {
      input_values.push(this.get_known_valid_number(values, reference));
    }

    const result = this.func(table, ...input_values);
    return this.set_constant(values, this.result_reference, result);
  }
}