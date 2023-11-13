import {Command} from "../command.js";

export class CommandList extends Command {
    constructor(name, ...subCommands) {
        super();
        this.subCommands = subCommands;
        this.name = name;
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