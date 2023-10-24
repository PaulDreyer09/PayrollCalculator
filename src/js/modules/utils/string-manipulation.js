import * as validation from './validation.js';

export const stringConcatinateAsCamelCase = (...strings) => { 
    let result = validation.validString(strings.shift());
    for(let val of strings){
        if(typeof validation.validString(val) != 'string'){
            throw new Error(`Provided argument is not of type string.  Provided value: ${val} `)
        }
        const firstLetter = val[0];
        val = firstLetter.toUpperCase() + val.slice(1);
        result += val;
    }

    return result;
}

export const stringConcatinateAsSnakeCase = (...strings) => { 
    let result = validation.validString(strings.shift());

    for(let val of strings){
        if(typeof validation.validString(val) != 'string'){
            throw new Error(`Provided argument is not of type string.  Provided value: ${val} `)
        }
        
        result += '_' + val;
    }

    return result;
}

export const stringConcatinateAsLowerSnakeCase = (...strings) => {
    return stringConcatinateAsSnakeCase(...strings).toLowerCase();
}