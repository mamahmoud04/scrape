var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan")

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models")





var PORT = process.env.PORT || 3000;



//Initialize express
var app = express();
// Use morgan logger for logging requests
app.use(logger("dev"));


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/scrape";

//make a static public folder
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//routes
require("./controllers/controller.js")(app);

// Main route (simple Hello World Message)
// app.get("/", function (req, res) {
//     res.send("Hello world");
// });

// // Retrieve data from the db
// app.get("/all", function (req, res) {
//     // Find all results from the scrapedData collection in the db
//     db.scrapedData.find({}, function (error, found) {
//         // Throw any errors to the console
//         if (error) {
//             console.log(error);
//         }
//         // If there are no errors, send the data to the browser as json
//         else {
//             res.json(found);
//         }
//     });
// });

// // Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function (req, res) {
//     // Make a request via axios for the news section of `ycombinator`
//     axios.get("https://www.nytimes.com/").then(function (response) {
//         // Load the html body from axios into cheerio
//         var $ = cheerio.load(response.data);
//         // For each element with a "title" class
//         $(".title").each(function (i, element) {
//             // Save the text and href of each link enclosed in the current element
//             var title = $(element).children("a").text();
//             var link = $(element).children("a").attr("href");
//             var summary = $(element).children("a").text();

//             // If this found element had both a title and a link
//             if (title && link && summary) {
//                 // Insert the data in the scrapedData db
//                 db.scrapedData.insert({
//                     title: title,
//                     link: link,
//                     summary: summary
//                 },
//                     function (err, inserted) {
//                         if (err) {
//                             // Log the error if one is encountered during the query
//                             console.log(err);
//                         }
//                         else {
//                             // Otherwise, log the inserted data
//                             console.log(inserted);
//                         }
//                     });
//             }
//         });
//     });

//     // Send a "Scrape Complete" message to the browser
//     res.send("Scrape Complete");
// });
//start server
app.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
});
module.exports = app;

