import { taxRebatesBrackets, taxBrackets, uifOptions } from "./south-african-tax-properties.js";

export const hardCodedJSON = {
  typeName: "CommandList",
  params: {
    listName: "South African Tax Calculation",
    children: [
      {
        typeName: "CommandList",
        params: {
          listName: "Define Input Commands",
          children: [
            {
              typeName: "DefineInputCommand",
              params: {
                reference: "employeeAge",
                text: "Age",
                dataType: "number",
                validationType: "value",
                properties: { min: 0 },
              },
            },
            {
              typeName: "DefineInputCommand",
              params: {
                reference: "grossSalary",
                text: "Salary",
                dataType: "number",
                validationType: "value",
                properties: { min: 0 },
              },
            },
            {
              typeName: "DefineInputCommand",
              params: {
                reference: "periodsPerAnnum",
                text: "Periods",
                dataType: "number",
                validationType: "list",
                properties: {
                  options: [
                    {
                      text: "Weekly",
                      value: 52,
                    },
                    {
                      text: "Every 2 Weeks",
                      value: 26,
                    },
                    {
                      text: "Monthly",
                      value: 12,
                    },
                    {
                      text: "Yearly",
                      value: 1,
                    },
                  ],
                },
              },
            },
          ],
        },
      },

      {
        typeName: "CommandList",
        params: {
          listName: "Set Constant Commands",
          children: [
            {
              typeName: "SetValueCommand",
              params: {
                inputReference: "monthsPerYear",
                inputValue: 12,
              },
            },
            {
              typeName: "SetValueCollectionCommand",
              params: {
                referencePrefix: "uif",
                input_data_file_name: uifOptions,  //Reference JSON file to load data from
              },
            },
            {
              typeName: "SetTableCommand",
              params: {
                inputReference: "taxRebatesBrackets",
                input_data_file_name: taxRebatesBrackets,
              },
            },
            {
              typeName: "SetTableCommand",
              params: {
                inputReference: "taxBrackets",
                input_data_file_name: taxBrackets,
              },
            },
          ],
        },
      },

      {
        typeName: "CommandList",
        params: {
          listName: "Calculation Commands",
          children: [
            {
              typeName: "AnnualizeCommand",
              params: {
                resultReference: "annualIncome",
                inputValueReference: "grossSalary",
                periodsPerAnnumReference: "periodsPerAnnum",
              },
            },
            {
              typeName: "DeAnnualizeCommand",
              params: {
                resultReference: "monthlyIncome",
                inputValueReference: "annualIncome",
                newPeriodsPerAnnumReference: "monthsPerYear",
              },
            },
            {
              typeName: "CalculateLimitedPercentageCommand",
              params: {
                resultReference: "monthlyUif",
                inputValueReference: "monthlyIncome",
                rateReference: "uifRate",
                ceilingReference: "uifCeiling",
              },
            },
            {
              typeName: "AnnualizeCommand",
              params: {
                resultReference: "annualUif",
                inputValueReference: "monthlyUif",
                periodsPerAnnumReference: "monthsPerYear",
              },
            },
            {
              typeName: "DeAnnualizeCommand",
              params: {
                resultReference: "deAnnualizedUif",
                inputValueReference: "annualUif",
                newPeriodsPerAnnumReference: "periodsPerAnnum",
              },
            },
            {
              typeName: "CalculateAddedTotalByTiersCommand",
              params: {
                resultsReference: "annualTaxRebates",
                tableReference: "taxRebatesBrackets",
                inputValueReference: "employeeAge",
              },
            },
            {
              typeName: "CalculateTaxByTiersCommand",
              params: {
                resultsReference: "annualGrossPaye",
                tableReference: "taxBrackets",
                inputValueReference: "annualIncome",
              },
            },
            {
              typeName: "FlooredDifferenceCommand",
              params: {
                resultReference: "annualNetPaye",
                inputReferences: ["annualGrossPaye", "annualTaxRebates"],
              },
            },
            {
              typeName: "DeAnnualizeCommand",
              params: {
                resultReference: "deAnnualizedNetPaye",
                inputValueReference: "annualNetPaye",
                newPeriodsPerAnnumReference: "periodsPerAnnum",
              },
            },
            {
              typeName: "SubtractCommand",
              params: {
                resultReference: "netSalary",
                inputReferences: ["grossSalary", "deAnnualizedUif", "deAnnualizedNetPaye"],
              },
            },
          ],
        },
      },
      {
        typeName: "CommandList",
        params: {
          listName: "Output Definitions",
          children: [
            {
              typeName: "DefineOutputCommand",
              params: {
                reference: "deAnnualizedNetPaye",
                text: "PAYE",
                dataType: "number",
                validationType: "value",
              },
            },

            {
              typeName: "DefineOutputCommand",
              params: {
                reference: "deAnnualizedUif",
                text: "UIF",
                dataType: "number",
                validationType: "value",
              },
            },

            {
              typeName: "DefineOutputCommand",
              params: {
                reference: "netSalary",
                text: "Net Salary",
                dataType: "number",
                validationType: "value",
              },
            },
          ],
        },
      },
    ],
  },
};

