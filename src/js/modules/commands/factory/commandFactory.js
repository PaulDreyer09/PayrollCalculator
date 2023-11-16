import { Command } from "../command.js";

export class CommandFactory {
  constructor() {
    this._registeredClasses = {};
  }

  /**
   * Tests if the given input is a class definition derived of Command
   * @param {Command} classDefinition - A Command derived class definition 
   * @returns 
   */
  _hasFactory(classDefinition) {
    return "factory" in classDefinition;
    // return classDefinition.prototype instanceof Command;
  }

  /**
   * Gets the registered class definition for the given typeName
   * @throws Error if no class has been registered by the given typeName 
   * @param {string} typeName 
   * @returns {Command} - Command derived class definition
   */
  _getClassDefinition(typeName) {
    if (!typeName in this._registeredClasses) {
      throw new Error(`The factory does not have a registered constructor for the typeName '${typeName}'`);
    }

    return this._registeredClasses[typeName];
  }

  /**
   * Maps the given typeName to the given classDefinition in the registered classes in the factory
   * @param {string} typeName 
   * @param {Command} classDefinition - Class definition derived of Command class
   */
  registerCommand(typeName, classDefinition) {
    if (typeName in this._registeredClasses) {
      throw new Error(`Class constructor with the typeName '${typeName}' has already been registered`);
    }

    if (!this._hasFactory(classDefinition)) {
      return;
    }

    this._registeredClasses[typeName] = classDefinition;
  }

  /**
   * 
   * @param {string} typeName - The key for the class to be created based on the registered classes
   * @param {object} params - An object with the parameters assigned for the required class to be created
   * @returns {Command} - returns an instance of the required class
   */
  getCommand(typeName, params){
    const classDefinition = this._getClassDefinition(typeName);

    const command = classDefinition.factory(params);

    for(const childData of params.children ?? []){
      command.add(this.getCommand(childData.typeName, childData.params));
    }
    // console.log(command)
    return command;
  }
}
