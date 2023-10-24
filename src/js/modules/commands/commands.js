import * as strFormat from '../utils/string-manipulation.js'

/**
 * @class
 * @param {Function} func - The arithmetic function to be executed.
 * @param {number} resultReference - Reference to the result position in the dataSheet array.
 * @param {...number} inputReferences - References to the operands' positions in the dataSheet array.
*/
export class Command {
    constructor(...inputReferences) {
        this.inputReferences = [...inputReferences];
    }

    /**
     * Validates if a specific key is present in the dataSheet object.
     * @param {Object} dataSheet - The object to search for the key.
     * @param {string} name - The key to search for in the dataSheet object.
     * @throws {Error} Throws an error if the key is not found.
     * @returns {any} The value associated with the provided key.
     */
    getKnownValue(dataSheet, name) {
        const found = dataSheet[name];
        if (found == undefined) {
            throw new Error(`${name} was not found`);
        }
        return found;
    }

    /**
     * Sets a value for a key in the dataSheet object if the key is not already defined.
     * @param {Object} dataSheet - The object to set the key-value pair.
     * @param {string} name - The key to set the value for.
     * @param {any} value - The value to set for the key.
     * @throws {Error} Throws an error if the key is already defined.
     * @returns {Object} The dataSheet object with the updated key-value pair.
     */
    setConstant(dataSheet, name, value) {
        if (name in dataSheet) {
            throw new Error(`${name} is already defined. Attempted to set ${name} as ${value}`);
        }
        dataSheet[name] = value;
        return dataSheet;
    }

    execute(dataSheet) {
        throw new Error('Execute method needs to be implemented by a derived class before being called');
    }
}

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
}

export class SetValuesCommand extends Command {
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
