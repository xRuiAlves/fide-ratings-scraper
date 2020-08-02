const fs = require("fs");
const {
    parseEloFromProfilePage, parsePersonalDataFromProfilePage, parseRankFromProfilePage, parseHistoryFromHistoryPage,
} = require("../src/parser");

const player_profile_page = fs.readFileSync(`${__dirname}/fixtures/player_profile_page.html`, "utf8");
const player_history_page = fs.readFileSync(`${__dirname}/fixtures/player_history_page.html`, "utf8");
const player_profile_page_not_found = fs.readFileSync(`${__dirname}/fixtures/player_profile_page_not_found.html`, "utf8");
const player_history_page_not_found = fs.readFileSync(`${__dirname}/fixtures/player_history_page_not_found.html`, "utf8");

describe("Parse ELO from Player's profile page", () => {
    it("Should correctly parse the player's ELO information", () => {
        const elo  = parseEloFromProfilePage(player_profile_page);
        expect(elo).toBeDefined();
        expect(elo.standard_elo).toBeDefined();
        expect(elo.rapid_elo).toBeDefined();
        expect(elo.blitz_elo).toBeDefined();
        expect(isNaN(elo.standard_elo)).toBe(false);
        expect(isNaN(elo.rapid_elo)).toBe(false);
        expect(isNaN(elo.blitz_elo)).toBe(false);
    });

    it("Should throw when the requested player does not exist", () => {
        expect(
            () => parseEloFromProfilePage(player_profile_page_not_found),
        ).toThrowError("Not found");

        expect(
            () => parseEloFromProfilePage(player_profile_page),
        ).not.toThrow();
    });
});

describe("Parse personal data from Player's profile page", () => {
    it("Should correctly parse the player's personal data", () => {
        const data  = parsePersonalDataFromProfilePage(player_profile_page);
        expect(data).toBeDefined();
        expect(data.name).toBeDefined();
        expect(data.federation).toBeDefined();
        expect(data.birth_year).toBeDefined();
        expect(data.sex).toBeDefined();
        expect(data.title).toBeDefined();
        expect(typeof data.name).toBe("string");
        expect(typeof data.federation).toBe("string");
        expect(typeof data.birth_year).toBe("number");
        expect(typeof data.sex).toBe("string");
        expect(typeof data.title).toBe("string");
        expect(data.name).toBe("Carlsen, Magnus ");
        expect(data.federation).toBe("Norway");
        expect(data.birth_year).toBe(1990);
        expect(data.sex).toBe("Male");
        expect(data.title).toBe("Grandmaster");
    });

    it("Should throw when the requested player does not exist", () => {
        expect(
            () => parsePersonalDataFromProfilePage(player_profile_page_not_found),
        ).toThrowError("Not found");

        expect(
            () => parsePersonalDataFromProfilePage(player_profile_page),
        ).not.toThrow();
    });
});

describe("Parse ranking from Player's profile page", () => {
    it("Should correctly parse the player's ranking information", () => {
        const ranking  = parseRankFromProfilePage(player_profile_page);
        expect(ranking).toBeDefined();
        expect(ranking.world_rank_all_players).toBeDefined();
        expect(ranking.world_rank_active_players).toBeDefined();
        expect(ranking.national_rank_all_players).toBeDefined();
        expect(ranking.national_rank_active_players).toBeDefined();
        expect(ranking.national_rank_active_players).toBeDefined();
        expect(ranking.continental_rank_active_players).toBeDefined();
        expect(typeof ranking.world_rank_all_players).toBe("number");
        expect(typeof ranking.world_rank_active_players).toBe("number");
        expect(typeof ranking.national_rank_all_players).toBe("number");
        expect(typeof ranking.national_rank_active_players).toBe("number");
        expect(typeof ranking.national_rank_active_players).toBe("number");
        expect(typeof ranking.continental_rank_active_players).toBe("number");
    });

    it("Should throw when the requested player does not exist", () => {
        expect(
            () => parseRankFromProfilePage(player_profile_page_not_found),
        ).toThrowError("Not found");

        expect(
            () => parseRankFromProfilePage(player_profile_page),
        ).not.toThrow();
    });
});

describe("Parse history from Player's history page", () => {
    it("Should correctly parse the player's history information", () => {
        const history  = parseHistoryFromHistoryPage(player_history_page);
        expect(history).toBeDefined();
        expect(Array.isArray(history)).toBe(true);
        expect(history.length === 149);
        history.forEach((entry) => {
            expect(entry.date).toBeDefined();
            expect(entry.numeric_date).toBeDefined();
            expect(entry.standard).toBeDefined();
            expect(entry.num_standard_games).toBeDefined();
            expect(entry.rapid).toBeDefined();
            expect(entry.num_rapid_games).toBeDefined();
            expect(entry.blitz).toBeDefined();
            expect(entry.num_blitz_games).toBeDefined();
            expect(isNaN(entry.date)).toBe(true);
            expect(typeof entry.date).toBe("string");
            expect(entry.date.length).toBe(8);
            expect(isNaN(entry.numeric_date)).toBe(false);
            expect(isNaN(entry.standard)).toBe(false);
            expect(isNaN(entry.num_standard_games)).toBe(false);
            expect(isNaN(entry.rapid)).toBe(false);
            expect(isNaN(entry.num_rapid_games)).toBe(false);
            expect(isNaN(entry.blitz)).toBe(false);
            expect(isNaN(entry.num_blitz_games)).toBe(false);
        });
    });

    it("Should throw when the requested player does not exist", () => {
        expect(
            () => parseHistoryFromHistoryPage(player_history_page_not_found),
        ).toThrowError("Not found");

        expect(
            () => parseHistoryFromHistoryPage(player_history_page),
        ).not.toThrow();
    });
});
