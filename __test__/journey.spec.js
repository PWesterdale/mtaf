const { isThing } = require("../validation")

const baseJourney = require('../__mock__/baseJourney');
const { getJourneyPosition } = require('../journey/index');

describe("Journey as code", () => {
    it("should be able to find a users place in the journey by validation routines", () => {
        const position = getJourneyPosition({
            firstName: 'Paul'
        }, baseJourney);
        expect(position.stage).toBe(0);
    }) 

    it("should be able to determine a journey is complete", () => {
        const position = getJourneyPosition({
            firstName: 'Paul',
            lastName: 'Westerdale',
            gt10: '11'
        }, baseJourney);
        expect(position.stage).toBe(2);
        expect(position.isComplete).toBe(true);
    }) 
})