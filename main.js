const fide_ratings = require("./fide_ratings");

if (process.argv.length < 3) {
    console.error("Arguments missing");
    process.exit(1);
}

fide_ratings.getPlayerElo(process.argv[2])
    .then((elo) => {
        console.log("----- Player ELO -----");
        console.log(elo);
    });

fide_ratings.getPlayerHistory(process.argv[2])
    .then((history) => {
        console.log("----- Player History -----");
        console.log(history);
    });

fide_ratings.getPlayerFullInfo(process.argv[2])
    .then((info) => {
        console.log("----- Player Info -----");
        console.log(info);
    });

fide_ratings.getPlayerRank(process.argv[2])
    .then((rank) => {
        console.log("----- Player Rank -----");
        console.log(rank);
    });

fide_ratings.getPlayerPersonalData(process.argv[2])
    .then((data) => {
        console.log("----- Player Personal Data -----");
        console.log(data);
    });
