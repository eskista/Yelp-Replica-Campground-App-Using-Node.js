var express = require("express");
// require express route here (we won't be requiring like var app = express() like before). Note! We should add all our routes to "router" than to the express "app" itself (eg. index route becomes--- router.get("campgrounds"))
var router = express.Router();
var Campground = require("../models/campground");
// requiring index.js file in middleware folder that contains middleware codes
var middleware = require("../middleware/index.js");

// 1. INDEX ROUTE(shows all campgrounds)
//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
// The variable page defined in header.ejs gives this list item a class of 'active'
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

// 2. CREATE ROUTE(adds new campground to DB)
// included middleware isLoggedIn so that no logged in user can create new campground
router.post("/", middleware.isLoggedIn ,function(req, res){
	// get data from the form and add to db
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var description = req.body.description;
// Defining what author containes. Note, we want to show author when he/she creates a new campground
	var author = {
		id: req.user._id,
		username: req.user.username
	};
// Now, a new campground created by user will show name/image/description of the campground and author/name of logged in user
	var newCampground = {name: name, price: price,  image: image, description: description, author: author}
	// Create a new campground (the way campgrounds are created in a db) and save to new db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
		console.log(err);
		} else {
			// redirect back to campgrounds. 
			console.log(newlyCreated);
			res.redirect("/campgrounds");
		}
	});
});
// 3. NEW ROUTE(shows the form to create new campgrounds)
// included middleware isLoggedIn so that no logged in user can create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// 4. SHOW ROUTE- shows more/additional info about one campground. 
router.get("/:id", function(req, res){
// Campground in db has comments with id only, no comment content. Use the following code to show content of comment when browsing
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		};
	});
});
// 5. EDIT ROUTE
// we have a middleware /checkCampgroundOwnership() to see if user is authorized to edit/update campground he created
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// 6. UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	var newData = {name: req.body.name, image: req.body.image, cost: req.body.price, description: req.body.description};
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// 7. Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});


// the only thing we need to export from this file is router we defined above
module.exports = router;
