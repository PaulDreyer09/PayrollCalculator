import * as calc from "./calculationFunctions.js";

/**
 * Run multiple tests on a given function, testing if a list of inputs will give a given result
 * @param {String} title The title for the test to be run which will be displayed on the test report
 * @param {Function} func Function to test for a return result
 * @param {Array<object>} value_list Array filled with objects {input_list: Array<any>, result: any}
 * input_list: Array of inputs for the given function
 * result: The expected result of the given function after it is executed with the given inputs
 */
const test_function_result = (title, func, value_list) => {
  it(title, () => {
    for (const { input_list, result } of value_list) {
      expect(func(...input_list)).toBe(result);
    }
  });
};

/**
 * Run multiple tests on a given function, testing if a list of inputs will cause the given function to throw an error
 * @param {String} title The title for the test to be run which will be displayed on the test report
 * @param {Function} func Function to test for a return result
 * @param {Array<object>} value_list Array filled with objects {input_list: Array<any>, result: any}
 * input_list: Array of inputs for the given function
 * error_message?: Optional. The expected error message to be thrown(Can be substring or regexp).
 */
const test_if_function_throws = (title, func, input_lists_array) => {
  it(title, () => {
    for (const { input_list, error_message } of input_lists_array) {
      if (error_message) {
        expect(() => func(...input_list)).toThrow(error_message);
        continue;
      }

      expect(() => func(...input_list)).toThrow();
    }
  });
};

it("Test sum(). Test adding two positive numbers.", () => {
  expect(calc.sum(1, 2)).toBe(3);
  expect(calc.sum(4, 6)).toBe(10);
  expect(calc.sum(256, 256)).toBe(512);
});

// Test adding three or more positive numbers.
it("Test sum(). Test adding three or more positive numbers.", () => {
  expect(calc.sum(1, 2, 3)).toBe(6);
  expect(calc.sum(5, 8, 13)).toBe(26);
  expect(calc.sum(21, 34, 55)).toBe(110);
});

// Test adding a positive and a negative number.
it("Test sum(). Test adding a positive and a negative number.", () => {
  expect(calc.sum(1, -2)).toBe(-1);
  expect(calc.sum(-9, 4)).toBe(-5);
  expect(calc.sum(1000, -2)).toBe(998);
});

// Invalid Cases:
// Test adding non-numeric values.
it("Test sum(). Test adding non-numeric values.", () => {
  expect(() => calc.sum(1, "-2")).toThrow();
  expect(() => calc.sum(1, -2, "")).toThrow();
  expect(() => calc.sum("8", 2)).toThrow();
});

// Test with an empty argument list.
it("Test sum(). Test with an empty argument list.", () => {
  expect(() => calc.sum()).toThrow();
});

// subtract:

// Valid Cases:
// Test subtracting a positive number from a positive number.
it("Test sum(). Test subtracting a positive number from a positive number.", () => {
  expect(calc.subtract(1, 2)).toBe(-1);
  expect(calc.subtract(4, 6)).toBe(-2);
  expect(calc.subtract(256, 256)).toBe(0);
});

// Test subtracting multiple positive numbers from an initial positive number.
it("Test subtract(). Test subtracting a positive number from a positive number.", () => {
  expect(calc.subtract(1, 2, 3)).toBe(-4);
  expect(calc.subtract(4, 6, 8)).toBe(-10);
  expect(calc.subtract(256, 256, 256)).toBe(-256);
});

// Test subtracting a negative number from a positive number.
it("Test subtract(). Test subtracting a negative number from a positive number.", () => {
  expect(calc.subtract(1, -2)).toBe(3);
  expect(calc.subtract(4, -6)).toBe(10);
  expect(calc.subtract(256, -256)).toBe(512);
});

// Invalid Cases:
// Test subtracting non-numeric values.
it("Test subtract(). Test subtracting non-numeric values.", () => {
  expect(() => calc.subtract("Dude", "Where's my car?")).toThrow();
  expect(() => calc.subtract(null, 6)).toThrow();
  expect(() => calc.subtract(7, NaN)).toThrow();
});

// Test with an empty argument list.
it("Test subtract(). Test subtract with an empty argument list.", () => {
  expect(() => calc.subtract()).toThrow();
});

// multiply:

// Valid Cases:
// Test multiplying two positive numbers.
it("Test multiply(). Multiplying two positive numbers.", () => {
  expect(calc.multiply(1, 2)).toBe(2);
  expect(calc.multiply(2, 3)).toBe(6);
  expect(calc.multiply(10, 10)).toBe(100);
});

