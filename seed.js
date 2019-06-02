var mongoose    = require("mongoose"),
    campgrounds = require("./models/campgrounds"),
    comments    = require("./models/comments")

var data=[
        {
            name:"Salmon Creek",
            image:"https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/Campground.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a lectus enim. Duis mattis nunc nibh, vel bibendum tortor ornare et. Donec auctor, sem ut feugiat congue, libero nunc gravida elit, ut accumsan libero arcu ultrices nulla. Proin sed ultrices ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris tempor porttitor justo, eget sollicitudin nisi. Donec luctus nisi in finibus sollicitudin. Duis iaculis erat lacus, vitae vehicula est sagittis eget. Aliquam tempus nulla eu velit semper ultrices. Morbi sit amet turpis commodo, eleifend sapien eu, ultrices ante.\nPellentesque interdum hendrerit diam, sit amet varius neque pharetra ac. Ut dignissim dui lectus, nec faucibus enim scelerisque ac. Pellentesque euismod et nisl in ullamcorper. Mauris purus leo, interdum gravida libero ac, suscipit dapibus leo. Etiam hendrerit, turpis finibus imperdiet laoreet, arcu massa mattis nisl, eu laoreet ipsum ex vel nisi. Suspendisse ante ex, tristique vel enim finibus, tristique congue dui. In feugiat fermentum elementum."
        },
        {
            name:"Granite Hill", 
            image:"https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png",
            description: "Proin vehicula sapien sed elementum mollis. In vel faucibus felis, in tristique dolor. Suspendisse potenti. Donec viverra mollis odio, a molestie erat malesuada quis. Aenean nec quam ante. Mauris lectus urna, mollis sit amet cursus ac, bibendum ac leo. Sed iaculis diam vel lectus maximus ultricies a nec nibh. Sed in tempus justo. Curabitur volutpat placerat mattis. Suspendisse eu scelerisque lorem, eu aliquam ligula. Donec ultrices enim ac est porttitor consectetur. Cras sit amet sapien id massa mollis aliquet in a lacus. Donec sodales orci in mi porttitor viverra. Curabitur vel mi aliquam diam convallis blandit et sed magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi tristique erat eget congue luctus."
        },
        {
            name:"Mountain Rest", 
            image:"https://www.nps.gov/maca/planyourvisit/images/MapleSpringsCampground-Campsite.jpg",
            description: "Fusce tellus dui, mollis in ex sed, mattis faucibus dui. Curabitur gravida quam sapien, condimentum feugiat diam auctor id. Morbi tempor elit quis felis finibus viverra. Phasellus a sagittis urna, a mattis ante. Morbi condimentum bibendum ornare. Fusce mollis enim id ligula iaculis gravida. Nam sagittis turpis arcu, quis dictum odio pulvinar non.\nSuspendisse elementum tincidunt accumsan. Sed gravida posuere nisl in eleifend. Suspendisse in porttitor risus. Mauris rhoncus consequat ante nec suscipit. Nam sit amet nunc ante. Donec quis tempus tortor. Nulla vel eros sagittis, iaculis orci vel, ornare augue. Morbi vitae euismod quam, in faucibus magna. Sed luctus luctus velit, sit amet consectetur nulla sollicitudin a. Donec quis posuere eros."
        }
    ]

function showDB() {
    campgrounds.deleteMany(function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed Camps");
        data.forEach(function (itm) {
            comments.deleteMany(function (err) {
                campgrounds.create(itm, function (err, itm) {
                    if (err){
                        console.log(err)
                    } else{
                        console.log("added campground")
                        comments.create({
                            text: "Nice Place",
                            author: "Harry"
                        }, function (err, comment) {
                            itm.comments.push(comment)
                            itm.save()
                            console.log("created comment")
                        })
                    }
                })
            })
        })
    })
}

module.exports= showDB;