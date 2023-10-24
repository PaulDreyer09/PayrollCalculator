import { taxRebatesBrackets, taxBrackets, uifOptions, inputList, outputList } from '../config/south-african-tax-properties.js';
import * as generalCommands from '../commands/commands.js';
import * as arithmaticCommands from '../commands/arithmatic-commands.js';
import * as ioCommands from '../commands/io-setup-commands.js';



const commands = [
    new ioCommands.IOSetupCommand('requiredInput', {
        elementType: 'input',
        dataType: 'number',
        elementAttributes: {
            name: 'otter',
            type: 'number',
            value: 0,
            min: 0           
        },
        labelText: 'Otter'
    }),
    new ioCommands.IOSetupCommand('requiredInput', {
        elementType: 'input',
        dataType: 'number',
        elementAttributes: {
            name: 'employeeAge',
            type: 'number',
            value: 0,
            min: 0
        },
        labelText: 'Age',
    }),
    new ioCommands.IOSetupCommand('requiredInput', {
        elementType: 'input',
        dataType: 'number',
        elementAttributes: {
            name: 'grossSalary',
            type: 'number',
            value: 0,
            min: 0
        },
        labelText: 'Salary',
    }),
    new ioCommands.IOSetupCommand('requiredInput', {
        elementType: 'select',
        dataType: 'number',
        elementAttributes: {
            name: 'periodsPerAnnum',
        },
        labelText: 'Period',
        options: [
            {
                text: "Weekly",
                value: 52
            },
            {
                text: "Every 2 Weeks",
                value: 26
            },
            {
                text: "Monthly",
                value: 12
            },
            {
                text: "Yearly",
                value: 1
            }
        ]
    }),
    new ioCommands.IOSetupCommand('expectedOutput', {
        name: 'deAnnualizedNetPaye',
        labelText: 'PAYE',
    }),
    new ioCommands.IOSetupCommand('expectedOutput', {
        name: 'deAnnualizedUif',
        labelText: 'UIF',
    }),
    new ioCommands.IOSetupCommand('expectedOutput', {
        name: 'netSalary',
        labelText: 'Net Salary',
    }),
    new generalCommands.SetValueCommand('monthsPerYear', 12),
    new generalCommands.SetValuesCommand('uif', uifOptions),
    new generalCommands.SetValueCommand('taxRebatesBrackets', taxRebatesBrackets),
    new generalCommands.SetValueCommand('taxBrackets', taxBrackets),
    new arithmaticCommands.AnnualizeCommand('annualIncome', 'grossSalary', 'periodsPerAnnum'),
    new arithmaticCommands.DeAnnualizeCommand('monthlyIncome', 'annualIncome', 'monthsPerYear'),
    new arithmaticCommands.CalculateLimitedTaxationCommand('monthlyUif', 'monthlyIncome', 'uifRate', 'uifCeiling'),
    new arithmaticCommands.AnnualizeCommand('annualUif', 'monthlyUif', 'monthsPerYear'),
    new arithmaticCommands.DeAnnualizeCommand('deAnnualizedUif', 'annualUif', 'periodsPerAnnum'),
    new arithmaticCommands.CalculateAddedTotalByTiersCommand('annualTaxRebates', 'taxRebatesBrackets', 'employeeAge'),
    new arithmaticCommands.CalculateTaxByTiersCommand('annualGrossPaye', 'taxBrackets', 'annualIncome'),
    new arithmaticCommands.FlooredDifferenceCommand('annualNetPaye', 'annualGrossPaye', 'annualTaxRebates'),
    new arithmaticCommands.DeAnnualizeCommand('deAnnualizedNetPaye', 'annualNetPaye', 'periodsPerAnnum'),
    new arithmaticCommands.SubtractCommand('netSalary', 'grossSalary', 'deAnnualizedUif', 'deAnnualizedNetPaye'),
];

export const addInputData = (inputData) => {    
    const inputCommand = new generalCommands.SetValueCommand(inputData.name, inputData.value);
    commands.unshift(inputCommand);
}

export const executeIOCommands = (dataSheet) => {
    for (const command of commands) {        
        if (command instanceof ioCommands.IOSetupCommand)
            dataSheet = command.execute(dataSheet);
    }
}

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
export const executeCalculationCommands = (dataSheet) => {
    for (const command of commands) {
        if (command instanceof ioCommands.IOSetupCommand)
            continue;
        dataSheet = command.execute(dataSheet);
    }

    return dataSheet;
};

