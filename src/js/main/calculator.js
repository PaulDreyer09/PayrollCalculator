import { taxRebatesBrackets, taxBrackets, uifOptions} from '../modules/config/south-african-tax-properties.js';
import * as generalCommands from '../modules/commands/commands.js';
import * as arithmaticCommands from '../modules/commands/arithmatic-commands.js';
import * as ioDefinitionCommands from '../modules/commands/io-definition-commands.js';

const commands = [
    new ioDefinitionCommands.DefineInputCommand('employeeAge', 'Age', 'number', 'value', {min: 0}),
    new ioDefinitionCommands.DefineInputCommand('grossSalary', 'Salary' , 'number', 'value', { min: 0,}),
    new ioDefinitionCommands.DefineInputCommand('periodsPerAnnum', 'Periods', 'number', 'list', {
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
    
    new ioDefinitionCommands.DefineOutputCommand('deAnnualizedNetPaye', 'PAYE' , 'number', 'value',),
    new ioDefinitionCommands.DefineOutputCommand('deAnnualizedUif', 'UIF','number','value'),
    new ioDefinitionCommands.DefineOutputCommand('netSalary', 'Net Salary', 'number', 'value',),
];

/**
 * Executes all the stored commands onto the provided data sheet.
 * @param {object} dataSheet - The data sheet containing input values.
 * @returns {object} An object containing PAYE, UIF, and Net Salary.
 */
const executeCalculationCommands = (dataSheet) => {
    for (const command of commands) {        
        // console.log('Datasheet before next command execution', dataSheet)
        dataSheet = command.execute(dataSheet);
    }

    return dataSheet;
};

/**
 * Extract defined output results from the data sheet.
 * @param {object} dataSheet - The data sheet containing calculated results.
 * @param {Array} outputDefinitions - An array of output definitions.
 * @returns {object} An object containing output data.
 */
const getDefinedOutputResultsFromDatasheet = (dataSheet, outputDefinitions) => {
    const results = { outputDefinitions: outputDefinitions, outputData: {} };

    for (const definition of outputDefinitions) {
        const reference = definition.reference;
        if (!reference in dataSheet)
            throw new Error(`Required output, ${reference}, was not found within the data sheet references.`);
        results.outputData[reference] = dataSheet[reference];
    }
    return results;
}

/**
 * Get input definitions for the defined commands.
 * @returns {Array} An array of input definition objects.
 */
export const handleGetInputDefinitions = () => {
    const definitionsList = [];
    for (const command of commands) {        
        if (command instanceof ioDefinitionCommands.DefineInputCommand){
            definitionsList.push(command.getDefinition());
        };
    }
    return definitionsList;
}

/**
 * Get output definitions for the defined commands.
 * @returns {Array} An array of output definition objects.
 */
export const handleGetOutputDefinitions = () => {
    const definitionsList = [];
    for (const command of commands) {        
        if (command instanceof ioDefinitionCommands.DefineOutputCommand){
            definitionsList.push(command.getDefinition());
        };
    }
    return definitionsList;
}

export const filterInputDataToDefinitions = (inputData, inputDefinitions) => {
    const filteredData = {}
    for(const {reference} of inputDefinitions){
        if(inputData.hasOwnProperty(reference)){
            filteredData[reference] = inputData[reference]
        } else {
            throw new Error(`No expected input data found with name: ${reference}`);
        }
    }
    return filteredData;
}

/**
 * Calculate results based on validated input data.
 * @param {object} inputData - The validated input data.
 * @returns {object} An object containing output results.
 */
export const handleCalculateResults = (inputData) => {
    const inputDefinitions = handleGetInputDefinitions();
    const outputDefinitions = handleGetOutputDefinitions();

    let dataSheet = filterInputDataToDefinitions(inputData, inputDefinitions);

    try {
        executeCalculationCommands(dataSheet)
    } catch(error){
        throw error;
        //placeholder before async implementation.
    }

    let result = {};
    try{
        result = getDefinedOutputResultsFromDatasheet(dataSheet, outputDefinitions);
    } catch (error) {
        throw error;
        //Placeholder for returning error response to front end
    }

    return result;
}
