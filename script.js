// Cache DOM selectors
const taxForm = document.querySelector("#tax-form");
const periodSelect = document.querySelector("#period-select");
const resultsContainer = document.querySelector("#calculation-results");
const payeResultDisplay = document.querySelector("#paye-result");
const uifResultDisplay = document.querySelector("#uif-result");
const salaryResultDisplay = document.querySelector("#salary-result");

// Configuration data
const currencyCharacter = "R";

const periodOptions = [
    {
        text: "Weekly",
        value: 52
    },
    {
        text: "Every 2 Weeks",
        value: 26
    },
    {
        text: "Monthly",
        value: 12
    },
    {
        text: "Yearly",
        value: 1
    }
];

const taxRebatesAgeBrackets = [
    {
        max: 65,
        value: 17235
    },
    {
        max: 75,
        value: 9444
    },
    {
        max: Infinity,
        value: 3145
    },
];

const taxBrackets = [
    {
        max: 237100,
        rate: 18
    },
    {
        max: 370500,
        rate: 26
    },
    {
        max: 512800,
        rate: 31
    },
    {
        max: 673000,
        rate: 36
    },
    {
        max: 857900,
        rate: 39
    },
    {
        max: 1817000,
        rate: 41
    },
    {
        max: Infinity,
        rate: 45
    },
];

const uifOptions = {
    percentage: 1,
    ceiling: 17712, // Monthly UIF ceiling
}

/**
 * Populates a select element with the given options.
 *      Each option text will be the key, and the value will be the value of each item in options array.
 * @param {{text: string, value: any}} options :object filled with text and value of the option
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
 * Calculates the monthly payable UIF based on a monthly salary
 * 
 * @param {number} monthlyIncome - value of monthly income
 * @param {{percentage: number, ceiling: number}} options - options for calculating the UIF
 *      percentage: Percentage of the total income which will be calculated as UIF
 *      ceiling: Maximum value which can be calculated from monthlyIncome to UIF
 */
