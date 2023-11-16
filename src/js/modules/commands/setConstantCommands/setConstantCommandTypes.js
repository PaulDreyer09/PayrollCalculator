import { Command } from "../command.js";
import * as str_format from "../../utils/stringManipulation.js";

export class SetValueCollectionCommand extends Command {
  constructor(reference_prefix, json_file_path, json_data_reference) {  //input data changed to jsonFileName
    super();
    this.reference_prefix = reference_prefix;
    this.input_data = {};
    this.json_file_path = json_file_path;
    this.json_data_reference = json_data_reference;

  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {SetValueCollectionCommand}
   */
  static factory(params) {
    return new SetValueCollectionCommand(params.reference_prefix, params.json_file_path, params.json_data_reference);
  }

  /**
   * Creates a new object with the same key/values as input_data in the class, with the prefix added to the keys
   * @returns {object}
   */
  _get_renamed_input_data() {
    const result = {};

    for (const reference of Object.getOwnPropertyNames(this.input_data)) {
      let new_reference = str_format.string_concatinate_as_snake_case(this.reference_prefix, reference);
      result[new_reference] = this.input_data[reference];
    }

    return result;
  }

  execute(data_sheet) {
    const rename_input_data = this._get_renamed_input_data();

    for (const reference in rename_input_data) {
      this.set_constant(data_sheet, reference, rename_input_data[reference]);
    }

    return data_sheet;
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command
   * @param {Visitor} visitor
   */
  accept(visitor) {
    visitor.visit_set_value_collection_command(this);
  }
}

export class SetTableCommand extends Command {
  constructor(input_reference, json_file_path, json_data_reference) {
    super();
    this.input_reference = input_reference;
    this.table_data = {};
    this.json_file_path = json_file_path;
    this.json_data_reference = json_data_reference;
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {SetTableCommand}
   */
  static factory(params) {
    return new SetTableCommand(params.input_reference, params.json_file_path, params.json_data_reference);
  }

  execute(data_sheet) {
    this.set_constant(data_sheet, this.input_reference, this.table_data);
    return data_sheet;
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command
   * @param {Visitor} visitor
   */
  accept(visitor) {
    visitor.visit_set_table_command(this);
  }
}

export class SetValueCommand extends Command {
  constructor(input_reference, input_value) {
    super();
    this.input_reference = input_reference;
    this.input_value = input_value;
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {SetValueCommand}
   */
  static factory(params) {
    return new SetValueCommand(params.input_reference, params.input_value);
  }

  execute(data_sheet) {
    this.set_constant(data_sheet, this.input_reference, this.input_value);
    return data_sheet;
  }

  /**
   * Accept a Visitor object to call the opproptiate visit method for the command
   * @param {Visitor} visitor
   */
  accept(visitor) {
    visitor.visit_set_value_command(this);
  }
}