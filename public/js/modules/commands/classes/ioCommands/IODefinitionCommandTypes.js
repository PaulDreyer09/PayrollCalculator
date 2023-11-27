import { IODefinitionCommand } from "./IODefinitionCommand.js";

export class DefineInputCommand extends IODefinitionCommand {
  constructor(reference, text, data_type, validation_type, properties = null) {
    super(reference, text, data_type, properties, "DefineInputCommand");
    this.validation_type = validation_type;
  }

  /**
   * Validates if the required data is present according to the required reference.
   * Tests if the data is valid according to the validation_type
   *  - "value": Test just if the data is valid according to the data_type ("string", "number")
   *  - "list": Tests if the input data is valid according to the options provided in the properties.options attribute
   * @param {object} data_sheet  - Key value pairs data object to test if the required data is inside
   * @returns {object} - returns the provided data_sheet
   */
  execute(data_sheet) {
    super.execute(data_sheet);

    //Validation by value or by list
    const data_value = data_sheet[this.reference];
    switch (this.validation_type) {
      case "value": {
        this._validate_data_type(data_value);
        break;
      }
      case "list": {
        if (!("options" in this.properties)) {
          throw new Error(`${this.command_name}: No options provided for input command for output named: ${this.reference}`);
        }

        let found = false;
        for (const option of this.properties.options) {
          if (option.value === data_value) {
            found = true;
          }
        }

        if (!found) {
          throw new Error(
            `${this.command_name}: The data with name, ${this.reference}, does not have a value which corresponds to the given options`
          );
        }
        this._validate_data_type(data_value);
        break;
      }
    }

    //Max and Min validation
    if ("min" in this.properties) {
      if (data_value < this.properties.min) {
        throw new Error(`${this.command_name}: The value of ${this.reference} is less than the set minimum of ${this.properties.min}`);
      }
    }

    if ("max" in this.properties) {
      if (data_value > this.properties.max) {
        throw new Error(`${this.command_name}: The value of ${this.reference} is more than the set minimum of ${this.properties.max}`);
      }
    }

    return data_sheet;
  }
}

export class DefineOutputCommand extends IODefinitionCommand {
  constructor(reference, text, data_type, validation_type, properties = null) {
    super(reference, text, data_type, validation_type, properties, "DefineOutputCommand");
  }
}

/**
 * Register a list of class constructors to the given factory
 * @param {AbstractFactory} factory - Factory class instance to registere the class constructors to
 * @returns {AbstractFactory} - return the input factory after all the registrations are made
 */
export const register_classes_to_factory = (factory) => {
  const class_list = [DefineInputCommand, DefineOutputCommand];

  for (const class_constructor of class_list) {
    factory.register_class(class_constructor);
  }
};
