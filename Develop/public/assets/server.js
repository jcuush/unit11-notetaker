// Sets up dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port.
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public.index.html"));
  });

app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if(err) {
            console.log("Error");
        }
        else {
            console.log(data);
            res.json(JSON.parse(data));
        }
    })
});

// Server begins to listen
app.listen(PORT, function() {
    console.log("Server is listening");
});