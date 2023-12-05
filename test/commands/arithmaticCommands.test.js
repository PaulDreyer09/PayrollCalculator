import * as calc from "../../public/js/modules/payrollFunctions/calculationFunctions.js";
import * as commands from "../../public/js/modules/commands/classes/arithmaticCommands/arithmaticCommandTypes.js";
import * as table_commands from "../../public/js/modules/commands/classes/arithmaticCommands/tabledCalculationCommandTypes.js";
import { Command } from "../../public/js/modules/commands/classes/command.js";
import * as composite_commands from "../../public/js/modules/commands/classes/compositeCommands/commandList.js";
import {
  object_to_object_copy_list_with_modified_property,
  array_to_array_of_arrays_with_modified_at_index,
} from "../../public/js/modules/utils/objectManipulation.js";

const get_invalid_number_data_test_cases = () => {
  return ["Invalid", NaN, undefined, null, [], true, () => {}, {}, Infinity, true];
};

const get_invalid_string_data_test_cases = () => {
  return [5, NaN, undefined, null, [], true, () => {}, {}, Infinity, true];
};

const get_invalid_command_instance_test_cases = () => [
  "Invalid input string that is very long for this array of items to break down using prettier",
  2,
  NaN,
  undefined,
  null,
  [],
  true,
  () => {},
  {},
  Infinity,
  true,
]

/**
 * Test valid cases for a command.
 * @param {string} title - Title for the described tests to be run by the function.
 * @param {Command} command_constructor - Command class constructor to test.
 * @param {function} expected_function - Expected function to be registered to the class being tested.
 * @param {Array<string>} references - Array of references used in creating the class.
 *                                   Position 0 is the reference for the result, and the rest are input references.
 * @param {Array<object>} test_cases - Array of data sheets for testing executing the command which includes an "expected" key with the expected result to test.
 * @returns {Command} - return the command created during testing
 */
const test_command_instanciates_successfully = (title, command_constructor, expected_function, references) => {
  references = [...references];
  const command = new command_constructor(...references);

  describe(title, () => {
    test("References added correctly", () => {
      //Shift out result_reference and test if command has it registered
      expect(references.shift()).toEqual(command.result_reference);
      //Test if the rest of the refs are registered to command's input_references
      expect(references).toEqual(command.input_references);
    });

    test(`Test if correct function is registered(${expected_function.name})`, () => {
      expect(command.func).toBe(expected_function);
    });
  });

  return command;
};

/**
 * Test the execute method of a given Command class on a given list of data_sheet object test cases
 * @param {string} title - Title for the test describe being done in the function
 * @param {Command} command - Instance of the command to be tested
 * @param {Array} command_references - List of string references to build the command instance
 * @param {Array<object>} test_case_data_sheet_list - list of data_sheet objects to test execute of the Command on
 */
const test_arithmatic_command_execute_valid_cases = (title, command, test_case_data_sheet_list) => {
  describe.each(test_case_data_sheet_list)(title, (data_sheet) => {
    test(String(data_sheet), () => {
      expect(command.execute(data_sheet)[command.result_reference]).toBe(data_sheet["expected"]);
    });
  });
};

/**
 * Test command execution with invalid data sheets.
 * @param {string} title - Title for the described tests to be run by the function.
 * @param {Command} command - Command object to test.
 * @param {Array<object>} data_sheet_list - Array of data sheets for testing execution of the command.
 */
const test_arithmatic_command_execute_throws_with_invalid_data_sheets = (title, command, data_sheet_list) => {
  describe.each(data_sheet_list)(title, (data_sheet) => {
    test("Input: " + data_sheet, () => {
      expect(() => command.execute(data_sheet_list)).toThrow();
    });
  });
};

/**
 * Test invalid references for a command to throw.
 * @param {string} title - Title for the described tests to be run by the function.
 * @param {Command} command_constructor - Command class constructor to test.
 * @param {Array<Array<any>>} refs_list - Array of invalid reference lists to test.
 */
const test_command_instanciate_fails_with_invalid_refs = (title, command_constructor, refs_list) => {
  describe(title, () => {
    describe.each(refs_list)("Non string result_reference $refs", (...refs) => {
      test("to throw", () => {
        expect(() => new command_constructor(...refs)).toThrow();
      });
    });

    test("No input references to throw", () => {
      expect(() => new command_constructor("result")).toThrow();
    });
  });
};

