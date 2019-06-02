var express= require("express"),
comments   = require("../models/comments"),
campgrounds= require("../models/campgrounds"),
middleware = require("../middleware")

var router= express.Router({mergeParams:true})
//NEW
router.get("/new", middleware.isLoggedIn, function (req, res) {
    campgrounds.findById(req.params.id, function (err, campground) {
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("/campgrounds")
        }else if (campground==null){
            req.flash("error", "Campground Not Found")
            res.redirect("/campgrounds")
        } else{
            res.render("comments/new", {campground: campground})
        }
    })
})

//create
router.post("/",middleware.isLoggedIn,  function (req, res) {
    campgrounds.findById(req.params.id, function (err, campground) {
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("/campgrounds")
        }else if (campground==null){
            req.flash("error", "Campground Not Found")
            res.redirect("/campgrounds")
        } else{
            comments.create(req.body.comment, function (err, comment) {
                if (err){
                    req.flash("error", "Some Error Occured")
                    console.log(err)
                    res.redirect("/campgrounds")
                } else{
                    comment.author.id= req.user._id
                    comment.author.username= req.user.username
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    req.flash("success", "Posted Comment")
                    res.redirect("/campgrounds/"+req.params.id)
                }
            })
        }
    })
})

//EDIT
router.get("/:commentID/edit",middleware.checkCommentOwnership, function (req, res) {
    comments.findById(req.params.commentID, function (err, comment) {
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("back")
        } else {
            res.render("comments/edit", {comment: comment, campgroundID: req.params.id})
        }
    })
})

//UPDATE
router.put("/:commentID",middleware.checkCommentOwnership, function (req, res) {
    comments.findByIdAndUpdate(req.params.commentID, req.body.comment, function (err, comment){
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            req.flash("success", "Posted Comment")
            res.redirect("/campgrounds/"+String(req.params.id))
        }
    })
})

//DESTROY
router.delete("/:commentID",middleware.checkCommentOwnership, function (req, res){
    comments.findByIdAndRemove(req.params.commentID, function(err){
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("/campgrounds")
        } else{
            req.flash("success", "Deleted Comment")
            res.redirect("/campgrounds/"+String(req.params.id))
        }
    })
})

module.exports = router