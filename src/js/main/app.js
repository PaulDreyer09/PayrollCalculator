import * as command_controller from "../modules/commands/commandsController.js";
import * as UI from "..//ui/calculatorUI.js";

export const run = async () => {  

  // document.test_json = command_controller.test_json();
  const command = await command_controller.get_command("south_africa");
  console.log(command)
  UI.initialize_calculator(command);
};

