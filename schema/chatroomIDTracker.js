let mongoose =require('mongoose');
let validator = require('validator');

let chatroomIDTracker = new mongoose.Schema ({
	id: String, // there is only one chatromIDTracker model that gets made, and it's set to have the id of '0', so that it makes it easy to check if there is an idTracker model already when starting up the backend
	chatRoomIDs: [String] // array of all the chatroom id's that have been made, so that when a new chatroom is made it will have a unique identifier
});

module.exports = mongoose.model('ChatroomIDTracker', chatroomIDTracker);
    