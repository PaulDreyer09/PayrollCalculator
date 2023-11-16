import * as validation from "./validation.js";

/**
 * Creates and returns a new HTML element with the specified type, attributes, class list, and inner HTML.
 *
 * @param {string} element_type - The type of HTML element to create (e.g., 'div', 'p', 'span').
 * @param {object} attributes - An object containing attributes to set for the created element.
 * @param {string[]} class_list - An array of class names to add to the created element.
 * @param {string} inner_html - The inner HTML content for the created element.
 * @returns {HTMLElement} - The newly created HTML element.
 */
export const create_element = (element_type, attributes = {}, class_list = [], inner_html = "") => {
  const element = Object.assign(document.createElement(element_type), attributes);
  element.innerHTML = inner_html;

  for (const class_name of class_list) {
    element.classList.add(validation.valid_string(class_name));
  }

  return element;
};

/**
 * Creates a container element with a label and returns it.
 *
 * @param {string} label_text - The text content for the label.
 * @param {string} for_name - The 'for' attribute of the label, associating it with an input element.
 * @param {string[]} class_list - An array of class names to add to the container element.
 * @returns {HTMLElement} - The container element with the label.
 */
export const create_container_with_label = (label_text, input_field_id = "", class_list) => {
  const container_element = create_element("div", {}, class_list);
  const label = create_element("label", {}, [], label_text);
  label.setAttribute("for", input_field_id);
  container_element.append(label);
  return container_element;
};

/**
 * Populates a select element with the given options.
 *      Each option text will be the key, and the value will be the value of each item in options array.
 * @param {{text: string, value: any}[]} options : array list object filled with text and value of the option
 *      text: Text value of the option
 *      value: Value of the option
 * @param {Element} select_element :select element to populate with options
 */
export const initialize_select = (options, select_element) => {
  //Clear any options from the select element
  select_element.innerHTML = "";

  //Create and add option elements according to the options object
  for (const { text, value } of options) {
    const period_option = create_element("option", { value }, [], text);

    select_element.appendChild(period_option);
  }
};

/**
 * Removes any nodes inside of a given element, also clearing references to the child nodes
 *
 * @param {Element} parent_element
 */
export const clean_parent_element = (parent_element) => {
  while (parent_element.firstChild) {
    let removed_element = parent_element.removeChild(parent_element.firstChild);
    removed_element = null;
  }
};

export const reset_element_node = (element) => {
  switch (element.type) {
    case "text":
    case "password":
    case "textarea": {
      console.log("Text");
      element.value = "";
      break;
    }
    case "select-one": {
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
        reset_radio(element.name);
      } else {
        element.checked = false;
      }
      break;
  }
};

export const reset_element_node_by_id = (element_id) => {
  var element = document.getElementById(element_id);

  if (!element) {
    throw new Error(`No element found to reset with the ID: ${element_id}.`);
  }

  reset_element_node(element);
};

export const reset_radio = (radio_name) => {
  var radio_buttons = document.getElementsByName(radio_name);

  if (radio_buttons.length > 0) {
    radio_buttons[0].checked = true; // Set the first radio button to be checked
  }
};
