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