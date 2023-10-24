import * as validation from './validation.js'

export const createElement = (elementType, attributes = {}, classList = [], innerHTML = '') => {
    const element = Object.assign(document.createElement(elementType), attributes);
    element.innerHTML = innerHTML;

    for (const className of classList) {
        element.classList.add(validation.validString(className));
    }

    return element;
}

export const createContainerWithLabel = (labelText, forName = '', classList) => {
    const containerElement = createElement('div', {}, classList);
    const label = createElement('label', { for: forName }, [], labelText);

    containerElement.append(label);
    return containerElement;
}

/**
 * Populates a select element with the given options.
 *      Each option text will be the key, and the value will be the value of each item in options array.
 * @param {{text: string, value: any}[]} options : array list object filled with text and value of the option
 *      text: Text value of the option
 *      value: Value of the option
 * @param {Element} selectElement :select element to populate with options
 */
export const initializeSelect = (options, selectElement) => {
    //Clear any options from the select element
    selectElement.innerHTML = "";

    //Create and add option elements according to the options object
    for (const { text, value } of options) {
        const periodOption = createElement("option", { value}, [],text  );

        selectElement.appendChild(periodOption);
    }
}