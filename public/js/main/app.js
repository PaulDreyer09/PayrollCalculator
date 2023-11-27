import * as command_controller from "../modules/setup/commandsController.js";
import * as UI from "../ui/calculatorUI.js";
import { fetch_data } from "../modules/utils/webFetch.js"

/**
 * Create a controller for South african tax calculations and build the HTML UI to be built
 */
export const run = async () => {  
  const command = await command_controller.get_command("./json/plans/southAfrica/plan.json", fetch_data);
  UI.initialize_calculator(command);
};