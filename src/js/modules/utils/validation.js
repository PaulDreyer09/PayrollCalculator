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

/**
 * Check if a given name is a valid HTML input element type.
 *
 * @param {string} name - The name to be validated as an HTML input element type.
 * @returns {boolean} - True if the name is a valid HTML input element type, otherwise false.
 */
export const validInputElementName = (inputName) => {
    // List of known HTML element types
    const validInputTypes = [
        "text",
        "password",
        "textarea",
        "radio",
        "checkbox",
        "select",
        "option",
        "file",
        "number",
        "range",
        "date",
        "time",
        "email",
        "url",
        "color"
    ];

    // Regular expression to match valid HTML element names (non-empty, starts with letter, no white space)
    const validElementRegex = /^[a-z][a-z0-9]*$/;

    // Check if the input string is a valid HTML element type
    if(validElementRegex.test(inputName) && validInputTypes.includes(inputName.toLowerCase())){
        return inputName;
    }
    else{
        throw new Error(`Invalid input element name provided. Provided value: ${inputName}`);
    }
}

export const validString = (inputString) => {
    if(typeof inputString != 'string'){
        throw new Error(`Provided input is not of type string. Provided type: ${typeof inputString}, value: ${inputString}`);
    }

    // Test if a string contains only whitespace or is empty
    const whitespaceRegex = /^(?!\s+$).+/;

    if (whitespaceRegex.test(inputString)) {
        return inputString;
    } else {
        throw new Error("Empty or whitespace string provided.");
    }
}