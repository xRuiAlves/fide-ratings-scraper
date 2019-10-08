const axios = require("axios");
const cheerio = require("cheerio");

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

getElo(process.argv[2])
    .then((elo) => console.log(elo));
