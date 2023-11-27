import { Command } from "../command.js";
import * as validation from "../../../utils/validation.js";

export class IODefinitionCommand extends Command {
  /**
   *
   * @param {string} reference - Property name in datasheet where the value is stored/read from
   * @param {string} text - The text to show for the requested data for lables or message prompts
   * @param {string} data_type - Required data type | "string", "number"
   * @param {string} validation_type - ("value" || "list") 
   *  if validation_type == "value", any value will be requested
   *  if validation_type == "list", a value from a list inside properties.options will be requested
   * @param {*} properties
   * @param {*} command_name
   *
   */
  constructor(reference, text, data_type, properties, command_name, ) {
    super();
    this.reference = reference;
    this.text = text;
    this.data_type = data_type; // "string", "number"

    this.properties = properties == null ? {} : properties;
    this.command_name = command_name;
  }



  /**
   * Checks if the data type of the input_value is either number or string.
   * @throws - Error if not number or string
   * @param {any} input_value - input data to check the data type of
   * @returns {boolean} - returns true if it passes the validation
   */
  _validate_data_type(input_value) {
    switch (this.data_type) {
      case "number": {
        validation.valid_number(input_value);
        break;
      }
      case "string": {
        validation.valid_string(input_value);
        break;
      }
      default: {
        throw new Error(`${this.command_name}: Unknown data type set up for data named: ${this.reference}`);
      }
    }
    return true;
  }

  execute(data_sheet) {
    //Test if the datasheet contains the defined data reference
    if (!(this.reference in data_sheet)) {
      throw new Error(`${this.command_name}: No expected data found with name: ${this.reference}`);
    }

    const data_value = data_sheet[this.reference];

    if (typeof data_value !== this.data_type) {
      throw new Error(
        `${this.command_name}: The data type for the data with name, ${this.reference}, is not the same as the required. Expected: ${
          this.data_type
        }. Found ${typeof data_value}`
      );
    }

    return data_sheet;
  }
}
