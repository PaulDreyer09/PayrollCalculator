import * as calc from "../public/js/modules/payrollFunctions/calculationFunctions.js";
import { jest } from "@jest/globals";
import { test_function_valid_result_cases,  test_function_throws_invalid_cases} from './test_functions.js'

describe("Test sum function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Test adding two positive numbers.", calc.sum, [
      [1, 2, 3],
      [4, 6, 10],
      [256, 256, 512],
    ]);

    test_function_valid_result_cases("Test adding three or more positive numbers.", calc.sum, [
      [1, 2, 3, 6],
      [5, 8, 13, 26],
      [21, 34, 55, 110],
    ]);

    test_function_valid_result_cases("Test adding a positive and a negative number.", calc.sum, [
      [1, -2, -1],
      [-9, 4, -5],
      [1000, -2, 998],
    ]);
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Test adding non-numeric values.", calc.sum, [
      [1, "-2", 3],
      ["8", 2],
    ]);

    test_function_throws_invalid_cases("Test with an empty argument list.", calc.sum, [
      [], // Empty argument list
    ]);
  });
});

describe("Test sum function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Test subtracting a positive number from a positive number.", calc.subtract, [
      [1, 2, -1],
      [4, 6, -2],
      [256, 256, 0],
    ]);

    test_function_valid_result_cases("Test subtracting a positive number from a positive number.", calc.subtract, [
      [1, 2, 3, -4],
      [4, 6, 8, -10],
      [256, 256, 256, -256],
    ]);

    test_function_valid_result_cases("Test subtracting a negative number from a positive number.", calc.subtract, [
      [1, -2, 3],
      [4, -6, 10],
      [256, -256, 512],
    ]);
  });

  describe("Invalid cases.", () => {
    // Invalid Cases:
    test_function_throws_invalid_cases("Test subtracting non-numeric values.", calc.subtract, [
      ["Dude", "Where's my car?"],
      [null, 6],
      [7, NaN],
    ]);

    test_function_throws_invalid_cases("Test subtract with an empty argument list.", calc.subtract, [
      [], // Empty argument list
    ]);
  });
});

describe("Test Multiply function.", () => {
  describe("Valid cases", () => {
    test_function_valid_result_cases("Test multiply(). Multiplying two positive numbers.", calc.multiply, [
      [1, 2, 2],
      [2, 3, 6],
      [10, 10, 100],
    ]);

    // Test multiplying two negative numbers.
    test_function_valid_result_cases("Test multiply(). Multiplying two negative numbers.", calc.multiply, [
      [-1, -2, 2],
      [-2, -3, 6],
      [-10, -10, 100],
    ]);

    // Test multiplying a positive and a negative number.
    test_function_valid_result_cases("Test multiply(). Multiplying a positive and a negative number.", calc.multiply, [
      [1, -2, -2],
      [-2, 3, -6],
      [10, -10, -100],
    ]);

    // Test multiplying three or more positive numbers.
    test_function_valid_result_cases("Test multiply(). Multiplying three or more positive numbers.", calc.multiply, [
      [1, 2, 3, 6],
      [2, 3, 4, 24],
      [10, 10, 10, 1000],
    ]);
  });

  describe("Invalid cases", () => {
    // Test multiplying non-numeric values.
    test_function_throws_invalid_cases("Test multiply(). Multiplying non-numeric values.", calc.multiply, [
      ["-1", -2],
      [-2, null],
      [NaN, -10],
      [undefined, -10],
    ]);

    // Test with an empty argument list.
    test_function_throws_invalid_cases("Test multiply(). Empty argument list.", calc.multiply, [[]]);
  });
});

describe("Test divide function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Test divide(). Dividing a positive number by another positive number.", calc.divide, [
      [1, 2, 0.5],
      [20, 10, 2],
      [1000, 10, 100],
      [0, 10, 0],
    ]);

    // Test dividing a positive number by a negative number.
    test_function_valid_result_cases("Test divide(). Dividing a positive number by a negative number.", calc.divide, [
      [1, -2, -0.5],
      [20, -10, -2],
      [1000, -10, -100],
      [0, -10, 0],
    ]);

    // Test dividing a positive number by multiple positive numbers.
    test_function_valid_result_cases("Test divide(). Dividing a positive number by multiple positive numbers.", calc.divide, [
      [1, 2, 2, 0.25],
      [20, 10, 2, 1],
      [1000, 10, 10, 10],
      [0, 10, 10, 0],
    ]);
  });

  describe("Invalid cases.", () => {
    // Test dividing by zero.
    test_function_throws_invalid_cases("Test divide(). Dividing by zero.", calc.divide, [
      [1, 0],
      [20, -10, 0],
      [-1000, 0, 10],
    ]);

    // Test dividing non-numeric values.
    test_function_throws_invalid_cases("Test divide(). Dividing non-numeric values", calc.divide, [
      [1, "2"],
      ["20", 1],
      [-1000, NaN],
      [NaN, 10],
      [-1000, undefined],
      [undefined, -1000],
      [Infinity, -1000],
    ]);

    // Test with an empty argument list.
    test_function_throws_invalid_cases("Test divide(). Empty argument list.", calc.divide, [[]]);
  });
});

