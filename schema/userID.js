let mongoose =require('mongoose');
let validator = require('validator');

let userIDSchema = new mongoose.Schema ({ // schema for each user id pair
	firebaseID: String, // firebase id of the user
	displayID: String // id that other users get to see 
});

module.exports = mongoose.model('UserID', userIDSchema);
    