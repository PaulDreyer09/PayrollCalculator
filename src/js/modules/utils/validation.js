/**
 * Validates that the provided value is a finite number.
 * @param {number} n - The value to validate.
 * @throws {Error} Throws an error if the provided value is not a finite number.
 * @returns {number} The validated number.
 */
export const validNumber = (n) => {
    // console.log('ValidNumber: ', n)
    if(!Number.isFinite(n)){
        throw new Error('The provided value is not a number.\nProvided: ' + n);
    }
    return n;
}

/**
 * Validates that the provided value is a finite number or Infinity.
 * @param {number} n - The value to validate.
 * @throws {Error} Throws an error if the provided value is neither a finite number nor Infinity.
 * @returns {number} The validated number or Infinity.
 */
export const validNumberOrInfinite = (n) => {
    if(!Number.isFinite(n) && n != Infinity){
        throw new Error('The provided value is not a number', 'Provided: ', n);
    }
    return n;
}

/**
 * Validates that the provided value is a non-zero number.
 * @param {number} n - The value to validate.
 * @throws {Error} Throws an error if the provided value is not a finite number or if it is zero.
 * @returns {number} The validated non-zero number.
 */
export const validNumberNonZero = (n) => {
    validNumber(n);
    if(n == 0){
        throw new Error('Cannot divide by 0');
    }
    return n;
}