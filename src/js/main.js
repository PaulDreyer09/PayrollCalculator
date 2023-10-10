import {currencyCharacter, periodOptions, taxRebatesBrackets, taxBrackets, uifOptions} from './modules/config/config.js'
import * as calc from './modules/ui/calculatorUI.js';

calc.initializeCalculator(periodOptions, taxRebatesBrackets, taxBrackets, uifOptions, currencyCharacter);
