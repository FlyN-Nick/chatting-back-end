let mongoose = require('mongoose');
let ChatRoomModel = require('./schema/chatRoom');
let IDTrackerModel = require('./schema/idTracker');
let EndrosementModel = require('./schema/endorsement');

//const server = 'localhost';
//const database = 'chattingBackendHosting';  
const atlasUsername = 'FlyNNick'
const atlasPassword = 'yOiR5KZV7Sa36ANE'
const atlas = 'mongodb+srv://${atlasUsername}:${atlasPassword}@chatn-xjdcp.mongodb.net/test?retryWrites=true&w=majority'
class Database 
{
	constructor()    
	{
		this._connect();
	}

	_connect()
	{
		mongoose.connect(atlas, { useNewUrlParser: true })
			.then(() => 
			{
				console.log('Database connection successful');
			})
			.catch(err => 
			{
				console.error('Database connection error:');
				console.error(err);
			})
	}
}
module.exports = new Database();