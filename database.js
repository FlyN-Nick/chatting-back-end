let mongoose = require('mongoose');
let ChatRoomModel = require('./schema/chatRoom');
let IDTrackerModel = require('./schema/idTracker');
let EndrosementModel = require('./schema/endorsement');

const server = 'localhost:27017';
const database = 'chattingBackendHosting';   

class Database 
{
	constructor()    
	{
		this._connect();
	}

	_connect()
	{
		mongoose.connect(process.env.MONGODB_URI || 'mongodb://${server}/${database}', { useNewUrlParser: true })
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