require("dotenv").config();

const express = require("express");
const app = express();
//getting data from body
const bodyParser = require("body-parser");
//allow us to run server on different port then client
const cors = require("cors");
const errorHandle = require("./handlers/errorHand");
const authorizationRoutes = require("./routes/autorization");
const gamePost = require("./routes/gamePost");
const commentRoutes = require("./routes/commentRoutes");
const {loginAprooval, usageAprooval} = require("./middleware/logApp");
const db = require("./models");


const PORT =3001 ;

//using imported libaries
app.use(cors());
app.use(bodyParser.json());

//using routes

app.use("/api/authorization", authorizationRoutes);
app.use("/api/users/:id/gamePost", loginAprooval,usageAprooval,gamePost);
app.use("/api/users/:id/gamePost/:post_id/comments", loginAprooval,usageAprooval,commentRoutes);


app.get("/api/gamePost", loginAprooval,async function(req, res, next) {
    try {
        let posts = await db.GamePost.find().sort({createdAt: "desc"}).populate("author", {
            username:true
        });

        return res.status(200).json(posts);
    }  catch (err) {
        return next(err);
    }
});

app.use(function(req, res, next) {
    let err = new Error("not Found");
    err.status = 404;
    next(err);
});


app.use(errorHandle);

app.listen(PORT, () => {console.log(`Server is running at port ${PORT}`)});