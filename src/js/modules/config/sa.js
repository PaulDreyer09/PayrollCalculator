import { taxRebatesBrackets, taxBrackets, uifOptions } from './south-african-tax-properties.js';
import * as Commands from '../commands/index.js';



export const getCommands = () => {
    return new Commands.CommandList(
        'South African Tax Calculation',
        new Commands.IODefinitionCommandTypes.DefineInputCommand('employeeAge', 'Age', 'number', 'value', { min: 0 }),
        new Commands.IODefinitionCommandTypes.DefineInputCommand('grossSalary', 'Salary', 'number', 'value', { min: 0, }),
        new Commands.IODefinitionCommandTypes.DefineInputCommand('periodsPerAnnum', 'Periods', 'number', 'list', {
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

        new Commands.SetValueCommand('monthsPerYear', 12),
        new Commands.SetValueCollectionCommand('uif', uifOptions),

        new Commands.SetTableCommand('taxRebatesBrackets', taxRebatesBrackets),
        new Commands.SetTableCommand('taxBrackets', taxBrackets),

        new Commands.ArithmaticCommandTypes.AnnualizeCommand('annualIncome', 'grossSalary', 'periodsPerAnnum'),
        new Commands.ArithmaticCommandTypes.DeAnnualizeCommand('monthlyIncome', 'annualIncome', 'monthsPerYear'),
        new Commands.ArithmaticCommandTypes.CalculateLimitedPercentageCommand('monthlyUif', 'monthlyIncome', 'uifRate', 'uifCeiling'),
        new Commands.ArithmaticCommandTypes.AnnualizeCommand('annualUif', 'monthlyUif', 'monthsPerYear'),
        new Commands.ArithmaticCommandTypes.DeAnnualizeCommand('deAnnualizedUif', 'annualUif', 'periodsPerAnnum'),
        new Commands.TabledCalculationCommandTypes.CalculateAddedTotalByTiersCommand('annualTaxRebates', 'taxRebatesBrackets', 'employeeAge'),
        new Commands.TabledCalculationCommandTypes.CalculateTaxByTiersCommand('annualGrossPaye', 'taxBrackets', 'annualIncome'),
        new Commands.ArithmaticCommandTypes.FlooredDifferenceCommand('annualNetPaye', 'annualGrossPaye', 'annualTaxRebates'),
        new Commands.ArithmaticCommandTypes.DeAnnualizeCommand('deAnnualizedNetPaye', 'annualNetPaye', 'periodsPerAnnum'),
        new Commands.ArithmaticCommandTypes.SubtractCommand('netSalary', 'grossSalary', 'deAnnualizedUif', 'deAnnualizedNetPaye'),

        new Commands.IODefinitionCommandTypes.DefineOutputCommand('deAnnualizedNetPaye', 'PAYE', 'number', 'value',),
        new Commands.IODefinitionCommandTypes.DefineOutputCommand('deAnnualizedUif', 'UIF', 'number', 'value'),
        new Commands.IODefinitionCommandTypes.DefineOutputCommand('netSalary', 'Net Salary', 'number', 'value',),
    );
}