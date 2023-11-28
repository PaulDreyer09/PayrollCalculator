import * as calc from "../../../payrollFunctions/calculationFunctions.js";
import * as validation from "../../../utils/validation.js";
import { ArithmeticCommand } from "./arithmaticCommand.js";
import * as commands from "./arithmaticCommandTypes.js";

describe("ArithmeticCommand class Tests", () => {
  //Test function to instantiate ArithmeticCommand with
  const add_function = (a, b) => a + b;
  const params = ["result", "input1", "input2"];
  const command = new ArithmeticCommand(add_function, ...params);

  it("Test if properties are instantiated correctly", () => {
    expect(command.func).toBe(add_function);
    expect(command.result_reference).toBe(params[0]);
    expect(command.input_references[0]).toBe(params[1]);
    expect(command.input_references[1]).toBe(params[2]);
  });

  it("Test if the Arithmatic command execute reads and writes the data on a data_sheet object correctly", () => {
    let data_sheet1 = { input1: 2, input2: 3 };
    let data_sheet2 = { input1: 1, input2: 2 };

    data_sheet1 = command.execute(data_sheet1);
    data_sheet2 = command.execute(data_sheet2);

    //Validate the data in data_sheet1 is modified correctly
    expect(data_sheet1[command.result_reference]).toBe(5);
    expect(data_sheet1[command.input_references[0]]).toBe(2);
    expect(data_sheet1[command.input_references[1]]).toBe(3);

    //Validate the data in data_sheet2 is modified correctly
    expect(data_sheet2[command.result_reference]).toBe(3);
    expect(data_sheet2[command.input_references[0]]).toBe(1);
    expect(data_sheet2[command.input_references[1]]).toBe(2);

    //Validate if the data_sheet objects has only the defined references as keys
    expect(validation.object_keys_contains_strings(data_sheet1, params)).toBe(true);
    expect(validation.object_keys_contains_strings(data_sheet2, params)).toBe(true);
  });

  it("Test `get_known_valid_number` method of `ArithmeticCommand` valid cases", () => {
    const data_sheet = command.execute({ input1: 1, input2: 2 });

    expect(command.get_known_valid_number(data_sheet, params[0])).toBe(3);
    expect(command.get_known_valid_number(data_sheet, params[1])).toBe(1);
    expect(command.get_known_valid_number(data_sheet, params[2])).toBe(2);
  });

  it("Test `get_known_valid_number` method of `ArithmeticCommand` invalid cases", () => {
    //Test with a valid number and ensure it returns the correct value.
    expect(() => command.get_known_valid_number({ input: "String" }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input: null }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input: NaN }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input: undefined }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input: true }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input: [] }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input: {} }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input: () => {} }, "input")).toThrow();

    //Test with a non-existent key.
    expect(() => command.get_known_valid_number({ input: 5 }, "unknown")).toThrow();
  });
});

describe("Test Addcommand Class", () => {
  const params = ["result", "input1", "input2"];
  const command = new commands.AddCommand(...params);
})

/**
 * 4. Test `AddCommand` instantiation:
 *    - Ensure that an `AddCommand` instance is created successfully.
 *    - Check that the properties (`name`, `func`, `result_reference`, `input_references`, etc.) are set correctly.
 */

/**
 * 5. Test `execute` method of `AddCommand`:
 *    - Provide a mock `data_sheet` object with input values and check if the `execute` method returns the correct sum.
 */

/**
 * 6. Test the error handling:
 *    - Test that the `execute` method throws an error if any of the input references are not present in the `data_sheet`.
 *    - Test that the `get_known_valid_number` method throws an error if the key is not found or if the associated value is not a valid number.
 */
