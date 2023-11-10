import * as dom from '../../utils/dom-creation.js';

export class Visitor {
  visitCommand(command) {}

  visitDefineInputCommand(command) {}

  visitArithmeticCommand(command) {}

  enterCommandList(commandList) {}

  exitCommandList(commandList) {}
}

export class IOVisitor extends Visitor {
  constructor(){
    super();
    this.inputDefinitions = [];
    this.outputDefinitions = [];
  }

  _toInputFieldId(reference){
    return reference + '-input';
  }

  _toOutputFieldId(reference){
    return reference + '-result';
  }

  visitDefineInputCommand(command) {
    this.inputDefinitions.push(command);
  }

  visitDefineOutputCommand(command) {
    this.outputDefinitions.push(command);
  }
}

export class InputCollectorVisitor extends IOVisitor{
  constructor(){
    super();
    this.collectedInputData = {};
  }

  _collectInputValueFromDom(inputReference){
    const id = this._toInputFieldId(inputReference);
    const inputElement = document.querySelector(`#${id}`);
    const name = inputElement.name;
    let value = inputElement.value;

    if ('dataType' in inputElement && inputElement['dataType'] === 'number') {
        value = parseFloat(value);
    }

    this.collectedInputData[name] = value;
  }

  visitDefineInputCommand(command) {
    super.visitDefineInputCommand(command);
    this._collectInputValueFromDom(command.reference);
    console.log('Input Data: ' ,this.collectedInputData);
  }

}

export class OutputDisplayerVisitor extends IOVisitor{
  constructor(resultData, outputPrefix = ''){
    super();
    this._resultData = resultData;
    this._outputPrefix = outputPrefix;
  }

  _outputResultToDom(){

  }

  visitDefineOutputCommand(command){
    super.visitDefineOutputCommand(command)

    const outputElementId = this._toOutputFieldId(command.reference);
    const outputElement = document.querySelector(`#${outputElementId}`);
    const value = this._resultData[command.reference];

    outputElement.innerHTML = `${this._outputPrefix} ${value.toFixed(2)}`;
  }
}

export class IODomBuilderVisitor extends IOVisitor {
  constructor() {
    super();
    this.inputElements = {};
    this.outputElements = {};
    this.inputContainerElement = dom.createElement('div', {class: 'inputFieldsContainer'});
    this.outputContainerElement = dom.createElement('div', {class: 'outputFieldsContainer'});
  }

  visitDefineInputCommand(command) {
    super.visitDefineInputCommand(command);
    this._createInputField(command);
  }

  visitDefineOutputCommand(command) {
    super.visitDefineOutputCommand(command);
    this._createOutputField(command);
  }

   _createInputElement(){

   }

  _createInputField(inputDefinition){
    const inputElementId = this._toInputFieldId(inputDefinition.reference);

    const { reference, text, dataType, validationType, properties } = inputDefinition;

    const inputFieldContainer = dom.createContainerWithLabel(text, inputElementId, ['form-control']);
    const inputElement =
        validationType === 'value' ? dom.createElement('input', {
            type: 'number',
            dataType: 'number',
            id: inputElementId,
            min: properties.min,
            value: 0,
            name: reference,
        })
            : validationType === 'list' ? dom.createElement('select', {
                dataType: 'number',
                id: inputElementId,
                name: reference
            })
                : false

    if (!inputElement) {
        throw new Error(`Invalid dataType has been provided in input definition for ${reference}(${dataType})`);
    }

    if (validationType === 'list' && 'options' in properties) {
        dom.initializeSelect(properties.options, inputElement);
    }

    inputFieldContainer.append(inputElement);

    this.inputElements[reference] = inputElement;
    this.inputContainerElement.append(inputFieldContainer)
    return inputFieldContainer;
  }

  _createOutputField(outputDefinition){
    const outputFieldId = this._toOutputFieldId(outputDefinition.reference);
    const outputFieldContainer = dom.createContainerWithLabel(outputDefinition.text, outputFieldId, ['result']);
    const outputElement = dom.createElement('p', { id: outputFieldId});

    outputFieldContainer.append(outputElement);
    this.outputContainerElement.append(outputFieldContainer);
    this.outputElements[outputDefinition.reference] = outputElement;
  }
}
