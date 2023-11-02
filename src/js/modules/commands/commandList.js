import Command from "./command.js";

export default class CommandList extends Command{
    constructor(){
        super();
    }

    execute(dataSheet){
        for(const command of this.subCommands){
            dataSheet = command.execute(dataSheet);
        }
    }
}