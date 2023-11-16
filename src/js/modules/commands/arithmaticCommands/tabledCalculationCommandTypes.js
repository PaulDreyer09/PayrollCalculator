import { TabledCalculationCommand } from "./tabledCalculationCommand.js";
import * as calc from "../../payrollFunctions/calculationFunctions.js";

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

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {CalculateAddedTotalByTiersCommand}
   */
  static factory(params) {
    return new CalculateAddedTotalByTiersCommand(params.results_reference, params.table_reference, params.input_value_reference);
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command
   * @param {Visitor} visitor
   */
  accept(visitor) {
    visitor.visit_calculate_added_total_by_tiers_command(this);
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

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {CalculateTaxByTiersCommand}
   */
  static factory(params) {
    return new CalculateTaxByTiersCommand(params.results_reference, params.table_reference, params.input_value_reference);
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command
   * @param {Visitor} visitor
   */
  accept(visitor) {
    visitor.visit_calculate_tax_by_tiers_command(this);
  }
}
