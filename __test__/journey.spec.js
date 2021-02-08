const { isThing } = require("../validation")

const baseJourney = require('../__mock__/baseJourney');
const { getJourneyPosition } = require('../journey/index');

describe("Journey as code", () => {
    it("should be able to find a users place in the journey by validation routines", () => {
        const screen = getJourneyPosition({
            firstName: 'Paul'
        }, baseJourney);
        expect(screen.id).toBe('start');
    }) 

    it("should be able to determine a journey is complete", () => {
        const screen = getJourneyPosition({
            firstName: 'Paul',
            lastName: 'Westerdale',
            randomNumber: '11'
        }, baseJourney);
        expect(screen.id).toBe('underFifty');
        expect(screen.terminates).toBe(true);
    }) 
})