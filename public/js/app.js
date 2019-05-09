$(document).ready(function () {
    ;

    // scrape the Article when clicked
    $("#scrape").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(function (data) {
            console.log(data);
            if (!data) {
                console.log("error scraping");
            } else {
                window.location = "/";
            }
        });
    });
    // clears the articles that are saved in main.handlebars
    $("#clear").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/clear"
        }).done(function (data) {
            console.log("CLEAR");
            window.location = "/";
        });
    });
    // saves the article that are clicked on  in main.handlebars
    $("#saved-button").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/saved"
        }).done(function (data) {
            window.location = "/saved";
        });
    });
    // post the saved articles in index.handlebars
    $(".save-Button").on("click", function () {
        var thisId = $(this).attr("data-id");
        $.ajax({
            method: "POST",
            url: "/posts/saved/" + thisId
        }).done(function (data) {
            window.location = "/";
        });
    });
    //
    $("#deleteComment").on("click", function (event) {
        event.preventDefault();
        console.log("deletedComment")
        $("#input").val("")


    });
});