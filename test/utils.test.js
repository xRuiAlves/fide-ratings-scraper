const utils = require("../utils");

describe("utils.parseDate", () => {
    test("January", () => {
        expect(utils.parseDate("2019-Jan")).toBe(201901);
    });

    test("February", () => {
        expect(utils.parseDate("2019-Feb")).toBe(201902);
    });

    test("March", () => {
        expect(utils.parseDate("2019-Mar")).toBe(201903);
    });

    test("April", () => {
        expect(utils.parseDate("2019-Apr")).toBe(201904);
    });

    test("May", () => {
        expect(utils.parseDate("2019-May")).toBe(201905);
    });

    test("June", () => {
        expect(utils.parseDate("2019-Jun")).toBe(201906);
    });

    test("July", () => {
        expect(utils.parseDate("2019-Jul")).toBe(201907);
    });

    test("August", () => {
        expect(utils.parseDate("2019-Aug")).toBe(201908);
    });

    test("September", () => {
        expect(utils.parseDate("2019-Sep")).toBe(201909);
    });

    test("October", () => {
        expect(utils.parseDate("2019-Oct")).toBe(201910);
    });

    test("November", () => {
        expect(utils.parseDate("2019-Nov")).toBe(201911);
    });

    test("December", () => {
        expect(utils.parseDate("2019-Dec")).toBe(201912);
    });
});

describe("utils.ratingJSONToCSV", () => {
    test("regular", () => {
        expect(utils.ratingJSONToCSV({
            standard: 1500,
            rapid: 1400,
            blitz: 1300,
            date: "2019-Jan",
        })).toBe("(2019-Jan,1500,1400,1300)");
    });

    test("missing date", () => {
        expect(utils.ratingJSONToCSV({
            standard: 1500,
            rapid: 1400,
            blitz: 1300,
            date: "",
        })).toBe("(,1500,1400,1300)");
    });

    test("missing standard elo", () => {
        expect(utils.ratingJSONToCSV({
            standard: "",
            rapid: 1400,
            blitz: 1300,
            date: "2019-Jan",
        })).toBe("(2019-Jan,,1400,1300)");
    });

    test("missing rapid elo", () => {
        expect(utils.ratingJSONToCSV({
            standard: 1500,
            rapid: "",
            blitz: 1300,
            date: "2019-Jan",
        })).toBe("(2019-Jan,1500,,1300)");
    });

    test("missing blitz elo", () => {
        expect(utils.ratingJSONToCSV({
            standard: 1500,
            rapid: 1400,
            blitz: "",
            date: "2019-Jan",
        })).toBe("(2019-Jan,1500,1400,)");
    });
});
