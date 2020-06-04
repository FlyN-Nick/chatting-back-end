let mongoose = require('mongoose');

const atlasAdminURI = process.env.ATLAS_ADMIN_URI;
const atlasNonAdminURI = process.env.ATLAS_NONADMIN_URI;
const herokuURI = process.env.MONGODB_URI;
const localURI = 'mongodb://localhost:27017/chattingLocal';	

class Database 
{
	constructor()    
	{
		this._connect();
	}

	_connect()
	{
		// the atlas uri's are commented out because they would not work
		// I would get the error, even though I have whitelisted all ip addresses: 
		/*
		 * MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. 
		 * One common reason is that you're trying to access the database from an IP that isn't whitelisted. 
		 * Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/
		 */
		// all of these process.env...s are heroku config vars, if the backend is being run locally it'll just use the variable localURI
		mongoose.connect(/*process.env.ATLAS_ADMIN_URI || process.env.ATLAS_NONADMIN_URI || */process.env.MONGODB_URI || localURI , { useUnifiedTopology: true, useNewUrlParser: true })
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