import Command from "./command.js";
import * as strFormat from '../utils/string-manipulation.js'

export default class SetValuesCommand extends Command {
    constructor(referencePrefix, inputData) {
        super();
        this.referencePrefix = referencePrefix;
        this.inputData = {...inputData};
    }

    execute(dataSheet) {
        const referencesToAdd = Object.getOwnPropertyNames(this.inputData);
        
        for(const reference of referencesToAdd){
            const value = this.inputData[reference];
            let newReference = strFormat.stringConcatinateAsCamelCase(this.referencePrefix, reference);
            this.setConstant(dataSheet, newReference, value);
        }

        return dataSheet;
    }
}