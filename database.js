let mongoose = require('mongoose');
let ChatRoomModel = require('./schema/chatRoom');
let IDTrackerModel = require('./schema/idTracker');
let EndrosementModel = require('./schema/endorsement');

class Database 
{
	constructor()    
	{
		this._connect();
	}

	_connect()
	{
		mongoose.connect(process.env.ATLAS_ADMIN_URI || process.env.ATLAS_NONADMIN_URI || process.env.MONGODB_URI || localURI , { useUnifiedTopology: true, useNewUrlParser: true })
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