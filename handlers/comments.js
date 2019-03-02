const db = require("../models");


exports.createComment = async function(req, res, next) {
    try {
        let comment = await db.Comment.create({
            title: req.body.title,
            author:req.params.id,
            username:req.body.username,
            gamePost:req.params.post_id
        });
        let foundPost = await db.GamePost.findById(req.params.post_id);
        foundPost.comments.push(comment.id);
        await foundPost.save();
        let foundComment = await db.Comment.findById(comment._id).populate("author", {
            username:true,
        });
        return res.status(200).json(foundComment);
    } catch (err) {
        return next(err);
    }
};

exports.getAllComments = async function(req, res, next) {
    try {
        let comments = await db.Comment.find().sort({createdAt: "desc"});
        const commentForPost = comments.filter(c => (c.gamePost == req.params.post_id))
        return res.status(200).json(commentForPost);
    }  catch (err) {
        return next(err);
    }
};

exports.getComment = async function(req, res, next) {
    try {
        let comment = await db.Comment.findById(req.params.message_id);
        return res.status(200).json(comment);
    } catch (err) {
        return next(err);
    }
};

exports.deleteComment = async function(req, res, next) {
    try {
        let foundComment = await db.Comment.findById(req.params.message_id);
        await foundComment.remove();
        return res.status(200).json(foundComment);
    }catch (err) {
        return next(err);
    }
};

exports.updateComment = async function(req, res, next) {
    try {
        let updatedComment = await db.Comment.update({_id: req.params.message_id}, {$set: {
            title: req.body.text,
            author:req.params.id,
            username:req.body.username,
            gamePost:req.params.post_id
        }});
        console.log(updatedComment)
        return res.status(200).json(updatedComment)
    } catch (err) {
        return next(err);
    }
};