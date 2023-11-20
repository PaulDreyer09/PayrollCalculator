import { Visitor } from "./visitor.js";
import * as readline from "readline";

export class ConsoleInputVisitor extends Visitor {
  constructor() {
    super();
    this.define_input_commands = [];
    this.input_values = {};


  }

  async _read_number(prompt) {
    const consoleReader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    let resolved = false;
    let result = null;

    while (!resolved) {
      result = await new Promise((resolve) => {
        consoleReader.question(prompt, (input_value) => {
          const input_number = parseFloat(input_value);

          if (!isNaN(input_number)) {
            resolve(input_number);
            resolved = true;
            return
          }
          console.log('Please enter a valid number')
          resolve(null);
        });
      });
    }
    consoleReader.close();
    return result;
  }

  async get_input_values() {
    for (const command of this.define_input_commands) {      
      while(true){
        const data = {};
        data[command.reference] = await this._read_number(command.get_prompt_message_string());
        // this.input_values[command.reference] = await this._read_number(`Value for ${command.text}: `);

        try{
          command.execute(data);
          this.input_values[command.reference] = data[command.reference];
        } catch (error) {
          console.log('Caught an error');
          console.error(error.message);
          continue;
        }
        break;
      }

    }
    
  }

  visit_define_input_command(command) {
    this.define_input_commands.push(command);
  }
}
