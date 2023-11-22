import * as calc from "../../../payrollFunctions/calculationFunctions.js";
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

  get input_value_reference() {
    return this.input_references[0];
  }

  get periods_per_annum_reference() {
    return this.input_references[1];
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

  get input_value_reference() {
    return this.input_references[0];
  }

  get periods_per_annum_reference() {
    return this.input_references[1];
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

  get input_value_reference() {    
    return this.input_references[0];
  }
  get rate_reference() {
    return this.input_references[1];
  }
  get ceiling_reference() {
    return this.input_references[2];
  }
}

export const register_classes_to_factory = (factory) => {
  const class_list = [
    AddCommand,
    SubtractCommand,
    MultiplyCommand,
    DivideCommand,
    AnnualizeCommand,
    DeAnnualizeCommand,
    LesserOfCommand,
    FlooredDifferenceCommand,
    CalculateLimitedPercentageCommand,
  ]
  
  for(const class_constructor of class_list){
    factory.register_class(class_constructor);
  }
}
