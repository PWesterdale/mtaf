const { TextComponent, InputComponent } = require("../components/componentFactory");

module.exports = {
    name: 'Pauls Test Journey',
    version: "0.0.1",
    startsAt: 'start',
    screens: [
        { 
            id : 'start',
            components: [
                TextComponent({
                    title: 'Hello', 
                    content: 'Welcome to a Journey'
                }),
                InputComponent({
                    id: 'firstName',
                    label: 'First Name',
                    type: 'text',
                    validation: ['isThing']
                }),
                InputComponent({
                    id: 'lastName',
                    label: 'Last name',
                    type: 'text',
                    validation: ['isThing']
                }),
            ],
            successors: [
                {
                    id: 'numbers'
                }
            ]
        },
        {
            id: 'numbers',
            components: [
                InputComponent({
                    type: 'number',
                    id: 'randomNumber',
                    label: 'Please enter a value between 1 and 100',
                    validation: ['isThing', 'isGreaterThan|0', 'isLessThan|100']
                })
            ],
            successors: [
                {
                    id: 'underFifty',
                    qualifiers: [{
                        key: 'randomNumber',
                        checks: ['isLessThan|50']
                    }]
                },
                {
                    id: 'overFifty',
                    qualifiers: [{
                        key: 'randomNumber',
                        checks: ['isGreaterThan|50']
                    }]
                }
            ]
        },
        {
            id: 'underFifty',
            components: [
                TextComponent('Less than', 'You chose a number less than fifty')
            ],
            terminates: true
        },
        {
            id: 'overFifty',
            components: [
                TextComponent('Young Gun!', 'You chose a number over fifty')
            ],
            terminates: true
        }
    ] 
}