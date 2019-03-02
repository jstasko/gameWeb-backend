const db = require("../models");


exports.createGamePost = async function(req, res, next) {
    console.log(req.body.text)
    try {
        let newPost = await db.GamePost.create({
            name: req.body.text.name,
            author: req.params.id,
            description: req.body.text.description,
            image: req.body.text.image
        });

        let foundPost = await db.GamePost.findById(newPost._id).populate("author",{
            username:true,
            profileImageUrl:true
        });
        return res.status(200).json(foundPost);
    } catch (err) {
        return next(err);
    }
};

exports.getGamePost = async function(req, res, next) {
    try {
        let gamePost = await db.GamePost.findById(req.params.gamePost_id).populate("author", {
            username:true
        }).populate("comments", {
            title:true,
            username:true,
            createdAt:true
        });
        return res.status(200).json(gamePost);
    } catch (err) {
        return next(err);
    }
};

exports.deleteGamePost = async function(req, res, next) {
    try {
        let foundPost = await db.GamePost.findById(req.params.gamePost_id);
        let foundComments = await db.Comment.find({
            "gamePost": req.params.gamePost_id
        });
        for (var i = 0; i < foundComments.length; i++) {
            await foundComments[i].remove();
        }
        await foundPost.remove();
        return res.status(200).json(foundPost);
    } catch (err) {
        return next(err);
    }
};