const axios = require("axios");
const cheerio = require("cheerio");

const parseDate = (date) => {
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
    const month_num = date_map[date.substr(5, 3)];
    return parseInt(`${date.substr(0, 4)}${month_num}`, 10);
};

const getElo = async (fide_num) => {
    const res = await axios.get(`http://ratings.fide.com/card.phtml?event=${fide_num}`);
    const $ = cheerio.load(res.data);
    const elo_row = $(`
        #main-col table:nth-child(2) tr:nth-child(2) td
        table tr:first-child td:first-child
        table tr:nth-child(4) td:nth-child(2)
        table tr td`);

    return {
        standard: elo_row[0].children[3].data.trim(),
        rapid: elo_row[1].children[3].children[0].data.trim(),
        blitz: elo_row[2].children[3].children[0].data.trim(),
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
            numeric_date: parseDate(row[0].children[0].data.replace(/\s/g, "")),
            standard: row[1].children[0].data.replace(/\s/g, ""),
            rapid: row[3].children[0].data.replace(/\s/g, ""),
            blitz: row[5].children[0].data.replace(/\s/g, ""),
        });
    });
    return csv_output ? history.sort((e1, e2) => e2.numeric_date - e1.numeric_date).map((entry) =>
        `(${entry.date},${entry.standard},${entry.rapid},${entry.blitz})`,
    ) : history;
};

getElo(process.argv[2])
    .then((elo) => console.log(elo));

getHistory(process.argv[2], true)
    .then((history) => console.log(history));
