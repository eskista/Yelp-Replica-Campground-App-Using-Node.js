var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
// we are here adding object for new campgrounds (our starter data) that resembel our campgrounds model. This is our seed data
var data = [
	{
		name: "Adama Hill", 
		image:  "https://hickoryhollowcampground.com/images/Slide-1.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa.Lorem ipsum dolor sit amet, onsectetur adipiscing elit, sed do eiusmod. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincid ncididunt ut labore et dolore magna aliqua. Vestibulum mattis ullamcorper velit sed. labore et dolore magna aliqua. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincid ncididunt ut labore et dolore magna aliqua. Vestibulum matti llamcorper velit sed."	
	},
	{
		name: "Adama Hill", 
		image: "https://hickoryhollowcampground.com/images/Slide-1.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa.Lorem ipsum dolor sit amet, onsectetur adipiscing elit, sed do eiusmod. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincid ncididunt ut labore et dolore magna aliqua. Vestibulum mattis ullamcorper velit sed. labore et dolore magna aliqua. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincid ncididunt ut labore et dolore magna aliqua. Vestibulum matti llamcorper velit sed." 
	}
];

function seedDB(){
	// now we are going to start by wiping out our db (Note that {} is there to show that all campgrounds and all comments have to be removed)
	Campground.remove({}, function(err){
// 	if(err){
// 		console.log(err);
// 	}
// 		console.log("Campgrounds removed!!!");
// 		// add each campground we have in starter file (from above seed data) (by looping through data (the variable above) and 			create a campground for both of the above 2 campgrounds)
// 	data.forEach(function(seed){
// 		Campground.create(seed, function(err, campground){
// 			if(err){
// 				console.log(err);
// 			}else{
// 				console.log("added a campground!!!!!!!")
// 			// Once campgrounds are created, we now add comments/create comments. Note that, we do not have Comment model yet, so Comment.create() here will not show us comments. 
// 				Comment.create(
// 					{
// 						text: "This is such a beautiful place. We are coming here every year",
// 						author: "Homer Simpson"
// 					}, function(err, comment){
// 						if(err){
// 							console.log(err);
// 						}else{
// // Once comment is created, we have to associate it with campground we created above (pushing the comment we just created into the array of comments [can refer comments from comments schema in comments.js] we have in campground we created above)
// 							campground.comments.push(comment);
// 				// Now save the campground that you added a comment to
// 							campground.save();
// 							console.log("Created new comments!!!!!!");
// 						};
// 					});
// 			};	
		
// 		});
// 	});
});
};

// sending the seedDB function out (referencing) and it will be stored inside seedDB we required in our app.js and will be executed first thing when app.js is run (the reason we have seedDB() on top of our app.js code)
module.exports = seedDB;

// how are we going to run the code we creted to remove Campgrounds, we should put it on the first part of our app.js right after finishing requiring files, becuase we want it to run everytime the app starts?