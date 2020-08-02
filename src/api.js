require("dotenv-flow").config();
const { buildErrorResponse } = require("./utils");
const express = require("express");
const timeout = require("express-timeout-handler");
const app = express();
const {
    getPlayerElo, getPlayerFullInfo, getPlayerHistory, getPlayerPersonalData, getPlayerRank,
} = require("./main");

/**
 * Server configurations
 */
const DEFAULT_PORT = 3000;
const DEFAULT_REQUEST_TIMEOUT = 10000;
const port = process.env.PORT || DEFAULT_PORT;
const request_timeout = parseInt(process.env.RESPONSE_TIMEOUT_MS, 10) || DEFAULT_REQUEST_TIMEOUT;

/**
 * Request timeout setup
 */
app.use(timeout.handler({
    timeout: request_timeout,
    onTimeout: (req, res) => res.status(408).send(),
}));

/**
 * Server response headers middleware
 */
app.use((_req, res, next) => {
    res.set("Content-Type", "application/json");
    res.set("Access-Control-Allow-Origin", "*");

    next();
});

/**
 * Player fide number parameter validator middleware
 */
app.get("/player/:fide_num/*", (req, res, next) => {
    const { fide_num } = req.params;

    if (isNaN(fide_num)) {
        res.status(400).json(
            buildErrorResponse("The player's fide number must be a positive integer number",
            ));
    } else {
        next();
    }
});

/**
 * GET player information endpoint
 */
app.get("/player/:fide_num/info", (req, res) => {
    const { fide_num } = req.params;

    getPlayerFullInfo(fide_num)
        .then((data) => res.json(data))
        .catch((err) => playerEndpointsErrorHandler(err, res));
});

/**
 * GET player personal data endpoint
 */
app.get("/player/:fide_num/personal-data", (req, res) => {
    const { fide_num } = req.params;

    getPlayerPersonalData(fide_num)
        .then((data) => res.json(data))
        .catch((err) => playerEndpointsErrorHandler(err, res));
});

/**
 * GET player ranking endpoint
 */
app.get("/player/:fide_num/rank", (req, res) => {
    const { fide_num } = req.params;

    getPlayerRank(fide_num)
        .then((data) => res.json(data))
        .catch((err) => playerEndpointsErrorHandler(err, res));
});

/**
 * GET player elo rating endpoint
 */
app.get("/player/:fide_num/elo", (req, res) => {
    const { fide_num } = req.params;

    getPlayerElo(fide_num)
        .then((data) => res.json(data))
        .catch((err) => playerEndpointsErrorHandler(err, res));
});

/**
 * GET player history endpoint
 */
app.get("/player/:fide_num/history/", (req, res) => {
    const { fide_num } = req.params;

    getPlayerHistory(fide_num)
        .then((data) => res.json(data))
        .catch((err) => playerEndpointsErrorHandler(err, res));
});

/**
 * Page not found fallback
 */
app.get("*", (req, res) => res.status(404).send(""));

/**
 * Server
 */
app.listen(port, () =>
    console.info(`Started listening on ${port} . . .`),
);

/**
 * Handles requests error responses
 * @param {String} err
 * @param {Object} res
 */
const playerEndpointsErrorHandler = (err, res) => {
    if (err === "Not found") {
        res.status(404).json(buildErrorResponse(
            "Requested player does not exist",
        ));
    }
    res.status(500).json(buildErrorResponse(
        "Failed to fetch player information",
    ));
};
