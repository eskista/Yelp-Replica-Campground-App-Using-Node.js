var express = require("express");
var router = express.Router({mergeParams: true});
// Require/define campground and comment models (campground.js comment.js file we have in models folder) 
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// requiring index.js file in middleware folder that contains middleware codes
var middleware = require("../middleware/index.js");

// _______________________________________________________________________________
//1. NEW ROUTE(for comment)
// Note here the middleware " isLoggedIn function" we use to prevent user from commenting before logging in. 
router.get("/new", middleware.isLoggedIn, function(req, res){
// this is taking us to new.ejs in comments not campgrounds
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: campground});
		};
	});
});

// _______________________________________________________________________________
// 2. CREATE ROUTE FOR COMMENT (where we can submit the comment form to
router.post("/", middleware.isLoggedIn, function(req, res){
// below, we are defining campground in the function for campground we used in new.ejs
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds")
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
				req.flash("error", "Something went wrong. Please try again!!");
				console.log(err);
			}else{
// Add user name and user id to comment (Note! "comment.author.id" and "comment.author.username" what author object is framed in our comemnt's model in comments.js in models foler )
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
// Then save the comment (that has user's name and id)
				comment.save();
// Associate our comment (which has user's name and id authomatically) with campground. 
				campground.comments.push(comment);
// Then save campground that has the new comment which in turn has name and id of user (Because we do not want the new comment to show user id on our webpage, go to show.ejs in campgrounds folder and update the code that displays comment.author to comment.author.username)
				campground.save();
				console.log(comment);
				req.flash("success", "Successfully added a new comment!!");
// Then, redirect to show page of campground
				res.redirect("/campgrounds/" + campground._id);
			};
		});
	};
});
});
// _______________________________________________________________________________
// 3. EDIT ROUTE FOR COMMENT(where we can see the comment edit form 
//This route should have been "campgrounds/:id/comments/:id/edit". because it will be confusing to use two ids, we changed it to "campgrounds/:id/comments/:comment_id/edit". Note the duplicate part of comment's route("campgrounds/:id/comments") has been replaced by code in app.js and route is now "/:comment_id/edit" 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});
// _______________________________________________________________________________
// 4. UPDATE ROUTE FOR COMMENT(where we can submit the comment form to
// Also here, the route has to look like "campgrounds/:id/comments/:comments_id", but we can remove the first duplicate part ("campgrounds/:id/comments")

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
// findByIdAndUpdate() has 3 arguments, comment id, comment/the text/ and the call back (the updated comment)
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
// redirect to campground show page once the comment is updated
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// 5. Comments Destroy Route 
// here too, the comment's full delete route is "/campgrounds/:id/comments/comment_id", but we are going to remove the duplicate route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
// Redirecting to campgrounds show page
			req.flash("success", "Successfully deleted comment!!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// _______________________________________________________________________________
// the only thing we need to export from this file is router we defined above
module.exports = router;


