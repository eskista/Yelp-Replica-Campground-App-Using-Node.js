var express = require("express");
// require express route here (we won't be requiring like var app = express() like before). Note! We should add all our routes to "router" than to the express "app" itself (eg. index route becomes--- router.get("campgrounds"))
var router = express.Router();
var passport = require("passport");
// defining/requiring User model/user.js from models folder
var User = require("../models/user");




//Landing Page/Root Route
router.get("/", function(req, res){
	res.render("campgrounds/landing");
});
// ====================================================================================

// Authentication Routes
// ====================================================================================
// 1. Show/Register/Signup Form Route
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

// 2. Signup Logic Handler (Where signup form is sent to)
router.post("/register", function(req, res){
var newUser = new User({username: req.body.username});
// user.register is a method provided by passport package.Passport package will store the username, but restore's hashed passport
	User.register(newUser, req.body.password, function(err, user){
		if(err){
// This is if user can't sign up maybe because name is empty or for other reasons.
// Here, we are not going to write the error message, because the specific error messages comes with passport automatically. If error, we will also be redirected to register/sign up form page and also "message" because we saw by console.logging that passport returns error name and message
			console.log(err);
			return res.render("register", {error: err.message})
		}	
// once user completes the form, we will login, authenricate and redirect them to "/campground"
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp" + " " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// 3. Login Route (shows login form)
router.get("/login", function(req, res){
	req.flash("error", "Please log in!!!!!");
	res.render("login", {page: 'login'}); 
});

// 4. Login Handler(Where login info is sent to)
// Note! The code between login route and our call back is our middleware (app.post"login", middleware, callback function)
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
	}), function(req, res){
		conslole.log("Just checking!");
});

// 6. LOGOUT ROUTE (ONE LOGIC ONLY)
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!!!!!");
	res.redirect("/campgrounds");
});

// the only thing we need to export from this file is router we defined above
module.exports = router;