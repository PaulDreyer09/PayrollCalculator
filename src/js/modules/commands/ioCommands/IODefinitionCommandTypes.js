import {IODefinitionCommand} from "./IODefinitionCommand.js";

export class DefineInputCommand extends IODefinitionCommand {
    constructor(reference, text, dataType, validationType, properties = null) {
        super(reference, text, dataType, validationType, properties, 'DefineInputCommand');
    };

    accept(visitor){
        visitor.visitDefineInputCommand(this);
    }
}

export class DefineOutputCommand extends IODefinitionCommand {
  constructor(reference, text, dataType, validationType, properties = null) {
      super(reference, text, dataType, validationType, properties, 'DefineOutputCommand');
  };

  accept(visitor){
      visitor.visitDefineOutputCommand(this);
      return visitor;
  }
}