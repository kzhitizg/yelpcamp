var mongoose= require("mongoose")
var comments= require("./comments")

var campgroundSchema= new mongoose.Schema({
    name : String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"                     //Name of model
        }
    ]
})

module.exports= new mongoose.model("Campground", campgroundSchema)
