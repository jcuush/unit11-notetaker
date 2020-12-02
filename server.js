// Sets up dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port.
var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/assets/notes.html"));
  });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/assets/index.html"))
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
// posts user input

app.post("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function (err, data) {
        console.log(req.body);

        let previousNote = JSON.parse(data);
        req.body.id = previousNote.length +1;
        previousNote.push(req.body);

        fs.writeFile("./db/db.json", JSON.stringify(previousNote), function(err) {
            console.log(err);
            res.json(previousNote);
        })
    })
});

app.delete("/api/notes/:id", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function(error, data) {
    console.log(req.params);
    let previousNote = JSON.parse(data);

    console.log(previousNote);

    var newNote = [];

    for(let i = 0; i < previousNote.length; i++) {
        if(parseInt(req.params.id) !== previousNote[i].id) {
            newNote.push(previousNote[i]);
        }
    }

    fs.writeFile("./db/db.json", JSON.stringify(newNote), function (error) {
        console.log(error);
        res.json(newNote);
    })
})
});



// Server begins to listen
app.listen(PORT, function() {
    console.log("Server is listening on PORT " +PORT);
});