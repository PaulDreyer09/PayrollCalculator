import * as calc from "../../payrollFunctions/calculationFunctions.js";
import { ArithmeticCommand } from "./arithmaticCommand.js";

/**
 * AddCommand - Represents a command to perform addition.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {...InputReference} inputReferences - References to the input values.
 */
export class AddCommand extends ArithmeticCommand {
  constructor(resultReference, ...inputReferences) {
    super(calc.sum, resultReference, ...inputReferences);
    this.name = "Add";
  }

  accept(visitor) {
    visitor.visitAddCommand(this);
  }
}

/**
 * SubtractCommand - Represents a command to perform subtraction.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {...InputReference} inputReferences - References to the input values.
 */
export class SubtractCommand extends ArithmeticCommand {
  constructor(resultReference, ...inputReferences) {
    super(calc.subtract, resultReference, ...inputReferences);
    this.name = "Subtract";
  }

  accept(visitor) {
    visitor.visitSubtractCommand(this);
  }
}

/**
 * MultiplyCommand - Represents a command to perform multiplication.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {...InputReference} inputReferences - References to the input values.
 */
export class MultiplyCommand extends ArithmeticCommand {
  constructor(resultReference, ...inputReferences) {
    super(calc.multiply, resultReference, ...inputReferences);
    this.name = "Multiply;";
  }

  accept(visitor) {
    visitor.visitMultiplyCommand(this);
  }
}

/**
 * DivideCommand - Represents a command to perform division.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {...InputReference} inputReferences - References to the input values.
 */
export class DivideCommand extends ArithmeticCommand {
  constructor(resultReference, ...inputReferences) {
    super(calc.divide, resultReference, ...inputReferences);
    this.name = "Divide";
  }

  accept(visitor) {
    visitor.visitDivideCommand(this);
  }
}

/**
 * AnnualizeCommand - Represents a command to annualize a value.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {InputValueReference} inputValueReference - Reference to the input value.
 * @param {PeriodsPerAnnumReference} periodsPerAnnumReference - Reference to periods per annum value.
 */
export class AnnualizeCommand extends ArithmeticCommand {
  constructor(resultReference, inputValueReference, periodsPerAnnumReference) {
    super(calc.annualize, resultReference, inputValueReference, periodsPerAnnumReference);
    this.name = "Annualize";
  }

  get inputValueReference() {
    return this.inputReferences[0];
  }

  get periodsPerAnnumReference() {
    return this.inputReferences[1];
  }

  accept(visitor) {
    visitor.visitAnnualizeCommand(this);
  }
}

/**
 * DeAnnualizeCommand - Represents a command to de-annualize a value.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {InputValueReference} inputValueReference - Reference to the input value.
 * @param {NewPeriodsPerAnnumReference} newPeriodsPerAnnumReference - Reference to new periods per annum value.
 */
export class DeAnnualizeCommand extends ArithmeticCommand {
  constructor(resultReference, inputValueReference, newPeriodsPerAnnumReference) {
    super(calc.deAnnualize, resultReference, inputValueReference, newPeriodsPerAnnumReference);
    this.name = "DE-Annualize";
  }

  get inputValueReference() {
    return this.inputReferences[0];
  }

  get periodsPerAnnumReference() {
    return this.inputReferences[1];
  }

  accept(visitor) {
    visitor.visitDeAnnualizeCommand(this);
  }
}

/**
 * LesserOfCommand - Represents a command to calculate the lesser of the input values.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {...InputReference} inputReferences - References to the input values.
 */
export class LesserOfCommand extends ArithmeticCommand {
  constructor(resultReference, ...inputReferences) {
    super(calc.lesserOf, resultReference, ...inputReferences);
    this.name = "Lesser Of";
  }

  accept(visitor) {
    visitor.visitLesserOfCommand(this);
  }
}

/**
 * FlooredDifferenceCommand - Represents a command to calculate the floored difference between the input values.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {...InputReference} inputReferences - References to the input values.
 */
export class FlooredDifferenceCommand extends ArithmeticCommand {
  constructor(resultReference, ...inputReferences) {
    super(calc.flooredDifference, resultReference, ...inputReferences);
    this.name = "Floored Difference";
  }

  accept(visitor) {
    visitor.visitFlooredDifferenceCommand(this);
  }
}

/**
 * CalculateLimitedTaxationCommand - Represents a command to calculate limited taxation based on inputs.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {InputValueReference} inputValueReference - Reference to the input value.
 * @param {RateReference} rateReference - Reference to the tax rate.
 * @param {CeilingReference} ceilingReference - Reference to the ceiling value for taxation.
 */
export class CalculateLimitedPercentageCommand extends ArithmeticCommand {
  constructor(resultReference, inputValueReference, rateReference, ceilingReference) {
    super(calc.calculateLimitedPercentage, resultReference, inputValueReference, rateReference, ceilingReference);
    this.name = "Calculate Limited Taxation";
  }

  get inputValueReference() {
    return this.inputReferences[0];
  }
  get rateReference() {
    return this.inputReferences[1];
  }
  get ceilingReference() {
    return this.inputReferences[2];
  }

  accept(visitor) {
    visitor.visitCalculateLimitedPercentageCommand(this);
  }
}




