export class Visitor {
  visitCommand(command) {}

  visitDefineInputCommand(command) {}

  enterCommandList(commandList) {}

  exitCommandList(commandList) {}
}

export class IODomBuilderVisitor {
  constructor() {
    this.inputDefinitions = [];
    this.outputDefinitions = [];
    this.inputContainerElement = document.createElement('div', {id: 'inputContainer'});
    this.outputContainerElement = document.createElement('div', {id: 'outputContainer'});
  }

  visitDefineInputCommand(command) {
    this.inputDefinitions.push(command);
  }

  visitDefineOutputCommand(command) {
    this.outputDefinitions.push(command);
  }
}
