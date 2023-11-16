import { ConsolePrettyPrinterVisitor } from "../modules/commands/commandsController.js";
import * as commandModule from "../modules/commands/commandsController.js";
import { hardCodedJSON } from "../modules/config/sa.js";

const getCommandJsonData = () => {
  return hardCodedJSON;
};

export const consolePrintCommands = () => {
  const command = commandModule.getCommands(getCommandJsonData());
  command.accept(new ConsolePrettyPrinterVisitor());
};
