const OPERATION_TYPES = require("../src/operationTypes");

describe("Validate input types", () => {
    it("should feature an entry for each input type", () => {
        expect(Object.entries(OPERATION_TYPES).length).not.toBe(0);
        Object.entries(OPERATION_TYPES).forEach(([key, val]) => {
            expect(typeof val).toBe("string");
            expect(val.toLowerCase()).toBe(key.toLowerCase());
        });
    });
});
