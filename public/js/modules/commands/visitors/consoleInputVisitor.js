import { Visitor } from "./visitor.js";
import * as consoleInput from "../../utils/consoleInput.js";

/**
 * The ConsoleInputVisitor collects DefineInputCommand's and can call get_input_values to request input via the console to 
 * get all the required input data and store it in input_values as an object with each property of the object having the same reference as the 
 * DefineInputCommand reference string value for the required input data.
 */
export class ConsoleInputVisitor extends Visitor {
  constructor() {
    super();
    this.define_input_commands = [];
    this.input_values = {};
  }

  /**
   * Validates the input data from the console according to the input definition command
   * @param {any} input - Input number or string data
   * @param {DefineInputCommand} input_command - Command to use for input validation.
   * @return {object} - { valid_data: any, validation_result: boolean } returns a valid version of the input data and a boolean if validation was successful
   */
  valid_input_data(input, input_command) {
    let validation_result = false;
    let valid_data = input;

    //Get data from list options from the input definition
    //Input is to be given from 1..x and will be validated as indexes as 0..x-1
    if (input_command.validation_type == "list") {
      const options = input_command.properties.options;
      if(input >  options.length || input < 1 || input % 1 != 0){
        console.error("The input value provided is invalid.");
        return { valid_data, validation_result };
      }
      valid_data = input_command.properties.options[input - 1].value;
    }

    //Get datasheet ready for input definition command execute
    const datasheet = {};
    datasheet[input_command.reference] = valid_data;

    try {
      input_command.execute(datasheet);
      validation_result = true;
    } catch (error) {
      console.error("The input value provided is invalid.");
    }

    return { valid_data, validation_result };
  }

  /**
   * Build a string prompt message for the required input.
   *
   * If validation_type = "list"
   *    Numbers from 1-x will be showed for input.
   *    Validation should be done according to the options index + 1
   * @returns {string}
   */
  _get_prompt_message_string(command) {
  const options_string = () => {
    let values = [];
    command.properties.options.forEach((option, index) => {
      values.push(`${index + 1}: ${option.text}`);
    });

    return values.join("\n");
  };
  let message = `Please enter the Value for ${command.text}:`;
  // Add min/max prompt

  if (typeof command.properties.min != "undefined") {
    message += "\nMin: 0";
  }

  if (typeof command.properties.max != "undefined") {
    message += "\nMax: 0";
  }

  if (typeof command.properties.options != "undefined") {
    message += `\nPlease select one of the following options by entering the corresponding number\n${options_string()} `;
  }

  return message + '\nInput: ';
}

  async _read_console_input (command){
    let input;
    const prompt_message = this._get_prompt_message_string(command);
    //Gets input from the console depending on the required data type
    while (true) {
      switch (command.data_type) {
        case "string": {
          input = await consoleInput.read_string_input(prompt_message);            
          break;
        }
        case "number": {
          input = await consoleInput.read_number_input(prompt_message);
          break;
        }
        default: {
          throw new Error("No input reading function created for the required input data type: " + command.data_type);
        }
      }
      // Test if valid data was provided according to what the command defines to continue or reprompt.
      const { valid_data, validation_result } = this.valid_input_data(input, command);

      if (validation_result) {
        return valid_data;
      }
    }
  }

  /**
   * Request input from the console for each of the define_input_commands 
   * The user will be repeatedly prompted to give valid data if invalid data is provided.
   * @throws {Error} - Error will be thrown if the commands include an invalid data type that cant be requested with the console.
   */
  async get_input_values() {
    for (const command of this.define_input_commands) {
      this.input_values[command.reference] = await this._read_console_input(command);
    }
  }

  /**
   * Collects and stores a DefineInputCommand in this.define_input_commands
   * @param {DefineInputCommand} command 
   */
  visit_define_input_command(command) {
    this.define_input_commands.push(command);
  }
}
