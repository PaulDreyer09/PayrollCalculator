export class Visitor {
  //Composite Commands
  enterCommandList(commandList) {}
  
  exitCommandList(commandList) {}

  //Set Constant Commands
  visitSetTableCommand(command) {}
  
  visitSetValueCollectionCommand(command) {}
  
  visitSetValueCommand(command) {}

  //IO Commands  
  visitDefineInputCommand(command) {}
  
  visitDefineOutputCommand(command) {}
  
  //Arithmatic Commands
  visitAddCommand(command) {}
  
  visitSubtractCommand(command) {}
  
  visitMultiplyCommand(command) {}
  
  visitDivideCommand(command) {}
  
  visitAnnualizeCommand(command) {}
  
  visitDeAnnualizeCommand(command) {}
  
  visitLesserOfCommand(command) {}
  
  visitFlooredDifferenceCommand(command) {}
  
  visitCalculateLimitedPercentageCommand(command) {}
  
  visitTabledCalculationCommand(command) {}
  
  visitCalculateAddedTotalByTiersCommand(command) {}
  
  visitCalculateTaxByTiersCommand(command) {}

}
