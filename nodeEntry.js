import * as command_controller from "./src/js/modules/commands/commandsController.js";
import { ConsolePrettyPrinterVisitor } from "./src/js/modules/commands/commandsController.js";
import { ConsoleInputVisitor } from "./src/js/modules/commands/visitors/consoleInputVisitor.js";
import { fetch_data } from "./src/js/modules/utils/fileSystemFetch.js";


export const run = async () => {  
  const command = await command_controller.get_command("/src/json/plans/southAfrica/plan.json", fetch_data);
  // command.accept(new ConsolePrettyPrinterVisitor());
  // const data_sheet = {employee_age: 60, gross_salary: 12000, periods_per_annum: 12}

  const input_visitor = command.accept(new ConsoleInputVisitor());
  await input_visitor.get_input_values();
  const data_sheet = input_visitor.input_values;

  console.log("Input Data", data_sheet);
  command.execute(data_sheet)
  console.log("Output Data:")
  console.log("PAYE", data_sheet.de_annualized_net_paye);
  console.log("UIF", data_sheet.de_annualized_uif);
  console.log("Net Salary", data_sheet.net_salary);
};

await run();
