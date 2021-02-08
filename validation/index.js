const { isEmail } = require('validator');

function validationResult(result, errors) {
    return { isValid: result, errors: errors ? [ errors ] : [] };
}

function isThing(val, lang) {
    if(val && val !== "") {
        return validationResult(true)
    }
    return validationResult(false, lang)
}

function compressValidationResults(rules) {
    return rules.reduce((acc, result) => {
        if(!result.isValid) {
            acc.isValid = false;
        }
        acc.errors = [...acc.errors, ...result.errors]
        return acc;
    }, { isValid : true, errors: [] })
}

function mathematicOperation(val, param, operation) {
    const value = Number(val);
    switch(operation) {
        case 'gt':
            return value > param;
        case 'lt':
            return value < param;
    }
}

function isGreaterThan( val, param, lang ) {
    const isGreaterThan = (val, param, lang) => {
        const operationResult = mathematicOperation(val, param, 'gt');
        return validationResult(operationResult, !operationResult && lang)
    }
    return compressValidationResults([
        isThing(val),
        isGreaterThan(val, param, lang)
    ])
}

function isLessThan( val, param, lang ) {
    const isLessThan = (val, param, lang) => {
        const operationResult = mathematicOperation(val, param, 'lt');
        return validationResult(operationResult, !operationResult && lang)
    }
    return compressValidationResults([
        isThing(val),
        isLessThan(val, param, lang)
    ])
}

function isValidEmail(val, lang) {
    const isRealEmail = (val, lang) => {
        const operationResult = isEmail(val);
        return validationResult(operationResult, !operationResult && lang);
    }
    return compressValidationResults([
        isThing(val),
        isRealEmail(val, lang)
    ])
}

const rules = {
    isEmail: isValidEmail,
    isLessThan: isLessThan,
    isGreaterThan: isGreaterThan,
    isThing: isThing
}

module.exports.compressValidationResults = compressValidationResults

module.exports.validate = (validations, input) => {
    const validateFns = validations.map((vString) => {
        const values = vString.split('|');
        const rule = values.shift();
        return rules[rule](input, ...values);
    })
    return compressValidationResults(validateFns)
}