import {Command} from "../command.js";

export class SetValueCommand extends Command {
    constructor(inputReference, inputValue) {
        super();
        this.inputReference = inputReference;
        this.inputValue = inputValue;
    }

    execute(dataSheet) {
        this.setConstant(dataSheet, this.inputReference, this.inputValue)
        return dataSheet;
    }

    accept(visitor) {
        visitor.visitSetValueCommand(this);
    }
}