// Test multiplying two negative numbers.
it("Test multiply(). Multiplying two negative numbers.", () => {
  expect(calc.multiply(-1, -2)).toBe(2);
  expect(calc.multiply(-2, -3)).toBe(6);
  expect(calc.multiply(-10, -10)).toBe(100);
});

// Test multiplying a positive and a negative number.
it("Test multiply(). Multiplying a positive and a negative number.", () => {
  expect(calc.multiply(1, -2)).toBe(-2);
  expect(calc.multiply(-2, 3)).toBe(-6);
  expect(calc.multiply(10, -10)).toBe(-100);
});

// Test multiplying three or more positive numbers.
it("Test multiply(). Multiplying three or more positive numbers.", () => {
  expect(calc.multiply(1, 2, 3)).toBe(6);
  expect(calc.multiply(2, 3, 4)).toBe(24);
  expect(calc.multiply(10, 10, 10)).toBe(1000);
});

// Invalid Cases:
// Test multiplying non-numeric values.
it("Test multiply(). Multiplying two negative numbers.", () => {
  expect(() => calc.multiply("-1", -2)).toThrow();
  expect(() => calc.multiply(-2, null)).toThrow();
  expect(() => calc.multiply(NaN, -10)).toThrow();
  expect(() => calc.multiply(undefined, -10)).toThrow();
});

// Test with an empty argument list.
it("Test multiply(). Multiplying two negative numbers.", () => {
  expect(() => calc.multiply()).toThrow();
});

// divide:

// Valid Cases:
// Test dividing a positive number by another positive number.
it("Test divide(). Dividing a positive number by another positive number.", () => {
  expect(calc.divide(1, 2)).toBe(0.5);
  expect(calc.divide(20, 10)).toBe(2);
  expect(calc.divide(1000, 10)).toBe(100);
  expect(calc.divide(0, 10)).toBe(0);
});

// Test dividing a positive number by another positive number.
it("Test divide(). Dividing a positive number by a negative number.", () => {
  expect(calc.divide(1, -2)).toBe(-0.5);
  expect(calc.divide(20, -10)).toBe(-2);
  expect(calc.divide(1000, -10)).toBe(-100);
  expect(calc.divide(0, -10)).toBe(0);
});

// Test dividing a positive number by multiple positive numbers.
it("Test divide(). Dividing a positive number by multiple positive numbers.", () => {
  expect(calc.divide(1, 2, 2)).toBe(0.25);
  expect(calc.divide(20, 10, 2)).toBe(1);
  expect(calc.divide(1000, 10, 10)).toBe(10);
  expect(calc.divide(0, 10, 10)).toBe(0);
});

// Invalid Cases:
// Test dividing by zero.
it("Test divide(). Dividing by zero.", () => {
  expect(() => calc.divide(1, 0)).toThrow();
  expect(() => calc.divide(20, -10, 0)).toThrow();
  expect(() => calc.divide(-1000, 0, 10)).toThrow();
});

// Test dividing non-numeric values.
it("Test divide(). Dividing non-numeric values", () => {
  expect(() => calc.divide(1, "2")).toThrow();
  expect(() => calc.divide("20", 1)).toThrow();
  expect(() => calc.divide(-1000, NaN)).toThrow();
  expect(() => calc.divide(NaN, 10)).toThrow();
  expect(() => calc.divide(-1000, undefined)).toThrow();
  expect(() => calc.divide(undefined, -1000)).toThrow();
  expect(() => calc.divide(Infinity, -1000)).toThrow();
});

// Test with an empty argument list.
it("Test divide(). Empty argument list.", () => {
  expect(() => calc.divide()).toThrow();
});

// lesser_of:

// Valid Cases:
// Test finding the lesser of two positive numbers.
it("Test lesser_of(). Finding the lesser of two positive numbers.", () => {
  expect(calc.lesser_of(1, 2)).toBe(1);
  expect(calc.lesser_of(2, 1)).toBe(1);
  expect(calc.lesser_of(5, 2)).toBe(2);
  expect(calc.lesser_of(100, 101)).toBe(100);
});

// Test finding the lesser of a positive and a negative number.
it("Test lesser_of(). Finding the lesser of two positive numbers.", () => {
  expect(calc.lesser_of(1, -2)).toBe(-2);
  expect(calc.lesser_of(2, -1)).toBe(-1);
  expect(calc.lesser_of(-5, 2)).toBe(-5);
  expect(calc.lesser_of(100, -100)).toBe(-100);
  expect(calc.lesser_of(100, -100000000)).toBe(-100000000);
});

