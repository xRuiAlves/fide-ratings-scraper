const axios = require("axios");

const FIDE_RATINGS_URL = "https://ratings.fide.com/profile";

/**
 * Fetch player profile page
 * @param {Integer} fide_num
 * @throws {String}
 * @returns {Object} Cheerio query object
 */
const fetchProfilePage = (fide_num) => (
    axios.get(`${FIDE_RATINGS_URL}/${fide_num}`)
);

/**
 * Fetch player history page
 * @param {Integer} fide_num
 * @throws {String}
 * @returns {Object} Cheerio query object
 */
const fetchHistoryPage = (fide_num) => (
    axios.get(`${FIDE_RATINGS_URL}/${fide_num}/chart`)
);

module.exports = {
    fetchProfilePage,
    fetchHistoryPage,
};
