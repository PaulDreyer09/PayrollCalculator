import * as validation from "./validation.js";

/**
 * Creates and returns a new HTML element with the specified type, attributes, class list, and inner HTML.
 *
 * @param {string} elementType - The type of HTML element to create (e.g., 'div', 'p', 'span').
 * @param {object} attributes - An object containing attributes to set for the created element.
 * @param {string[]} classList - An array of class names to add to the created element.
 * @param {string} innerHTML - The inner HTML content for the created element.
 * @returns {HTMLElement} - The newly created HTML element.
 */
export const createElement = (elementType, attributes = {}, classList = [], innerHTML = "") => {
  const element = Object.assign(document.createElement(elementType), attributes);
  element.innerHTML = innerHTML;

  for (const className of classList) {
    element.classList.add(validation.validString(className));
  }

  return element;
};

/**
 * Creates a container element with a label and returns it.
 *
 * @param {string} labelText - The text content for the label.
 * @param {string} forName - The 'for' attribute of the label, associating it with an input element.
 * @param {string[]} classList - An array of class names to add to the container element.
 * @returns {HTMLElement} - The container element with the label.
 */
export const createContainerWithLabel = (labelText, inputFieldId = "", classList) => {
  const containerElement = createElement("div", {}, classList);
  const label = createElement("label", {}, [], labelText);
  label.setAttribute("for", inputFieldId);
  containerElement.append(label);
  return containerElement;
};

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
    const periodOption = createElement("option", { value }, [], text);

    selectElement.appendChild(periodOption);
  }
};

/**
 * Removes any nodes inside of a given element, also clearing references to the child nodes
 *
 * @param {Element} parentElement
 */
export const cleanParentElement = (parentElement) => {
  while (parentElement.firstChild) {
    let removedElement = parentElement.removeChild(parentElement.firstChild);
    removedElement = null;
  }
};

export const resetElementNode = (element) => {
  console.log(element, element.type);
  switch (element.type) {
    case "text":
    case "password":
    case "textarea": {
      console.log("Text");
      element.value = "";
      break;
    }
    case "select-one": {
      console.log("Select");
      element.selectedIndex = 0;
      break;
    }
    case "select-multiple": {
      element.selectedIndex = -1;
      break;
    }
    case "number": {
      element.value = 0;
      break;
    }
    case "checkbox": {
      element.checked = false;
      break;
    }
    case "radio":
      if (element.name) {
        resetRadio(element.name);
      } else {
        element.checked = false;
      }
      break;
  }
};

export const resetElementNodeByID = (elementId) => {
  var element = document.getElementById(elementId);

  if (!element) {
    throw new Error(`No element found to reset with the ID: ${elementId}.`);
  }

  resetElementNode(element);
};

export const resetRadio = (radioName) => {
  var radioButtons = document.getElementsByName(radioName);

  if (radioButtons.length > 0) {
    radioButtons[0].checked = true; // Set the first radio button to be checked
  }
};
