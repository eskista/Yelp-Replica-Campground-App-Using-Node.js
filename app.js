var express	= require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// Use flash to send a one time request/shouldn't persist
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
// require user here
var User = require("./models/user");
var seedDB = require("./seeds.js");
// requiring all js files in routes folder
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// TELLING EXPRESS APP TO USE THE FOLLOWING
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDb has to run before our routes are run
// seedDB();
app.use(require("express-session")({
	secret: "Let's laugh without purpose",
	resave: false,
	saveUninitialized: false
}));
// requiring moment (shows time lapsed for comments created)
app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//Defining currentUser here, which is used by a lot of our templates. Note! req.user comes from passport and has user's information
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error= req.flash("error");
	res.locals.success= req.flash("success");
// since currentUser is a middleware between a function that uses (req, res) and next, we need to put next(). Otherwise, it will run req.user and stop
	next();
});

// Middleware function here to prevent a user not to post comments if not logged in
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
}
	res.redirect("/login");
};

// literanlly saying remove the duplicated "/campgrounds/:id/comments" part from comments routes in app.js use "/campgrounds/:id/comments" from this code and appends it to all our comments routes
app.use("/campgrounds/:id/comments", commentRoutes);
// literanlly saying remove the duplicated "/campgrounds" part from comments routes in app.js and use "/campgrounds" from this code and append it to all our campgrounds routes
app.use("/campgrounds", campgroundRoutes);
// for this route, there is nothing in common in route declaration that we can append to all the routes
app.use(indexRoutes);
	
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("YelpCamp Server Has Started!!!!!");
});