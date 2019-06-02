var express= require("express"),
campgrounds= require("../models/campgrounds")
var router= express.Router({mergeParams:true})
var middleware= require("../middleware")

//INDEX
router.get("/", function (req, res) {
    campgrounds.find({}, function (err, campgrounds) {
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("/campgrounds")
        } else{
            res.render("campgrounds/campgrounds", {campgrounds:campgrounds, user: req.user})
        }
    })
})

//CREATE
router.post("/",middleware.isLoggedIn , function(req, res){
    // add form input to array
    // redirect
    var name = req.body.name;
    var url = req.body.url;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var price = req.body.price;
    var newCamp= {name:name, price:price, image:url, description:desc, author}
    campgrounds.create(newCamp, function (err, cground) {
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("/campgrounds")
        } else{
            req.flash("success", "Posted Campground")
            res.redirect("/campgrounds")
        }
    })
})

//NEW
router.get("/new", middleware.isLoggedIn , function (req, res) {
    res.render("campgrounds/new")
})

//SHOW
router.get("/:id", function (req, res) {
    campgrounds.findById(req.params.id).populate("comments").exec(function (err, campground){
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("/campgrounds")
        } else if (campground==null){
            req.flash("error", "Campground Not Found")
            res.redirect("/campgrounds")
        }
        else {
            res.render("campgrounds/show", {ground: campground})
        }
    })
})

//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    campgrounds.findById(req.params.id, function (err, campground){
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("back")
        } else if (campground==null){
            req.flash("error", "Campground Not Found")
            res.redirect("/campgrounds")
        }
        else {
            res.render("campgrounds/edit", {ground: campground})
        }
    })
})

//UPDATE
router.put("/:id",middleware.checkCampgroundOwnership, function (req, res){
    var name = req.body.name;
    var url = req.body.url;
    var desc = req.body.desc;
    var price = req.body.price;
    var newCamp= {name:name, price:price, image:url, description:desc}
    campgrounds.findByIdAndUpdate(req.params.id, newCamp, function (err, cground) {
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("/campgrounds")
        } else{
            req.flash("success", "Campground Updated")
            res.redirect("/campgrounds")
        }
    })
})

//DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    campgrounds.findByIdAndRemove(req.params.id, function (err) {
        if (err){
            req.flash("error", "Some Error Occured")
            console.log(err)
            res.redirect("/campgrounds")
        } else{
            req.flash("success", "Campground Deleted")
            res.redirect("/campgrounds")
        }
    })
})

module.exports = router