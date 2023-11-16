import * as dom from "../../utils/domManipulation.js";
import { DefineInputCommand } from "../ioCommands/IODefinitionCommandTypes.js";
import { Visitor } from "./visitor.js";

export class IOVisitor extends Visitor {
  constructor() {
    super();
    this.inputDefinitions = [];
    this.outputDefinitions = [];
  }

  /**
   * Adds a "-input" prefix to the given reference string
   * @param {string} reference 
   * @returns 
   */
  _toInputFieldId(reference) {
    return reference + "-input";
  }

  /**
   * Adds a "-result" prefix to the given reference string
   * @param {string} reference 
   * @returns 
   */
  _toOutputFieldId(reference) {
    return reference + "-result";
  }

  /**
   * Adds the visited DefineInputCommand to the inputDefinitions collection
   * @param {DefineInputCommand} command 
   */
  visitDefineInputCommand(command) {
    this.inputDefinitions.push(command);
  }

    /**
   * Adds the visited DefineOutputCommand to the outputDefinitions collection
   * @param {DefineOutputCommand} command 
   */
  visitDefineOutputCommand(command) {
    this.outputDefinitions.push(command);
  }
}

export class InputCollectorVisitor extends IOVisitor {
  constructor() {
    super();
    this.collectedInputData = {};
  }

  /**
   * Gets the input value from the input element from the dom
   * @param {string} inputReference - The reference to the input to collect 
   */
  _collectInputValueFromDom(inputReference) {
    const id = this._toInputFieldId(inputReference);
    const inputElement = document.querySelector(`#${id}`);
    const name = inputElement.name;
    let value = inputElement.value;

    if ("dataType" in inputElement && inputElement["dataType"] === "number") {
      value = parseFloat(value);
    }

    this.collectedInputData[name] = value;
  }

  visitDefineInputCommand(command) {
    super.visitDefineInputCommand(command);
    this._collectInputValueFromDom(command.reference);
  }
}

export class OutputDisplayerVisitor extends IOVisitor {
  constructor(resultData, outputPrefix = "") {
    super();
    this._resultData = resultData;
    this._outputPrefix = outputPrefix;
  }

  _outputResultToDom(command) {
    const outputElementId = this._toOutputFieldId(command.reference);
    const outputElement = document.querySelector(`#${outputElementId}`);
    const value = this._resultData[command.reference];

    outputElement.innerHTML = `${this._outputPrefix} ${value.toFixed(2)}`;
  }

  visitDefineOutputCommand(command) {
    super.visitDefineOutputCommand(command);
    this._outputResultToDom(command);
  }
}

export class IODomBuilderVisitor extends IOVisitor {
  constructor() {
    super();
    this.inputElements = {};
    this.outputElements = {};
    this.inputContainerElement = dom.createElement("div", {
      class: "inputFieldsContainer",
    });
    this.outputContainerElement = dom.createElement("div", {
      class: "outputFieldsContainer",
    });
  }

  visitDefineInputCommand(command) {
    super.visitDefineInputCommand(command);
    this._createInputField(command);
  }

  visitDefineOutputCommand(command) {
    super.visitDefineOutputCommand(command);
    this._createOutputField(command);
  }

  resetInputElements(){
    for(const key in this.inputElements){
      dom.resetElementNode(this.inputElements[key]);
    }
  }

  resetOutputElements(){
    for(const key in this.outputElements){
      this.outputElements[key].innerHTML = '';
    }
  }

  _createInputElement(validationType, name, id, dataType, properties) {
    switch (validationType) {
      case "value": {
        return dom.createElement("input", {
          type: "number",
          dataType,
          id,
          min: properties.min ?? null,
          value: 0,
          name,
        });
      }
      case "list": {
        return dom.createElement("select", {
          dataType,
          id,
          name,
        });
      }
      default: {
        return null;
      }
    }
  }

  _createInputField(inputDefinition) {
    const { reference, text, dataType, validationType, properties } = inputDefinition;

    const inputElementId = this._toInputFieldId(reference);

    const inputFieldContainer = dom.createContainerWithLabel(text, inputElementId, ["form-control"]);

    const inputElement = this._createInputElement(validationType, reference, inputElementId, dataType, properties);

    if (!inputElement) {
      throw new Error(`IODomBuilderVisitor: Invalid dataType has been provided in input definition for ${reference}(${dataType})`);
    }

    if (validationType === "list" && "options" in properties) {
      dom.initializeSelect(properties.options, inputElement);
    }

    inputFieldContainer.append(inputElement);

    this.inputElements[reference] = inputElement;
    this.inputContainerElement.append(inputFieldContainer);
    return inputFieldContainer;
  }

  _createOutputField(outputDefinition) {
    const outputFieldId = this._toOutputFieldId(outputDefinition.reference);
    const outputFieldContainer = dom.createContainerWithLabel(outputDefinition.text, outputFieldId, ["result"]);
    const outputElement = dom.createElement("p", { id: outputFieldId });

    outputFieldContainer.append(outputElement);
    this.outputContainerElement.append(outputFieldContainer);
    this.outputElements[outputDefinition.reference] = outputElement;
  }
}
