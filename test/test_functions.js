/**
 * Generate Jest test cases for a function with multiple input lists and expected outputs.
 * @param {string} title - The title for the collection of tests to be run
 * @param {function} func - The function to be tested.
 * @param {Array<Array<number>>} input_lists_array - An array of input lists, each ending with the expected output.
 *
 * @example
 * Example usage:
 * test_function_result_each_number("sum function valid cases", 2, (a, b) => a + b, [
 *   [1, 2, 3],
 *   [4, 6, 10],
 *   [256, 256, 512],
 * ]);
 */
export const test_function_valid_result_cases = (title, func, input_lists_array) => {
  // Creating Jest test cases for each input list
  describe.each(input_lists_array)(title, (...refs) => {
    // Destructuring the input values and the expected output
    const expected = refs.pop();
    let title_refs = refs.map((obj) => {
      if (typeof obj == "function") {
        // console.log("obj: " ,obj.name)
        return obj.name;
      }
      return obj;
    });

    let test_title = `${func.name}(${title_refs.join(", ")}) returns ${typeof expected == "function" ? expected.name : expected}`;

    // Creating the individual Jest test
    it(test_title, () => {
      expect(func(...refs)).toBe(expected);
    });
  });
};

/**
 * Generate Jest test cases for a function to ensure it throws an exception for each input list.
 * @param {string} title - The title for the collection of tests to be run
 * @param {function} func - The function to be tested for throwing exceptions.
 * @param {Array<Array<number>>} input_lists_array - An array of input lists, each ending with the expected output.
 *
 * @example
 * Example usage:
 * test_function_throws_each_number("divide function invalid cases", calc.divide, [
 *   [1, 0], // Division by zero should throw an exception
 *   [4, 0], // Another division by zero case
 *   [10, 2], // A valid division case
 * ]);
 */
export const test_function_throws_invalid_cases = (title, func, input_lists_array) => {
  // Creating Jest test cases for each input list
  describe.each(input_lists_array)(title, (...refs) => {
    let test_title = `${func.name}(${refs.join(", ")}) throws`;

    // Creating the individual Jest test
    it(test_title, () => {
      expect(() => func(...refs)).toThrow();
    });
  });
};

export const test_async_function_throws_invalid_cases = (title, func, input_lists_array) => {
  // Creating Jest test cases for each input list

  describe.each(input_lists_array)(title, (...refs) => {
    let title_refs = refs.map((obj) => {
      switch (typeof obj) {
        case "function": {
          return obj.name;
        }
        case "object": {
          if (obj && obj.constructor.name == "Array") return `[${String(obj)}]`;
        }
        default: {
          return String(obj);
        }
      }
    });

    let test_title = `${func.name}(${title_refs.join(", ")}) throws`;
    // Creating the individual Jest test
    it(test_title, async () => {
      await expect(func(...refs)).rejects.toThrow();
    });
  });
};

const expect_async_error = async (func, ...params) => {
  await expect(func(...params)).rejects.toThrow();
  // await expect(AbstractFactory.get_factory_with_classes_registered_from_modules([])).rejects.toThrow();
};
