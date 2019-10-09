require("dotenv-flow").config();

const DEFAULT_PORT = 3000;
const DEFAULT_REQUEST_TIMEOUT = 10000;

const fide_ratings = require("./fide_ratings");
const utils = require("./utils");
const express = require("express");
const timeout = require("express-timeout-handler");
const app = express();

const port = process.env.PORT || DEFAULT_PORT;
const request_timeout = parseInt(process.env.RESPONSE_TIMEOUT_MS, 10) || DEFAULT_REQUEST_TIMEOUT;

app.use(timeout.handler({
    timeout: request_timeout,
    onTimeout: (req, res) => res.status(408).send(),
}));

app.use((req, res, next) => {
    res.set("Content-Type", "application/json");

    next();
});

app.get("/player/:fide_num/*", (req, res, next) => {
    const { fide_num } = req.params;

    if (isNaN(fide_num)) {
        res.status(400).json(
            utils.buildErrorResponse("The player's fide number must be a positive integer number",
            ));
    } else {
        next();
    }
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
