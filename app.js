
require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path')
const initdb = require("./config/database");
const initRoutes = require("./routes/index");
const bodyParser = require('body-parser');
const passport = require('passport');


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());

//Session Setup
app.use(require("express-session")({
    secret: "Spontaneous",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 2628000000 }
}));

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

//Initialize DB
initdb();

//Initialize routes
initRoutes(app);

//404 handler and pass to error handler
app.use((req,res,next) => {
    next(createError(404,'Not Found'));
});

//Error Handler
app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

//Listening
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("The server is started at port " + PORT);
})


module.exports = app;