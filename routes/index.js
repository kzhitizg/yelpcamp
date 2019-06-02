var express= require("express"),
passport= require("passport"),
User= require("../models/user")

var router= express.Router({mergeParams:true})

router.get("/",  function(req, res) {
    res.render("landing")
}) 


//AUTH ROUTES
router.get("/register", function (req, res) {
    res.render("register")
})

router.post("/register", function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err) {
        if (err){
            req.flash("error", err)
            console.log(err)
            res.redirect("/campgrounds")
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Successfully Signed Up")
            return res.redirect("/campgrounds")
        })
    })
})

router.get("/login", function (req, res) {
    res.render("login")    
})

router.post("/login", passport.authenticate('local', {
    successRedirect:"/campgrounds",
    failureRedirect: "/login",
    successFlash: "Logged In Successfully",
    failureFlash: "Wrong Username or Password"
}))

router.get("/logout", function (req, res) {
    req.logOut()
    req.flash("success", "Successfully Logged Out")

    res.redirect("/campgrounds")
})

module.exports = router