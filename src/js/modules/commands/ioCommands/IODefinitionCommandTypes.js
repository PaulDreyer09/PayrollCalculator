import { IODefinitionCommand } from "./IODefinitionCommand.js";

export class DefineInputCommand extends IODefinitionCommand {
  constructor(reference, text, dataType, validationType, properties = null) {
    super(reference, text, dataType, validationType, properties, "DefineInputCommand");
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {DefineInputCommand}
   */
  static factory(params) {
    return new DefineInputCommand(params.reference, params.text, params.dataType, params.validationType, params.properties);
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visitDefineInputCommand(this);
  }
}

export class DefineOutputCommand extends IODefinitionCommand {
  constructor(reference, text, dataType, validationType, properties = null) {
    super(reference, text, dataType, validationType, properties, "DefineOutputCommand");
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {DefineOutputCommand}
   */
  static factory(params) {
    return new DefineOutputCommand(params.reference, params.text, params.dataType, params.validationType, params.properties);
  }

    /**
   * Accept a Visitor object to call the opproptiate visit method for the command 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.visitDefineOutputCommand(this);
    return visitor;
  }
}