describe("Test lesser_of function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Finding the lesser of two positive numbers.", calc.lesser_of, [
      [1, 2, 1],
      [2, 1, 1],
      [5, 2, 2],
      [100, 101, 100],
    ]);

    test_function_valid_result_cases("Finding the lesser of a positive and a negative number.", calc.lesser_of, [
      [1, -2, -2],
      [2, -1, -1],
      [-5, 2, -5],
      [100, -100, -100],
      [100, -100000000, -100000000],
    ]);
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Using non-numeric values", calc.lesser_of, [
      [1, "2"],
      ["20", 1],
      [-1000, NaN],
      [NaN, 10],
      [-1000, undefined],
      [undefined, -1000],
      [Infinity, -1000],
      [1000, Infinity],
    ]);

    test_function_throws_invalid_cases("Test with an empty argument list.", calc.lesser_of, [[]]);
  });
});

describe("Test make_percentage function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Test converting a integer percentage to a decimal.", calc.make_percentage, [
      [50, 0.5],
      [100, 1],
      [1, 0.01],
      [1000, 10],
    ]);

    test_function_valid_result_cases("Test converting a percentage with decimal values.", calc.make_percentage, [
      [50.5, 0.505],
      [100.99, 1.0099],
      [1.01, 0.0101],
      [1000.5, 10.005],
    ]);
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Using non-numeric values", calc.make_percentage, [["20"], [false], [NaN], [undefined], [Infinity], [[]], [() => {}]]);

    test_function_throws_invalid_cases("Test using no parameters", calc.make_percentage, [[]]);
  });
});

describe("Test take_percentage function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Test applying a percentage to a positive value.", calc.take_percentage, [
      [100, 0.5, 50],
      [1000, 0.5, 500],
      [100, 1.2, 120],
      [500, 0, 0],
    ]);

    test_function_valid_result_cases("Test applying a percentage to a negative value.", calc.take_percentage, [
      [-100, 0.5, -50],
      [-1000, 0.5, -500],
      [100, -1.2, -120],
      [-500, 0, 0],
    ]);

    test_function_valid_result_cases("Test applying a percentage to numbers with decimal values.", calc.take_percentage, [
      [100.5, 0.5, 50.25],
      [1000.2, 0.5, 500.1],
      [100.5, 1.2, 120.6],
      [500.5, 0, 0],
    ]);
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Test using non-numeric values", calc.take_percentage, [
      [1, "2"],
      ["20", 1],
      [-1000, NaN],
      [NaN, 10],
      [-1000, undefined],
      [undefined, -1000],
      [Infinity, -1000],
      [1000, Infinity],
    ]);

    test_function_throws_invalid_cases("Test with an empty argument list.", calc.take_percentage, [[]]);
  });
});

describe("Test floored_difference function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Test finding the floored difference between two positive numbers.", calc.floored_difference, [
      [100, 10, 90],
      [10, 100, 0],
      [1000.05, 100.05, 900],
      [100.05, 1000.1, 0],
    ]);

    test_function_valid_result_cases("Test finding the floored difference with multiple positive numbers.", calc.floored_difference, [
      [100, 10, 10, 80],
      [10, 5, 8, 0],
      [1000.1, 100.1, 100, 800],
      [1000.1, 100.5, 100, 799.6],
      [100.05, 1000.1, 0],
    ]);
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Test with non-numeric values.", calc.floored_difference, [
      [1, "2"],
      ["20", 1],
      [-1000, NaN],
      [NaN, 10],
    ]);

    test_function_throws_invalid_cases("Test with an empty argument list.", calc.floored_difference, [[]]);
  });
});

