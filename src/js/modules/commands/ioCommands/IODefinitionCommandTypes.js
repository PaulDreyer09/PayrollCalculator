import { IODefinitionCommand } from "./IODefinitionCommand.js";

export class DefineInputCommand extends IODefinitionCommand {
  constructor(reference, text, data_type, validation_type, properties = null) {
    super(reference, text, data_type, validation_type, properties, "DefineInputCommand");
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {DefineInputCommand}
   */
  static factory(params) {
    return new DefineInputCommand(params.reference, params.text, params.data_type, params.validation_type, params.properties);
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visit_define_input_command(this);
  }
}

export class DefineOutputCommand extends IODefinitionCommand {
  constructor(reference, text, data_type, validation_type, properties = null) {
    super(reference, text, data_type, validation_type, properties, "DefineOutputCommand");
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {DefineOutputCommand}
   */
  static factory(params) {
    return new DefineOutputCommand(params.reference, params.text, params.data_type, params.validation_type, params.properties);
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visit_define_output_command(this);
    return visitor;
  }
}
