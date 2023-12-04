import * as UI from "../ui/calculatorUI.js";
import { fetch_data } from "../modules/utils/webFetch.js"
import { CommandFactory } from "../modules/factory/commandFactory.js";

const get_json_module_list_location = () => {
  return "./js/modules/commands/classes/registration_module_list.json";
};

const get_plan_path = (country_code) => {
  const map = {"sa": "./json/plans/southAfrica/plan.json"};
  return map[country_code];
}

const add_prefix_to_paths_list = (prefix, path_list) => {
  return path_list.map((path) => prefix + path)
}

const get_registered_factory = async (data_fetcher_function, json_module_list_path) => {
  const module_path_list = await data_fetcher_function(json_module_list_path);
  const factory = await CommandFactory.get_factory_with_commands_registered_from_modules(module_path_list)
  console.log(factory)
  return factory;
}

/**
 * Create a controller for South african tax calculations and build the HTML UI to be built
 */
export const run = async () => {  
  const plan_path = get_plan_path("sa");
  let command;

  const factory = await get_registered_factory(fetch_data, get_json_module_list_location()).then(async factory => {command = await factory.get_command_instance_from_json_file(plan_path, fetch_data)});
  const p = new Promise()
  console.log(factory)
  // const command = await factory.get_command_instance_from_json_file(plan_path, fetch_data);

  UI.initialize_calculator(command);
};