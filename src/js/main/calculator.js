
/**
 * Calculate results based on validated input data.
 * @param {object} inputData - The validated input data.
 * @returns {object} An object containing output results.
 */
export const handleCalculateResults = (inputData, command) => {
    return command.execute(filterInputDataToDefinitions(inputData, command));
}
