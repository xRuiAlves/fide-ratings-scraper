const fide_ratings = require("./fide_ratings");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Started listening on ${port} . . .`),
);
