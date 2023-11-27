export class AbstractFactory {
  constructor() {
    this._registered_classes = {};
  }

  /**
   * Gets the registered class definition for the given class_name
   * @throws Error if no class has been registered by the given class_name 
   * @param {string} class_name 
   * @returns {function} - Returns the constructor for the requested class
   */
  _get_class_constructor(class_name) {
    //Check if the requested class as been registered
    if (!(class_name in this._registered_classes)) {
      throw new Error(`The factory does not have a registered constructor for the class_name '${class_name}'`);
    }

    return this._registered_classes[class_name];
  }

  /**
   * Maps the given class_name to the given class_constructor in the registered classes in the factory
   * @param {class} class_constructor - Class definition to be registered
   */
  register_class(class_constructor) {
    //Check if the class_constructor is indeed a constructor for a class
    if (!(typeof class_constructor.constructor === 'function' && typeof class_constructor.prototype === 'object' && class_constructor.prototype.constructor.name !== "Function")) {
      throw new Error(`register_class() parameter "class_constructor" is not a class constructor.`);
    }
    
    //Check if the class has already been registered
    const class_name = class_constructor.name;
    if (class_name in this._registered_classes) {
      throw new Error(`Class constructor with the class_name '${class_name}' has already been registered`);
    }

    //Register class constructor
    this._registered_classes[class_name] = class_constructor;
  }

  /**
   * Create an instance if a requested class, and if the obj data has a property named "children", 
   * create more instances and add to the main requested class as children if the class contains a method called "add".
   * @param {object} obj - An object with the parameters assigned for the required class to be created
   * @returns {Object} - returns an instance of the required class
   */
  get_class_instance(obj){
    //Get constructor and create class instance
    const class_constructor = this._get_class_constructor(obj.class_name);
    const class_instance = new class_constructor(...obj.params);

    //Create and add children classes to the new class_instance
    for(const child_object_data of obj.children ?? []){
      class_instance.add(this.get_class_instance(child_object_data));
    }
    
    return class_instance;
  }
}
