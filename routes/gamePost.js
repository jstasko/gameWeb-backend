const express = require("express");
const router = express.Router({mergeParams:true});

const {createGamePost, getGamePost, deleteGamePost} = require("../handlers/gamePost");


router.route('/').post(createGamePost);

router.route('/:gamePost_id').get(getGamePost).delete(deleteGamePost);

module.exports = router;