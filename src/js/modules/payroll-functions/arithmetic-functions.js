import * as validation from '../utils/validation.js';

/**
* Adds any number of numerical arguments together.
*
* @param {...number} numbers - The numbers to be added.
* @returns {number} The sum of all provided numbers.
*/
export const sum = (...numbers) => {
    let total = 0;
    for (const num of numbers) {
        total += validation.validNumber(num);
    }
    return total;
};

/**
* Adds any number of numerical arguments together.
* 
* @param {number} initial - The number which will be deducted from
* @param {...number} numbers - The numbers to be deducted from initial
* @returns {number} Return the difference between initial and numbers
*/
export const subtract = (initial, ...numbers) => {
    let result = validation.validNumber(initial);
    for (const num of numbers) {
        result -= validation.validNumber(num);
    }
    return result;
};

/**
 * 
 * @param {number} num1 first value
 * @param {number} num2 second value
 * @returns {number} num1 multiplied by num2
 */
export const multiply = (initial, ...numbers) => {
    let result = validation.validNumber(initial);
    for (const num of numbers) {
        result *= validation.validNumber(num)
    }
    return result;
}

/**
 * 
 * @param {number}num1 first value
 * @param {number} num2 second value
 * @returns {number} num1 divided by num2
 */
export const divide = (initial, ...numbers) => {
    let result = validation.validNumber(initial);
    for(const num of numbers) {
        result /= validation.validNumberNonZero(num);
    }
    return result;
}