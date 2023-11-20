import { IODefinitionCommand } from "./IODefinitionCommand.js";

export class DefineInputCommand extends IODefinitionCommand {
  constructor(reference, text, data_type, validation_type, properties = null) {
    super(reference, text, data_type, validation_type, properties, "DefineInputCommand", "visit_define_input_command");
  }

  /**
   * Build a string prompt message for the required input.
   * 
   * If validation_type = "list"
   *    Numbers from 1-x will be showed for input.
   *    Validation should be done according to the options index + 1
   * @returns {string}
   */
  get_prompt_message_string() {
    const options_string = () => {
      let values = [];
      this.properties.options.forEach((option, index) => {
        values.push(`${index + 1}: ${option.text}`);
      });

      return values.join("\n");
    };
    let message = `Please enter the Value for ${this.text}:\n`;
    // Add min/max prompt

    if (typeof this.properties.min != "undefined") {
      message += "Min: 0\n";
    }
    if (typeof this.properties.max != "undefined") {
      message += "Max: 0\n";
    }

    if (typeof this.properties.options != "undefined") {
      message += `\nPlease select one of the following options by entering the corresponding number\n${options_string()}\n `;
    }
    return message;
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {DefineInputCommand}
   */
  static factory(params) {
    return new DefineInputCommand(params.reference, params.text, params.data_type, params.validation_type, params.properties);
  }
}

export class DefineOutputCommand extends IODefinitionCommand {
  constructor(reference, text, data_type, validation_type, properties = null) {
    super(reference, text, data_type, validation_type, properties, "DefineOutputCommand", "visit_define_output_command");
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {DefineOutputCommand}
   */
  static factory(params) {
    return new DefineOutputCommand(params.reference, params.text, params.data_type, params.validation_type, params.properties);
  }
}
