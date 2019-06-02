var comments = require("../models/comments"),
    campgrounds = require("../models/campgrounds")

var middlewareObj= {}

middlewareObj.checkCampgroundOwnership= function (req, res, next){
    if (req.isAuthenticated()){
        campgrounds.findById(req.params.id, function (err, campground){
            if (err){
                req.flash("error", "Some Error Occured")
                console.log(err)
                res.redirect("/campgrounds")
            } else if (campground==null){
                console.log("NULL CAMPGROUND")
                res.redirect("/campgrounds")
            }
            else {
                if (String(campground.author.id) == req.user._id) {
                    next()
                }
                else{
                    res.redirect("back")
                }
            }
        })
    } else {
        req.flash("error", "You must be logged in to do that")

        console.log("USER NOT LOGGED IN")
        res.redirect("/login")
    }
}

middlewareObj.checkCommentOwnership= function (req, res, next){
    if (req.isAuthenticated()){
        comments.findById(req.params.commentID, function (err, comment){
            if (err){
                req.flash("error", "Some Error Occured")
                console.log(err)
                res.redirect("/campgrounds")
            } else if (comment==null){
                console.log("NULL COMMENT")
                res.redirect("/campgrounds")
            }
            else {
                if (String(comment.author.id) == req.user._id) {
                    next()
                }
                else{
                    res.redirect("back")
                }
            }
        })
    } else {
        req.flash("error", "You must be logged in to do that")

        console.log("USER NOT LOGGED IN")
        res.redirect("/login")
    }
}

middlewareObj.isLoggedIn= function (req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }
    req.flash("error", "You must be logged in to do that")
    res.redirect("/login")
}

module.exports = middlewareObj