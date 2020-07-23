var mongoose = require("mongoose");
var campgroudSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
// here is where we are assocaiting campgrpund user created with the User(via referenceing).Note! User has username and ID). Only User name, not user's id will be displayed when creating a campground
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectID,
			ref: "User"
		},
		username: String
	},	
// here is where we are assocaiting the comment we created with campgrounds (reference association)
	comments:[
		{
			type: mongoose.Schema.Types.ObjectID,
			ref: "Comment"
		}
	]
});
module.exports = mongoose.model("Campground", campgroudSchema);

