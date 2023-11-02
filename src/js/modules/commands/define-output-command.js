import IODefinitionCommand from "./io-definition-command.js";

export default class DefineOutputCommand extends IODefinitionCommand {
    constructor(reference, text, dataType, validationType, properties = null) {
        super(reference, text, dataType, validationType, properties, 'DefineOutputCommand');
    };

    getOutputDefinitions(){
        return [this, ...super.getOutputDefinitions()];
    }
}