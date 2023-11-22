import * as validation from './validation.js';

/**
 * Concatenates the given strings into a camelCase format.
 *
 * @param {...string} strings - The strings to concatenate.
 * @returns {string} - The concatenated camelCase string.
 */
export const string_concatinate_as_camel_case = (...strings) => {
    // Get the first string and validate it.
    let result = validation.valid_string(strings.shift());

    // Iterate through the remaining strings, capitalize their first letter, and concatenate them.
    for (let val of strings) {
        if (typeof validation.valid_string(val) !== 'string') {
            throw new Error(`Provided argument is not of type string.  Provided value: ${val}`);
        }
        const firstLetter = val[0];
        val = firstLetter.toUpperCase() + val.slice(1);
        result += val;
    }

    return result;
}

/**
 * Concatenates the given strings into a snake_case format.
 *
 * @param {...string} strings - The strings to concatenate.
 * @returns {string} - The concatenated snake_case string.
 */
export const string_concatinate_as_snake_case = (...strings) => {
    // Get the first string and validate it.
    let result = validation.valid_string(strings.shift());

    // Iterate through the remaining strings and concatenate them with underscores.
    for (let val of strings) {
        if (typeof validation.valid_string(val) !== 'string') {
            throw new Error(`Provided argument is not of type string.  Provided value: ${val}`);
        }

        result += '_' + val;
    }

    return result;
}

/**
 * Concatenates the given strings into a lower_snake_case format by converting the result to lowercase.
 *
 * @param {...string} strings - The strings to concatenate.
 * @returns {string} - The concatenated lower_snake_case string.
 */
export const string_concatinate_as_lower_snake_case = (...strings) => {
    // Use string_concatinate_as_snake_case to concatenate strings and convert the result to lowercase.
    return string_concatinate_as_snake_case(...strings).toLowerCase();
}

/**
 * Convert a CamelCase string to snake_case
 * @param {string} str 
 * @returns {string} returns the snake_case 
 */
export const camel_case_to_snake_case = (str) => {
    const words = []
    let start_index = 0;
    let end_index = 0;
    for(let i = 0; i < str.length; i++){
        const current_character = str[i];

        //Test if a uppercase is found, update that the end of the current word is found 
        // and the start of a new word is found, and push the current word.
        if(current_character === current_character.toUpperCase() && i != 0){
            end_index = i;
            words.push(str.slice(start_index, end_index).toLowerCase())
            start_index = i;
            continue;
        }

        //If the end of the string is located, push the last word
        if(i == str.length - 1){
            words.push(str.slice(start_index).toLowerCase());
        }
    }

    return words.join("_")
}

/**
 * 
 * @param {String} str Input snake_case string to convert to CamelCase
 * @returns 
 */
export const snake_case_to_camel_case = (str) => {
    const words = str.split('_');
    const capital_words = words.map((word) => {
        return word[0].toUpperCase() + word.slice(1);
    })
    return capital_words.join('');
}