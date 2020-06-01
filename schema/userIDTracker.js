let mongoose =require('mongoose');
let validator = require('validator');

let userIDSchema = new mongoose.Schema ({ // schema for each user id pair
	firebaseID: String, // firebase id of the user
	displayID: String // id that other users get to see 
});

let userIDTrackerSchema = new mongoose.Schema ({
	id: String, // there is only one endorsement model that gets made, and it's set to have the id of '0', so that it makes it easy to check if there is an endorsement model already when starting up the backend
	userIDPairs: [userIDSchema] // array of all the id pairs
});

module.exports = mongoose.model('UserIDTracker', userIDTrackerSchema);
    