// Test finding the lesser of three or more positive numbers.

// Invalid Cases:
// Test with non-numeric values.
it("Test lesser_of(). Using non-numeric values", () => {
  expect(() => calc.lesser_of(1, "2")).toThrow();
  expect(() => calc.lesser_of("20", 1)).toThrow();
  expect(() => calc.lesser_of(-1000, NaN)).toThrow();
  expect(() => calc.lesser_of(NaN, 10)).toThrow();
  expect(() => calc.lesser_of(-1000, undefined)).toThrow();
  expect(() => calc.lesser_of(undefined, -1000)).toThrow();
  expect(() => calc.lesser_of(Infinity, -1000)).toThrow();
  expect(() => calc.lesser_of(1000, Infinity)).toThrow();
});

// Test with an empty argument list.
it("Test lesser_of(). Test with an empty argument list.", () => {
  expect(() => calc.lesser_of()).toThrow();
});

// make_percentage:

// Valid Cases:
// Test converting a integer percentage to a decimal.
it("Test make_percentage(). Test converting a integer percentage to a decimal.", () => {
  expect(calc.make_percentage(50)).toBe(0.5);
  expect(calc.make_percentage(100)).toBe(1);
  expect(calc.make_percentage(1)).toBe(0.01);
  expect(calc.make_percentage(1000)).toBe(10);
});

// Test converting a percentage with decimal values.
it("Test make_percentage(). Test converting a percentage with decimal values.", () => {
  expect(calc.make_percentage(50.5)).toBe(0.505);
  expect(calc.make_percentage(100.99)).toBe(1.0099);
  expect(calc.make_percentage(1.01)).toBe(0.0101);
  expect(calc.make_percentage(1000.5)).toBe(10.005);
});

// Invalid Cases:
// Test with non-numeric values.
it("Test make_percentage(). Using non-numeric values", () => {
  expect(() => calc.make_percentage("20")).toThrow();
  expect(() => calc.make_percentage(false)).toThrow();
  expect(() => calc.make_percentage(NaN)).toThrow();
  expect(() => calc.make_percentage(undefined)).toThrow();
  expect(() => calc.make_percentage(Infinity)).toThrow();
});
// Test using no parameters
it("Test make_percentage(). Test using no parameters", () => {
  expect(() => calc.make_percentage()).toThrow();
});

// take_percentage:

// Valid Cases:
// Test applying a percentage to a positive value.
it("Testing take_percentage(). Test applying a percentage to a positive value.", () => {
  expect(calc.take_percentage(100, 0.5)).toBe(50);
  expect(calc.take_percentage(1000, 0.5)).toBe(500);
  expect(calc.take_percentage(100, 1.2)).toBe(120);
  expect(calc.take_percentage(500, 0)).toBe(0);
});

// Test applying a percentage to a negative value.
it("Testing take_percentage(). Test applying a percentage to a negative value.", () => {
  expect(calc.take_percentage(-100, 0.5)).toBe(-50);
  expect(calc.take_percentage(-1000, 0.5)).toBe(-500);
  expect(calc.take_percentage(100, -1.2)).toBe(-120);
  expect(calc.take_percentage(-500, 0)).toBe(0);
});

// Test applying a percentage to numbers with decimal values.
it("Testing take_percentage(). Test applying a percentage to numbers with decimal values.", () => {
  expect(calc.take_percentage(100.5, 0.5)).toBe(50.25);
  expect(calc.take_percentage(1000.2, 0.5)).toBe(500.1);
  expect(calc.take_percentage(100.5, 1.2)).toBe(120.6);
  expect(calc.take_percentage(500.5, 0)).toBe(0);
});

// Invalid Cases:
// Test with non-numeric values.
it("Test take_percentage(). Using non-numeric values", () => {
  expect(() => calc.take_percentage(1, "2")).toThrow();
  expect(() => calc.take_percentage("20", 1)).toThrow();
  expect(() => calc.take_percentage(-1000, NaN)).toThrow();
  expect(() => calc.take_percentage(NaN, 10)).toThrow();
  expect(() => calc.take_percentage(-1000, undefined)).toThrow();
  expect(() => calc.take_percentage(undefined, -1000)).toThrow();
  expect(() => calc.take_percentage(Infinity, -1000)).toThrow();
  expect(() => calc.take_percentage(1000, Infinity)).toThrow();
});

