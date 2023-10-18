import { taxRebatesBrackets, taxBrackets, uifOptions } from '../config/south-african-tax-properties.js';
import * as calc from './calculation-functions.js';
import * as cmd from '../commands/payroll-commands.js';

/**
 * Calculates the PAYE after deductions, the UIF for the period and Net Salary for the period
 * 
 * @param {number} employeeAge - Age of the employee
 * @param {number} grossSalary - Employee gross salary
 * @param {number} periodsPerAnnum - Amount of periods within a year such as 52 weeks per year
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
export const calculateTaxData = (employeeAge, grossSalary, periodsPerAnnum) => {
    let values = {
        employeeAge, 
        grossSalary, 
        periodsPerAnnum,
        uifRate: uifOptions.rate,
        uifCeiling: uifOptions.ceiling,
        taxRebatesBrackets,
        taxBrackets,
    };
    
    const commands = [
        new cmd.AnnualizeCommand('annualIncome', 'grossSalary', 'periodsPerAnnum'),
        new cmd.DeAnnualizeByFixedPeriodsCommand('monthlyIncome', 'annualIncome', 12),
        new cmd.CalculateLimitedTaxationCommand('monthlyUif', 'monthlyIncome', 'uifRate', 'uifCeiling'),
        new cmd.AnnualizeByFixedPeriodsCommand('annualUif', 'monthlyUif', 12),
        new cmd.DeAnnualizeCommand('deAnnualizedUif', 'annualUif', 'periodsPerAnnum'),
        new cmd.CalculateAddedTotalByTiersCommand('annualTaxRebates', 'taxRebatesBrackets', 'employeeAge'),
        new cmd.CalculateTaxByTiersCommand('annualGrossPaye', 'taxBrackets', 'annualIncome'),
        new cmd.FlooredDifferenceCommand('annualNetPaye', 'annualGrossPaye', 'annualTaxRebates'),
        new cmd.DeAnnualizeCommand('deAnnualizedNetPaye', 'annualNetPaye', 'periodsPerAnnum'),
        new cmd.SubtractCommand('netSalary', 'grossSalary', 'deAnnualizedUif', 'deAnnualizedNetPaye'),
      ];
    
    for(const command of commands){
        values = command.execute(values);
    }
    console.log('values', values)
    
    // const annualIncome = calc.annualize(grossSalary, periodsPerAnnum);

    // //Calculate UIF
    // const monthlyIncome = calc.deAnnualize(annualIncome, 12);    
    // const monthlyUIF = calc.calculateLimitedTaxation(monthlyIncome, uifOptions.rate, uifOptions.ceiling);    
    // const annualUIF = calc.annualize(monthlyUIF, 12);
    // const deAnnualizedUIF = calc.deAnnualize(annualUIF, periodsPerAnnum);
    

    // //Calculate Tax Rebates
    // const taxRebates = calc.calculateAddedTotalByTiers(taxRebatesBrackets, employeeAge);

    // //Calculate PAYE
    // const annualGrossPaye = calc.calculateTotalTaxByTiers(taxBrackets, annualIncome);
    // const annualNetPaye = calc.flooredDifference(annualGrossPaye, taxRebates);
    // const deAnnualizedPaye = calc.deAnnualize(annualNetPaye, periodsPerAnnum);

    // //Calculate salary after deducting Tax Rebates and PAYE
    // const netSalary = calc.subtract(grossSalary, deAnnualizedUIF, deAnnualizedPaye);

    return {
        deAnnualizedPaye: values.deAnnualizedNetPaye,
        deAnnualizedUIF: values.deAnnualizedUif,
        netSalary: values.netSalary
    };
};