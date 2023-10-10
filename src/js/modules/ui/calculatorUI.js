import {calculateTaxData} from '../utils/tax-calculations.js';

const taxForm = document.querySelector("#tax-form");
const periodSelect = document.querySelector("#period-select");
const payeResultDisplay = document.querySelector("#paye-result");
const uifResultDisplay = document.querySelector("#uif-result");
const salaryResultDisplay = document.querySelector("#salary-result");

/**
 * Populates a select element with the given options.
 *      Each option text will be the key, and the value will be the value of each item in options array.
 * @param {{text: string, value: any}[]} options : array list object filled with text and value of the option
 *      text: Text value of the option
 *      value: Value of the option
 * @param {Element} selectElement :select element to populate with options
 */
const initializeSelect = (options, selectElement) => {
    //Clear any options from the select element
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild);
    }

    //Create and add option elements according to the options object
    for (let i = 0; i < options.length; i++) {
        const { text, value } = options[i];

        const periodOption = document.createElement("option");
        periodOption.value = value;
        periodOption.text = text;

        selectElement.appendChild(periodOption);
    }
}

/**
 * Displays the data for the tax calculation
 *      Removes the hidden attribute from the results container
 * 
 * @param {{paye: number, uif: number, netSalary: number}} |
 *      paye: PAYE after deducting tax rebates |
 *      uif: UIF for the period | 
 *      netSalary: Salary after deductions for the period 
 */
const displayCalculationResults = (paye, uif, netSalary, currencyCharacter) => {
    payeResultDisplay.textContent = `${currencyCharacter} ${paye.toFixed(2)}`;
    uifResultDisplay.textContent = `${currencyCharacter} ${uif.toFixed(2)}`;
    salaryResultDisplay.textContent = `${currencyCharacter} ${netSalary.toFixed(2)}`;
}

/**
 * Collects the data from the submitted form and has the PAYE data calculated and displayed on the results page
 * 
 * @param {Event} event | Submit event
 */
const onSubmit = (event, taxRebatesBrackets, taxBrackets, uifOptions, currencyCharacter) => {
    event.preventDefault();

    // Get form data
    const formData = event.target;

    const employeeAge = formData.elements["age"].value;
    const grossSalary = formData.elements["salary"].value;
    const periods = formData.elements["period"].value;

    let {deAnnualizedPaye, deAnnualizedUIF, netSalary} = calculateTaxData(employeeAge, grossSalary, periods, taxBrackets, taxRebatesBrackets, uifOptions);

    displayCalculationResults(deAnnualizedPaye, deAnnualizedUIF, netSalary, currencyCharacter);
}

/**
 * Initializes the calculator functionality.
 * Populates the period select with the given options and sets up form submission event handling.
 * 
 * @param {{text: string, value: any}[]} periodOptions : array list object filled with text and value of the option
 *      text: Text value of the option
 *      value: Value of the option
 * @param {{max: number, value: number}} taxRebatesBrackets - Tax rebates age backets
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @param {Object[]} taxBrackets - Tax brackets for calculations.
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @param {{percentage: number, ceiling: number}[]} uifOptions - options for calculating the UIF
 *      percentage: Percentage of the total income which will be calculated as UIF
 *      ceiling: Maximum value which can be calculated from monthlyIncome to UIF
 * @param {string} currencyCharacter - Character representing the currency symbol.
 */
export const initializeCalculator = (periodOptions = [], taxRebatesBrackets = [], taxBrackets = [], uifOptions = [], currencyCharacter = '') => {
    // Initialize Period Select with options
    initializeSelect(periodOptions, periodSelect);

    // Initialize form submit event
    taxForm.addEventListener("submit", event => onSubmit(event, taxRebatesBrackets, taxBrackets, uifOptions, currencyCharacter));
}