// Test with an empty argument list.
it("Testing take_percentage(). Test with an empty argument list.", () => {
  expect(() => calc.take_percentage().toThrow());
});

// floored_difference:

// Valid Cases:
// Test finding the floored difference between two positive numbers.
it("Test floored_difference(). Test finding the floored difference between two positive numbers.", () => {
  expect(calc.floored_difference(100, 10)).toBe(90);
  expect(calc.floored_difference(10, 100)).toBe(0);
  expect(calc.floored_difference(1000.05, 100.05)).toBe(900);
  expect(calc.floored_difference(100.05, 1000.1)).toBe(0);
});

// Test finding the floored difference with multiple positive numbers.
it("Test floored_difference(). Test finding the floored difference between two positive numbers.", () => {
  expect(calc.floored_difference(100, 10, 10)).toBe(80);
  expect(calc.floored_difference(10, 5, 8)).toBe(0);
  expect(calc.floored_difference(1000.1, 100.1, 100)).toBe(800);
  expect(calc.floored_difference(1000.1, 100.5, 100)).toBe(799.6);
  expect(calc.floored_difference(100.05, 1000.1)).toBe(0);
});

// Invalid Cases:
// Test with non-numeric values.
it("Test floored_difference(). Test with non-numeric values.", () => {
  expect(() => calc.floored_difference(1, "2")).toThrow();
  expect(() => calc.floored_difference("20", 1)).toThrow();
  expect(() => calc.floored_difference(-1000, NaN)).toThrow();
  expect(() => calc.floored_difference(NaN, 10)).toThrow();
});

// Test with an empty argument list.
it("Test floored_difference(). Test with an empty argument list.", () => {
  expect(() => calc.floored_difference()).toThrow();
});

// annualize:

// Valid Cases:

// Test annualizing a positive value with a positive number of periods per annum.
it("Test annualize(). Test annualizing a positive value with a positive number of periods per annum.", () => {
  expect(calc.annualize(12000, 12)).toBe(144000);
  expect(calc.annualize(10000, 10)).toBe(100000);
  expect(calc.annualize(100, 365)).toBe(36500);
  expect(calc.annualize(-100, 365)).toBe(-36500);
  expect(calc.annualize(100.5, 12)).toBe(1206);
  expect(calc.annualize(-100.5, 12)).toBe(-1206);
  expect(calc.annualize(0, 12)).toBe(0);
});

// Invalid Cases:
// Test with non-numeric values.
it("Test annualize(). Test with non-numeric values.", () => {
  expect(() => calc.annualize("10000", 5)).toThrow();
  expect(() => calc.annualize(10000, "5")).toThrow();
  expect(() => calc.annualize(12000, null)).toThrow();
  expect(() => calc.annualize(null, 12000)).toThrow();
  expect(() => calc.annualize(NaN, 10)).toThrow();
  expect(() => calc.annualize(10, NaN)).toThrow();
  expect(() => calc.annualize(10, undefined)).toThrow();
  expect(() => calc.annualize(undefined, 10)).toThrow();
  expect(() => calc.annualize(true, 10)).toThrow();
  expect(() => calc.annualize(50, false)).toThrow();
});

// Test with zero periods per annum.
it("Test annualize(). Test with zero periods per annum.", () => {
  expect(() => calc.annualize(0, 0)).toThrow();
  expect(() => calc.annualize(-12000, 0)).toThrow();
  expect(() => calc.annualize(-12000, 0)).toThrow();
  expect(() => calc.annualize(500.5, 0)).toThrow();
  expect(() => calc.annualize(-500.5, 0)).toThrow();
});

// Test with negative periods per annum.
it("Test annualize(). Test annualizing a positive value with a positive number of periods per annum.", () => {
  expect(() => calc.annualize(12000, -12)).toThrow();
  expect(() => calc.annualize(10000, -10)).toThrow();
  expect(() => calc.annualize(100, -365)).toThrow();
  expect(() => calc.annualize(-100, -365)).toThrow();
  expect(() => calc.annualize(100.5, -12)).toThrow();
  expect(() => calc.annualize(-100.5, -12)).toThrow();
  expect(() => calc.annualize(0, -12)).toThrow();
});

describe("Test de_annualize() Valid cases:", () => {
  it("Basic cases.", () => {
    expect(calc.de_annualize(120000, 12)).toBe(10000);
    expect(calc.de_annualize(100000, 10)).toBe(10000);
    expect(calc.de_annualize(36500, 365)).toBe(100);
    expect(calc.de_annualize(-300, 100)).toBe(-3);
    expect(calc.de_annualize(-1200.000012, 12)).toBe(-100.000001);
    expect(calc.de_annualize(0, 12)).toBe(0);
  });
});

