import { connect } from "mongoose";

// was previously using Heroku's mLab add-on, mLab got migrated to atlas
const atlasURI = process.env.MONGODB_URI;  // proccess.env to acess heroku config vars 
const localURI = 'mongodb://localhost:27017/chattingLocal';	

export class Database 
{
	constructor() { this._connect(); }

	_connect()
	{
		// if the backend is being run locally it'll just use the variable localURI 
		connect(atlasURI || localURI , { useUnifiedTopology: true, useNewUrlParser: true })
			.then( mong => 
			{ 
				console.log('Database connection successful'); 
				mong.Schema.Types.String.checkRequired(v => v != null); // changing this behavior, because mongoose now treats empty strings as null
			})
			.catch(err => 
			{
				console.error('Database connection error:');
				console.error(err);
			})
	}
}
