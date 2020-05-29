let mongoose =require('mongoose');
let validator = require('validator');

let endorsementUserSchema = new mongoose.Schema ({
	level: Number, // endorsement level of the user
	id: String // user id 
});

module.exports = mongoose.model('EndorsementUser', endorsementUserSchema);
    