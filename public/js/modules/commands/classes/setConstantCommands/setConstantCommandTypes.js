import { Command } from "../command.js";
import * as str_format from "../../../utils/stringManipulation.js";

export class SetValueCollectionCommand extends Command {
  constructor(reference_prefix, json_file_path) {
    super();
    this.reference_prefix = reference_prefix;
    this.input_data = {};
    this.json_file_path = json_file_path;
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
}

export class SetTableCommand extends Command {
  constructor(input_reference, json_file_path, json_data_reference) {
    super();
    this.input_reference = input_reference;
    this.input_data = {};
    this.json_file_path = json_file_path;
  }

  execute(data_sheet) {
    this.set_constant(data_sheet, this.input_reference, this.input_data);
    return data_sheet;
  }
}

export class SetValueCommand extends Command {
  constructor(input_reference, input_value) {
    super();
    this.input_reference = input_reference;
    this.input_value = input_value;
  }

  execute(data_sheet) {
    this.set_constant(data_sheet, this.input_reference, this.input_value);
    return data_sheet;
  }
}

/**
 * Register a list of class constructors to the given factory
 * @param {AbstractFactory} factory - Factory class instance to registere the class constructors to
 * @returns {AbstractFactory} - return the input factory after all the registrations are made
 */
export const register_classes_to_factory = (factory) => {
  const class_list = [SetValueCollectionCommand, SetTableCommand, SetValueCommand];

  for (const class_constructor of class_list) {
    factory.register_class(class_constructor);
  }

  return factory;
};
