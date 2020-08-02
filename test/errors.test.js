const ERRORS = require("../src/errors");

describe("Validate error types", () => {
    it("should feature error code and description", () => {
        Object.values(ERRORS).forEach(({ code, description }) => {
            expect(typeof code).toBe("number");
            expect(typeof description).toBe("string");
            expect(description.length).not.toBe(0);
        });
    });
});