describe("Test de_annualize() Invalid Cases:", () => {
  it("Cases with non-numeric values.", () => {
    expect(() => calc.de_annualize("10000", 5)).toThrow();
    expect(() => calc.de_annualize(10000, "5")).toThrow();
    expect(() => calc.de_annualize("10000", "5")).toThrow();
    expect(() => calc.de_annualize(12000, null)).toThrow();
    expect(() => calc.de_annualize(null, 12000)).toThrow();
    expect(() => calc.de_annualize(null, null)).toThrow();
    expect(() => calc.de_annualize(NaN, 10)).toThrow();
    expect(() => calc.de_annualize(10, NaN)).toThrow();
    expect(() => calc.de_annualize(NaN, NaN)).toThrow();
    expect(() => calc.de_annualize(10, undefined)).toThrow();
    expect(() => calc.de_annualize(undefined, 10)).toThrow();
    expect(() => calc.de_annualize(undefined, undefined)).toThrow();
    expect(() => calc.de_annualize(true, 10)).toThrow();
    expect(() => calc.de_annualize(50, false)).toThrow();
  });

  it("Cases with zero periods per annum.", () => {
    expect(() => calc.de_annualize(0, 0)).toThrow();
    expect(() => calc.de_annualize(-12000, 0)).toThrow();
    expect(() => calc.de_annualize(-12000, 0)).toThrow();
    expect(() => calc.de_annualize(500.5, 0)).toThrow();
    expect(() => calc.de_annualize(-500.5, 0)).toThrow();
  });

  it("Cases with negative periods per annum", () => {
    expect(() => calc.de_annualize(12000, -12)).toThrow();
    expect(() => calc.de_annualize(10000, -10)).toThrow();
    expect(() => calc.de_annualize(100, -365)).toThrow();
    expect(() => calc.de_annualize(-100, -365)).toThrow();
    expect(() => calc.de_annualize(100.5, -12)).toThrow();
    expect(() => calc.de_annualize(-100.5, -12)).toThrow();
    expect(() => calc.de_annualize(0, -12)).toThrow();
  });
});

// calculate_limited_percentage

describe("Test calculate_limited_percentage() Valid Cases", () => {
  it("Basic Cases", () => {
    expect(calc.calculate_limited_percentage(100, 10, 200)).toBe(10);
    expect(calc.calculate_limited_percentage(500, 5, 1000)).toBe(25);
    expect(calc.calculate_limited_percentage(50, 15, 150)).toBe(7.5);
    expect(calc.calculate_limited_percentage(1000, 2, 500)).toBe(10);
    expect(calc.calculate_limited_percentage(750, 8, 800)).toBe(60);
  });

  it("Ceiling Applied", () => {
    expect(calc.calculate_limited_percentage(100, 50, 20)).toBe(10);
    expect(calc.calculate_limited_percentage(2000, 30, 100)).toBe(30);
    expect(calc.calculate_limited_percentage(75, 20, 50)).toBe(10);
    expect(calc.calculate_limited_percentage(150, 25, 100)).toBe(25);
    expect(calc.calculate_limited_percentage(300, 10, 250)).toBe(25);
  });

  it("Edge Case - Ceiling Equals Value", () => {
    expect(calc.calculate_limited_percentage(100, 50, 100)).toBe(50);
    expect(calc.calculate_limited_percentage(200, 25, 200)).toBe(50);
    expect(calc.calculate_limited_percentage(500, 10, 500)).toBe(50);
    expect(calc.calculate_limited_percentage(1000, 5, 1000)).toBe(50);
    expect(calc.calculate_limited_percentage(1500, 3, 1500)).toBe(45);
  });

  it("Zero Value", () => {
    expect(calc.calculate_limited_percentage(0, 10, 100)).toBe(0);
    expect(calc.calculate_limited_percentage(0, 5, 50)).toBe(0);
    expect(calc.calculate_limited_percentage(0, 20, 200)).toBe(0);
    expect(calc.calculate_limited_percentage(0, 15, 150)).toBe(0);
    expect(calc.calculate_limited_percentage(0, 8, 80)).toBe(0);
  });
});

