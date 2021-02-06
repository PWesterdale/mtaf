const { isThing, isGreaterThan } = require('../validation/index');

describe("Validation suite", () => {
    it("should validate a thing", () => {
        const isAThing = isThing('test');
        expect(isAThing.isValid).toBe(true);
        const isNotAThing = isThing(undefined);
        expect(isNotAThing.isValid).toBe(false)
    })
    it("should validate a minimum value", () => {
        const isTenGreaterThanFive = isGreaterThan(10, 5);
        expect(isTenGreaterThanFive.isValid).toBe(true);
        const isTenGreaterThanEleven = isGreaterThan(10, 11, 'I\'m sorry, not in this universe');
        expect(isTenGreaterThanEleven.isValid).toBe(false);
    })
})