import { Command } from "../command.js";

export class CommandList extends Command {
  constructor(list_name) {
    super();
    this.children = [];
    this.list_name = list_name;
  }

  add(command){
    if(!(command instanceof Command)){
        throw new Error('The provided data is not an instance of a Command subclass. Provided: ', command);
    }
    this.children.push(command);
  }

  execute(data_sheet) {
    for (const command of this.children) {
      data_sheet = command.execute(data_sheet);
    }
    return data_sheet;
  }

    /**
   * Accept a Visitor object to call the opproptiate visit, enter and exit methods for the commandList 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.enter_command_list(this);
    for (const command of this.children) {
      command.accept(visitor);
    }
    visitor.exit_command_list(this);
    return visitor;
  }
}

export const register_classes_to_factory = (factory) => {
  const class_list = [
    CommandList,
  ]
  
  for(const class_constructor of class_list){
    factory.register_class(class_constructor);
  }
}