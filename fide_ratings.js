const axios = require("axios");
const cheerio = require("cheerio");
const utils = require("./utils");

const getPlayerElo = async (fide_num) => {
    const res = await axios.get(`https://ratings.fide.com/profile/${fide_num}`);
    const $ = cheerio.load(res.data);
    const elo_row = $(`.profile-top-rating-data`);

    return {
        standard: elo_row[0].children[2].data.replace(/\s/g, ""),
        rapid: elo_row[1].children[2].data.replace(/\s/g, ""),
        blitz: elo_row[2].children[2].data.replace(/\s/g, ""),
    };
};

const getHistory = async (fide_num, csv_output) => {
    const res = await axios.get(`http://ratings.fide.com/id.phtml?event=${fide_num}`);
    const $ = cheerio.load(res.data);
    const table_entries = $(`
        #main-col table:nth-child(2) tr:nth-child(2) td div 
        table tr:nth-child(2) td table tbody tr`);
    const history = [];
    table_entries.map((i) => {
        const row = cheerio.load(table_entries[i])("td");
        history.push({
            date: row[0].children[0].data.replace(/\s/g, ""),
            numeric_date: utils.parseDate(row[0].children[0].data.replace(/\s/g, "")),
            standard: row[1].children[0].data.replace(/\s/g, ""),
            rapid: row[3].children[0].data.replace(/\s/g, ""),
            blitz: row[5].children[0].data.replace(/\s/g, ""),
        });
    });
    return csv_output ? history.sort((e1, e2) => e2.numeric_date - e1.numeric_date).map((entry) =>
        `(${entry.date},${entry.standard},${entry.rapid},${entry.blitz})`,
    ) : history;
};

module.exports = {
    getPlayerElo,
    getHistory
}
