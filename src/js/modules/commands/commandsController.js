import { ConsolePrettyPrinterVisitor } from "./visitors/consoleVisitor.js";
import * as DomVisitors from "./visitors/domVisitor.js";
import { CommandFactory } from "./factory/commandFactory.js";
import { getCommandsMap } from "./factory/commandMap.js";
import { JsonLoaderVisitor } from "./visitors/jsonLoaderVisitor.js";

/**
 * Creates a CommandFactory and registers the constructors and keys inside constructorMap to the factory
 * @param {object} constructorMap - Key -value map of Command Subclasses Constructors to register to the CommandFactory
 * @returns CommandFactory - A factory with
 */
const getRegisteredFactory = () => {
  const factory = new CommandFactory();
  const constructorMap = getCommandsMap();

  for (const key in constructorMap) {
    factory.registerCommand(key, constructorMap[key]);
  }

  return factory;
};

const loadJson = async (path) => {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error("The fetch response did not return Ok");
    }

    const objectData = await response.json();

    return objectData;
  } catch (error) {
    console.error("Error fetching command data", error.message);
  }
};

export const testJson = (path) => {
  console.log(path);
  try {
    const response = fetch(getJsonFilePath(path));

    return response;
  } catch (error) {
    console.error("Error fetching command data", error.message);
  }
};

const get_json_folder_uri = () => {
  return "../src/json/countries/";
}

const get_json_input_data_folder_uri = () => {
  return "../src/json/inputData/";
}

const getJsonFilePath = (country) => {
  const relativePathPrefix = "../src/json/";
  
  const fileNameMap = {
    south_africa: "southAfrica.json",
  };
  
  if (!(country in fileNameMap)) {
    throw Error(`The given country key, ${country}, is not valid.`);
  }

  return get_json_folder_uri() + fileNameMap[country];
};

const getCommand = async (country) => {
  const commandJson = await loadJson(getJsonFilePath(country));
  const factory = getRegisteredFactory();
  const command = factory.getCommand(commandJson.typeName, commandJson.params);

  const jsonLoaderVisitor = command.accept(new JsonLoaderVisitor(get_json_input_data_folder_uri()));
  jsonLoaderVisitor.initialize_pending_commands();
  console.log(command)
  return command;
};

export { ConsolePrettyPrinterVisitor, DomVisitors, getRegisteredFactory, getCommand, loadJson };
