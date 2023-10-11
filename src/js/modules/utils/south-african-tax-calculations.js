import { calculateFromTieredStructure } from './abstract-calculations.js';
import { taxRebatesBrackets, taxBrackets, uifOptions } from '../config/south-african-tax-properties.js'
import { annualize, deAnnualize } from './helper-functions.js';

/**
 * Example calculation function to add the value from the current tier to the total.
 * 
 * @param {number} total - The current total.
 * @param {{max: number, value: number}} tier
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @returns {number} - The updated total by adding the value from the current tier.
 */
const calculateAddedTotal = (total, tier) => {
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
const calculateTaxTotal = (total, currentTier, minValue, inputValue) => {
    const { max, rate } = currentTier;

    const amountLeftToTax = Math.max(inputValue - minValue, 0);
    const maxTaxableAmount = max !== Infinity ? max - minValue : amountLeftToTax;
    const currentTaxableAmount = Math.min(maxTaxableAmount, amountLeftToTax);

    const taxFromCurrentBracket = currentTaxableAmount * rate / 100;
    total += taxFromCurrentBracket;

    return total;
};

/**
 * Calculates salary after deducting UIF and PAYE
 * 
 * @param {number} grossSalary - value of Annual or DE-annualized gross salary
 * @param {number} uif - uif value of the same periods per annum as grossSalary
 * @param {number} paye - PAYE value of the same periods per annum as grossSalary
 * @returns 
 */
const calculateNetSalary = (grossSalary, uif, paye) => grossSalary - uif - paye;

/**
 * Calculates the gross annual PAYE for a given annual income and tax rebates
 * 
 * @param {number} annualIncome calculated annual income value
 * @param {number} annualTaxRebates calculated annual tax rebates to deduct from tax
 * @returns {number} - Annual PAYE after deductions
 */
const calculateAnnualPAYE = (annualIncome, annualTaxRebates) => {
    const rawPaye = calculateFromTieredStructure(taxBrackets, annualIncome, calculateTaxTotal);
    return Math.max(rawPaye - annualTaxRebates, 0);
}

/**
 * Calculates the annual payable UIF based on an annual salary
 * 
 * @param {number} annualIncome - value of annual income
 * @param {{percentage: number, ceiling: number}[]} options - options for calculating the UIF
 *      percentage: Percentage of the total income which will be calculated as UIF
 *      ceiling: Maximum value which can be calculated from monthly income to UIF
 */
const calculateAnnualUIF = (annualIncome, uifOptions) => {
    const { percentage, ceiling } = uifOptions;
    const monthlyIncome = annualIncome / 12;
    const monthlyUIF = (Math.min(ceiling, monthlyIncome) * percentage / 100)
    const result = monthlyUIF * 12;

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
export const calculateTaxData = (employeeAge, grossSalary, periods) => {
    const annualIncome = annualize(grossSalary, periods);

    //Calculate UIF
    const annualUIF = calculateAnnualUIF(annualIncome, uifOptions);
    const deAnnualizedUIF = deAnnualize(annualUIF, periods);

    //Calculate Tax Rebates
    const taxRebates = calculateFromTieredStructure(taxRebatesBrackets, employeeAge, calculateAddedTotal);

    //Calculate PAYE
    const annualPaye = calculateAnnualPAYE(annualIncome, taxRebates);
    const deAnnualizedPaye = deAnnualize(annualPaye, periods);

    //Calculate salary after deducting Tax Rebates and PAYE
    const netSalary = calculateNetSalary(grossSalary, deAnnualizedUIF, deAnnualizedPaye);

    const results = {
        deAnnualizedPaye,
        deAnnualizedUIF,
        netSalary
    }

    return results;
}