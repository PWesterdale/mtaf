const { isGreaterThan, isThing, validateWithRules } = require("../validation");

module.exports = {
    name: 'Pauls Test Journey',
    version: "0.0.1",
    stages: [
        { 
            id : 'welcome', 
            content: [{
                type: 'block',
                props: {
                    header: 'Hello',
                    content: 'Welcome to Hopeless Wanderer'
                }
            }], 
            questions: [{
                id: 'firstName',
                type: 'input',
                props: {
                    question: 'What is your first name'
                },
                validation: (value) => {
                    return isThing(value, 'You must provide your first name')
                }
            }, {
                id: 'lastName',
                type: 'input',
                props: {
                    question: 'What is your last name'
                },
                validation: (value) => {
                    return isThing(value, 'You must provide your last name')
                }
            }],
            prefetch: []
        },
        {
            id: 'numbers',
            content: [{
                type: 'block',
                props: {
                    header: 'Okay, time to get tougher!',
                    content: 'Time for some numbers!'
                }
            }],
            questions: [{
                id: 'gt10',
                type: 'numeric',
                props: {
                    question: 'Enter a number larger than 10',
                },
                validation: (value) => {
                    return isGreaterThan(value, 10, 'The number selected is not larger than 10')
                }
            }],
            prefetch: []
        }
    ]
}