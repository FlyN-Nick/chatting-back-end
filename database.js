let mongoose = require('mongoose');
let ChatRoomModel = require('./schema/chatRoom');
let IDTrackerModel = require('./schema/idTracker');
let EndrosementModel = require('./schema/endorsement');

const atlasUsername = 'FlyNNick'
const atlasPassword = 'yOiR5KZV7Sa36ANE'
const newAtlasUsername = 'FlyNNickNonAdmin'
const newAtlasPassword = 'ab4Rgpkl9egy16cV'
const atlasShell = 'mongo "mongodb+srv://chatn-xjdcp.mongodb.net/test" --username FlyNNick'
//authSource=admin&
const atlasURI = 'mongodb+srv://${atlasUsername}:${atlasPassword}@chatn-xjdcp.mongodb.net/test?retryWrites=true&w=majority'
const atlasOldURI = 'mongodb://${newAtlasUsername}:${newAtlasPassword}@chatn-shard-00-00-xjdcp.mongodb.net:27017,chatn-shard-00-01-xjdcp.mongodb.net:27017,chatn-shard-00-02-xjdcp.mongodb.net:27017/test?ssl=true&replicaSet=ChatN-shard-0&authSource=admin&retryWrites=true&w=majority'
const localURI = 'mongodb://localhost:27017/chattingLocal'
const local = false;

function connectToWhere()
{
	if (local) { return localURI }
	else { return atlasOldURI }
}
class Database 
{
	constructor()    
	{
		this._connect();
	}

	_connect()
	{
		mongoose.connect(connectToWhere(), { useUnifiedTopology: true, useNewUrlParser: true })
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