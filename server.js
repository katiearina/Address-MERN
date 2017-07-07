var express = require("express");
var bodyParser = require("body-parser");
var logger = require ("morgan");
var mongoose = require("mongoose");

var Address = require("./models/address");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/AddressGuessDB");

var db = mongoose.connection;

db.on("error", function(err) {
    console.log(err);
});

db.once("open", function() {
    console.log("Mongoose connection successful");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api", function(req, res) {
    Address.find({}).exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

app.post("/api", function(req, res) {

    Address.save(req.body, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    })

});

app.listen(PORT, function() {
    console.log("app listening on PORT: " + PORT);
});