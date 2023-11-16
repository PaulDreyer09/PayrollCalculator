import { Command } from "../command.js";

export class CommandFactory {
  constructor() {
    this._registered_classes = {};
  }

  /**
   * Tests if the given input is a class definition derived of Command
   * @param {Command} class_definition - A Command derived class definition 
   * @returns 
   */
  _has_factory(class_definition) {
    return "factory" in class_definition;
    // return class_definition.prototype instanceof Command;
  }

  /**
   * Gets the registered class definition for the given type_name
   * @throws Error if no class has been registered by the given type_name 
   * @param {string} type_name 
   * @returns {Command} - Command derived class definition
   */
  _get_class_definition(type_name) {
    if (!type_name in this._registered_classes) {
      throw new Error(`The factory does not have a registered constructor for the type_name '${type_name}'`);
    }

    return this._registered_classes[type_name];
  }

  /**
   * Maps the given type_name to the given class_definition in the registered classes in the factory
   * @param {string} type_name 
   * @param {Command} class_definition - Class definition derived of Command class
   */
  register_command(type_name, class_definition) {
    if (type_name in this._registered_classes) {
      throw new Error(`Class constructor with the type_name '${type_name}' has already been registered`);
    }

    if (!this._has_factory(class_definition)) {
      return;
    }

    this._registered_classes[type_name] = class_definition;
  }

  /**
   * 
   * @param {string} type_name - The key for the class to be created based on the registered classes
   * @param {object} params - An object with the parameters assigned for the required class to be created
   * @returns {Command} - returns an instance of the required class
   */
  get_command(type_name, params){
    const class_definition = this._get_class_definition(type_name);

    const command = class_definition.factory(params);

    for(const child_data of params.children ?? []){
      command.add(this.get_command(child_data.type_name, child_data.params));
    }
    // console.log(command)
    return command;
  }
}
