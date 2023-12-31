import * as validation from '../utils/validation.js'

export class AbstractFactory {
  constructor() {
    this._registered_classes = {};
  }

  /**
   * Register multiple class definitions by using register_classes_to_factory function exported by each module to register each class defined within the module
   * @Example register_classes_to_factory function:
   * export function register_classes_to_factory(factory){
   *  factory.register_class(ClassOne);
   *  factory.register_class(ClassTwo);
   * }
   * @param {Array<string>} module_paths - List of module locations to import the register_classes_to_factory function from
   */
  register_classes_to_factory_from_modules = async (module_paths) => {
    for (const path of module_paths) {
      const { register_classes_to_factory } = await import(path);
      register_classes_to_factory(this);
    }
  };

  /**
   * Create a factory instance with multiple class definitions registered using classes exported by modules
   * Each class will be registered using register_classes_to_factory function exported by each module to register each class defined within the module
   * @Example register_classes_to_factory function:
   * export function register_classes_to_factory(factory){
   *  factory.register_class(ClassOne);
   *  factory.register_class(ClassTwo);
   * }
   * @param {Array<string>} module_paths - List of module locations to import the register_classes_to_factory function from
   */
  static async get_factory_with_classes_registered_from_modules(module_paths) {
    const factory = new AbstractFactory();

    await factory.register_classes_to_factory_from_modules(module_paths);

    return factory;
  }

  /**
   * Create a class instance using object data stored in a json file
   * Please make sure the required class is registered before calling to create the class
   * @param {string} json_path - Location of the object data stored in a json file
   * @param {function} data_fetcher_function - Callback function used to fetch the object data from the given location
   * @returns {object} - A class instance of the required class
   */
  async get_class_instance_from_json_file(json_path, data_fetcher_function) {
    try{
      validation.valid_string(json_path)
    } catch (error) {
      throw new Error("Provided json_path is not a valid string. Provided: ", json_path )
    }
    const loaded_object = await data_fetcher_function(json_path);

    if(typeof data_fetcher_function != "function") throw new Error("The provided data_fetcher_function is not a function. Provided: ", data_fetcher_function);

    if(!loaded_object || typeof loaded_object != "object") throw new Error("No object data received from the provided data_fetcher_function. Received: ", loaded_object);

    return this.get_class_instance(loaded_object);
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
    if (
      !(
        typeof class_constructor.constructor === "function" &&
        typeof class_constructor.prototype === "object" &&
        class_constructor.prototype.constructor.name !== "Function"
      )
    ) {
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
  get_class_instance(obj) {
    //Get constructor and create class instance
    const class_constructor = this._get_class_constructor(obj.class_name);
    const class_instance = new class_constructor(...obj.params);

    //Create and add children classes to the new class_instance
    for (const child_object_data of obj.children ?? []) {
      class_instance.add(this.get_class_instance(child_object_data));
    }

    return class_instance;
  }
}
