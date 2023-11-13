import { ArithmeticCommand } from "./arithmaticCommand.js";

/**
 * TabledCalculationCommand - Represents a command to perform a calculation based on a table and input values.
 * @class
 * @extends ArithmeticCommand
 * @param {function} func - The calculation function to apply.
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {TableReference} tableReference - Reference to the table for calculation.
 * @param {...InputValueReference} inputValueReferences - References to the input values.
 */
export class TabledCalculationCommand extends ArithmeticCommand {
  constructor(func, resultReference, tableReference, ...inputValueReferences) {
    super(func, resultReference, ...inputValueReferences);
    this.tableReference = tableReference;
  }
  
  get inputValueReference (){
    return this.inputValueReferences;
  }

  execute(values) {
    const inputValues = [];
    const table = this.getKnownValue(values, this.tableReference);
    for (const reference of this.inputReferences) {
      inputValues.push(this.getKnownValidNumber(values, reference));
    }
    const result = this.func(table, ...inputValues);
    return this.setConstant(values, this.resultReference, result);
  }
}