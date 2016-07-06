/**
 * Basic express server
 * Serves static files from the dist/ folder
 */
"use strict";

var express = require("express");

var app = express();

var port = "3000";

app.use(express.static(__dirname + "/../dist"));

app.listen(port);
console.info("Server listening on port " + port);