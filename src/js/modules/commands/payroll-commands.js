import * as calc from '../payroll-functions/calculation-functions.js';
import * as validation from '../utils/validation.js'

/**
 * Validates if a specific key is present in the values object.
 * @param {Object} values - The object to search for the key.
 * @param {string} name - The key to search for in the values object.
 * @throws {Error} Throws an error if the key is not found.
 * @returns {any} The value associated with the provided key.
 */
const isKnown = (values, name) => {
    const found = values[name];
    if (found == undefined) {
        throw new Error(`${name} was not found`);
    }
    return found;
}

/**
 * Validates if a specific key is present in the values object and is a valid number.
 * @param {Object} values - The object to search for the key and validate the associated value.
 * @param {string} name - The key to search for in the values object.
 * @throws {Error} Throws an error if the key is not found or if the associated value is not a valid number.
 * @returns {number} The validated number associated with the provided key.
 */
const isKnownValidNumber = (values, name) => {
    const found = isKnown(values, name);
    try {
        return validation.validNumber(found);
    } catch {
        throw new Error(`${name} has non numeric value`);
    }
}

/**
 * Sets a value for a key in the values object if the key is not already defined.
 * @param {Object} values - The object to set the key-value pair.
 * @param {string} name - The key to set the value for.
 * @param {any} value - The value to set for the key.
 * @throws {Error} Throws an error if the key is already defined.
 * @returns {Object} The values object with the updated key-value pair.
 */
const setUndefined = (values, name, value) => {
    if (name in values) {
        throw new Error(`${name} is already defined. Attempted to set ${name} as ${value}`);
    }
    values[name] = value;
    return values;
}

/**
 * @class
 * @param {Function} func - The arithmetic function to be executed.
 * @param {number} resultReference - Reference to the result position in the values array.
 * @param {...number} inputReferences - References to the operands' positions in the values array.
 */
export class ArithmeticCommand {
    constructor(func, resultReference, ...inputReferences) {
        this.inputReferences = [...inputReferences];
        this.resultReference = resultReference;
        this.func = func;
    }

    execute(values) {
        const inputValues = []
        for (const reference of this.inputReferences) {
            inputValues.push(isKnownValidNumber(values, reference));
        }

        const result = this.func(...inputValues);
        return setUndefined(values, this.resultReference, result);
    }
}

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
        this.name = 'Add';
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
        this.name = 'Subtract';
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
        this.name = 'Multiply;'
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
        this.name = 'Annualize';
    }
}

/**
 * AnnualizeByFixedPeriodsCommand - Represents a command to annualize a value by a fixed number of periods per annum.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {InputValueReference} inputValueReference - Reference to the input value.
 * @param {number} periodsPerAnnum - The fixed number of periods per annum.
 */
export class AnnualizeByFixedPeriodsCommand extends ArithmeticCommand {
    constructor(resultReference, inputValueReference, periodsPerAnnum) {
        super((value) => calc.annualize(value, periodsPerAnnum), resultReference, inputValueReference);
        this.name = `Annualize(${periodsPerAnnum})`;
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
        this.name = 'DE-Annualize';
    }
}

/**
 * DeAnnualizeByFixedPeriodsCommand - Represents a command to de-annualize a value by a fixed number of periods per annum.
 * @class
 * @extends ArithmeticCommand
 * @param {ResultReference} resultReference - The reference to store the result.
 * @param {InputValueReference} inputValueReference - Reference to the input value.
 * @param {number} periodsPerAnnum - The fixed number of periods per annum.
 */
export class DeAnnualizeByFixedPeriodsCommand extends ArithmeticCommand {
    constructor(resultReference, inputValueReference, periodsPerAnnum) {
        super((value) => calc.deAnnualize(value, periodsPerAnnum), resultReference, inputValueReference);
        this.name = `DE-Annualize(${periodsPerAnnum})`;
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
        this.name = 'Lesser Of';
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
    constructor(resultReference, ...inputReferences){
        super(calc.flooredDifference, resultReference, ...inputReferences);
        this.name = 'Floored Difference';
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
export class CalculateLimitedTaxationCommand extends ArithmeticCommand {
    constructor(resultReference, inputValueReference, rateReference, ceilingReference) {
        super(calc.calculateLimitedTaxation, resultReference, inputValueReference, rateReference, ceilingReference);
        this.name = 'Calculate Limited Taxation';
    }
}

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
    execute(values) {
        const inputValues = [];
        const table = isKnown(values, this.tableReference);
        for (const reference of this.inputReferences) {
            inputValues.push(isKnownValidNumber(values, reference));
        }
        const result = this.func(table, ...inputValues);
        return setUndefined(values, this.resultReference, result);
    }
}

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
        this.name = 'Calculate Added Total By Tiers';
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
        this.name = 'Calculate Tax Total By Tiers';
    }
}
