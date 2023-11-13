import {Command} from "../command.js";

export class SetTableCommand extends Command {
    constructor(inputReference, tableData) {
        super();
        this.inputReference = inputReference;
        this.tableData = tableData;
    }

    execute(dataSheet) {
        this.setConstant(dataSheet, this.inputReference, this.tableData)
        return dataSheet;
    }

    accept(visitor) {
        visitor.visitSetTableCommand(this);
    }
}

