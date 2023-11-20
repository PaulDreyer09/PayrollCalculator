import * as command_controller from "../modules/commands/commandsController.js";
import * as UI from "..//ui/calculatorUI.js";
import { fetch_data } from "../modules/utils/webFetch.js"

export const run = async () => {  

  // document.test_json = command_controller.test_json();
  const command = await command_controller.get_command("../src/json/plans/southAfrica/plan.json", fetch_data);
  
  UI.initialize_calculator(command);
};

