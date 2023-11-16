import { ConsolePrettyPrinterVisitor } from "../modules/commands/commandsController.js";
import * as command_module from "../modules/commands/commandsController.js";
import { hard_coded_json } from "../modules/config/sa.js";

const get_command_json_data = () => {
  return hard_coded_json;
};

export const console_print_commands = () => {
  const command = command_module.getCommands(get_command_json_data());
  command.accept(new ConsolePrettyPrinterVisitor());
};
