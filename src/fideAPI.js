const axios = require("axios");
const https = require("https");

const FIDE_RATINGS_URL = "https://ratings.fide.com/profile";

/**
 * Fetch player profile page
 * @param {Integer} fide_num
 * @throws {String}
 * @returns {Object} Cheerio query object
 */
const fetchProfilePage = (fide_num) => (
    axios.get(
        `${FIDE_RATINGS_URL}/${fide_num}`,
        {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        },
    )
);

/**
 * Fetch player history page
 * @param {Integer} fide_num
 * @throws {String}
 * @returns {Object} Cheerio query object
 */
const fetchHistoryPage = (fide_num) => (
    axios.get(
        `${FIDE_RATINGS_URL}/${fide_num}/chart`,
        {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        },
    )
);

module.exports = {
    fetchProfilePage,
    fetchHistoryPage,
};