describe("Test calculate_limited_percentage() Invalid Cases", () => {
  it("Negative Rate", () => {
    expect(() => calc.calculate_limited_percentage(100, -10, 200)).toThrow();
    expect(() => calc.calculate_limited_percentage(500, -5, 1000)).toThrow();
    expect(() => calc.calculate_limited_percentage(50, -15, 150)).toThrow();
    expect(() => calc.calculate_limited_percentage(1000, -2, 500)).toThrow();
    expect(() => calc.calculate_limited_percentage(750, -8, 800)).toThrow();
  });

  it("Non numeric Ceiling", () => {
    expect(() => calc.calculate_limited_percentage(100, 10, "invalid")).toThrow();
    expect(() => calc.calculate_limited_percentage(500, 5, [200])).toThrow();
    expect(() => calc.calculate_limited_percentage(50, 15, null)).toThrow();
    expect(() => calc.calculate_limited_percentage(1000, 2, {})).toThrow();
    expect(() => calc.calculate_limited_percentage(750, 8, undefined)).toThrow();
  });

  it("Non numeric Value", () => {
    expect(() => calc.calculate_limited_percentage("invalid", 10, 200)).toThrow();
    expect(() => calc.calculate_limited_percentage([100], 5, 1000)).toThrow();
    expect(() => calc.calculate_limited_percentage(null, 15, 150)).toThrow();
    expect(() => calc.calculate_limited_percentage({}, 2, 500)).toThrow();
    expect(() => calc.calculate_limited_percentage(undefined, 8, 800)).toThrow();
  });

  it("Non numeric Rate", () => {
    expect(() => calc.calculate_limited_percentage(100, "invalid", 200)).toThrow();
    expect(() => calc.calculate_limited_percentage(500, [5], 1000)).toThrow();
    expect(() => calc.calculate_limited_percentage(50, null, 150)).toThrow();
    expect(() => calc.calculate_limited_percentage(1000, {}, 500)).toThrow();
    expect(() => calc.calculate_limited_percentage(750, undefined, 800)).toThrow();
  });

  it("Null or Undefined Inputs", () => {
    expect(() => calc.calculate_limited_percentage(null, 10, 200)).toThrow();
    expect(() => calc.calculate_limited_percentage(500, 5, undefined)).toThrow();
    expect(() => calc.calculate_limited_percentage(undefined, 15, 150)).toThrow();
    expect(() => calc.calculate_limited_percentage(null, null, null)).toThrow();
    expect(() => calc.calculate_limited_percentage(undefined, undefined, undefined)).toThrow();
  });

  it("Ceiling is Less Than 0", () => {
    expect(() => calc.calculate_limited_percentage(100, 10, -50)).toThrow();
    expect(() => calc.calculate_limited_percentage(500, 5, -1000)).toThrow();
    expect(() => calc.calculate_limited_percentage(50, 15, -150)).toThrow();
    expect(() => calc.calculate_limited_percentage(1000, 2, -500)).toThrow();
    expect(() => calc.calculate_limited_percentage(750, 8, -800)).toThrow();
  });
});

// calculate_added_total_by_tiers
describe("Test calculate_added_total_by_tiers Valid Cases", () => {
  //Example basic tables to test with
  const basic_tiers_1 = [
    { max: 100, value: 10 },
    { max: 200, value: 20 },
    { max: 300, value: 30 },
  ];

  const basic_tiers_2 = [
    { max: 1000, value: 20 },
    { max: 2000, value: 40 },
    { max: 3000, value: 60 },
  ];

  it("Basic Case", () => {
    expect(calc.calculate_added_total_by_tiers(basic_tiers_1, 50)).toBe(10); // falls in the first tier (10)
    expect(calc.calculate_added_total_by_tiers(basic_tiers_1, 150)).toBe(30); // falls in the second tier (10 + 20)
    expect(calc.calculate_added_total_by_tiers(basic_tiers_1, 250)).toBe(60); // falls above the third tier (30 + 30)

    expect(calc.calculate_added_total_by_tiers(basic_tiers_2, 500)).toBe(20); // falls in the first tier (20)
    expect(calc.calculate_added_total_by_tiers(basic_tiers_2, 1500)).toBe(60); // falls in the second tier (20 + 40)
    expect(calc.calculate_added_total_by_tiers(basic_tiers_2, 2500)).toBe(120); // falls above the third tier (60 + 60)
  });

  it("Edge Case - Value Equals Tier Max", () => {
    expect(calc.calculate_added_total_by_tiers(basic_tiers_1, 100)).toBe(30); // equals the max of the first tier
    expect(calc.calculate_added_total_by_tiers(basic_tiers_1, 200)).toBe(60); // equals the max of the first tier
    expect(calc.calculate_added_total_by_tiers(basic_tiers_1, 300)).toBe(60); // equals the max of the first tier
  });

  it("Zero Value to Compare", () => {
    expect(calc.calculate_added_total_by_tiers(basic_tiers_1, 0)).toBe(10); // zero value to compare should result in the first tier
  });

  it("Negative Value to Compare", () => {
    expect(calc.calculate_added_total_by_tiers(basic_tiers_1, -50)).toBe(0); // negative value to compare should result in zero total
    expect(calc.calculate_added_total_by_tiers(basic_tiers_1, -500)).toBe(0); // negative value to compare should result in zero total
  });

  it("Empty Tiers Array", () => {
    expect(calc.calculate_added_total_by_tiers([], 150)).toBe(0); // empty tiers array should result in zero total
  });
});