describe("AddCommand class tests", () => {
  const refs = ["result", "input1", "input2"];

  const command = test_command_instanciates_successfully("Valid cases", commands.AddCommand, calc.sum, refs);

  const invalid_refs = array_to_array_of_arrays_with_modified_at_index(refs, 0, get_invalid_string_data_test_cases());
  test_command_instanciate_fails_with_invalid_refs("Invalid cases", commands.AddCommand, invalid_refs);

  describe("Test execute method: ", () => {
    const valid_test_cases = [
      { input1: 2, input2: 3, expected: 5 },
      { input1: 3, input2: 3, expected: 6 },
    ];
    const invalid_data_types_test_cases = object_to_object_copy_list_with_modified_property(valid_test_cases, "input1", get_invalid_number_data_test_cases());

    test_arithmatic_command_execute_valid_cases("Valid Cases", command, valid_test_cases);
    test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data sheet cases", command, invalid_data_types_test_cases);
  });
});

describe("SubtractCommand class tests", () => {
  const refs = ["result", "input1", "input2"];

  const command = test_command_instanciates_successfully("Valid cases", commands.SubtractCommand, calc.subtract, refs);

  const invalid_refs = array_to_array_of_arrays_with_modified_at_index(refs, 0, get_invalid_string_data_test_cases());
  test_command_instanciate_fails_with_invalid_refs("Invalid cases", commands.SubtractCommand, invalid_refs);

  describe("Test execute method: ", () => {
    const valid_test_cases = [
      { input1: 2, input2: 3, expected: -1 },
      { input1: 3, input2: 3, expected: 0 },
    ];
    const invalid_data_types_test_cases = object_to_object_copy_list_with_modified_property(valid_test_cases, "input1", get_invalid_number_data_test_cases());

    test_arithmatic_command_execute_valid_cases("Valid Cases", command, valid_test_cases);
    test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data sheet cases", command, invalid_data_types_test_cases);
  });
});

describe("MultiplyCommand class tests", () => {
  const refs = ["result", "input1", "input2"];

  const command = test_command_instanciates_successfully("Valid cases", commands.MultiplyCommand, calc.multiply, refs);

  const invalid_refs = array_to_array_of_arrays_with_modified_at_index(refs, 0, get_invalid_string_data_test_cases());
  test_command_instanciate_fails_with_invalid_refs("Invalid cases", commands.MultiplyCommand, invalid_refs);

  describe("Test execute method: ", () => {
    const valid_test_cases = [
      { input1: 2, input2: 3, expected: 6 },
      { input1: 3, input2: 3, expected: 9 },
    ];

    const invalid_data_types_test_cases = object_to_object_copy_list_with_modified_property(valid_test_cases, "input1", get_invalid_number_data_test_cases());

    test_arithmatic_command_execute_valid_cases("Valid Cases", command, valid_test_cases);
    test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data sheet cases", command, invalid_data_types_test_cases);
  });
});

describe("DivideCommand class tests", () => {
  const refs = ["result", "input1", "input2"];
  const command = test_command_instanciates_successfully("Valid cases", commands.DivideCommand, calc.divide, refs);

  const invalid_refs = array_to_array_of_arrays_with_modified_at_index(refs, 0, get_invalid_string_data_test_cases());
  test_command_instanciate_fails_with_invalid_refs("Invalid cases", commands.DivideCommand, invalid_refs);

  describe("Test execute method: ", () => {
    const valid_test_cases = [
      { input1: 9, input2: 3, expected: 3 },
      { input1: 4, input2: 1, expected: 4 },
    ];
    const invalid_data_types_test_cases = object_to_object_copy_list_with_modified_property(valid_test_cases, "input1", get_invalid_number_data_test_cases());

    test_arithmatic_command_execute_valid_cases("Valid Cases", command, valid_test_cases);
    test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data sheet cases", command, invalid_data_types_test_cases);
  });
});

describe("AnnualizeCommand class tests", () => {
  const refs = ["result", "input_value", "periods"];
  const command = test_command_instanciates_successfully("Valid cases", commands.AnnualizeCommand, calc.annualize, refs);

  const invalid_refs = array_to_array_of_arrays_with_modified_at_index(refs, 0, get_invalid_string_data_test_cases());
  test_command_instanciate_fails_with_invalid_refs("Invalid cases", commands.AnnualizeCommand, invalid_refs);

  describe("Test execute method: ", () => {
    const valid_test_cases = [
      { input_value: 1000, periods: 3, expected: 3000 },
      { input_value: 500, periods: 100, expected: 50000 },
    ];

    const invalid_data_types_test_cases = object_to_object_copy_list_with_modified_property(
      valid_test_cases,
      "input_value",
      get_invalid_number_data_test_cases()
    );

    test_arithmatic_command_execute_valid_cases("Valid Cases", command, valid_test_cases);
    test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data sheet cases", command, invalid_data_types_test_cases);
  });
});