const calculateMonthlyUIF = (monthlyIncome, options) => {
    const { percentage, ceiling } = options;

    let result = (Math.min(ceiling, monthlyIncome) * percentage / 100);

    return result;
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
const displayCalculationResults = (paye, uif, netSalary) => {
    payeResultDisplay.textContent = `${currencyCharacter} ${paye.toFixed(2)}`;
    uifResultDisplay.textContent = `${currencyCharacter} ${uif.toFixed(2)}`;
    salaryResultDisplay.textContent = `${currencyCharacter} ${netSalary.toFixed(2)}`;
}

/**
 * Calculates a total based on a tiered structure and a custom calculation function.
 * The first tier will be calculated if the inputValue is more than 0
 * for the rest of the tiers, the calculation will be done if the inputValue is more or equal to the maximum of the previous tier
 * 
 * @param {Array<{max: number, value: number}>} tiers - An array of tier objects.
 * @param {number} inputValue - The input value to use in the calculations.
 * @param {function(number, {max: number, value: number}, {max: number, value: number}, number)} calculationFunction 
 * - The function to be called on to the input value with the specified tier input
 * Parameters: total, currentTier, minValue, inputValue
 * @returns {number} - The calculated total based on the tiered structure and the input value.
 */
const calculateFromTieredStructure = (tiers, inputValue, calculationFunction) => {
    let total = 0;

    for (let i = 0; i < tiers.length; i++) {
        const currentTier = tiers[i];
        const previousTier = tiers[i - 1];

        const minValue = i > 0 ? previousTier.max : 0;

        if (inputValue >= minValue) {
            total = calculationFunction(total, currentTier, minValue, inputValue);
        }
    }

    return total;
};

/**
 * Example calculation function to calculate tax total based on the current tier.
 * 
 * @param {number} total - The current total.
 * @param {{max: number, value: number}} currentTier
 *      max: The maximum value for the current tier |
 *      value: The tax rate for the current tier.
 * @param {number} minValue - The minimum value for the current tier.
 * @param {number} inputValue - The input value for the calculation.
 * @returns {number} - The updated total based on the current tier calculation.
 */
const calculateTaxTotal = (total, currentTier, minValue, inputValue) => {
    const { max, rate } = currentTier;

    let amountLeftToTax = Math.max(inputValue - minValue, 0);
    let maxTaxableAmount = max !== Infinity ? max - minValue : amountLeftToTax;
    let currentTaxableAmount = Math.min(maxTaxableAmount, amountLeftToTax);

    let taxFromCurrentBracket = currentTaxableAmount * rate / 100;
    total += taxFromCurrentBracket;

    return total;
};

/**
 * Example calculation function to add the value from the current tier to the total.
 * 
 * @param {number} total - The current total.
 * @param {Object} tier
 *      max: The exclusive maximum value for the current tier
 *      value: The value to be added to the total for the current tier
 * @returns {number} - The updated total by adding the value from the current tier.
 */
const calculateAddedTotal = (total, tier) => {
    return total + tier.value;
};

/**
 * Calculates the PAYE after deductions, the UIF for the period and Net Salary for the period
 * 
 * @param {number} employeeAge - Age of the employee
 * @param {number} grossSalary - Employee gross salary
 * @param {number} periods - Amount of periods within a year such as 52 weeks per year
 * @returns {{paye: number, uif: number, netSalary: number}} |
 *      paye: PAYE after deducting tax rebates |
 *      uif: UIF for the period | 
 *      netSalary: Salary after deductions for the period 
 */
const calculateTaxData = (employeeAge, grossSalary, periods) => {
    // Calculate annual income
    let annualIncome = grossSalary * periods;

    // Calculate DE-Annualized UIF
    let monthlyIncome = annualIncome / 12;
    let monthlyUIF = calculateMonthlyUIF(monthlyIncome, uifOptions);
    let deAnnualizedUIF = monthlyUIF * 12 / periods;

    // Calculate Tax Rebates
    let taxRebates = calculateFromTieredStructure(taxRebatesAgeBrackets, employeeAge, calculateAddedTotal);

    // Calculate PAYE
    let rawPaye = calculateFromTieredStructure(taxBrackets, annualIncome, calculateTaxTotal);

    let annualPaye = rawPaye > taxRebates ? rawPaye - taxRebates : 0;
    let deAnnualizedPaye = annualPaye / periods;

    // Calculate Net Salary
    let deAnnualizedIncome = annualIncome / periods;
    let netSalary = deAnnualizedIncome - deAnnualizedUIF - deAnnualizedPaye;

    let results = {
        paye: deAnnualizedPaye,
        uif: deAnnualizedUIF,
        netSalary: netSalary
    }

    return results;
}

/**
 * Collects the data from the submitted form and has the PAYE data calculated and displayed on the results page
 * 
 * @param {Event} event | Submit event
 */
const onSubmit = (event) => {
    event.preventDefault();

    // Get form data
    const formData = event.target;

    const employeeAge = formData.elements["age"].value;
    const grossSalary = formData.elements["salary"].value;
    const periods = formData.elements["period"].value;

    let {paye, uif, netSalary} = calculateTaxData(employeeAge, grossSalary, periods);

    displayCalculationResults(paye, uif, netSalary);
}

// Initialize Period Select with options
initializeSelect(periodOptions, periodSelect);

// Initialize form submit event
taxForm.addEventListener("submit", onSubmit);



// /**
//  * Calculate progressive taxation based on given income value and tax rate taxBrackets.
//  * 
//  * @param {number} incomeValue - The income value to calculate taxation for.
//  * @param {{max: number, rate: number}[]} taxBrackets - An array of objects representing tax rate taxBrackets.
//  *     max: exclusive maximum taxable income for the bracket |
//  *     rate: tax rate for the bracket
//  * @returns {number} - The calculated total tax amount based on the progressive tax taxBrackets for the given income.
//  */
// const calculateProgressiveTaxation = (taxBrackets,incomeValue) => {
//     let total = 0;

//     for (let i = 0; i < taxBrackets.length; i++) {        
//         const currentTier = taxBrackets[i];
//         const previousTier = taxBrackets[i - 1];

//         const minValue = i > 0 ? previousTier.max : 0;

//         if (incomeValue >= minValue) {
//             const { max, rate } = currentTier;

//             let amountLeftToTax = Math.max(incomeValue - minValue, 0);
//             let maxTaxableAmount = max !== Infinity ? max - minValue : amountLeftToTax;
//             let currentTaxableAmount = Math.min(maxTaxableAmount, amountLeftToTax);

//             let taxFromCurrentBracket = currentTaxableAmount * rate / 100;
//             total += taxFromCurrentBracket;
            
//         }
//     }

//     return total;
// }

// /**
//  * Calculate the combined total value based on a tiered structure.
//  *
//  * @param {Array<{max: number, value: number}>} tiers - An array of tier objects
//  *      max: exclusive maximum value for the tier |
//  *      value: the value to add to the total if the input value falls within this tier |
//  * @param {number} inputValue - The value to test against the tiered structure.
//  * @returns {number} - The combined total value calculated based on the tiered structure and the input value.
//  */
// const calculateTotalFromTieredStructure = (tiers, inputValue) => {
//     let total = 0;

//     for(let i = 0; i < tiers.length; i++) {
//         const currentTier = tiers[i];
//         const previousTier = tiers[i - 1];

//         const minValue = i > 0 ? previousTier.max : 0;

//         if(inputValue >= minValue){
//             total += currentTier.value;
//         }
//     }

//     return total;
// }