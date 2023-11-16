import * as arithmaticCommandTypes from "../arithmaticCommands/arithmaticCommandTypes.js";
import * as tabledCalculationCommandTypes from "../arithmaticCommands/tabledCalculationCommandTypes.js";
import * as CommandListTypes from "../compositeCommands/commandList.js";
import * as IODefinitionCommandTypes from "../ioCommands/IODefinitionCommandTypes.js";
import * as setConstantCommandTypes from "../setConstantCommands/setConstantCommandTypes.js";

const getCommandTypesList = () => [
  arithmaticCommandTypes,
  tabledCalculationCommandTypes,
  CommandListTypes,
  IODefinitionCommandTypes,
  setConstantCommandTypes,
];

export const getCommandsMap = () => {
  const map = {};

  for (const commandTypes of getCommandTypesList()) {
    for (const key in commandTypes) {
      map[key] = commandTypes[key];
    }
  }

  return map;
};
