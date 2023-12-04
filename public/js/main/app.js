import * as UI from "../ui/calculatorUI.js";
import { fetch_data } from "../modules/utils/webFetch.js";
import { CommandFactory } from "../modules/factory/commandFactory.js";
import { add_prefix_to_string_list } from "../modules/utils/stringManipulation.js";
import * as validation from "../modules/utils/validation.js";

/**
 * Get the location for the json file that stores a list of modules that can register class definitions to a factory using the exported register_classes_to_factory function.
 * @returns {string} - location of the json file
 */
const get_json_module_list_location = () => {
  return "./js/modules/commands/classes/registration_module_list.json";
};

/**
 * Get a relative path to the location of a json file storing the plan to build a command list for a country
 * @param {string} country_code - The code representing the country to get the correct location
 * @returns {string} - The relative location of the json file of the required plan
 */
const get_plan_path = (country_code) => {
  const map = { 
    south_africa: "./json/plans/southAfrica/plan.json",
    zimbabwe: "./json/plans/zimbabwe/plan.json"
  };

  return map[validation.valid_string(country_code)];
};

/**
 * Create a command factory and register classes to the factory using a function called register_classes_to_factory
 * that is stored in multiple modules
 * This function will first fetch the list of module locations stored in a file using the provided data_fetcher_function
 * @param {function} data_fetcher_function - Callback function used to fetch data from a given path
 * @param {string} json_module_list_path - The path to the location of the file to fetch module locations from
 * @returns {CommandFactory}
 */
const get_registered_factory = async (data_fetcher_function, json_module_list_path) => {
  const module_path_list = await data_fetcher_function(json_module_list_path);
  const factory = await CommandFactory.get_factory_with_classes_registered_from_modules(add_prefix_to_string_list("../commands/classes/", module_path_list));
  return factory;
};

/**
 * Create a controller for South african tax calculations and build the HTML UI to be built
 */
export const run_calculator = async (country, data_fetcher_function, initialize_by_command_function) => {
  const plan_path = get_plan_path(country);

  const factory = await get_registered_factory(data_fetcher_function, get_json_module_list_location());
  const command = await factory.get_class_instance_from_json_file(plan_path, data_fetcher_function);

  initialize_by_command_function(command);
};