describe("Test annualize function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Test annualizing a positive value with a positive number of periods per annum.", calc.annualize, [
      [12000, 12, 144000],
      [10000, 10, 100000],
      [100, 365, 36500],
      [-100, 365, -36500],
      [100.5, 12, 1206],
      [-100.5, 12, -1206],
      [0, 12, 0],
    ]);
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Test with non-numeric values.", calc.annualize, [
      ["10000", 5],
      [10000, "5"],
      [12000, null],
      [null, 12000],
      [NaN, 10],
      [10, NaN],
      [10, undefined],
      [undefined, 10],
      [true, 10],
      [50, false],
    ]);

    test_function_throws_invalid_cases("Test with zero periods per annum.", calc.annualize, [
      [0, 0],
      [-12000, 0],
      [-12000, 0],
      [500.5, 0],
      [-500.5, 0],
    ]);

    test_function_throws_invalid_cases("Test with negative periods per annum.", calc.annualize, [
      [12000, -12],
      [10000, -10],
      [100, -365],
      [-100, -365],
      [100.5, -12],
      [-100.5, -12],
      [0, -12],
    ]);
  });
});

describe("Test de_annualize function.", () => {
  describe("Valid cases.", () => {
    describe("Test de_annualize() Valid cases:", () => {
      test_function_valid_result_cases("Basic cases.", calc.de_annualize, [
        [120000, 12, 10000],
        [100000, 10, 10000],
        [36500, 365, 100],
        [-300, 100, -3],
        [-1200.000012, 12, -100.000001],
        [0, 12, 0],
      ]);
    });
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Cases with non-numeric values.", calc.de_annualize, [
      ["10000", 5],
      [10000, "5"],
      ["10000", "5"],
      [12000, null],
      [null, 12000],
      [null, null],
      [NaN, 10],
      [10, NaN],
      [NaN, NaN],
      [10, undefined],
      [undefined, 10],
      [undefined, undefined],
      [true, 10],
      [50, false],
    ]);

    test_function_throws_invalid_cases("Cases with zero periods per annum.", calc.de_annualize, [
      [0, 0],
      [-12000, 0],
      [-12000, 0],
      [500.5, 0],
      [-500.5, 0],
    ]);

    test_function_throws_invalid_cases("Cases with negative periods per annum", calc.de_annualize, [
      [12000, -12],
      [10000, -10],
      [100, -365],
      [-100, -365],
      [100.5, -12],
      [-100.5, -12],
      [0, -12],
    ]);
  });
});

describe("Test calculate_limited_percentage function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Basic Cases", calc.calculate_limited_percentage, [
      [100, 10, 200, 10],
      [500, 5, 1000, 25],
      [50, 15, 150, 7.5],
      [1000, 2, 500, 10],
      [750, 8, 800, 60],
    ]);

    test_function_valid_result_cases("Ceiling Applied", calc.calculate_limited_percentage, [
      [100, 50, 20, 10],
      [2000, 30, 100, 30],
      [75, 20, 50, 10],
      [150, 25, 100, 25],
      [300, 10, 250, 25],
    ]);

    test_function_valid_result_cases("Edge Case - Ceiling Equals Value", calc.calculate_limited_percentage, [
      [100, 50, 100, 50],
      [200, 25, 200, 50],
      [500, 10, 500, 50],
      [1000, 5, 1000, 50],
      [1500, 3, 1500, 45],
    ]);

    test_function_valid_result_cases("Zero Value", calc.calculate_limited_percentage, [
      [0, 10, 100, 0],
      [0, 5, 50, 0],
      [0, 20, 200, 0],
      [0, 15, 150, 0],
      [0, 8, 80, 0],
    ]);
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Negative Rate", calc.calculate_limited_percentage, [
      [100, -10, 200],
      [500, -5, 1000],
      [50, -15, 150],
      [1000, -2, 500],
      [750, -8, 800],
    ]);

    test_function_throws_invalid_cases("Non-numeric Ceiling", calc.calculate_limited_percentage, [
      [100, 10, "invalid"],
      [500, 5, [200]],
      [50, 15, null],
      [1000, 2, {}],
      [750, 8, undefined],
    ]);

    test_function_throws_invalid_cases("Non-numeric Value", calc.calculate_limited_percentage, [
      ["invalid", 10, 200],
      [[100], 5, 1000],
      [null, 15, 150],
      [{}, 2, 500],
      [undefined, 8, 800],
    ]);

    test_function_throws_invalid_cases("Non-numeric Rate", calc.calculate_limited_percentage, [
      [100, "invalid", 200],
      [500, [5], 1000],
      [50, null, 150],
      [1000, {}, 500],
      [750, undefined, 800],
    ]);

    test_function_throws_invalid_cases("Null or Undefined Inputs", calc.calculate_limited_percentage, [
      [null, 10, 200],
      [500, 5, undefined],
      [undefined, 15, 150],
      [null, null, null],
      [undefined, undefined, undefined],
    ]);

    test_function_throws_invalid_cases("Ceiling is Less Than 0", calc.calculate_limited_percentage, [
      [100, 10, -50],
      [500, 5, -1000],
      [50, 15, -150],
      [1000, 2, -500],
      [750, 8, -800],
    ]);
  });
});

