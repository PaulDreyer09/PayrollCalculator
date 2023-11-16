import * as commandController from "../modules/commands/commandsController.js";
import { hardCodedJSON } from "../modules/config/sa.js";
import * as UI from "..//ui/calculatorUI.js";

export const run = async () => {  
  // commandController.loadJson(getJsonFilePath("south_africa"))
  document.testJson = commandController.testJson;
  const command = await commandController.getCommand("south_africa");
  console.log(command)
  UI.initializeCalculator(command);
};

