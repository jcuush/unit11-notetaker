// Sets up dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port.
const PORT = process.env.PORT || 8080;

// Server begins to listen
app.listen(PORT, function() {
    console.log("Server is listening");
});