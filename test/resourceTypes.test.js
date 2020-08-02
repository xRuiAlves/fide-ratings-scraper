const RESOURCE_TYPES = require("../src/resourceTypes");

describe("Validate input types", () => {
    it("should feature an entry for each input type", () => {
        expect(Object.entries(RESOURCE_TYPES).length).toBe(1);
        expect(RESOURCE_TYPES.GET).toBeDefined();
        expect(Object.values(RESOURCE_TYPES.GET).length).toBe(5);
        Object.values(RESOURCE_TYPES.GET).forEach((resource) => {
            expect(typeof resource).toBe("string");
            expect(resource.length).not.toBe(0);
        });
    });
});
