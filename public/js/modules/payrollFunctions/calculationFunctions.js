import * as validation from "../utils/validation.js";

/**
 * Adds any number of numerical arguments together.
 *
 * @param {...number} numbers - The numbers to be added.
 * @returns {number} The sum of all provided numbers.
 */
export const sum = (...numbers) => {
  // console.log(...numbers)
  if (!numbers.length) {
    throw new Error("No input received for 'numbers' parameter");
  }

  let total = 0;
  for (const num of numbers) {
    total += validation.valid_number(num);
  }
  return validation.valid_number(total);
};

/**
 * Adds any number of numerical arguments together.
 *
 * @param {number} initial - The number which will be deducted from.
 * @param {...number} numbers - The numbers to be deducted from initial.
 * @returns {number} Return the difference between initial and numbers.
 */
export const subtract = (initial, ...numbers) => {
  if (!numbers.length) {
    throw new Error("No input received for 'numbers' parameter");
  }

  let result = validation.valid_number(initial);
  for (const num of numbers) {
    result -= validation.valid_number(num);
  }
  return validation.valid_number(result);
};

/**
 * @param {number} initial - first value
 * @param {...number} numbers - second value
 * @returns {number} initial multiplied by numbers
 */
export const multiply = (initial, ...numbers) => {
  let result = validation.valid_number(initial);
  for (const num of numbers) {
    result *= validation.valid_number(num);
  }
  return validation.valid_number(result);
};

/**
 * @param {number} initial - first value
 * @param {...number} numbers - second value
 * @returns {number} initial divided by numbers
 */
export const divide = (initial, ...numbers) => {
  let result = validation.valid_number(initial);
  for (const num of numbers) {
    try {
      result /= validation.valid_number_non_zero(num);
    } catch (error) {
      if (num == 0) {
        throw new Error("Cannot divide by 0.");
      }
      throw error;
    }
  }

  return validation.valid_number(result);
};

/**
 * Returns the lesser number between value1 and value2.
 *
 * @param {...number} values - List of values.
 * @returns {number} The lesser value.
 */
export const lesser_of = (...values) => {
  if (!values.length) {
    throw new Error("Cannot execute lesser_of with no arguments.");
  }

  const valid_values = [];
  for (const number of values) {
    valid_values.push(validation.valid_number(number));
  }
  return Math.min(...valid_values);
};

/**
 * Converts a rate to its corresponding decimal representation.
 *
 * @param {number} rate - The rate to be converted (e.g., 20 for 20%).
 * @returns {number} The decimal representation of the rate (e.g., 0.2 for 20%).
 */
export const make_percentage = (rate) => validation.valid_number(rate) / 100;

/**
 * Calculates the value after applying a percentage.
 *
 * @param {number} value - The original value.
 * @param {number} percentage - The percentage to apply to the value, as a decimal (e.g., 0.2 for 20%).
 * @returns {number} The result of applying the percentage to the value.
 */
export const take_percentage = (value, percentage) =>
  validation.valid_number(validation.valid_number(value) * validation.valid_number(percentage));

/**
 * Calculates the difference between a given input number and more input numbers with a minimum of 0 as the return value.
 * @param  {...number} values - A list of numbers to be subtracted from the first input number.
 * @returns {number} The floored difference.
 */
export const floored_difference = (...values) => validation.valid_number(Math.max(subtract(...values), 0));

/**
 * Calculates how much the value will be per year for a given value per period (monthly: 12).
 *
 * @param {number} value - Value of the number to be annualized.
 * @param {number} current_periods_per_annum - Number of periods per annum.
 * @returns {number} The annualized value.
 */
export const annualize = (value, current_periods_per_annum) =>
  validation.valid_number(value) * validation.valid_positive_non_zero_number(current_periods_per_annum);

/**
 * Calculates how much the value will be per period for a given annual value.
 *
 * @param {number} value - Annual value to be DE-annualized.
 * @param {number} new_periods_per_annum - Number of periods per annum.
 * @returns {number} The de-annualized value.
 */
export const de_annualize = (value, new_periods_per_annum) =>
  validation.valid_number(value) / validation.valid_positive_non_zero_number(new_periods_per_annum);