describe("Test calculate_added_total_by_tiers function.", () => {
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
  //Example invalid tiers to test with
  const string_max_tiers = [{ max: "1000", value: 20 }];
  const undefined_max_tiers = [{ max: undefined, value: 20 }];
  const null_max_tiers = [{ max: null, value: 20 }];
  const nan_max_tiers = [{ max: NaN, value: 20 }];

  const string_value_tiers = [{ max: 1000, value: "10" }];
  const undefined_value_tiers = [{ max: 1000, value: undefined }];
  const null_value_tiers = [{ max: 1000, value: null }];
  const nan_value_tiers = [{ max: 1000, value: NaN }];

  describe("Valid cases.", () => {
    test_function_valid_result_cases("Basic Cases", calc.calculate_added_total_by_tiers, [
      [basic_tiers_1, 50, 10],
      [basic_tiers_1, 150, 30],
      [basic_tiers_1, 250, 60],
      [basic_tiers_2, 500, 20],
      [basic_tiers_2, 1500, 60],
      [basic_tiers_2, 2500, 120],
    ]);

    test_function_valid_result_cases("Edge Case - Value Equals Tier Max", calc.calculate_added_total_by_tiers, [
      [basic_tiers_1, 100, 30],
      [basic_tiers_1, 200, 60],
      [basic_tiers_1, 300, 60],
    ]);

    test_function_valid_result_cases("Zero Value to Compare", calc.calculate_added_total_by_tiers, [[basic_tiers_1, 0, 10]]);

    test_function_valid_result_cases("Negative Value to Compare", calc.calculate_added_total_by_tiers, [
      [basic_tiers_1, -50, 0],
      [basic_tiers_1, -500, 0],
    ]);

    test_function_valid_result_cases("Empty Tiers Array", calc.calculate_added_total_by_tiers, [[[], 150, 0]]);
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Invalid values in tiers", calc.calculate_added_total_by_tiers, [
      [string_max_tiers, 150],
      [undefined_max_tiers, 200],
      [null_max_tiers, 1520],
      [nan_max_tiers, 1250],
      [string_value_tiers, 150],
      [undefined_value_tiers, 200],
      [null_value_tiers, 1520],
      [nan_value_tiers, 1250],
      [null, 150],
      [undefined, 150],
    ]);
    test_function_throws_invalid_cases("Invalid value to compair.", calc.calculate_added_total_by_tiers, [
      [basic_tiers_1, "invalid"],
      [basic_tiers_1, undefined],
      [basic_tiers_1, null],
      [basic_tiers_1, NaN],
      [basic_tiers_1, Infinity],
      [basic_tiers_1, []],
      [basic_tiers_1, () => {}],
      [basic_tiers_1, true],
    ]);
  });
});

