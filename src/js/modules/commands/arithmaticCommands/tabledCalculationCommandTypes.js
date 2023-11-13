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

  accept(visitor) {
    visitor.visitCalculateTaxByTiersCommand(this);
  }
}