// export const getCommands = () => {
//   return new Commands.CommandList(
//     "South African Tax Calculation",
//     new Commands.CommandList(
//       "Input Definitions",
//       new Commands.IODefinitionCommandTypes.DefineInputCommand("employeeAge", "Age", "number", "value", { min: 0 }),
//       new Commands.IODefinitionCommandTypes.DefineInputCommand("grossSalary", "Salary", "number", "value", { min: 0 }),
//       new Commands.IODefinitionCommandTypes.DefineInputCommand("periodsPerAnnum", "Periods", "number", "list", {
//         options: [
//           {
//             text: "Weekly",
//             value: 52,
//           },
//           {
//             text: "Every 2 Weeks",
//             value: 26,
//           },
//           {
//             text: "Monthly",
//             value: 12,
//           },
//           {
//             text: "Yearly",
//             value: 1,
//           },
//         ],
//       })
//     ),

//     new Commands.CommandList(
//       "Set Constants",
//       new Commands.SetValueCommand("monthsPerYear", 12),
//       new Commands.SetValueCollectionCommand("uif", uifOptions),
//       new Commands.SetTableCommand("taxRebatesBrackets", taxRebatesBrackets),
//       new Commands.SetTableCommand("taxBrackets", taxBrackets)
//     ),

//     new Commands.CommandList(
//       "Arithmetic Calculations",
//       new Commands.ArithmaticCommandTypes.AnnualizeCommand("annualIncome", "grossSalary", "periodsPerAnnum"),
//       new Commands.ArithmaticCommandTypes.DeAnnualizeCommand("monthlyIncome", "annualIncome", "monthsPerYear"),
//       new Commands.ArithmaticCommandTypes.CalculateLimitedPercentageCommand("monthlyUif", "monthlyIncome", "uifRate", "uifCeiling"),
//       new Commands.ArithmaticCommandTypes.AnnualizeCommand("annualUif", "monthlyUif", "monthsPerYear"),
//       new Commands.ArithmaticCommandTypes.DeAnnualizeCommand("deAnnualizedUif", "annualUif", "periodsPerAnnum"),
//       new Commands.TabledCalculationCommandTypes.CalculateAddedTotalByTiersCommand("annualTaxRebates", "taxRebatesBrackets", "employeeAge"),
//       new Commands.TabledCalculationCommandTypes.CalculateTaxByTiersCommand("annualGrossPaye", "taxBrackets", "annualIncome"),
//       new Commands.ArithmaticCommandTypes.FlooredDifferenceCommand("annualNetPaye", "annualGrossPaye", "annualTaxRebates"),
//       new Commands.ArithmaticCommandTypes.DeAnnualizeCommand("deAnnualizedNetPaye", "annualNetPaye", "periodsPerAnnum"),
//       new Commands.ArithmaticCommandTypes.SubtractCommand("netSalary", "grossSalary", "deAnnualizedUif", "deAnnualizedNetPaye")
//     ),

//     new Commands.CommandList(
//       "Output Definitions",
//       new Commands.IODefinitionCommandTypes.DefineOutputCommand("deAnnualizedNetPaye", "PAYE", "number", "value"),
//       new Commands.IODefinitionCommandTypes.DefineOutputCommand("deAnnualizedUif", "UIF", "number", "value"),
//       new Commands.IODefinitionCommandTypes.DefineOutputCommand("netSalary", "Net Salary", "number", "value")
//     )
//   );
// };
