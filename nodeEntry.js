import { ConsoleInputVisitor } from "./public/js/modules/commands/visitors/consoleInputVisitor.js";
import { fetch_data } from "./public/js/modules/utils/fileSystemFetch.js";
import { ConsoleOutputVisitor } from "./public/js/modules/commands/visitors/consoleOutputVisitor.js";
import { run_calculator } from "./public/js/main/app.js";

const initialize_console_by_command = async (command) => {
  const input_visitor = command.accept(new ConsoleInputVisitor());
  await input_visitor.get_input_values();
  const data_sheet = input_visitor.input_values;

  command.execute(data_sheet)
  command.accept(new ConsoleOutputVisitor(data_sheet));
}

export const run = async () => {  
  await run_calculator("south_africa", fetch_data, initialize_console_by_command);
};

await run();
