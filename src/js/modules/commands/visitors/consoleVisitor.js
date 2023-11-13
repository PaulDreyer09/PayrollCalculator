import { Visitor } from "./visitor.js";

export class ConsolePrettyPrinterVisitor extends Visitor {
  constructor() {
    super();
    this.indentLevel = 0;
    this.indentCharacter = "\t";
    this.currentIndentString = "";
    this.infoIndentString = this._createStringIndent(1);
  }

  /**
   * Creates an indented string based on the specified level.
   * @param {number} level - The level of indentation.
   * @returns {string} - The indented string.
   */
  _createStringIndent(level) {
    return this.indentCharacter.repeat(level);
  }

  _updateIndentValues() {
    this.currentIndentString = this._createStringIndent(this.indentLevel);
    this.infoIndentString = this._createStringIndent(this.indentLevel + 1);
  }

  _printObjectDataToLog(obj) {
    const indent = this._createStringIndent(this.indentLevel + 1);

    for (const key in obj) {
      console.log(`${indent}${key}: ${obj[key]}`);
    }
  }

  //Composite Commands

  enterCommandList(commandList) {
    console.log("Starting Command List:", commandList.name);
    this.indentLevel++;
    this._updateIndentValues();
  }

  exitCommandList(commandList) {
    console.log("End Command List:", commandList.name);
    this.indentLevel--;
    this._updateIndentValues();
  }

  //Set Constant Commands
  
  visitSetTableCommand(command) {
    console.log(`${this.currentIndentString}Setting table data. Reference: ${command.inputReference}`);
    console.table(command.tableData);
  }

  visitSetValueCollectionCommand(command) {
    console.log(`${this.currentIndentString}Setting collection of constants, adding a prefix of '${command.referencePrefix}'`);
    this._printObjectDataToLog(command.updatedInputData());
  }

  visitSetValueCommand(command) {
    console.log(`${this.currentIndentString}Setting constant | ${command.inputReference}: ${command.inputValue}`);
  }

  //IO Commands

  visitDefineInputCommand(command) {
    const { reference, dataType, properties, text } = command;

    console.log(`${this.currentIndentString}Defining input for ${text}`);
    console.log(`${this.infoIndentString}Reference: ${reference}`);
    console.log(`${this.infoIndentString}Data type: ${dataType}`);

    if (properties.options) {
      console.log(`${this.infoIndentString}Selectable options:`);
      for (const option of properties.options) {
        console.log(`\t${this.infoIndentString}Text: ${option.text}, Value: ${option.value}`);
      }
    }
  }

  visitDefineOutputCommand(command) {
    const { reference, dataType, text } = command;

    console.log(`${this.currentIndentString}Defining output for ${text}`);
    console.log(`${this.infoIndentString}Reference: ${reference}`);
    console.log(`${this.infoIndentString}Data type: ${dataType}`);
  }

  //Arithmatic Commands

  visitAddCommand(command) {
    console.log(`${this.currentIndentString}Add Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Input references to add together: ${command.inputReferences.join(", ")}`);
  }

  visitSubtractCommand(command) {
    console.log(`${this.currentIndentString}Subtract Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Initial Value reference: ${command.inputReferences.shift()}`);
    console.log(`${this.infoIndentString}Input references: ${command.inputReferences.join(", ")}`);
  }

  visitMultiplyCommand(command) {
    console.log(`${this.currentIndentString}Multiply Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Input references to multiply together: ${command.inputReferences.join(", ")}`);
  }

  visitDivideCommand(command) {
    console.log(`${this.currentIndentString}Divide Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Initial Value reference: ${command.inputReferences.shift()}`);
    console.log(`${this.infoIndentString}Input references: ${command.inputReferences.join(", ")}`);
  }

  visitAnnualizeCommand(command) {
    console.log(`${this.currentIndentString}Annualize Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Initial Value reference: ${command.inputValueReference}`);
    console.log(`${this.infoIndentString}Periods per annum reference: ${command.periodsPerAnnumReference}`);
  }

  visitDeAnnualizeCommand(command) {
    console.log(`${this.currentIndentString}DE-Annualize Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Input Value reference: ${command.inputValueReference}`);
    console.log(`${this.infoIndentString}Periods per annum reference: ${command.periodsPerAnnumReference}`);
  }

  visitLesserOfCommand(command) {
    console.log(`${this.currentIndentString}Lesser-Of Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Input references: ${command.inputReferences.join(", ")}`);
  }

  visitFlooredDifferenceCommand(command) {
    console.log(`${this.currentIndentString}Floored Difference Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Initial Value reference: ${command.inputReferences.shift()}`);
    console.log(`${this.infoIndentString}Input references: ${command.inputReferences.join(", ")}`);
  }

  visitCalculateLimitedPercentageCommand(command) {
    console.log(`${this.currentIndentString}Calculate Limited Percentage Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Input Value reference: ${command.inputValueReference}`);
    console.log(`${this.infoIndentString}Rate references: ${command.rateReference}`);
    console.log(`${this.infoIndentString}Ceiling references: ${command.ceilingReference}`);
  }

  //Tabled Calculation Commands

  visitCalculateAddedTotalByTiersCommand(command) {
    console.log(`${this.currentIndentString}Calculate by Added Total Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Input Value reference: ${command.inputValueReference}`);
    console.log(`${this.infoIndentString}Table reference: ${command.tableReference}`);
  }

  visitCalculateTaxByTiersCommand(command) {
    console.log(`${this.currentIndentString}Calculate Tax by Tiers Command.`);
    console.log(`${this.infoIndentString}Result references: ${command.resultReference}`);
    console.log(`${this.infoIndentString}Input Value reference: ${command.inputValueReference}`);
    console.log(`${this.infoIndentString}Table reference: ${command.tableReference}`);
  }
}
