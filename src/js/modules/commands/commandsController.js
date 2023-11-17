import { ConsolePrettyPrinterVisitor } from "./visitors/consoleVisitor.js";
import * as dom_visitors from "./visitors/domVisitor.js";
import { CommandFactory } from "./factory/commandFactory.js";
import { get_commands_map } from "./factory/commandMap.js";
import { JsonLoaderVisitor } from "./visitors/jsonLoaderVisitor.js";
// import { readFileSync, readSync } from "fs";

/**
 * Creates a CommandFactory and registers the constructors and keys inside constructor_map to the factory
 * @param {object} constructor_map - Key -value map of Command Subclasses Constructors to register to the CommandFactory
 * @returns CommandFactory - A factory with
 */
const get_registered_factory = () => {
  const factory = new CommandFactory();
  const constructor_map = get_commands_map();

  for (const key in constructor_map) {
    factory.register_command(key, constructor_map[key]);
  }

  return factory;
};


const load_json = async (path) => {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error("The fetch response did not return Ok");
    }
    
    const object_data = await response.json();

    return object_data;
  } catch (error) {
    throw new Error("Error fetching command data. " + error.message);
  }
};

const get_json_folder_uri = () => {
  return "/src/json/countries/";
}

const get_json_input_data_folder_uri = () => {
  return "../src/json/inputData/";
}

const get_json_file_path = (country) => {
  const file_name_map = {
    south_africa: "southAfrica.json",
  };
  
  if (!(country in file_name_map)) {
    throw Error(`The given country key, ${country}, is not valid.`);
  }

  return get_json_folder_uri() + file_name_map[country];
};

const get_command = async (country) => {
  const command_json = await load_json(get_json_file_path(country));

  const factory = get_registered_factory();
  const command = factory.get_command(command_json.type_name, command_json.params);

  const json_loader_visitor = command.accept(new JsonLoaderVisitor(get_json_input_data_folder_uri()));
  await json_loader_visitor.initialize_pending_commands();
  return command;
};

export { ConsolePrettyPrinterVisitor, dom_visitors as DomVisitors, get_registered_factory as getRegisteredFactory, get_command as get_command, load_json as loadJson };
