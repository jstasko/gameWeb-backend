const express = require("express");
const router = express.Router();
const {login, signup} = require("../handlers/authorization");

//setting routes for login / signup

router.post("/signup", signup);
router.post("/login", login);


module.exports = router;