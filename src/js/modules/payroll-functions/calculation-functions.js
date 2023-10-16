/**
 * Returns the lesser number between value1 and value2
 * 
 * @param {number} value1 
 * @param {number} value2 
 * @returns {number}
 */
export const lesserOf = (value1, value2) => Math.min(value1, value2);

/**
 * Converts a rate to its corresponding decimal representation.
 *
 * @param {number} rate - The rate to be converted (e.g., 20 for 20%).
 * @returns {number} The decimal representation of the rate (e.g., 0.2 for 20%).
 */
export const makePercentage = (rate) => rate / 100;

/**
 * Calculates the value after applying a percentage.
 *
 * @param {number} value - The original value.
 * @param {number} percentage - The percentage to apply as a decimal (e.g., 0.2 for 20%).
 * @returns {number} The result of applying the percentage to the value.
 */
export const takePercentage = (value, percentage) => value * percentage;

/**
 * Calculates the difference between two values, considering a minimum (floor) value.
 *
 * @param {number} value1 - The first value.
 * @param {number} value2 - The second value to subtract from the first.
 * @param {number} floor - The minimum allowed difference.
 * @returns {number} The difference between the values, but not less than the specified floor.
 */
export const flooredDifference = (value1, value2) => Math.max(value1 - value2, 0);

/**
 * Calculates how much the value will be per year for a given value per period(monthly: 12)
 * 
 * @param {number} value - value of the number to be annualized
 * @param {number} currentPeriodsPerAnnum - number of periods per annum
 * @returns 
 */
export const annualize = (value, currentPeriodsPerAnnum) => value * currentPeriodsPerAnnum;

/**
 * Calculates how much the value will be per period for a given annual value
 * 
 * @param {number} value - annual value to be DE-annualized
 * @param {number} newPeriodsPerAnnum - number of periods per annum
 * @returns 
 */
export const deAnnualize = (value, newPeriodsPerAnnum) =>  value / newPeriodsPerAnnum;

/**
* Adds any number of numerical arguments together.
*
* @param {...number} numbers - The numbers to be added.
* @returns {number} The sum of all provided numbers.
*/
export const sum = (...numbers) => {
    let total = 0;
    for(const num of numbers){
        total += num;
    }
    return total;
};

/**
* Adds any number of numerical arguments together.
* 
* @param {number} initial - The number which will be deducted from
* @param {...number} numbers - The numbers to be deducted from initial
* @returns {number} Return the difference between initial and numbers
*/
export const subtract = (initial, ...numbers) => {
    for(const num of numbers){
        initial -= num;
    }
    return initial;
};


/**
 * Calculates the tax amount based on a given value, tax rate, and a maximum tax ceiling.
 * The tax amount is limited to the ceiling if the calculated tax exceeds it.
 *
 * @param {number} value - The value on which the tax is calculated.
 * @param {number} rate - The tax rate (e.g., 20 for 20% tax rate).
 * @param {number} ceiling - The maximum tax amount that can be applied.
 * @returns {number} The calculated tax amount, limited by the ceiling if applicable.
 */
export const calculateLimitedTaxation = (value, rate, ceiling) => {
    const applicableValue = lesserOf(ceiling, value);
    const percentage = makePercentage(rate);
    const result = takePercentage(applicableValue, percentage);
    return result;
}

/**
 * Calculates a total based on a tiered structure and a custom calculation function.
 * The first tier will be calculated if the inputValue is more than 0
 * for the rest of the tiers, the calculation will be done if the inputValue is more or equal to the maximum of the previous tier
 * 
 * @param {Array<{max: number, value: number}>} tiers - An array of tier objects.
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @param {number} inputValue - The input value to use in the calculations.
 * @param {function(number, {max: number, value: number}, {max: number, value: number}, number)} calculationFunction 
 * - The function to be called on to the input value with the specified tier input
 * Parameters: total, currentTier, minValue, inputValue
 * @returns {number} - The calculated total based on the tiered structure and the input value.
 */
export const calculateFromTieredStructure = (tiers, inputValue, calculationFunction) => {
    let total = 0;
    let priorMax = 0;

    for(const tier of tiers){
        if (inputValue >= priorMax) {
            total = calculationFunction(total, tier, priorMax, inputValue);
        }
        priorMax = tier.max;
    }
    return total;
};

/**
 * Example calculation function to add the value from the current tier to the total.
 * 
 * @param {number} total - The current total.
 * @param {{max: number, value: number}} tier
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @returns {number} - The updated total by adding the value from the current tier.
 */
export const calculateAddedTotalByCurrentTier = (total, currentTier) => {
    return sum(total, currentTier.value);
};

/**
 * Calculate the added total based on tiers for a given value to compare.
 * 
 * @param {{max: number, value: number}[]} tiers - An array of tier objects, each containing max and value.
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @param {number} valueToCompare - The value to compare against the tiers.
 * @returns {number} - The calculated total based on the provided tiers and value to compare.
 */
export const calculateAddedTotalByTiers = (tiers, valueToCompare) => {
    const result = calculateFromTieredStructure(tiers, valueToCompare, calculateAddedTotalByCurrentTier);
    return result;
}

/**
 * Example calculation function to calculate tax total based on the current tier.
 * 
 * @param {number} total - The current total.
 * @param {{max: number, value: number}} currentTier
 *      max: The maximum value for the current tier |
 *      value: The tax rate for the current tier.
 * @param {number} minValue - The minimum value for the current tier.
 * @param {number} inputValue - The input value for the calculation.
 * @returns {number} - The updated total based on the current tier calculation.
 */
export const calculateTaxByCurrentTier = (total, currentTier, minValue, inputValue) => {
    const { max, rate } = currentTier;    
    const amountLeftToTax = flooredDifference(inputValue, minValue);
    const maxTaxableAmount = max !== Infinity ? subtract(max, minValue) : amountLeftToTax;
    const taxFromCurrentBracket = calculateLimitedTaxation(amountLeftToTax, rate, maxTaxableAmount);
    return sum(total, taxFromCurrentBracket);
};

/**
 * Example function to calculate the total tax based on tiers for a given income.
 * 
 * @param {{max: number, value: number}[]} taxBrackets - An array of tax brackets |
 *      max: The maximum value for the current tier |
 *      value: The tax rate for the current tier.
 * @param {number} income - The income to calculate tax for.
 * @returns {number} - The total tax based on the provided tax brackets and income.
 */
export const calculateTotalTaxByTiers = (taxBrackets, income) => {
    const taxResult = calculateFromTieredStructure(taxBrackets, income, calculateTaxByCurrentTier);
    return taxResult;
}