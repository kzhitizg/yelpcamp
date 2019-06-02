var express              = require("express"),
    app                  = express(),
    bodyParser           = require("body-parser"),
    mongoose             = require("mongoose"),
    methodOverride       = require("method-override")
    campgrounds          = require("./models/campgrounds"),
    comments             = require("./models/comments"),
    showDB               = require("./seed"),
    passport             = require("passport"),
    LocalStrategy        = require("passport-local"),
    User                 = require("./models/user"),
    flash                = require("connect-flash")

//routes require
var campgroundRoutes     = require("./routes/campgrounds"),
    commentRoutes        = require("./routes/comments"),
    indexRoutes          = require("./routes/index")

//showDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true})


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use(methodOverride("_method"))

app.use(flash());
//PASSPORT INIT
app.use(require("express-session")({
    secret: "This is secret",
    resave: false,
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function (req, res, next) {
    res.locals.user= req.user
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next() 
})

app.use("/", indexRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use("/campgrounds", campgroundRoutes)

app.listen(3000, function () {
    console.log("Server started")
})