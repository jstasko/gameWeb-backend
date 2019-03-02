const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT = 10;

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    profileImageUrl: {
        type:String,
    },
    password: {
        type:String,
        required:true
    },
});

//saving hashed password

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const hash = await bcrypt.hash(this.password, SALT);
        this.password = hash;
        return next();

    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(sentPassword) {
    try {
        const match = await bcrypt.compare(sentPassword, this.password);
        return match;
    } catch (err) {
        return next(err);
    }
};

module.exports = mongoose.model("User", userSchema);