import {Command} from "../command.js";
import * as validation from '../../utils/validation.js';

export class IODefinitionCommand extends Command {
    constructor(reference, text, data_type, validation_type, properties, command_name) {
        super();
        this.reference = reference;
        this.text = text;
        this.data_type = data_type;
        this.validation_type = validation_type;
        this.properties = properties == null ? {} : properties;
        this.command_name = command_name;
    };

    validate_data_type(input_value) {
        switch (this.data_type) {
            case 'number': {
                validation.valid_number(input_value);
                break;
            }
            case 'string': {
                validation.valid_string(input_value);
                break;
            }
            default: {
                throw new Error(`${this.command_name}: Unknown data type set up for data named: ${this.reference}`);
            }
        }
        return true;
    };

    execute(data_sheet) {
        //Test if the datasheet contains the defined data reference
        if (!(this.reference in data_sheet)) {
            throw new Error(`${this.command_name}: No expected data found with name: ${this.reference}`);
        }

        const data_value = data_sheet[this.reference];

        if (typeof data_value !== this.data_type) {
            throw new Error(`${this.command_name}: The data type for the data with name, ${this.reference}, is not the same as the required. Expected: ${this.data_type}. Found ${typeof data_value }`);
        }

        //Validation by value or by list
        switch (this.validation_type) {
            case 'value': {
                this.validate_data_type(data_value);
                break;
            }
            case 'list': {
                if ((!('options' in this.properties))) {
                    throw new Error(`${this.command_name}: No options provided for input command for output named: ${this.reference}`);
                }

                let found = false;
                for (const option of this.properties.options) {
                    if (option.value === data_value) {
                        found = true;
                    }
                }

                if (!found) {
                    throw new Error(`${this.command_name}: The data with name, ${this.reference}, does not have a value which corresponds to the given options`);
                }
                this.validate_data_type(data_value);
                break;
            }
        }

        //Max and Min validation
        if('min' in this.properties){
            if(data_value < this.properties.min){
                throw new Error(`${this.command_name}: The value of ${this.reference} is less than the set minimum of ${this.properties.min}`);
            }
        }

        if('max' in this.properties){
            if(data_value > this.properties.max){
                throw new Error(`${this.command_name}: The value of ${this.reference} is more than the set minimum of ${this.properties.max}`);
            }
        }

        return data_sheet;
    }
}



