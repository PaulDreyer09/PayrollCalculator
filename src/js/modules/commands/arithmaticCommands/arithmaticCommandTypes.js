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

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {AddCommand}
   */
  static factory(params) {
    return new AddCommand(params.resultReference, ...params.inputReferences);
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
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

    /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {SubtractCommand}
   */
  static factory(params) {
    return new SubtractCommand(params.resultReference, ...params.inputReferences);
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

    /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {MultiplyCommand}
   */
  static factory(params) {
    return new MultiplyCommand(params.resultReference, ...params.inputReferences);
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

    /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {AddCommand}
   */
  static factory(params) {
    return new DivideCommand(params.resultReference, ...params.inputReferences);
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

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {AnnualizeCommand}
   */
  static factory(params) {
    return new AnnualizeCommand(params.resultReference, params.inputValueReference, params.periodsPerAnnumReference);
  }

  get inputValueReference() {
    return this.inputReferences[0];
  }

  get periodsPerAnnumReference() {
    return this.inputReferences[1];
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
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

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {DeAnnualizeCommand}
   */
  static factory(params) {
    return new DeAnnualizeCommand(params.resultReference, params.inputValueReference, params.newPeriodsPerAnnumReference);
  }

  get inputValueReference() {
    return this.inputReferences[0];
  }

  get periodsPerAnnumReference() {
    return this.inputReferences[1];
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
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

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {LesserOfCommand}
   */
  static factory(params) {
    return new LesserOfCommand(params.resultReference, ...params.inputReferences);
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
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

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {FlooredDifferenceCommand}
   */
  static factory(params) {
    return new FlooredDifferenceCommand(params.resultReference, ...params.inputReferences);
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
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

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {CalculateLimitedPercentageCommand}
   */
  static factory(params) {
    return new CalculateLimitedPercentageCommand(params.resultReference, params.inputValueReference, params.rateReference, params.ceilingReference);
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

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visitCalculateLimitedPercentageCommand(this);
  }
}
