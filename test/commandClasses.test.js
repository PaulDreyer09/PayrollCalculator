import * as calc from "../public/js/modules/payrollFunctions/calculationFunctions.js";
import * as validation from "../public/js/modules/utils/validation.js";
import { ArithmeticCommand } from "../public/js/modules/commands/classes/arithmaticCommands/arithmaticCommand.js";
import * as commands from "../public/js/modules/commands/classes/arithmaticCommands/arithmaticCommandTypes.js";
import {Visitor} from "../public/js/modules/commands/visitors/visitor.js";
import {jest} from '@jest/globals';

describe("Test ArithmeticCommand Class", () => {
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

  it("Test `execute` method invalid cases", () => {
    //Test when input1 is missing in data_sheet
    expect(() => command.execute({ input2: 2, input3: 3 })).toThrow();

    //Test when input2 is missing in data_sheet
    expect(() => command.execute({ input1: 2, input3: 3 })).toThrow();
  })

  it("Test `get_known_valid_number` method valid cases", () => {
    const data_sheet = command.execute({ input1: 1, input2: 2 });

    expect(command.get_known_valid_number(data_sheet, params[0])).toBe(3);
    expect(command.get_known_valid_number(data_sheet, params[1])).toBe(1);
    expect(command.get_known_valid_number(data_sheet, params[2])).toBe(2);
  });

  it("Test `get_known_valid_number` method invalid cases", () => {
    //Test with a valid reference but the input value is invalid
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

  it("Test if properties are instantiated correctly", () => {
    expect(command.func).toBe(calc.sum);
    expect(command.result_reference).toBe(params[0]);
    expect(command.input_references[0]).toBe(params[1]);
    expect(command.input_references[1]).toBe(params[2]);
  });

  it("Test if execute reads and writes the data on a data_sheet object correctly", () => {
    let data_sheet1 = { input1: 2, input2: 3 };

    data_sheet1 = command.execute(data_sheet1);

    //Validate the data in data_sheet1 is modified correctly
    expect(data_sheet1[command.result_reference]).toBe(5);
    expect(data_sheet1[command.input_references[0]]).toBe(2);
    expect(data_sheet1[command.input_references[1]]).toBe(3);

    //Validate if the data_sheet objects has only the defined references as keys
    expect(validation.object_keys_contains_strings(data_sheet1, params)).toBe(true);
  });

  it("Test `execute` method invalid cases", () => {
    //Test when input1 is missing in data_sheet
    expect(() => command.execute({ input2: 2, input3: 3 })).toThrow();

    //Test when input2 is missing in data_sheet
    expect(() => command.execute({ input1: 2, input3: 3 })).toThrow();
  })

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

})

describe("Test SubtractCommand Class", () => {
  const params = ["result", "input1", "input2"];
  const command = new commands.SubtractCommand(...params);

  it("Test if properties are instantiated correctly", () => {
    expect(command.func).toBe(calc.subtract);
    expect(command.result_reference).toBe(params[0]);
    expect(command.input_references[0]).toBe(params[1]);
    expect(command.input_references[1]).toBe(params[2]);
  });

  it("Test if the Arithmatic command execute reads and writes the data on a data_sheet object correctly", () => {
    let data_sheet1 = { input1: 2, input2: 3 };

    data_sheet1 = command.execute(data_sheet1);

    //Validate the data in data_sheet1 is modified correctly
    expect(data_sheet1[command.result_reference]).toBe(-1);
    expect(data_sheet1[command.input_references[0]]).toBe(2);
    expect(data_sheet1[command.input_references[1]]).toBe(3);

    //Validate if the data_sheet objects has only the defined references as keys
    expect(validation.object_keys_contains_strings(data_sheet1, params)).toBe(true);
  });

  it("Test `get_known_valid_number` method of `ArithmeticCommand` valid cases", () => {
    const data_sheet = command.execute({ input1: 1, input2: 2 });

    expect(command.get_known_valid_number(data_sheet, params[0])).toBe(-1);
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

})

describe("Test MultiplyCommand Class", () => {
  const params = ["result", "input1", "input2"];
  const command = new commands.MultiplyCommand(...params);

  it("Test if properties are instantiated correctly", () => {
    expect(command.func).toBe(calc.multiply);
    expect(command.result_reference).toBe(params[0]);
    expect(command.input_references[0]).toBe(params[1]);
    expect(command.input_references[1]).toBe(params[2]);
  });

  it("Test if  execute reads and writes the data on a data_sheet object correctly", () => {
    let data_sheet1 = { input1: 2, input2: 3 };

    data_sheet1 = command.execute(data_sheet1);

    //Validate the data in data_sheet1 is modified correctly
    expect(data_sheet1[command.result_reference]).toBe(6);
    expect(data_sheet1[command.input_references[0]]).toBe(2);
    expect(data_sheet1[command.input_references[1]]).toBe(3);

    //Validate if the data_sheet objects has only the defined references as keys
    expect(validation.object_keys_contains_strings(data_sheet1, params)).toBe(true);
  });

  it("Test `get_known_valid_number` method valid cases", () => {
    const data_sheet = command.execute({ input1: 1, input2: 2 });

    expect(command.get_known_valid_number(data_sheet, params[0])).toBe(2);
    expect(command.get_known_valid_number(data_sheet, params[1])).toBe(1);
    expect(command.get_known_valid_number(data_sheet, params[2])).toBe(2);
  });

  it("Test `get_known_valid_number` method invalid cases", () => {
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

})

describe("Test DivideCommand Class", () => {
  const params = ["result", "input1", "input2"];
  const command = new commands.DivideCommand(...params);

  it("Test if properties are instantiated correctly", () => {
    expect(command.func).toBe(calc.divide);
    expect(command.result_reference).toBe(params[0]);
    expect(command.input_references[0]).toBe(params[1]);
    expect(command.input_references[1]).toBe(params[2]);
  });

  it("Test if execute reads and writes the data on a data_sheet object correctly", () => {
    let data_sheet1 = { input1: 3, input2: 2 };

    data_sheet1 = command.execute(data_sheet1);

    //Validate the data in data_sheet1 is modified correctly
    expect(data_sheet1[command.result_reference]).toBe(1.5);
    expect(data_sheet1[command.input_references[0]]).toBe(3);
    expect(data_sheet1[command.input_references[1]]).toBe(2);

    //Validate if the data_sheet objects has only the defined references as keys
    expect(validation.object_keys_contains_strings(data_sheet1, params)).toBe(true);
  });

  it("Test `get_known_valid_number` method valid cases", () => {
    const data_sheet = command.execute({ input1: 1, input2: 2 });

    expect(command.get_known_valid_number(data_sheet, params[0])).toBe(0.5);
    expect(command.get_known_valid_number(data_sheet, params[1])).toBe(1);
    expect(command.get_known_valid_number(data_sheet, params[2])).toBe(2);
  });

  it("Test `get_known_valid_number` method invalid cases", () => {
    //Test with a valid number and ensure it returns the correct value.
    expect(() => command.get_known_valid_number({ input1: "String" }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input1: null }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input1: NaN }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input1: undefined }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input1: true }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input1: [] }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input1: {} }, "input")).toThrow();
    expect(() => command.get_known_valid_number({ input1: () => {} }, "input")).toThrow();

    //Test with a non-existent key.
    expect(() => command.get_known_valid_number({ input: 5 }, "unknown")).toThrow();
  });

})

