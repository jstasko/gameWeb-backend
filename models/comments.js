const mongoose = require("mongoose");
const GamePost = require("./gamePost");

const commentSchema = mongoose.Schema({
     title: {
         type:String,
         required:true
     },
     gamePost: {
        type:mongoose.Schema.ObjectId,
        ref:"GamePost"
     },
    username: {
         type:String,
        required:true
    }
    },
    {
       timestamps:true
    }
);
//deleting comment from gamePost before deleting comment
commentSchema.pre('remove', async function(next) {
    try {
        let gamePost = await GamePost.findById(this.gamePost);
        await gamePost.comments.remove(this.id);
        await gamePost.save();
        return next();
    } catch (err) {
        return next(err);
    }
});

module.exports = mongoose.model("Comment", commentSchema);

