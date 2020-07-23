var Campground = require("../models/campground");
var Comment = require("../models/comment");

// All middleware go here
// Middleware functions to check if user is logged in AND also owns campground/comment before editing or deleting them
// =============================================================================
var middlewareObj = {};
// =============================================================================
middlewareObj.checkCampgroundOwnership = function(req, res, next){
		if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				// handling errors like for eg. data base related ones
				req.flash("error", "Campground not found!!");
				res.redirect("/campgrounds");
			}else{
// if user logged in, does user own campground?use mongoose equal() not ===or== b/c author.id is an object and user.id is a string
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have permission to do that!!");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error", "please log in to do that!!!");
		res.redirect("back"); 
	}
};
// =============================================================================

middlewareObj. checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("/campgrounds");
			}else{
// if user is signed in, is comment user's? use mongoose "equals" not ===or== becuase author.id is object and user.id is string
			if(foundComment.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error", "You don't have permission to do that!!");
				res.redirect("back");
			}
		}
	});
	}else{
		req.flash("error", "You need to be logged in to do that!!");
		res.redirect("back"); 
	}
};

// =============================================================================
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "please log in to do that!!!");
	res.redirect("/login");
};
// =============================================================================
// Exporring all the above three middlewares for our routes to use
module.exports = middlewareObj;

