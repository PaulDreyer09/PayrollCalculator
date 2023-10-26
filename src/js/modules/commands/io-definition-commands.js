import { Command } from "./commands.js";
import * as validation from '../utils/validation.js';

export class IOSetupCommand extends Command {
    constructor(reference, text, dataType, validationType, properties = {}) {
        super();
        this.reference = reference;
        this.text = text;
        this.dataType = dataType;
        this.validationType = validationType;
        this.properties = properties;
        this.commandName = 'IOSetupCommand';
    };

    getDefinition() {
        return {
            reference: this.reference,
            text: this.text,
            dataType: this.dataType,
            validationType: this.validationType,
            properties: this.properties,
        }
    }

    validateByRequiredType(inputValue) {
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
                this.validateByRequiredType(dataValue);
                break;
            }
            case 'list': {
                if ((!this.properties.hasOwnProperty('options'))) {
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
                this.validateByRequiredType(dataValue);
                break;
            }
        }

        //Max and Min validation
        if(this.properties.hasOwnProperty('min')){
            if(dataValue < this.properties.min){
                throw new Error(`${this.commandName}: The value of ${this.reference} is less than the set minimum of ${this.properties.min}`);
            }
        }

        if(this.properties.hasOwnProperty('max')){
            if(dataValue > this.properties.max){
                throw new Error(`${this.commandName}: The value of ${this.reference} is more than the set minimum of ${this.properties.max}`);
            }
        }


        return dataSheet;
    }
}

/**
 * inputStrucutre: {name, dataType, displayText}
 */
export class DefineInputCommand extends IOSetupCommand {
    constructor(reference, text, dataType, validationType, properties = {}) {
        super(reference, text, dataType, validationType, properties);
        this.commandName = 'DefineInputCommand';
    };

}

export class DefineOutputCommand extends IOSetupCommand {
    constructor(reference, text, dataType, validationType, properties = {}) {
        super(reference, text, dataType, validationType, properties);
        this.commandName = 'DefineOutputCommand';
    };
}