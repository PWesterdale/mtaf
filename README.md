## More Than a Feeling (MTAF)
It's journey. ...get it?

### Why?
Just using this as a scratch pad for ideas around Journeys as code and how this work can be abstracted away to a point it can be rendered by relatively dumb components.
My mind is spinning on this in terms of possibilities that it opens, so please feel free to critique/rip apart.

### But what does it do?
At the minute, not a lot other than prove some concepts and ideas.
`npm run test` and looking through the `__tests__` folder should give you a good guess :)

- This describes a two step journey, first asking the user for first name and last name, secondary just asking a math question.
- Content and questions are the main important elements and should be distilled down enough to be renderable by react/preact/templating system of your choice.
- This aims to be isomorphic so should make SSR/CSR a breeze.


### Typings?!?!
Why not? I used these as an initial mind map but couldn't be bothered with the full TS hassle for a quick demo.

```
type ScreenComponent = {
    type: string
    props: {}
    validation: string[]
}

type SuccessorLink = {
    id: string,
    qualifier?: string[]
}

type KoodooScreen = {
    id : string
    components : ScreenComponent[]
    successors : SuccessorLink[]
    terminates: boolean
}

type Journey = {
    name: string,
    version: string,
    screens: KoodooScreen[]
    startsAt: string
}
```


