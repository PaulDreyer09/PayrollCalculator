import DefineInputCommand from "./define-input-command";

/**
 * @class
 * @param {Function} func - The arithmetic function to be executed.
 * @param {number} resultReference - Reference to the result position in the dataSheet array.
 * @param {...number} inputReferences - References to the operands' positions in the dataSheet array.
*/
export default class Command {
    constructor(...inputReferences) {
        this.inputReferences = [...inputReferences];
        this.subCommands = [];
    }

    /**
     * Adds a Command object to this Commands subCommands array
     * 
     * @param {Command} command Command to be added to the subCommand array
     */
    addSubCommand(command){
        if(!(command instanceof Command)){
            throw new Error(`The provided argument is not an instance of the Command class. Provided: ${command}`);
        }

        this.subCommands.push(command);
    }

    /**
     * Recursive function to traverse down all the subCommands to collect all the DefineInputCommands.
     * DefineInputCommand's version returns an array including itself and all its DefineInputCommand children
     * 
     * @returns {DefineInputCommand[]}  returns an array of all the DefineInputCommand children down the subCommands tree
     */
    getInputDefinitions(){
        let result = [];
        for(const command of this.subCommands){
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
    getOutputDefinitions(){
        let result = [];
        for(const command of this.subCommands){
            result = [...result, ...command.getOutputDefinitions()];
        }

        return result;
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

    execute() {
        throw new Error('Execute method needs to be implemented by a derived class before being called');
    }
}



