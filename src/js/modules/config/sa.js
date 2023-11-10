import { taxRebatesBrackets, taxBrackets, uifOptions } from './south-african-tax-properties.js';
import Commands from '../commands/index.js';
import * as generalCommands from '../commands/command.js';
import * as arithmaticCommands from '../commands/arithmatic-commands.js';
import * as ioDefinitionCommands from '../commands/io-definition-command.js';


export const getCommands = () => {
    return new Commands.CommandList(
        new Commands.CommandList(
            new Commands.DefineInputCommand('employeeAge', 'Age', 'number', 'value', { min: 0 }),
            new Commands.DefineInputCommand('grossSalary', 'Salary', 'number', 'value', { min: 0, })
        ),

        new Commands.DefineInputCommand('periodsPerAnnum', 'Periods', 'number', 'list', {
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
        new Commands.SetValuesCommand('uif', uifOptions),

        new Commands.SetTableCommand('taxRebatesBrackets', taxRebatesBrackets),
        new Commands.SetTableCommand('taxBrackets', taxBrackets),

        new Commands.ArithmaticCommands.AnnualizeCommand('annualIncome', 'grossSalary', 'periodsPerAnnum'),
        new Commands.ArithmaticCommands.DeAnnualizeCommand('monthlyIncome', 'annualIncome', 'monthsPerYear'),
        new Commands.ArithmaticCommands.CalculateLimitedPercentageCommand('monthlyUif', 'monthlyIncome', 'uifRate', 'uifCeiling'),
        new Commands.ArithmaticCommands.AnnualizeCommand('annualUif', 'monthlyUif', 'monthsPerYear'),
        new Commands.ArithmaticCommands.DeAnnualizeCommand('deAnnualizedUif', 'annualUif', 'periodsPerAnnum'),
        new Commands.ArithmaticCommands.CalculateAddedTotalByTiersCommand('annualTaxRebates', 'taxRebatesBrackets', 'employeeAge'),
        new Commands.ArithmaticCommands.CalculateTaxByTiersCommand('annualGrossPaye', 'taxBrackets', 'annualIncome'),
        new Commands.ArithmaticCommands.FlooredDifferenceCommand('annualNetPaye', 'annualGrossPaye', 'annualTaxRebates'),
        new Commands.ArithmaticCommands.DeAnnualizeCommand('deAnnualizedNetPaye', 'annualNetPaye', 'periodsPerAnnum'),
        new Commands.ArithmaticCommands.SubtractCommand('netSalary', 'grossSalary', 'deAnnualizedUif', 'deAnnualizedNetPaye'),

        new Commands.DefineOutputCommand('deAnnualizedNetPaye', 'PAYE', 'number', 'value',),
        new Commands.DefineOutputCommand('deAnnualizedUif', 'UIF', 'number', 'value'),
        new Commands.DefineOutputCommand('netSalary', 'Net Salary', 'number', 'value',),
    );
}

// export const getCommands = () => {
//     const command = new Commands.CommandList();

//     command.addSubCommand(new Commands.DefineInputCommand('employeeAge', 'Age', 'number', 'value', { min: 0 }));
//     command.addSubCommand(new Commands.DefineInputCommand('grossSalary', 'Salary', 'number', 'value', { min: 0 }));
//     command.addSubCommand(new Commands.DefineInputCommand('periodsPerAnnum', 'Periods', 'number', 'list', {
//         options: [
//             {
//                 text: "Weekly",
//                 value: 52
//             },
//             {
//                 text: "Every 2 Weeks",
//                 value: 26
//             },
//             {
//                 text: "Monthly",
//                 value: 12
//             },
//             {
//                 text: "Yearly",
//                 value: 1
//             }
//         ]
//     }));
//     command.addSubCommand(new Commands.SetValueCommand('monthsPerYear', 12));
//     command.addSubCommand(new Commands.SetValuesCommand('uif', uifOptions));
//     command.addSubCommand(new Commands.SetTableCommand('taxRebatesBrackets', taxRebatesBrackets));
//     command.addSubCommand(new Commands.SetTableCommand('taxBrackets', taxBrackets));

//     command.addSubCommand(new Commands.ArithmaticCommands.AnnualizeCommand('annualIncome', 'grossSalary', 'periodsPerAnnum'));
//     command.addSubCommand(new Commands.ArithmaticCommands.DeAnnualizeCommand('monthlyIncome', 'annualIncome', 'monthsPerYear'));
//     command.addSubCommand(new Commands.ArithmaticCommands.CalculateLimitedPercentageCommand('monthlyUif', 'monthlyIncome', 'uifRate', 'uifCeiling'));
//     command.addSubCommand(new Commands.ArithmaticCommands.AnnualizeCommand('annualUif', 'monthlyUif', 'monthsPerYear'));
//     command.addSubCommand(new Commands.ArithmaticCommands.DeAnnualizeCommand('deAnnualizedUif', 'annualUif', 'periodsPerAnnum'));
//     command.addSubCommand(new Commands.ArithmaticCommands.CalculateAddedTotalByTiersCommand('annualTaxRebates', 'taxRebatesBrackets', 'employeeAge'));
//     command.addSubCommand(new Commands.ArithmaticCommands.CalculateTaxByTiersCommand('annualGrossPaye', 'taxBrackets', 'annualIncome'));
//     command.addSubCommand(new Commands.ArithmaticCommands.FlooredDifferenceCommand('annualNetPaye', 'annualGrossPaye', 'annualTaxRebates'));
//     command.addSubCommand(new Commands.ArithmaticCommands.DeAnnualizeCommand('deAnnualizedNetPaye', 'annualNetPaye', 'periodsPerAnnum'));
//     command.addSubCommand(new Commands.ArithmaticCommands.SubtractCommand('netSalary', 'grossSalary', 'deAnnualizedUif', 'deAnnualizedNetPaye'));

//     command.addSubCommand(new Commands.DefineOutputCommand('deAnnualizedNetPaye', 'PAYE', 'number', 'value'));
//     command.addSubCommand(new Commands.DefineOutputCommand('deAnnualizedUif', 'UIF', 'number', 'value'));
//     command.addSubCommand(new Commands.DefineOutputCommand('netSalary', 'Net Salary', 'number', 'value'));

//     return command;
// }