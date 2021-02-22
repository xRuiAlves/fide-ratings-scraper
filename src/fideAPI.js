const fetch = require("node-fetch");

const FIDE_RATINGS_URL = "https://ratings.fide.com/profile";

/**
 * Fetch player profile page
 * @param {Integer} fide_num
 * @throws {String}
 * @returns {Object} Cheerio query object
 */
const fetchProfilePage = (fide_num) => fetch(`${FIDE_RATINGS_URL}/${fide_num}`).then((res) => res.text());

/**
 * Fetch player history page
 * @param {Integer} fide_num
 * @throws {String}
 * @returns {Object} Cheerio query object
 */
const fetchHistoryPage = (fide_num) => fetch(`${FIDE_RATINGS_URL}/${fide_num}/chart`).then((res) => res.text());

module.exports = {
    fetchProfilePage,
    fetchHistoryPage,
};
