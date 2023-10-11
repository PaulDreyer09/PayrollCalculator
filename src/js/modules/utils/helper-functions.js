/**
 * Calculates how much the value will be per year for a given value per period(monthly: 12)
 * 
 * @param {number} value - value of the number to be annualized
 * @param {number} currentPeriodsPerAnnum - number of periods per annum
 * @returns 
 */
export const annualize = (value, currentPeriodsPerAnnum) => value * currentPeriodsPerAnnum;


/**
 * Calculates how much the value will be per period for a given annual value
 * 
 * @param {number} value - annual value to be DE-annualized
 * @param {number} newPeriodsPerAnnum - number of periods per annum
 * @returns 
 */
export const deAnnualize = (value, newPeriodsPerAnnum) =>  value / newPeriodsPerAnnum;