let mongoose =require('mongoose');
let validator = require('validator');

let messageSchema = new mongoose.Schema ({
	message: String, // the text of the message
	sender: String // user id of the sender of the message
});

module.exports = mongoose.model('Message', messageSchema);
    