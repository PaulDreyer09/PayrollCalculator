import { ConsolePrettyPrinterVisitor } from "../commands/visitors/consoleVisitor.js";
import * as dom_visitors from "../commands/visitors/domVisitor.js";
import { AbstractFactory } from "../factory/abstractFactory.js";
// import { register_commands_to_factory } from "./factoryData/commandClassDefinitionsMap.js";
import { JsonLoaderVisitor } from "../commands/visitors/jsonLoaderVisitor.js";

//Change to get from json file
const get_module_locations = () => {
  return [
    "../commands/classes/arithmaticCommands/arithmaticCommandTypes.js",
    "../commands/classes/arithmaticCommands/tabledCalculationCommandTypes.js",
    "../commands/classes/compositeCommands/commandList.js",
    "../commands/classes/ioCommands/IODefinitionCommandTypes.js",
    "../commands/classes/setConstantCommands/setConstantCommandTypes.js",
  ];
};

export const register_commands_to_factory = async (factory) => {
  for(const path of get_module_locations()){
    const module = await import(path);
    module.register_classes_to_factory(factory);
  }
};

/**
 * Creates an AbstractFactory and registers the constructors and keys inside constructor_map to the factory
 * @returns {AbstractFactory} - A factory registered with the defined class_definitions returned by get_factory_class_definition_objects
 */
const get_registered_factory = async () => {
  const factory = new AbstractFactory();
  await register_commands_to_factory(factory)
  return factory;
};


const get_command = async (plan_path, data_fetcher_function) => {
  const command_json = await data_fetcher_function(plan_path);
  const factory = await get_registered_factory();
  const command = factory.get_class_instance(command_json);

  const json_loader_visitor = command.accept(new JsonLoaderVisitor(data_fetcher_function));
  await json_loader_visitor.initialize_pending_commands();
  return command;
};

export { ConsolePrettyPrinterVisitor, dom_visitors as DomVisitors, get_registered_factory as getRegisteredFactory, get_command as get_command,};
