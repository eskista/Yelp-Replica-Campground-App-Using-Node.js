var mongoose = require("mongoose");
var commentSchema = mongoose.Schema({
	text: String,
	createdAt: { type: Date, default: Date.now },
// store user's name and ID.So, when user is logged in and creates comment, no need to type his/her name as author
// here is where we are assocaiting comment with user's name and ID
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectID,
			ref: "User"
		},
		username: String,
	}

});
module.exports = mongoose.model("Comment", commentSchema);