describe("Test calculate_added_total_by_tiers Invalid Cases", () => {
  //Example invalid tiers to test with
  const string_max_tiers = [{ max: "1000", value: 20 }];
  const undefined_max_tiers = [{ max: undefined, value: 20 }];
  const null_max_tiers = [{ max: null, value: 20 }];
  const nan_max_tiers = [{ max: NaN, value: 20 }];

  const string_value_tiers = [{ max: 1000, value: "10" }];
  const undefined_value_tiers = [{ max: 1000, value: undefined }];
  const null_value_tiers = [{ max: 1000, value: null }];
  const nan_value_tiers = [{ max: 1000, value: NaN }];

  it("Invalid Max in Tiers Array", () => {
    expect(() => calc.calculate_added_total_by_tiers(string_max_tiers, 150)).toThrow();
    expect(() => calc.calculate_added_total_by_tiers(undefined_max_tiers, 200)).toThrow();
    expect(() => calc.calculate_added_total_by_tiers(null_max_tiers, 1520)).toThrow();
    expect(() => calc.calculate_added_total_by_tiers(nan_max_tiers, 1250)).toThrow();
  });

  it("Invalid Value in Tiers Array", () => {
    expect(() => calc.calculate_added_total_by_tiers(string_value_tiers, 150)).toThrow();
    expect(() => calc.calculate_added_total_by_tiers(undefined_value_tiers, 200)).toThrow();
    expect(() => calc.calculate_added_total_by_tiers(null_value_tiers, 1520)).toThrow();
    expect(() => calc.calculate_added_total_by_tiers(nan_value_tiers, 1250)).toThrow();
  });

  it("Invalid value_to_compare parameter", () => {
    expect(() => calc.calculate_added_total_by_tiers(tiers, "invalid")).toThrow();
    expect(() => calc.calculate_added_total_by_tiers(tiers, undefined)).toThrow();
    expect(() => calc.calculate_added_total_by_tiers(tiers, null)).toThrow();
    expect(() => calc.calculate_added_total_by_tiers(tiers, NaN)).toThrow();
  });

  it("Null Tiers Array", () => {
    expect(() => calc.calculate_added_total_by_tiers(null, 150)).toThrow();
  });

  it("Undefined Tiers Array", () => {
    expect(() => calc.calculate_added_total_by_tiers(undefined, 150)).toThrow();
  });
});

