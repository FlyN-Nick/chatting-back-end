let mongoose =require('mongoose');
let validator = require('validator');

let messageSchema = new mongoose.Schema ({ // schema for each individual message
	message: String, // the text of the message
	sender: String // user id of the sender of the message
});

let chatRoomSchema = new mongoose.Schema ({
	chatRoomID: String, // id of the chatroom
	messages: [messageSchema], // array of all the sent messages
	userOneID: String, // self-explanatory
	userTwoID: String // self-explanatory, only two users per chatroom
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
    