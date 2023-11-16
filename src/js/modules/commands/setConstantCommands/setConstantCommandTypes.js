import { Command } from "../command.js";
import * as strFormat from "../../utils/stringManipulation.js";

export class SetValueCollectionCommand extends Command {
  constructor(referencePrefix, json_file_path, json_data_reference) {  //input data changed to jsonFileName
    super();
    this.referencePrefix = referencePrefix;
    this.inputData = {};
    this.json_file_path = json_file_path;
    this.json_data_reference = json_data_reference;

  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {SetValueCollectionCommand}
   */
  static factory(params) {
    return new SetValueCollectionCommand(params.referencePrefix, params.json_file_path, params.json_data_reference);
  }

  /**
   * Creates a new object with the same key/values as inputData in the class, with the prefix added to the keys
   * @returns {object}
   */
  _getRenamedInputData() {
    const result = {};

    for (const reference of Object.getOwnPropertyNames(this.inputData)) {
      let newReference = strFormat.stringConcatinateAsCamelCase(this.referencePrefix, reference);
      result[newReference] = this.inputData[reference];
    }

    return result;
  }

  execute(dataSheet) {
    const renameInputData = this._getRenamedInputData();

    for (const reference in renameInputData) {
      this.setConstant(dataSheet, reference, renameInputData[reference]);
    }

    return dataSheet;
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command
   * @param {Visitor} visitor
   */
  accept(visitor) {
    visitor.visitSetValueCollectionCommand(this);
  }
}

export class SetTableCommand extends Command {
  constructor(inputReference, json_file_path, json_data_reference) {
    super();
    this.inputReference = inputReference;
    this.tableData = {};
    this.json_file_path = json_file_path;
    this.json_data_reference = json_data_reference;
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {SetTableCommand}
   */
  static factory(params) {
    return new SetTableCommand(params.inputReference, params.json_file_path, params.json_data_reference);
  }

  execute(dataSheet) {
    this.setConstant(dataSheet, this.inputReference, this.tableData);
    return dataSheet;
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command
   * @param {Visitor} visitor
   */
  accept(visitor) {
    visitor.visitSetTableCommand(this);
  }
}

export class SetValueCommand extends Command {
  constructor(inputReference, inputValue) {
    super();
    this.inputReference = inputReference;
    this.inputValue = inputValue;
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {SetValueCommand}
   */
  static factory(params) {
    return new SetValueCommand(params.inputReference, params.inputValue);
  }

  execute(dataSheet) {
    this.setConstant(dataSheet, this.inputReference, this.inputValue);
    return dataSheet;
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command
   * @param {Visitor} visitor
   */
  accept(visitor) {
    visitor.visitSetValueCommand(this);
  }
}
