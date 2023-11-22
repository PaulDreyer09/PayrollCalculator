import { Command } from "../commands/classes/command.js";

export class AbstractFactory {
  constructor() {
    this._registered_classes = {};
  }

  /**
   * Tests if the given input is a class definition derived of Command
   * @param {Command} class_constructor - A Command derived class definition 
   * @returns 
   */
  _has_factory(class_constructor) {
    return "factory" in class_constructor;
    // return class_constructor.prototype instanceof Command;
  }

  /**
   * Gets the registered class definition for the given class_name
   * @throws Error if no class has been registered by the given class_name 
   * @param {string} class_name 
   * @returns {Command} - Command derived class definition
   */
  _get_class_constructor(class_name) {
    if (!class_name in this._registered_classes) {
      throw new Error(`The factory does not have a registered constructor for the class_name '${class_name}'`);
    }

    return this._registered_classes[class_name];
  }

  /**
   * Maps the given class_name to the given class_constructor in the registered classes in the factory
   * @param {string} class_name 
   * @param {Command} class_constructor - Class definition derived of Command class
   */
  register_class(class_constructor) {
    if (!(typeof class_constructor === 'function' && typeof class_constructor.prototype === 'object')) {
      throw new Error(`register_class() parameter "class_constructor" is not a class constructor.`);
    }
    
    const class_name = class_constructor.name;

    if (class_name in this._registered_classes) {
      throw new Error(`Class constructor with the class_name '${class_name}' has already been registered`);
    }


    this._registered_classes[class_name] = class_constructor;
  }

  /**
   * 
   * @param {object} obj - An object with the parameters assigned for the required class to be created
   * @returns {Command} - returns an instance of the required class
   */
  get_class_instance(obj){
    const class_constructor = this._get_class_constructor(obj.class_name);

    const class_instance = new class_constructor(...obj.params);

    for(const child_object_data of obj.children ?? []){
      class_instance.add(this.get_class_instance(child_object_data));
    }
    
    return class_instance;
  }
}
