const mongoose = require("mongoose");
const db = require("../models");

const gameSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    image: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required:true
    },
    comments: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
    },
    {
        timestamps:true
    }
);


module.exports = mongoose.model("GamePost", gameSchema);