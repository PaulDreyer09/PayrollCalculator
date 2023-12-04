import { AbstractFactory } from "../factory/abstractFactory.js";
import { JsonLoaderVisitor } from "../commands/visitors/jsonLoaderVisitor.js";

export class CommandFactory extends AbstractFactory {
  constructor() {
    super();
  }

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
    const factory = new CommandFactory();

    await factory.register_classes_to_factory_from_modules(module_paths);

    return factory;
  }

  /**
   * Create a Command class instance using object data stored in a json file
   * Please make sure the required Command class is registered before calling to create the class
   * The Command object will be initialized by loading the required data async using data_fetcher_function
   * Commands with input data to be inserted to the data_sheet needs another field, json_file_path, to load the input data from
   * @param {string} json_path - Location of the object data stored in a json file
   * @param {function} data_fetcher_function - Callback function used to fetch the object data from the given location
   * @returns {object} - A class instance of the required class
   */
  async get_class_instance_from_json_file(json_path, data_fetcher_function) {
    const command = await super.get_class_instance_from_json_file(json_path, data_fetcher_function);
  

    await this.initialize_pending_command_data(command, data_fetcher_function);

    return command;
  }

  /**
   * The Command object will be initialized by loading the required data async using data_fetcher_function
   * Commands with input data to be inserted to the data_sheet needs another field, json_file_path, to load the input data from
   * @param {Command} command - Command instance to load pending input_data for
   * @param {function} data_fetcher_function - Callback function used to fetch the object data from the given location
   */
  async initialize_pending_command_data(command, data_fetcher_function) {
    const json_loader_visitor = command.accept(new JsonLoaderVisitor(data_fetcher_function));
    
    await json_loader_visitor.initialize_pending_commands();
  }
}
