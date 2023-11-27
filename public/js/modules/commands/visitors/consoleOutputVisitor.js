import { Visitor } from "./visitor.js";

export class ConsoleOutputVisitor extends Visitor {
  constructor(data_sheet){
    super();
    this.data_sheet = data_sheet;
    this.output_definition_list = [];
    console.log("Output data: ")
  }

  visit_define_output_command(command){
    console.log(`${command.text}: `, this.data_sheet[command.reference])
  }
}