describe("Test make_percentage function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Basic Cases", calc.calculate_total_tax_by_tiers, [
      [
        [
          { max: 50000, rate: 10 },
          { max: Infinity, rate: 20 },
        ],
        60000,
        7000,
      ],
      [
        [
          { max: 50000, rate: 10 },
          { max: 100000, rate: 15 },
          { max: Infinity, rate: 20 },
        ],
        120000,
        16500,
      ],
      [[{ max: Infinity, rate: 25 }], 30000, 7500],
    ]);

    test_function_valid_result_cases("Cases with zero income", calc.calculate_total_tax_by_tiers, [
      [
        [
          { max: 50000, rate: 10 },
          { max: Infinity, rate: 20 },
        ],
        0,
        0,
      ],
    ]);
    test_function_valid_result_cases("Case with the maximum income and tax rate", calc.calculate_total_tax_by_tiers, [
      [[{ max: Infinity, rate: 100 }], Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    ]);
    test_function_valid_result_cases("Case with no tax brackets", calc.calculate_total_tax_by_tiers, [[[], 50000, 0]]);
    test_function_valid_result_cases("Case with negative income", calc.calculate_total_tax_by_tiers, [
      [
        [
          { max: 50000, rate: 10 },
          { max: Infinity, rate: 20 },
        ],
        -5000,
        0,
      ],
    ]);
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Case with invalid tax brackets (non-array)", calc.calculate_total_tax_by_tiers, [[{ max: 50000, rate: 10 }, 60000]]);
    test_function_throws_invalid_cases("Case with invalid max in tax brackets", calc.calculate_total_tax_by_tiers, [
      [
        [
          { max: "invalid", rate: 10 },
          { max: Infinity, rate: 20 },
        ],
        60000,
      ],

      [
        [
          { max: null, rate: 10 },
          { max: Infinity, rate: 20 },
        ],
        60000,
      ],
      [
        [
          { max: undefined, rate: 10 },
          { max: Infinity, rate: 20 },
        ],
        60000,
      ],
      [
        [
          { max: NaN, rate: 10 },
          { max: Infinity, rate: 20 },
        ],
        60000,
      ],
    ]);

    test_function_throws_invalid_cases("Case with invalid rate tax brackets (non-array)", calc.calculate_total_tax_by_tiers, [
      [
        [
          { max: 50000, rate: "invalid" },
          { max: Infinity, rate: 20 },
        ],
        60000,
      ],
      [
        [
          { max: 100, rate: null },
          { max: Infinity, rate: 20 },
        ],
        60000,
      ],
      [
        [
          { max: 1000, rate: undefined },
          { max: Infinity, rate: 20 },
        ],
        60000,
      ],
      [
        [
          { max: 10000, rate: NaN },
          { max: Infinity, rate: 20 },
        ],
        60000,
      ],
    ]);

    test_function_throws_invalid_cases("Case with invalid income", calc.calculate_total_tax_by_tiers, [
      [
        [
          { max: 50000, rate: 10 },
          { max: Infinity, rate: 20 },
        ],
        "invalid",
      ],
      [
        [
          { max: 50000, rate: 10 },
          { max: Infinity, rate: 20 },
        ],
        null,
      ],
      [
        [
          { max: 50000, rate: 10 },
          { max: Infinity, rate: 20 },
        ],
        undefined,
      ],
    ]);
    test_function_throws_invalid_cases("Case with Infinity tax rate", calc.calculate_total_tax_by_tiers, [
      [
        [
          { max: 50000, rate: 10 },
          { max: Infinity, rate: Infinity },
        ],
        60000,
      ],
    ]);
    test_function_throws_invalid_cases("Case with negative tax rate", calc.calculate_total_tax_by_tiers, [
      [
        [
          { max: 50000, rate: 10 },
          { max: Infinity, rate: -20 },
        ],
        60000,
      ],
    ]);
  });
});

describe("Test make_percentage function.", () => {
  describe("Valid cases.", () => {
    test_function_valid_result_cases("Test calculate_from_tiered_structure Valid Cases", calc.calculate_from_tiered_structure, [
      [
        [
          { max: 100, value: 10 },
          { max: 200, value: 20 },
        ],
        150,
        (total, current_tier) => {
          return total + current_tier.value;
        },
        30,
      ],
      [
        [
          { max: 100, value: 10 },
          { max: 200, value: 20 },
        ],
        150,
        (total, current_tier) => {
          return total * current_tier.value;
        },
        0,
      ],
    ]);
  });

  describe("Invalid cases.", () => {
    test_function_throws_invalid_cases("Case with negative max in a tier", calc.calculate_from_tiered_structure, [
      [
        [
          { max: -50000, value: 10 },
          { max: Infinity, value: 20 },
        ],
        60000,
        (total, current_tier) => {
          return total + current_tier.value;
        },
      ],
    ]);
    test_function_throws_invalid_cases("Case with max less than prior_max", calc.calculate_from_tiered_structure, [
      [
        [
          { max: 50000, value: 10 },
          { max: 20000, value: 20 },
        ],
        30000,
        (total, current_tier) => {
          return total + current_tier.value;
        },
      ],
    ]);

    test_function_throws_invalid_cases("Case with same max in two consecutive tiers", calc.calculate_from_tiered_structure, [
      [
        [
          { max: 50000, value: 10 },
          { max: 50000, value: 20 },
        ],
        60000,
        (total, current_tier) => {
          return total + current_tier.value;
        },
      ],
    ]);

  });
});