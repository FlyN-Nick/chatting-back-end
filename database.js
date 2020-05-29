let mongoose = require('mongoose');
let ChatRoomModel = require('./schema/chatRoom');
let IDTrackerModel = require('./schema/idTracker');
let EndrosementModel = require('./schema/endorsement');

const server = 'localHost';
const database = 'chattingHosting';  // I've gone through many databases, for several times the database became incompatible with new code 

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
				console.error('Database connection error');
			})
	}
}
module.exports = new Database();