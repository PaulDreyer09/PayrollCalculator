import * as arithmatic_command_types from "../arithmaticCommands/arithmaticCommandTypes.js";
import * as tabled_calculation_command_types from "../arithmaticCommands/tabledCalculationCommandTypes.js";
import * as command_list_types from "../compositeCommands/commandList.js";
import * as io_definition_command_types from "../ioCommands/IODefinitionCommandTypes.js";
import * as set_constant_command_types from "../setConstantCommands/setConstantCommandTypes.js";

const get_command_types_list = () => [
  arithmatic_command_types,
  tabled_calculation_command_types,
  command_list_types,
  io_definition_command_types,
  set_constant_command_types,
];

export const get_commands_map = () => {
  const map = {};

  for (const command_types of get_command_types_list()) {
    for (const key in command_types) {
      map[key] = command_types[key];
    }
  }

  return map;
};
