import * as command_controller from "./public/js/modules/setup/commandsController.js";
import { ConsoleInputVisitor } from "./public/js/modules/commands/visitors/consoleInputVisitor.js";
import { fetch_data } from "./public/js/modules/utils/fileSystemFetch.js";
import { ConsoleOutputVisitor } from "./public/js/modules/commands/visitors/consoleOutputVisitor.js";

export const run = async () => {  
  const command = await command_controller.get_command("./json/plans/southAfrica/plan.json", fetch_data);

  const input_visitor = command.accept(new ConsoleInputVisitor());
  await input_visitor.get_input_values();
  const data_sheet = input_visitor.input_values;

  command.execute(data_sheet)
  command.accept(new ConsoleOutputVisitor(data_sheet));
};

await run();
