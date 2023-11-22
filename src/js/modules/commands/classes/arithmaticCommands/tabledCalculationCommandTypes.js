import { TabledCalculationCommand } from "./tabledCalculationCommand.js";
import * as calc from "../../../payrollFunctions/calculationFunctions.js";

/**
 * CalculateAddedTotalByTiersCommand - Represents a command to calculate the added total by tiers based on a table and an input value.
 * @class
 * @extends TabledCalculationCommand
 * @param {string} results_reference - The reference to store the results.
 * @param {string} table_reference - Reference to the table for calculation.
 * @param {string} input_value_reference - Reference to the input value.
 */
export class CalculateAddedTotalByTiersCommand extends TabledCalculationCommand {
  constructor(results_reference, table_reference, input_value_reference) {
    super(calc.calculate_added_total_by_tiers, results_reference, table_reference, input_value_reference);
    this.name = "Calculate Added Total By Tiers";
  }
}

/**
 * CalculateTaxByTiersCommand - Represents a command to calculate the total tax by tiers based on a table and an input value.
 * @class
 * @extends TabledCalculationCommand
 * @param {string} results_reference - The reference to store the results.
 * @param {string} table_reference - Reference to the table for calculation.
 * @param {string} input_value_reference - Reference to the input value.
 */
export class CalculateTaxByTiersCommand extends TabledCalculationCommand {
  constructor(results_reference, table_reference, input_value_reference) {
    super(calc.calculate_total_tax_by_tiers, results_reference, table_reference, input_value_reference);
    this.name = "Calculate Tax Total By Tiers";
  }
}

export const register_classes_to_factory = (factory) => {
  const class_list = [
    CalculateAddedTotalByTiersCommand,
    CalculateTaxByTiersCommand,
  ]
  
  for(const class_constructor of class_list){
    factory.register_class(class_constructor);
  }
}
