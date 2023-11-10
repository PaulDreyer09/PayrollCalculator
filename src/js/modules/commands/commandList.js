import Command from "./command.js";

export default class CommandList extends Command {
    constructor(...subCommands) {
        super();
        this.subCommands = subCommands;
    }

    /**
     * Recursive function to traverse down all the subCommands to collect all the DefineInputCommands.
     * DefineInputCommand's version returns an array including itself and all its DefineInputCommand children
     * 
     * @returns {DefineInputCommand[]}  returns an array of all the DefineInputCommand children down the subCommands tree
     */
    getInputDefinitions() {
        let result = [];
        for (const command of this.subCommands) {
            result = [...result, ...command.getInputDefinitions()];
        }
        return result;
    }

    /**
    * Recursive function to traverse down all the subCommands to collect all the DefineOutputCommands.
    * DefineOutputCommand's version returns an array including itself and all its DefineOutputCommand children
    * 
    * @returns {DefineOutputCommand[]}  returns an array of all the DefineOutputCommand children down the subCommands tree
    */
    getOutputDefinitions() {
        let result = [];
        for (const command of this.subCommands) {
            result = [...result, ...command.getOutputDefinitions()];
        }

        return result;
    }

    execute(dataSheet) {        
        for (const command of this.subCommands) {
            dataSheet = command.execute(dataSheet);
        }
        return dataSheet;
    }

    accept(visitor){
        visitor.enterCommandList(this);
        for (const command of this.subCommands) {
            command.accept(visitor);
        }
        visitor.exitCommandList(this);
        return visitor;
    }
}