import * as validation from "./validation.js";
import * as readline from "readline";

/**
 * Creates a console reader interface to request input from
 * @returns {readline.Interface} - Returns a readline interface connected to the process.stdin and process.stdout
 */
export const create_console_reader = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Requests a valid number until one is entered to the console
 * @param {string} prompt 
 * @returns {number} - returns the number given to the input console
 */
export const read_number_input =  async (prompt) => {
  const consoleReader = create_console_reader();
  let resolved = false;
  let result = null;

  while (!resolved) {
    result = await new Promise((resolve) => {
      consoleReader.question(prompt, (input_value) => {
        const input_number = parseFloat(input_value);

        if (!isNaN(input_number)) {
          resolve(input_number);
          resolved = true;
          return;
        }

        console.log("Please enter a valid number");
        resolve(null);
      });
    });
  }
  consoleReader.close();
  return result;
}

/**
 * Requests a valid string until one is entered to the console
 * Repeats if blank or white space is entered
 * @param {string} prompt 
 * @returns {string} - returns the string given to the input console
 */
export const read_string_input = async () => {
  const consoleReader = create_console_reader();
  let resolved = false;
  let result = null;

  while (!resolved) {
    result = await new Promise((resolve) => {

      consoleReader.question(prompt, (input_value) => {
        try{
          if (validation.valid_string(input_value)) {
            resolve(input_number);
            resolved = true;
            return;
          }

        } catch (error) {
          console.log(error.message, "Please enter a valid string.");
          resolve(null);
        }
      });
    });
  }
}