describe("DeAnnualizeCommand class tests", () => {
  const refs = ["result", "input_value", "periods"];

  const command = test_command_instanciates_successfully("Valid cases", commands.DeAnnualizeCommand, calc.de_annualize, refs);

  const invalid_refs = array_to_array_of_arrays_with_modified_at_index(refs, 0, get_invalid_string_data_test_cases());
  test_command_instanciate_fails_with_invalid_refs("Invalid cases", commands.DeAnnualizeCommand, invalid_refs);

  describe("Test execute method: ", () => {
    const valid_test_cases = [
      { input_value: 300, periods: 3, expected: 100 },
      { input_value: 500, periods: 100, expected: 5 },
    ];

    const invalid_data_types_test_cases = object_to_object_copy_list_with_modified_property(
      valid_test_cases,
      "input_value",
      get_invalid_number_data_test_cases()
    );

    test_arithmatic_command_execute_valid_cases("Valid Cases", command, valid_test_cases);
    test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data sheet cases", command, invalid_data_types_test_cases);
  });
});

describe("LesserOfCommand class tests", () => {
  const refs = ["result", "input1", "input2"];

  const command = test_command_instanciates_successfully("Valid cases", commands.LesserOfCommand, calc.lesser_of, refs);

  const invalid_refs = array_to_array_of_arrays_with_modified_at_index(refs, 0, get_invalid_string_data_test_cases());
  test_command_instanciate_fails_with_invalid_refs("Invalid cases", commands.LesserOfCommand, invalid_refs);

  describe("Test execute method: ", () => {
    const valid_test_cases = [
      { input1: 2, input2: 3, expected: 2 },
      { input1: 22, input2: 9, expected: 9 },
    ];
    const invalid_data_types_test_cases = object_to_object_copy_list_with_modified_property(valid_test_cases, "input1", get_invalid_number_data_test_cases());

    test_arithmatic_command_execute_valid_cases("Valid Cases", command, valid_test_cases);
    test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data sheet cases", command, invalid_data_types_test_cases);
  });
});

describe("FlooredDifferenceCommand class tests", () => {
  const refs = ["result", "input1", "input2"];
  const command = test_command_instanciates_successfully("Valid cases", commands.FlooredDifferenceCommand, calc.floored_difference, refs);

  const invalid_refs = array_to_array_of_arrays_with_modified_at_index(refs, 0, get_invalid_string_data_test_cases());
  test_command_instanciate_fails_with_invalid_refs("Invalid cases", commands.FlooredDifferenceCommand, invalid_refs);

  describe("Test execute method: ", () => {
    const valid_test_cases = [
      { input1: 2, input2: 3, expected: 0 },
      { input1: 3, input2: 3, expected: 0 },
    ];

    const invalid_data_types_test_cases = object_to_object_copy_list_with_modified_property(valid_test_cases, "input1", get_invalid_number_data_test_cases());

    test_arithmatic_command_execute_valid_cases("Valid Cases", command, valid_test_cases);
    test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data sheet cases", command, invalid_data_types_test_cases);
  });
});

describe("CalculateLimitedPercentageCommand class tests", () => {
  const refs = ["result", "input_value", "rate", "ceiling"];

  const command = test_command_instanciates_successfully("Valid cases", commands.CalculateLimitedPercentageCommand, calc.calculate_limited_percentage, refs);

  const invalid_refs = array_to_array_of_arrays_with_modified_at_index(refs, 0, get_invalid_string_data_test_cases());
  test_command_instanciate_fails_with_invalid_refs("Invalid cases", commands.CalculateLimitedPercentageCommand, invalid_refs);

  describe("Test execute method: ", () => {
    const valid_test_cases = [
      {
        expected: 177.12,
        input_value: 20000,
        rate: 1,
        ceiling: 17712,
      },
      {
        expected: 100,
        input_value: 10000,
        rate: 1,
        ceiling: 17712,
      },
    ];

    const invalid_data_types_test_cases = object_to_object_copy_list_with_modified_property(valid_test_cases, "rate", get_invalid_number_data_test_cases());

    test_arithmatic_command_execute_valid_cases("Valid Cases", command, valid_test_cases);
    test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data sheet cases", command, invalid_data_types_test_cases);
  });
});

