const { parseDate, ratingJSONToCSV, buildErrorResponse } = require("../src/utils");

describe("Parse date format", () => {
    it("Should correctly parse valid dates", () => {
        expect(parseDate("2019-Jan")).toBe(201901);
        expect(parseDate("2019-Feb")).toBe(201902);
        expect(parseDate("2019-Mar")).toBe(201903);
        expect(parseDate("2019-Apr")).toBe(201904);
        expect(parseDate("2019-May")).toBe(201905);
        expect(parseDate("2019-Jun")).toBe(201906);
        expect(parseDate("2019-Jul")).toBe(201907);
        expect(parseDate("2019-Aug")).toBe(201908);
        expect(parseDate("2019-Sep")).toBe(201909);
        expect(parseDate("2019-Oct")).toBe(201910);
        expect(parseDate("2019-Nov")).toBe(201911);
        expect(parseDate("2019-Dec")).toBe(201912);
    });

    it("Should throw when given invalid input", () => {
        expect(
            () => parseDate(),
        ).toThrowError("Invalid input date format");

        expect(
            () => parseDate("invalid"),
        ).toThrowError("Invalid input date format");

        expect(
            () => parseDate("2020-XYZ"),
        ).toThrowError("Invalid input month");

        expect(
            () => parseDate("2020-Jan"),
        ).not.toThrow();
    });
});

describe("Convert ratings JSON to CSV format", () => {
    it("should convert from JSON to CSV format", () => {
        expect(ratingJSONToCSV({
            standard: 1500,
            rapid: 1400,
            blitz: 1300,
            date: "2019-Jan",
        })).toBe("(2019-Jan,1500,1400,1300)");

        expect(ratingJSONToCSV({
            standard: 1500,
            rapid: 1400,
            blitz: 1300,
            date: "",
        })).toBe("(,1500,1400,1300)");

        expect(ratingJSONToCSV({
            standard: "",
            rapid: 1400,
            blitz: 1300,
            date: "2019-Jan",
        })).toBe("(2019-Jan,,1400,1300)");

        expect(ratingJSONToCSV({
            standard: 1500,
            rapid: "",
            blitz: 1300,
            date: "2019-Jan",
        })).toBe("(2019-Jan,1500,,1300)");

        expect(ratingJSONToCSV({
            standard: 1500,
            rapid: 1400,
            blitz: "",
            date: "2019-Jan",
        })).toBe("(2019-Jan,1500,1400,)");
    });
});


describe("Build an error response in JSON format", () => {
    it("should throw if error message is not valid", () => {
        expect(
            () => buildErrorResponse(),
        ).toThrowError("Error reason should be of type string");

        expect(
            () => buildErrorResponse(["error 1", "error 2"]),
        ).toThrowError("Error reason should be of type string");

        expect(
            () => buildErrorResponse("Test Error"),
        ).not.toThrow();
    });

    it("should build error response", () => {
        const error_res = buildErrorResponse("Test Error");
        expect(error_res.reason).toBeDefined();
        expect(typeof error_res.reason).toBe("string");
        expect(error_res.reason).toBe("Test Error");
    });
});
