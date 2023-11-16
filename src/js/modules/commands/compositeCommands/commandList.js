import { Command } from "../command.js";

export class CommandList extends Command {
  constructor(listName, ...children) {
    super();
    this.children = children;
    this.listName = listName;
  }

  /**
   * Creates an instance of the class using the key-value pairs insinde params
   * @param {object} params - Object containing the parameters to create an instance of the class
   * @returns {CommandList}
   */
  static factory(params) {
    return new CommandList(params.listName);
  }

  add(command){
    if(!(command instanceof Command)){
        throw new Error('The provided data is not an instance of a Command subclass. Provided: ', command);
    }
    this.children.push(command);
  }

  execute(dataSheet) {
    for (const command of this.children) {
      dataSheet = command.execute(dataSheet);
    }
    return dataSheet;
  }

    /**
   * Accept a Visitor object to call the opproptiate visit, enter and exit methods for the commandList 
   * @param {Visitor} visitor 
   */
  accept(visitor) {
    visitor.enterCommandList(this);
    for (const command of this.children) {
      command.accept(visitor);
    }
    visitor.exitCommandList(this);
    return visitor;
  }
}
