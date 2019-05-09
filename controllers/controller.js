var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");

var db = require("./../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Article.find({})
            .then(function (result) {
                res.render("index", { result: result });
            });
    });

    // Scrape data from one site and place it into the mongodb db
    app.get("/scrape", function (req, res) {
        // Make a request via axios for the news section of `ycombinator`
        axios.get("https://www.nytimes.com/").then(function (response) {
            // Load the html body from axios into cheerio
            var $ = cheerio.load(response.data);
            // For each element with a "title" class
            $(".title").each(function (i, element) {
                // Save the text and href of each link enclosed in the current element
                var title = $(element).children("a").text();
                var link = $(element).children("a").attr("href");
                var summary = $(element).children("a").text();

                // If this found element had both a title and a link
                if (title && link && summary) {
                    // Insert the data in the scrapedData db
                    db.scrapedData.insert({
                        title: title,
                        link: link,
                        summary: summary
                    },
                        function (err, inserted) {
                            if (err) {
                                // Log the error if one is encountered during the query
                                console.log(err);
                            }
                            else {
                                // Otherwise, log the inserted data
                                console.log(inserted);
                            }
                        });
                }
            });
        });
    })
    //creates/saves in an array
    db.Article.create()
        .then(function (Post) {
            //add things
            console.log(`this is controller:55`, Post);
        })
        .catch(function (err) {
            //an error occurred
            return res.json(err);
        });

    // the route for all articles in database
    app.get("/article", function (req, res) {
        // Grab all the Articles from collection
        db.Post.find({})
            .then(function (results) {
                // result should sent all the article form db to user
                res.json(results);
            })
            .catch(function (err) {
                // send err if article are not retrieved
                res.json(err);
            });
    });

    // clear all article from the page/db
    app.get("/clear", function (req, res) {
        db.Post.remove({}, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log("cleared");
            }
        });
        res.redirect("/");
    });

    // updates by unique id
    app.post("/article/saved/:id", function (req, res) {
        // using the unique id to find an article and updates
        db.Post.findOneAndUpdate({ _id: req.params.id }, { saved: true })
            // Execute the above query
            .exec(function (err, data) {
                // Log any errors
                if (err) {
                    console.log(err);
                } else {
                    res.send(data);
                }
            });
    });


};