import * as calc from "../../payrollFunctions/calculationFunctions.js";
import { ArithmeticCommand } from "./arithmaticCommand.js";

/**
 * AddCommand - Represents a command to perform addition.
 * @class
 * @extends ArithmeticCommand
 * @param {result_reference} result_reference - The reference to store the result.
 * @param {...input_reference} input_references - References to the input values.
 */
export class AddCommand extends ArithmeticCommand {
  constructor(result_reference, ...input_references) {
    super(calc.sum, result_reference, ...input_references);
    this.name = "Add";
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {AddCommand}
   */
  static factory(params) {
    return new AddCommand(params.result_reference, ...params.input_references);
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visit_add_command(this);
  }
}

/**
 * SubtractCommand - Represents a command to perform subtraction.
 * @class
 * @extends ArithmeticCommand
 * @param {result_reference} result_reference - The reference to store the result.
 * @param {...input_reference} input_references - References to the input values.
 */
export class SubtractCommand extends ArithmeticCommand {
  constructor(result_reference, ...input_references) {
    super(calc.subtract, result_reference, ...input_references);
    this.name = "Subtract";
  }

    /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {SubtractCommand}
   */
  static factory(params) {
    return new SubtractCommand(params.result_reference, ...params.input_references);
  }

  accept(visitor) {
    visitor.visit_subtract_command(this);
  }
}

/**
 * MultiplyCommand - Represents a command to perform multiplication.
 * @class
 * @extends ArithmeticCommand
 * @param {result_reference} result_reference - The reference to store the result.
 * @param {...input_reference} input_references - References to the input values.
 */
export class MultiplyCommand extends ArithmeticCommand {
  constructor(result_reference, ...input_references) {
    super(calc.multiply, result_reference, ...input_references);
    this.name = "Multiply;";
  }

    /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {MultiplyCommand}
   */
  static factory(params) {
    return new MultiplyCommand(params.result_reference, ...params.input_references);
  }

  accept(visitor) {
    visitor.visit_multiply_command(this);
  }
}

/**
 * DivideCommand - Represents a command to perform division.
 * @class
 * @extends ArithmeticCommand
 * @param {result_reference} result_reference - The reference to store the result.
 * @param {...input_reference} input_references - References to the input values.
 */
export class DivideCommand extends ArithmeticCommand {
  constructor(result_reference, ...input_references) {
    super(calc.divide, result_reference, ...input_references);
    this.name = "Divide";
  }

    /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {AddCommand}
   */
  static factory(params) {
    return new DivideCommand(params.result_reference, ...params.input_references);
  }

  accept(visitor) {
    visitor.visit_divide_command(this);
  }
}

/**
 * AnnualizeCommand - Represents a command to annualize a value.
 * @class
 * @extends ArithmeticCommand
 * @param {result_reference} result_reference - The reference to store the result.
 * @param {input_value_reference} input_value_reference - Reference to the input value.
 * @param {periods_per_annum_reference} periods_per_annum_reference - Reference to periods per annum value.
 */
export class AnnualizeCommand extends ArithmeticCommand {
  constructor(result_reference, input_value_reference, periods_per_annum_reference) {
    super(calc.annualize, result_reference, input_value_reference, periods_per_annum_reference);
    this.name = "Annualize";
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {AnnualizeCommand}
   */
  static factory(params) {
    return new AnnualizeCommand(params.result_reference, params.input_value_reference, params.periods_per_annum_reference);
  }

  get input_value_reference() {
    return this.input_references[0];
  }

  get periods_per_annum_reference() {
    return this.input_references[1];
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visit_annualize_command(this);
  }
}

/**
 * DeAnnualizeCommand - Represents a command to de-annualize a value.
 * @class
 * @extends ArithmeticCommand
 * @param {result_reference} result_reference - The reference to store the result.
 * @param {input_value_reference} input_value_reference - Reference to the input value.
 * @param {Newperiods_per_annum_reference} new_periods_per_annum_reference - Reference to new periods per annum value.
 */
export class DeAnnualizeCommand extends ArithmeticCommand {
  constructor(result_reference, input_value_reference, new_periods_per_annum_reference) {
    super(calc.de_annualize, result_reference, input_value_reference, new_periods_per_annum_reference);
    this.name = "DE-Annualize";
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {DeAnnualizeCommand}
   */
  static factory(params) {
    return new DeAnnualizeCommand(params.result_reference, params.input_value_reference, params.new_periods_per_annum_reference);
  }

  get input_value_reference() {
    return this.input_references[0];
  }

  get periods_per_annum_reference() {
    return this.input_references[1];
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visit_de_annualize_command(this);
  }
}

/**
 * LesserOfCommand - Represents a command to calculate the lesser of the input values.
 * @class
 * @extends ArithmeticCommand
 * @param {result_reference} result_reference - The reference to store the result.
 * @param {...input_reference} input_references - References to the input values.
 */
export class LesserOfCommand extends ArithmeticCommand {
  constructor(result_reference, ...input_references) {
    super(calc.lesserOf, result_reference, ...input_references);
    this.name = "Lesser Of";
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {LesserOfCommand}
   */
  static factory(params) {
    return new LesserOfCommand(params.result_reference, ...params.input_references);
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visit_lesser_of_command(this);
  }
}

/**
 * FlooredDifferenceCommand - Represents a command to calculate the floored difference between the input values.
 * @class
 * @extends ArithmeticCommand
 * @param {string} result_reference - The reference to store the result.
 * @param {string} input_references - References to the input values.
 */
export class FlooredDifferenceCommand extends ArithmeticCommand {
  constructor(result_reference, ...input_references) {
    super(calc.floored_difference, result_reference, ...input_references);
    this.name = "Floored Difference";
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {FlooredDifferenceCommand}
   */
  static factory(params) {
    return new FlooredDifferenceCommand(params.result_reference, ...params.input_references);
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visit_floored_difference_command(this);
  }
}

/**
 * CalculateLimitedTaxationCommand - Represents a command to calculate limited taxation based on inputs.
 * @class
 * @extends ArithmeticCommand
 * @param {string} result_reference - The reference to store the result.
 * @param {string} input_value_reference - Reference to the input value.
 * @param {string} rate_reference - Reference to the tax rate.
 * @param {string} ceiling_reference - Reference to the ceiling value for taxation.
 */
export class CalculateLimitedPercentageCommand extends ArithmeticCommand {
  constructor(result_reference, input_value_reference, rate_reference, ceiling_reference) {
    super(calc.calculate_limited_percentage, result_reference, input_value_reference, rate_reference, ceiling_reference);
    this.name = "Calculate Limited Taxation";
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {CalculateLimitedPercentageCommand}
   */
  static factory(params) {
    return new CalculateLimitedPercentageCommand(params.result_reference, params.input_value_reference, params.rate_reference, params.ceiling_reference);
  }

  get input_value_reference() {
    
    return this.input_references[0];
  }
  get rate_reference() {
    return this.input_references[1];
  }
  get ceiling_reference() {
    return this.input_references[2];
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visit_calculate_limited_percentage_command(this);
  }
}
