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

function validateWithRules(rules) {
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
            return val > param;
        case 'lt':
            return val < param;
    }
}

module.exports.isGreaterThan = ( val, param, lang ) => {
    const isGreaterThan = (val, param, lang) => {
        const operationResult = mathematicOperation(val, param, 'gt');
        return validationResult(operationResult, !operationResult && lang)
    }
    return validateWithRules([
        isThing(val),
        isGreaterThan(val, param, lang)
    ])
}

module.exports.isLessThan = ( val, param, lang ) => {
    const isLessThan = (val, param, lang) => {
        const operationResult = mathematicOperation(val, param, 'lt');
        return validationResult(operationResult, !operationResult && lang)
    }
    return validateWithRules([
        isThing(val),
        isLessThan(val, param, lang)
    ])
}

module.exports.isEmail = (val, lang) =>  {
    const isRealEmail = (val, lang) => {
        const operationResult = isEmail(val);
        return validationResult(operationResult, !operationResult && lang);
    }
    return validateWithRules([
        isThing(val),
        isRealEmail(val, lang)
    ])
}

module.exports.isThing = isThing;
module.exports.validateWithRules = validateWithRules;