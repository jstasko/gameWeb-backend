const express = require("express");
const router = express.Router({mergeParams:true});

const {createComment, getComment, deleteComment,getAllComments, updateComment} = require("../handlers/comments");

router.route('/').post(createComment).get(getAllComments);

router.route('/:message_id').get(getComment).delete(deleteComment).put(updateComment);

module.exports = router;