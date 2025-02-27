require("dotenv").load();
const jwt = require("jsonwebtoken");

exports.loginAprooval = async function(req, res, next) {
    try {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (decoded) {
                return next();
            } else {
                return next({
                    status:401,
                    message:"Please log in first"
                })
            }
        })
    }catch(err) {
        return next({
            status:401,
            message:"Please log in first"
        })
    }
};



exports.usageAprooval = async function(req, res, next) {
    try {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next({
                    status:401,
                    message:"Unauthorized"
                });
            }
        })
    }catch (err) {
        return next({
            status:401,
            message:"Unauthorized"
        });
    }
}