/**
 * Print error to stderr
 * @param {Object} err
 * @param {String} msg
 */
const printError = (err, msg) => {
    console.error(`Code: ${err.code}`);
    console.error(`Reason: ${err.description}`);
    if (msg) {
        console.error(`Message: ${msg}`);
    }
};

/**
 * Print tool usage to stdout
 */
const printUsage = () => {
    console.info("usage: fide-ratings-scraper <operation> [...args]");
    console.info("\toperation:");
    console.info("\t\tget:  Obtain resource");
    console.info("\t\tapi:  Start app as a web API");
    console.info("");
    console.info("fide-ratings-scraper get info <fide_num>");
    console.info("\tfide_num:  Player FIDE id number");
    console.info("fide-ratings-scraper get personal-data <fide_num>");
    console.info("\tfide_num:  Player FIDE id number");
    console.info("fide-ratings-scraper get rank <fide_num>");
    console.info("\tfide_num:  Player FIDE id number");
    console.info("fide-ratings-scraper get elo <fide_num>");
    console.info("\tfide_num:  Player FIDE id number");
    console.info("fide-ratings-scraper get history <fide_num>");
    console.info("\tfide_num:  Player FIDE id number");
    console.info("fide-ratings-scraper api");
    console.info("");
};

module.exports = {
    printError,
    printUsage,
};
