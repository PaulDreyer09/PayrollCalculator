import {Command} from "../command.js";
import * as validation from '../../utils/validation.js';

export class IODefinitionCommand extends Command {
    constructor(reference, text, dataType, validationType, properties, commandName) {
        super();
        this.reference = reference;
        this.text = text;
        this.dataType = dataType;
        this.validationType = validationType;
        this.properties = properties == null ? {} : properties;
        this.commandName = commandName;
    };

    validateDataType(inputValue) {
        switch (this.dataType) {
            case 'number': {
                validation.validNumber(inputValue);
                break;
            }
            case 'string': {
                validation.validString(inputValue);
                break;
            }
            default: {
                throw new Error(`${this.commandName}: Unknown data type set up for data named: ${this.reference}`);
            }
        }
        return true;
    };

    execute(dataSheet) {
        //Test if the datasheet contains the defined data reference
        if (!(this.reference in dataSheet)) {
            throw new Error(`${this.commandName}: No expected data found with name: ${this.reference}`);
        }

        const dataValue = dataSheet[this.reference];

        if (typeof dataValue !== this.dataType) {
            throw new Error(`${this.commandName}: The data type for the data with name, ${this.reference}, is not the same as the required. Expected: ${this.dataType}. Found ${typeof dataValue }`);
        }

        //Validation by value or by list
        switch (this.validationType) {
            case 'value': {
                this.validateDataType(dataValue);
                break;
            }
            case 'list': {
                if ((!('options' in this.properties))) {
                    throw new Error(`${this.commandName}: No options provided for input command for output named: ${this.reference}`);
                }

                let found = false;
                for (const option of this.properties.options) {
                    if (option.value === dataValue) {
                        found = true;
                    }
                }

                if (!found) {
                    throw new Error(`${this.commandName}: The data with name, ${this.reference}, does not have a value which corresponds to the given options`);
                }
                this.validateDataType(dataValue);
                break;
            }
        }

        //Max and Min validation
        if('min' in this.properties){
            if(dataValue < this.properties.min){
                throw new Error(`${this.commandName}: The value of ${this.reference} is less than the set minimum of ${this.properties.min}`);
            }
        }

        if('max' in this.properties){
            if(dataValue > this.properties.max){
                throw new Error(`${this.commandName}: The value of ${this.reference} is more than the set minimum of ${this.properties.max}`);
            }
        }

        return dataSheet;
    }
}