describe("CalculateAddedTotalByTiersCommand class tests", () => {
  const refs = ["results", "table", "input_value"];

  const command = test_command_instanciates_successfully("Valid cases", table_commands.CalculateAddedTotalByTiersCommand, calc.calculate_added_total_by_tiers, refs);
  
  const invalid_refs = array_to_array_of_arrays_with_modified_at_index(refs, 0, get_invalid_string_data_test_cases());
  test_command_instanciate_fails_with_invalid_refs("Invalid cases", table_commands.CalculateAddedTotalByTiersCommand, invalid_refs);
  
  describe("Test execute method: ", () => {
    const valid_test_cases = [
      {
        table: [
          {
            max: 65,
            value: 10000,
          },
          {
            max: 75,
            value: 5000,
          },
          {
            max: 1.7976931348623157e308,
            value: 2500,
          },
        ],
        input_value: 64,
        expected: 10000,
      },
      {
        table: [
          {
            max: 65,
            value: 10000,
          },
          {
            max: 75,
            value: 5000,
          },
          {
            max: 1.7976931348623157e308,
            value: 2500,
          },
        ],
        input_value: 100,
        expected: 17500,
      },
    ];

    const invalid_data_types_test_cases = object_to_object_copy_list_with_modified_property(valid_test_cases, "input_value", get_invalid_number_data_test_cases());

    test_arithmatic_command_execute_valid_cases("Valid Cases", command, valid_test_cases);
    test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data sheet cases", command, invalid_data_types_test_cases);
  });
});

describe("CommandList class tests", () => {
  const test_refs = [
    {
      area_multiply_command_refs: ["area", "width", "length"],
      volume_multiply_command_refs: ["volume", "height", "area"],
    },
  ];

  const command_sequence = [
    new commands.MultiplyCommand(...test_refs[0].area_multiply_command_refs),
    new commands.MultiplyCommand(...test_refs[0].volume_multiply_command_refs),
  ];

  const commandList = new composite_commands.CommandList("Volume Calculation");

  describe("Add() method tests", () => {
    describe("Valid cases", () => {
      test("Expect empty children list before using add", () => {
        expect(commandList.children.length).toBe(0);
      });

      test("Test if the command is added to children list", () => {
        commandList.add(command_sequence[0]);
        expect(commandList.children.length).toBe(1);
        expect(commandList.children[0]).toBe(command_sequence[0]);
      });
    });

    describe.each(get_invalid_command_instance_test_cases())("Test invalid inputs", (input) => {
      test("Test instantiation with " + input, () => {
        expect(() => commandList.add(input)).toThrow();
      });
    });
  });

  describe("Execute() method tests", () => {
    describe("Valid cases", () => {
      test("Test with only one command in children", () => {
        //Test only calculating the area
        const area_calculation_data_sheet = {
          width: 5,
          length: 5,
          expected_area: 25,
        };

        expect(commandList.execute(area_calculation_data_sheet).area).toBe(area_calculation_data_sheet.expected_area);
      });

      test("Test with more than one command in children", () => {
        const volume_calculation_data_sheet = {
          width: 5,
          length: 5,
          height: 4,
          expected_area: 25,
          expected_volume: 100,
        };

        //Add the extra command to change to test calculating the volume
        commandList.add(command_sequence[1]);
        commandList.execute(volume_calculation_data_sheet);
        expect(volume_calculation_data_sheet.area).toBe(volume_calculation_data_sheet.expected_area);
        expect(volume_calculation_data_sheet.volume).toBe(volume_calculation_data_sheet.expected_volume);
      });
    });

    describe("Invalid Cases", () => {
      //Test with Missing required values in data sheet
      const missing_values_data_sheets = [
        {
          width: 5,
          length: 5,
          expected_area: 25,
          expected_volume: 100,
        },
        {
          length: 5,
          height: 4,
          expected_area: 25,
          expected_volume: 100,
        },
      ];
      test_arithmatic_command_execute_throws_with_invalid_data_sheets("Missing required values in data sheet", commandList, missing_values_data_sheets);

      //Test with invalid
      const invaid_types = ["Invalid", NaN, undefined, null, [], true, () => {}, {}, Infinity, true];
      const invalid_data_types_data_sheets_list = object_to_object_copy_list_with_modified_property({ height: 0, width: 0, length: 0 }, "height", invaid_types);
      test_arithmatic_command_execute_throws_with_invalid_data_sheets("Invalid data types in values in data sheet", commandList, invalid_data_types_data_sheets_list);
    });
  });
});
