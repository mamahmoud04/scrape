var mongoose = require("mongoose")

var NewsSchema = mongoose.Schema;

var ArticleSchema = new NewsSchema({

    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    note: {
        type: NewsSchema.Types.ObjectId,
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema)

module.exports = Article;















