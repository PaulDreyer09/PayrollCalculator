import {Command} from "../command.js";
import * as strFormat from '../../utils/stringManipulation.js'

export class SetValueCollectionCommand extends Command {
    constructor(referencePrefix, inputData) {
        super();
        this.referencePrefix = referencePrefix;
        this.inputData = {...inputData};
    }

    updatedInputData(){
        const result = {};
        const referencesToAdd = Object.getOwnPropertyNames(this.inputData);
        
        for(const reference of referencesToAdd){
            const value = this.inputData[reference];
            let newReference = strFormat.stringConcatinateAsCamelCase(this.referencePrefix, reference);
            result[newReference] = value;
        }

        return result;
    }

    execute(dataSheet) {
        const updatedData = this.updatedInputData();
        
        for(const reference in updatedData){
            this.setConstant(dataSheet, reference, updatedData[reference]);
        }

        return dataSheet;
    }

    accept(visitor) {
        visitor.visitSetValueCollectionCommand(this);
    }
}