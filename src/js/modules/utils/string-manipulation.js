import * as validation from './validation.js';

/**
 * Concatenates the given strings into a camelCase format.
 *
 * @param {...string} strings - The strings to concatenate.
 * @returns {string} - The concatenated camelCase string.
 */
export const stringConcatinateAsCamelCase = (...strings) => {
    // Get the first string and validate it.
    let result = validation.validString(strings.shift());

    // Iterate through the remaining strings, capitalize their first letter, and concatenate them.
    for (let val of strings) {
        if (typeof validation.validString(val) != 'string') {
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
export const stringConcatinateAsSnakeCase = (...strings) => {
    // Get the first string and validate it.
    let result = validation.validString(strings.shift());

    // Iterate through the remaining strings and concatenate them with underscores.
    for (let val of strings) {
        if (typeof validation.validString(val) != 'string') {
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
export const stringConcatinateAsLowerSnakeCase = (...strings) => {
    // Use stringConcatinateAsSnakeCase to concatenate strings and convert the result to lowercase.
    return stringConcatinateAsSnakeCase(...strings).toLowerCase();
}
