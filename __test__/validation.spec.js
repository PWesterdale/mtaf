const { validate } = require('../validation/index');

describe("Validation suite", () => {
    
    it("should validate a thing", () => {
        const isAThing = validate(['isThing'], 'test');
        expect(isAThing.isValid).toBe(true);
        const isNotAThing = validate(['isThing'], undefined);
        expect(isNotAThing.isValid).toBe(false)
    })
    it("should validate a minimum value", () => {
        const isTenGreaterThanFive = validate(['isGreaterThan|5'], 10);
        expect(isTenGreaterThanFive.isValid).toBe(true);
        const isTenGreaterThanEleven = validate(['isGreaterThan|11'], 10);
        expect(isTenGreaterThanEleven.isValid).toBe(false);
    })

})