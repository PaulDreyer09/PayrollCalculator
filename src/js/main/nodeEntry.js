import { ConsolePrettyPrinterVisitor } from "../modules/commands/visitors/consoleVisitor.js";
import * as command_controller from "../modules/setup/commandsController.js";

export const console_print_commands = async () => {
  // const command = command_module.getCommands(get_command_json_data());
  console.log("Before");
  const command = await command_controller.get_command("south_africa");
  console.log("After", command);
  command.accept(new ConsolePrettyPrinterVisitor());
};

// await console_print_commands();
