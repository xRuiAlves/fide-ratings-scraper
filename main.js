require("dotenv-flow").config();

const fide_ratings = require("./fide_ratings");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.set("Content-Type", "application/json");

    next();
});

app.get("/player/:fide_num/info", (req, res) => {
    const { fide_num } = req.params;

    fide_ratings.getPlayerFullInfo(fide_num).then((data) => {
        res.json(data);
    });
});

app.get("/player/:fide_num/personal-data", (req, res) => {
    const { fide_num } = req.params;

    fide_ratings.getPlayerPersonalData(fide_num).then((data) => {
        res.json(data);
    });
});

app.get("/player/:fide_num/rank", (req, res) => {
    const { fide_num } = req.params;

    fide_ratings.getPlayerRank(fide_num).then((data) => {
        res.json(data);
    });
});

app.get("/player/:fide_num/elo", (req, res) => {
    const { fide_num } = req.params;

    fide_ratings.getPlayerElo(fide_num).then((data) => {
        res.json(data);
    });
});

app.get("/player/:fide_num/history/", (req, res) => {
    const { fide_num } = req.params;

    fide_ratings.getPlayerHistory(fide_num).then((data) => {
        res.json(data);
    });
});

app.get("*", (req, res) => res.status(404).send(""));

app.listen(port, () =>
    console.log(`Started listening on ${port} . . .`),
);
