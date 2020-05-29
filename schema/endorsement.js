let mongoose =require('mongoose');
let validator = require('validator');

let endorsementUserSchema = new mongoose.Schema ({ // schema for each endorsement-user pair
	level: Number, // endorsement level of the user
	id: String // user id 
});

let endorsementSchema = new mongoose.Schema ({
	Endorsements: [endorsementUserSchema], // array of endorsement-user pairs
	id: String // there is only one endorsement model that gets made, and it's set to have the id of '0', so that it makes it easy to check if there is an endorsement model already when starting up the backend
});

module.exports = mongoose.model('Endorsement', endorsementSchema);
    