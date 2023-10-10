import { calculateFromTieredStructure } from './abstract-calculations.js';


/**
 * Example calculation function to add the value from the current tier to the total.
 * 
 * @param {number} total - The current total.
 * @param {{max: number, value: number}} tier
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @returns {number} - The updated total by adding the value from the current tier.
 */
export const calculateAddedTotal = (total, tier) => {
    return total + tier.value;
};

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
export const calculateTaxTotal = (total, currentTier, minValue, inputValue) => {
    const { max, rate } = currentTier;

    let amountLeftToTax = Math.max(inputValue - minValue, 0);
    let maxTaxableAmount = max !== Infinity ? max - minValue : amountLeftToTax;
    let currentTaxableAmount = Math.min(maxTaxableAmount, amountLeftToTax);

    let taxFromCurrentBracket = currentTaxableAmount * rate / 100;
    total += taxFromCurrentBracket;

    return total;
};

/**
 * Calculates the monthly payable UIF based on a monthly salary
 * 
 * @param {number} monthlyIncome - value of monthly income
 * @param {{percentage: number, ceiling: number}[]} options - options for calculating the UIF
 *      percentage: Percentage of the total income which will be calculated as UIF
 *      ceiling: Maximum value which can be calculated from monthlyIncome to UIF
 */
export const calculateMonthlyUIF = (monthlyIncome, options) => {
    const { percentage, ceiling } = options;

    let result = (Math.min(ceiling, monthlyIncome) * percentage / 100);

    return result;
}

/**
 * Calculates the PAYE after deductions, the UIF for the period and Net Salary for the period
 * 
 * @param {number} employeeAge - Age of the employee
 * @param {number} grossSalary - Employee gross salary
 * @param {number} periods - Amount of periods within a year such as 52 weeks per year
 * @param {{max: number, value: number}[]} taxBrackets
 *      max: The maximum value for the current tier |
 *      value: The tax rate for the current tier.
 * @param {{max: number, value: number}[]} taxRebatesBrackets
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @param {{percentage: number, ceiling: number}[]} uifOptions
 *      percentage: Percentage of the total income which will be calculated as UIF
 *      ceiling: Maximum value which can be calculated from monthlyIncome to UIF
 * @returns {{paye: number, uif: number, netSalary: number}}
 *      paye: PAYE after deducting tax rebates |
 *      uif: UIF for the period | 
 *      netSalary: Salary after deductions for the period 
 */
export const calculateTaxData = (employeeAge, grossSalary, periods, taxBrackets, taxRebatesBrackets, uifOptions) => {
    //Single function calling globals
    //Deanualize and annualize into modules
    // Calculate annual income
    const annualIncome = grossSalary * periods;

    // Calculate DE-Annualized UIF
    const monthlyIncome = annualIncome / 12;
    const monthlyUIF = calculateMonthlyUIF(monthlyIncome, uifOptions);
    const deAnnualizedUIF = monthlyUIF * 12 / periods;

    // Calculate Tax Rebates
    
    const taxRebates = calculateFromTieredStructure(taxRebatesBrackets, employeeAge, calculateAddedTotal);

    // Calculate PAYE
    const rawPaye = calculateFromTieredStructure(taxBrackets, annualIncome, calculateTaxTotal);

    // Change
    const annualPaye = rawPaye > taxRebates ? rawPaye - taxRebates : 0;
    const deAnnualizedPaye = annualPaye / periods;

    // Calculate Net Salary
    const netSalary = grossSalary - deAnnualizedUIF - deAnnualizedPaye;

    const results = {
        //name changes*
        deAnnualizedPaye,
        deAnnualizedUIF,
        netSalary
    }

    return results;
}