/**
 * Date string to numberic string format map
 */
const date_map = Object.freeze({
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12",
});

/**
 * Parse date from 'YYYY-MMM' format to 'YYYYMM' numeric format
 * @param {String} date
 * @throws {Error}
 * @returns {String} Date in 'YYYYMM' numeric format
 */
const parseDate = (date) => {
    if (!date || date.length !== 8) {
        throw new Error("Invalid input date format");
    }

    const month_num = date_map[date.substr(5, 3)];

    if (!month_num) {
        throw new Error("Invalid input month");
    }

    return parseInt(`${date.substr(0, 4)}${month_num}`, 10);
};

/**
 * Build a JSON error response
 * @param {String} reason
 * @throws {Error}
 * @returns {Object} JSON response (with 'error' field)
 */
const buildErrorResponse = (reason) => {
    if (typeof reason !== "string") {
        throw new Error("Error reason should be of type string");
    }
    return { reason };
};

module.exports = {
    parseDate,
    buildErrorResponse,
};
