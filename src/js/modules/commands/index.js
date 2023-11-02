import Command from "./command.js";
import CommandList from "./commandList.js";
import * as ArithmaticCommands from './arithmatic-commands.js';
import DefineInputCommand from "./define-input-command.js";
import DefineOutputCommand from "./define-output-command.js";
import IODefinitionCommand from "./io-definition-command.js";
import SetTableCommand from "./set-table-command.js";
import SetValueCommand from "./set-value-command.js";
import SetValuesCommand from "./set-values-command.js";

export default {
    Command: Command,
    CommandList,
    ArithmaticCommands: ArithmaticCommands,
    DefineInputCommand: DefineInputCommand,
    DefineOutputCommand: DefineOutputCommand,
    IODefinitionCommand: IODefinitionCommand,
    SetTableCommand: SetTableCommand,
    SetValueCommand: SetValueCommand,
    SetValuesCommand: SetValuesCommand,
}