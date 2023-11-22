import * as dom from "../../utils/domManipulation.js";
import { DefineInputCommand } from "../classes/ioCommands/IODefinitionCommandTypes.js";
import { Visitor } from "./visitor.js";

export class IOVisitor extends Visitor {
  constructor() {
    super();
    this.input_definitions = [];
    this.output_definitions = [];
  }

  /**
   * Adds a "-input" prefix to the given reference string
   * @param {string} reference 
   * @returns 
   */
  _to_input_field_id(reference) {
    return reference + "-input";
  }

  /**
   * Adds a "-result" prefix to the given reference string
   * @param {string} reference 
   * @returns 
   */
  _to_output_field_id(reference) {
    return reference + "-result";
  }

  /**
   * Adds the visited DefineInputCommand to the inputDefinitions collection
   * @param {DefineInputCommand} command 
   */
  visit_define_input_command(command) {
    this.input_definitions.push(command);
  }

  /**
   * Adds the visited DefineOutputCommand to the outputDefinitions collection
   * @param {DefineOutputCommand} command 
   */
  visit_define_output_command(command) {
    this.output_definitions.push(command);
  }
}

export class InputCollectorVisitor extends IOVisitor {
  constructor() {
    super();
    this.collected_input_data = {};
  }

  /**
   * Gets the input value from the input element from the dom
   * @param {string} input_reference - The reference to the input to collect 
   */
  _collect_input_value_from_dom(input_reference) {
    const id = this._to_input_field_id(input_reference);
    const input_element = document.querySelector(`#${id}`);
    const name = input_element.name;
    let value = input_element.value;

    if ("data_type" in input_element && input_element["data_type"] === "number") {
      value = parseFloat(value);
    }

    this.collected_input_data[name] = value;
  }

  visit_define_input_command(command) {
    super.visit_define_input_command(command);
    this._collect_input_value_from_dom(command.reference);
  }
}

export class OutputDisplayerVisitor extends IOVisitor {
  constructor(result_data, output_prefix = "") {
    super();
    this._result_data = result_data;
    this._output_prefix = output_prefix;
  }

  _output_result_to_dom(command) {
    const output_element_id = this._to_output_field_id(command.reference);
    const output_element = document.querySelector(`#${output_element_id}`);
    const value = this._result_data[command.reference];

    output_element.innerHTML = `${this._output_prefix} ${value.toFixed(2)}`;
  }

  visit_define_output_command(command) {
    super.visit_define_output_command(command);
    this._output_result_to_dom(command);
  }
}

export class IODomBuilderVisitor extends IOVisitor {
  constructor() {
    super();
    this.input_elements = {};
    this.output_elements = {};
    this.input_container_element = dom.create_element("div", {
      class: "inputFieldsContainer",
    });
    this.output_container_element = dom.create_element("div", {
      class: "outputFieldsContainer",
    });
  }

  visit_define_input_command(command) {
    super.visit_define_input_command(command);
    this._create_input_field(command);
  }

  visit_define_output_command(command) {
    super.visit_define_output_command(command);
    this._create_output_field(command);
  }

  reset_input_elements(){
    for(const key in this.input_elements){
      dom.reset_element_node(this.input_elements[key]);
    }
  }

  reset_output_elements(){
    for(const key in this.output_elements){
      this.output_elements[key].innerHTML = '';
    }
  }

  _create_input_element(validation_type, name, id, data_type, properties) {
    switch (validation_type) {
      case "value": {
        return dom.create_element("input", {
          type: "number",
          data_type,
          id,
          min: properties.min ?? null,
          value: 0,
          name,
        });
      }
      case "list": {
        return dom.create_element("select", {
          data_type,
          id,
          name,
        });
      }
      default: {
        return null;
      }
    }
  }

  _create_input_field(input_definition) {
    const { reference, text, data_type, validation_type, properties } = input_definition;

    const input_element_id = this._to_input_field_id(reference);

    const input_field_container = dom.create_container_with_label(text, input_element_id, ["form-control"]);

    const input_element = this._create_input_element(validation_type, reference, input_element_id, data_type, properties);

    if (!input_element) {
      throw new Error(`IODomBuilderVisitor: Invalid data_type has been provided in input definition for ${reference}(${data_type})`);
    }

    if (validation_type === "list" && "options" in properties) {
      dom.initialize_select(properties.options, input_element);
    }

    input_field_container.append(input_element);

    this.input_elements[reference] = input_element;
    this.input_container_element.append(input_field_container);
    return input_field_container;
  }

  _create_output_field(output_definition) {
    const output_field_id = this._to_output_field_id(output_definition.reference);
    const output_field_container = dom.create_container_with_label(output_definition.text, output_field_id, ["result"]);
    const output_element = dom.create_element("p", { id: output_field_id });

    output_field_container.append(output_element);
    this.output_container_element.append(output_field_container);
    this.output_elements[output_definition.reference] = output_element;
  }
}
