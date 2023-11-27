import { AbstractFactory } from "../factory/abstractFactory.js";
import { JsonLoaderVisitor } from "../commands/visitors/jsonLoaderVisitor.js";

const get_module_locations = async (data_fetcher_function) => {
  const prefix_path = "./js/modules/commands/classes/";
  const registration_modules_path = prefix_path + "registration_module_list.json";

  const path_list = await data_fetcher_function(registration_modules_path);
  return path_list;
};

const register_commands_to_factory_from_modules = async (factory, module_paths) => {
  for(const path of module_paths){
    const module = await import("../commands/classes/" + path);
    module.register_classes_to_factory(factory);
  }
};

/**
 * Creates an AbstractFactory and registers the constructors and keys inside constructor_map to the factory
 * @returns {AbstractFactory} - A factory registered with the defined class_definitions returned by get_factory_class_definition_objects
 */
const get_registered_factory = async (data_fetcher_function) => {
  const module_paths = await get_module_locations(data_fetcher_function);
  console.log("AbstractFactory:", AbstractFactory)
  const factory = new AbstractFactory();
  console.log(typeof factory)
  
  await register_commands_to_factory_from_modules(factory, module_paths);
  return factory;
};


export const get_command = async (plan_path, data_fetcher_function) => { 
  const command_json = await data_fetcher_function(plan_path);
  const factory = await get_registered_factory(data_fetcher_function);  //
  const command = factory.get_class_instance(command_json);

  const json_loader_visitor = command.accept(new JsonLoaderVisitor(data_fetcher_function));
  await json_loader_visitor.initialize_pending_commands();
  return command;
};