describe("Test AnnualizeCommand Class", () => {
  const params = ["result", "input_value_reference", "periods_per_annum_reference"];
  const command = new commands.AnnualizeCommand(...params);

  it("Test if properties are instantiated correctly", () => {
    expect(command.func).toBe(calc.annualize);
    expect(command.result_reference).toBe(params[0]);
    expect(command.input_value_reference).toBe(params[1]);
    expect(command.periods_per_annum_reference).toBe(params[2]);
  });

  it("Test if execute reads and writes the data on a data_sheet object correctly", () => {
    let data_sheet1 = { input_value_reference: 1000, periods_per_annum_reference: 2 };

    data_sheet1 = command.execute(data_sheet1);

    //Validate the data in data_sheet1 is modified correctly
    expect(data_sheet1[command.result_reference]).toBe(2000);
    expect(data_sheet1[command.input_value_reference]).toBe(1000);
    expect(data_sheet1[command.periods_per_annum_reference]).toBe(2);

    //Validate if the data_sheet objects has only the defined references as keys
    expect(validation.object_keys_contains_strings(data_sheet1, params)).toBe(true);
  });

  it("Test `get_known_valid_number` method valid cases", () => {
    const data_sheet = command.execute({ input_value_reference: 1, periods_per_annum_reference: 2 });

    expect(command.get_known_valid_number(data_sheet, params[0])).toBe(2);
    expect(command.get_known_valid_number(data_sheet, params[1])).toBe(1);
    expect(command.get_known_valid_number(data_sheet, params[2])).toBe(2);
  });

  it("Test `get_known_valid_number` method invalid cases", () => {
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

})


// DeAnnualizeCommand
// LesserOfCommand
// FlooredDifferenceCommand
// CalculateLimitedPercentageCommand
// CalculateAddedTotalByTiersCommand
// CalculateTaxByTiersCommand
// CommandList
// DefineInputCommand
// DefineOutputCommand
// SetValueCollectionCommand
// SetTableCommand
// SetValueCommand

//Accept Visitor for all commands
//Register command to factory functions