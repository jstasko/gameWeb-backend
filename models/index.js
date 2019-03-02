const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/gamer", {
    useNewUrlParser:true,
    keepAlive: true
});
mongoose.set('useCreateIndex', true);


module.exports.User = require("./user");
module.exports.Comment = require("./comments");
module.exports.GamePost = require("./gamePost");