// calculate_total_tax_by_tiers
describe('Test calculate_total_tax_by_tiers. Valid Cases', () => {
  it('Basic cases', () => {
    // Basic case with two tax brackets
    expect(calc.calculate_total_tax_by_tiers([{ max: 50000, rate: 10 }, { max: Infinity, rate: 20 }], 60000)).toBe(7000);

    // Case with three tax brackets
    expect(calc.calculate_total_tax_by_tiers([{ max: 50000, rate: 10 }, { max: 100000, rate: 15 }, { max: Infinity, rate: 20 }], 120000)).toBe(16500);

    // Case with a single tax bracket
    expect(calc.calculate_total_tax_by_tiers([{ max: Infinity, rate: 25 }], 30000)).toBe(7500);
  })

  it("Case with zero income", () => {
    expect(calc.calculate_total_tax_by_tiers([{ max: 50000, rate: 10 }, { max: Infinity, rate: 20 }], 0)).toBe(0);
  })

  it("Case with the maximum income and tax rate", () => {
    expect(calc.calculate_total_tax_by_tiers([{ max: Infinity, rate: 100 }], Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
  })

  it("Case with no tax brackets", () => {
    expect(calc.calculate_total_tax_by_tiers([], 50000)).toBe(0);

  })

  it("Case with negative income", () => {
    expect(calc.calculate_total_tax_by_tiers([{ max: 50000, rate: 10 }, { max: Infinity, rate: 20 }], -5000)).toBe(0);
  })  
});

describe('Test calculate_total_tax_by_tiers. Invalid Cases', () => {
  it("Case with invalid tax brackets (non-array)", () => {
    expect(() => calc.calculate_total_tax_by_tiers({ max: 50000, rate: 10 }, 60000)).toThrow();
  });
  
  it("Case with invalid max in tax bracket", () => {
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 'invalid', rate: 10 }, { max: Infinity, rate: 20 }], 60000)).toThrow();
    expect(() => calc.calculate_total_tax_by_tiers([{ max: null, rate: 10 }, { max: Infinity, rate: 20 }], 60000)).toThrow();
    expect(() => calc.calculate_total_tax_by_tiers([{ max: undefined, rate: 10 }, { max: Infinity, rate: 20 }], 60000)).toThrow();
    expect(() => calc.calculate_total_tax_by_tiers([{ max: NaN, rate: 10 }, { max: Infinity, rate: 20 }], 60000)).toThrow();    
  });

  it("Case with invalid max in tax bracket", () => {
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 10, rate: 'invalid' }, { max: Infinity, rate: 20 }], 60000)).toThrow();
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 100, rate: null }, { max: Infinity, rate: 20 }], 60000)).toThrow();
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 1000, rate: undefined }, { max: Infinity, rate: 20 }], 60000)).toThrow();
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 10000, rate: NaN }, { max: Infinity, rate: 20 }], 60000)).toThrow();    
  });

  it("Case with invalid income", () => {
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 50000, rate: 10 }, { max: Infinity, rate: 20 }], 'invalid')).toThrow();
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 50000, rate: 10 }, { max: Infinity, rate: 20 }], null)).toThrow();
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 50000, rate: 10 }, { max: Infinity, rate: 20 }], undefined)).toThrow();
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 50000, rate: 10 }, { max: Infinity, rate: 20 }], NaN)).toThrow();    
  });

  it("Case with Infinity tax rate", () => {
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 50000, rate: Infinity }, { max: Infinity, rate: 20 }], 60000)).toThrow();
  });

  it("Case with negative tax rate", () => {
    expect(() => calc.calculate_total_tax_by_tiers([{ max: 50000, rate: -10 }, { max: Infinity, rate: 20 }], 60000)).toThrow();
  });  
});

describe("Test calculate_from_tiered_structure. Valid Cases", () => {
  it("Basic case where callback function gets called correctly.", () => {
    //Basic case with 2 tiers
    const tiers1 = [{ max: 100, value: 10 }, { max: 200, value: 20 }];
    const callback1 = jest.fn((total, current_tier) => {
      return total + current_tier.value;
    });
  
    expect(calc.calculate_from_tiered_structure(tiers1, 150, callback1)).toBe(30)
    expect(callback1.mock.calls.length).toBe(2);
  
    //Basic case with 3 tiers    
    const tiers2 = [{ max: 100, value: 10 }, { max: 200, value: 20 }, { max: 300, value: 30 }];
    const callback2 = jest.fn((total, current_tier) => {
      return total + current_tier.value;
    });
  
    expect(calc.calculate_from_tiered_structure(tiers2, 250, callback2)).toBe(60)
    expect(callback2.mock.calls.length).toBe(3);
  })
});

describe("Test calculate_from_tiered_structure. Valid Cases", () => {
  it("Case with negative max in a tier", () => {
    const tiers3 = [{ max: -50000, value: 10 }, { max: Infinity, value: 20 }];
    const callback3 = jest.fn((total, current_tier) => {
      return total + current_tier.value;
    });
    expect(() => calc.calculate_from_tiered_structure(tiers3, 60000, callback3)).toThrow();
  });

  it("Case with max less than prior_max", () => {
    const tiers4 = [{ max: 50000, value: 10 }, { max: 20000, value: 20 }];
    const callback4 = jest.fn((total, current_tier) => {
      return total + current_tier.value;
    });
    expect(() => calc.calculate_from_tiered_structure(tiers4, 30000, callback4)).toThrow();
  })

  it("Case with same max in two consecutive tiers", () => {
    const tiers5 = [{ max: 50000, value: 10 }, { max: 50000, value: 20 }];
    const callback5 = jest.fn((total, current_tier) => {
      return total + current_tier.value;
    });
    expect(() => calc.calculate_from_tiered_structure(tiers5, 60000, callback5)).toThrow();
  })
});
