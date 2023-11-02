import IODefinitionCommand from "./io-definition-command.js";

export default class DefineInputCommand extends IODefinitionCommand {
    constructor(reference, text, dataType, validationType, properties = null) {
        super(reference, text, dataType, validationType, properties, 'DefineInputCommand');
    };

    getInputDefinitions(){
        return [this, ...super.getInputDefinitions()];
    }
}