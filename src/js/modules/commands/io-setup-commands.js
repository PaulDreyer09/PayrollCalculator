import { Command } from "./commands.js";

export class IOSetupCommand extends Command {
    constructor(uiListRef, inputData) {
        super()
        this.uiListRef = uiListRef;
        this.inputData = inputData;
    }

    addToList(dataSheet, listRef, value){
        if(!(listRef in dataSheet)){          
            this.setConstant(dataSheet, listRef, []);       
        }

        dataSheet[listRef].push(value);
        return dataSheet;        
    }

    execute(dataSheet) {
        return this.addToList(dataSheet, this.uiListRef, this.inputData);
    }
}