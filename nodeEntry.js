import * as command_controller from "./src/js/modules/commands/commandsController.js";

export const run = async () => {  
  const command = await command_controller.get_command("south_africa");
  console.log(command)
};

await run();