/**
 * Calculates the tax amount based on a given value, tax rate, and a maximum tax ceiling.
 * The tax amount is limited to the ceiling if the calculated tax exceeds it.
 *
 * @param {number} value - The value on which the tax is calculated.
 * @param {number} rate - The tax rate (e.g., 20 for 20% tax rate).
 * @param {number} ceiling - The maximum value amount that the percentage can be applied upon.
 * @returns {number} The calculated tax amount, limited by the ceiling if applicable.
 */
export const calculate_limited_percentage = (value, rate, ceiling) => {
  const applicable_value = lesser_of(validation.valid_positive_non_zero_number(ceiling), value);
  const percentage = make_percentage(validation.valid_positive_number(rate));
  return take_percentage(applicable_value, percentage);
};

/**
 * Calculates a total based on a tiered structure and a custom calculation function.
 * The first tier will be calculated if the inputValue is more than 0.
 * For the rest of the tiers, the calculation will be done if the inputValue is more or equal to the maximum of the previous tier.
 *
 * @param {Array<{max: number, value: number}>} tiers - An array of tier objects.
 *      max: The exclusive maximum value for the current tier.
 *      value: The value to be added to the total for the current tier.
 * @param {number} input_value - The input value to use in the calculations.
 * @param {function(number, {max: number, value: number}, prior_max: number, number)} calculation_function
 * - The function to be called on to the input value with the specified tier input
 * Parameters: total, current_tier, min_value, input_value
 * @returns {number} - The calculated total based on the tiered structure and the input value.
 */
export const calculate_from_tiered_structure = (tiers, input_value, calculation_function) => {
  let total = 0;
  let prior_max = 0;

  for (const tier of tiers) {
    const current_max = validation.valid_number_or_infinite(tier.max);
    if (current_max == prior_max) {
      throw new Error("Two tiers cannot have the same max.");
    }

    if (current_max < prior_max) {
      throw new Error("A tier's max cannot be less than its previous tier");
    }

    if (input_value >= prior_max) {
      total = calculation_function(total, tier, prior_max, validation.valid_number(input_value));
    }
    prior_max = validation.valid_number_or_infinite(tier.max);
  }
  return validation.valid_number(total);
};

/**
 * Calculate the added total based on tiers for a given value to compare.
 *
 * @param {{max: number, value: number}[]} tiers - An array of tier objects, each containing max and value.
 *      max: The exclusive maximum value for the current tier.
 *      value: The value to be added to the total for the current tier.
 * @param {number} value_to_compare - The value to compare against the tiers.
 * @returns {number} - The calculated total based on the provided tiers and value to compare.
 */
export const calculate_added_total_by_tiers = (tiers, value_to_compare) => {
  return calculate_from_tiered_structure(tiers, validation.valid_number(value_to_compare), (total, current_tier) =>
    sum(validation.valid_number(total), validation.valid_number(current_tier.value))
  );
};

/**
 * Example function to calculate the total tax based on tiers for a given income.
 *
 * @param {{max: number, value: number}[]} tax_brackets - An array of tax brackets.
 *      max: The maximum value for the current tier.
 *      value: The tax rate for the current tier.
 * @param {number} income - The income to calculate tax for.
 * @returns {number} - The total tax based on the provided tax brackets and income.
 */
export const calculate_total_tax_by_tiers = (tax_brackets, income) => {
  // Calculate tax total based on the current tier.
  const calculate_tax_by_current_tier = (total, current_tier, min_value, input_value) => {
    const { max, rate } = current_tier;
    const amount_left_to_tax = floored_difference(validation.valid_number(input_value), validation.valid_number(min_value));
    const max_taxable_amount = validation.valid_number_or_infinite(max) !== Infinity ? subtract(max, min_value) : amount_left_to_tax;
    const tax_from_current_bracket = calculate_limited_percentage(amount_left_to_tax, validation.valid_number(rate), max_taxable_amount);
    return sum(total, tax_from_current_bracket);
  };

  return calculate_from_tiered_structure(tax_brackets, validation.valid_number(income), calculate_tax_by_current_tier);
};
