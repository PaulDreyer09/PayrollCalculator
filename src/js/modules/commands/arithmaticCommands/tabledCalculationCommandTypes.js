import { TabledCalculationCommand } from "./tabledCalculationCommand.js";
import * as calc from "../../payrollFunctions/calculationFunctions.js";

/**
 * CalculateAddedTotalByTiersCommand - Represents a command to calculate the added total by tiers based on a table and an input value.
 * @class
 * @extends TabledCalculationCommand
 * @param {ResultsReference} resultsReference - The reference to store the results.
 * @param {TableReference} tableReference - Reference to the table for calculation.
 * @param {InputValueReference} inputValueReference - Reference to the input value.
 */
export class CalculateAddedTotalByTiersCommand extends TabledCalculationCommand {
  constructor(resultsReference, tableReference, inputValueReference) {
    super(calc.calculateAddedTotalByTiers, resultsReference, tableReference, inputValueReference);
    this.name = "Calculate Added Total By Tiers";
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {CalculateAddedTotalByTiersCommand}
   */
  static factory(params) {
    return new CalculateAddedTotalByTiersCommand(params.resultsReference, params.tableReference, params.inputValueReference);
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command
   * @param {Visitor} visitor
   */
  accept(visitor) {
    visitor.visitCalculateAddedTotalByTiersCommand(this);
  }
}

/**
 * CalculateTaxByTiersCommand - Represents a command to calculate the total tax by tiers based on a table and an input value.
 * @class
 * @extends TabledCalculationCommand
 * @param {ResultsReference} resultsReference - The reference to store the results.
 * @param {TableReference} tableReference - Reference to the table for calculation.
 * @param {InputValueReference} inputValueReference - Reference to the input value.
 */
export class CalculateTaxByTiersCommand extends TabledCalculationCommand {
  constructor(resultsReference, tableReference, inputValueReference) {
    super(calc.calculateTotalTaxByTiers, resultsReference, tableReference, inputValueReference);
    this.name = "Calculate Tax Total By Tiers";
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {CalculateTaxByTiersCommand}
   */
  static factory(params) {
    return new CalculateTaxByTiersCommand(params.resultsReference, params.tableReference, params.inputValueReference);
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command
   * @param {Visitor} visitor
   */
  accept(visitor) {
    visitor.visitCalculateTaxByTiersCommand(this);
  }
}
