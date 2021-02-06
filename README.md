## More Than a Feeling (MTAF)
It's journey. ...get it?

### Why?
Just using this as a scratch pad for idea's around Journeys as code and how this work can be abstracted away to a point it can be rendered by relatively dumb components.
My mind is spinning on this in terms of possibilities that it opens, so please feel free to critique/rip apart.

### But what does it do?
At the minute, not a lot other than prove some concepts and ideas.
`npm run test` and looking through the `__tests__` folder should give you a good guess :)

### Example Journey Explained

```
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
                    content: 'Welcome to MTAF'
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

```

- This describes a two step journey, first asking the user for first name and last name, secondary just asking a math question.
- Content and questions are the main important elements and should be distilled down enough to be renderable by react/preact/templating system of your choice.
- This aims to be isomorphic so should make SSR/CSR a breeze.


### Typings?!?!
Why not? I used these as an initial mind map but couldn't be bothered with the full TS hassle for a quick demo.

```
type ContentBlock = {
    type: string,
    props: {}
}

type Question = {
    id: string,
    type: string,
    props: {},
    validation: (value: string) => any
}

type JourneyStage = {
    id: string
    content: ContentBlock[]
    questions: Question[]
    prefetch: Promise<{}>[]
}

type Journey = {
    name: string,
    version: string,
    stages: JourneyStage[]
}
```


