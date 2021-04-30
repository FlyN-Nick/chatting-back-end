import express from 'express';
const app = express();

import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';

import { Document } from 'mongoose';

import { Database } from './database';

import ChatRoomModel, { chatRoomDocument } from './schema/chatRoom'; // schema for the chatrooms
import ChatroomIDTrackerModel from './schema/chatroomIDTracker'; // schema for tracking all the chatroom ids that have been generated (so when a new chatroom is made, it can be made sure that the id is unique)
import EndorsementModel from './schema/endorsement'; // schema for tracking the endorsement level of users
import EndorsementUserModel from './schema/endorsementUser'; // schema for each endorsement-user pair
import MessageModel from './schema/message'; // schema for each individual message

console.log('May node be with you!') // *so* funny
app.use(express.json());
//app.use('*', cors());
//app.options('*', cors());
const whitelist = ['https://chat-n-5b27d.web.app', 'https://chat-n-5b27d.firebaseapp.com', 'https://flynchattin.web.app', 'https://flynchattin.firebaseapp.com'] // websites that are allowed to fetch from the backend (them being my frontend)
let corsOptionsDelegate: CorsOptionsDelegate = function(req, callback)  // if the website is my frontend, cors is allowed
{
  let corsOptions: CorsOptions;
  if (whitelist.indexOf(req.headers.origin || "") !== -1) { corsOptions = { origin: true } } 
  else { corsOptions = { origin: false } }
  callback(null, corsOptions);
};

// all of these options requests are for cors preflight, and I use cors(corsOptionsDelegate) to only allow my frontend
app.options('/find', cors(corsOptionsDelegate), function(_req, res, _next)
{
	res.json({ msg: 'Only websites from FlyN Nick are authorized.' })
});

app.options('/leave', cors(corsOptionsDelegate), function(_req, res, _next)
{
	res.json({ msg: 'Only websites from FlyN Nick are authorized.' })
});

app.options('/get', cors(corsOptionsDelegate), function(_req, res, _next)
{
	res.json({ msg: 'Only websites from FlyN Nick are authorized.' })
});

app.options('/getEndorsementLevel', cors(corsOptionsDelegate), function(_req, res, _next)
{
	res.json({ msg: 'Only websites from FlyN Nick are authorized.' })
});

app.options('/endorse', cors(corsOptionsDelegate), function(_req, res, _next)
{
	res.json({ msg: 'Only websites from FlyN Nick are authorized.' })
});

app.options('/delete', cors(corsOptionsDelegate), function(_req, res, _next)
{
	res.json({ msg: 'Only websites from FlyN Nick are authorized.' })
});

app.options('/send', cors(corsOptionsDelegate), function(_req, res, _next)
{
	res.json({ msg: 'Only websites from FlyN Nick are authorized.' })
});

app.get('/', function(_req, res, _next)
{
	res.json({ msg: 'Welcome to the backend :)' })
});

app.put('/find', cors(corsOptionsDelegate), async(req, res) => // if the user is finding a chatroom
{
	try 
	{

		console.log("FIND REQUEST OCCURED, RECEIVED:");
		console.dir(req.body);
		let docs = await ChatRoomModel.find({ userOneID: req.body.find });

		if (docsCheck(docs)) // user was already in a chatroom and was in the userOneID slot (they refreshed the page, or they previously didn't leave a chatroom and got back onto the website)
		{
			res.send(docs);
			console.log("OLD CHATROOM FOUND. SENT:");
			console.dir(docs);
		}
		else
		{
			docs = await ChatRoomModel.find({ userTwoID: req.body.find });

			if (docsCheck(docs)) // user was already in a chatroom and was in the userTwoID slot (they refreshed the page, or they previously didn't leave a chatroom and got back onto the website)
			{
				res.send(docs);
				console.log("OLD CHATROOM FOUND. SENT:");
				console.dir(docs);
			}
			else { res.send(await findOpenChatRoom(req.body.find)) } // find a chatroom for the user because they weren't already in one 
		}
	}
	catch (err) { console.error(`CAUGHT ERROR: ${err}`) }
});

app.put('/leave', cors(corsOptionsDelegate), async (req, res, _next) => // if the user is leaving their chatroom
{
	try 
	{
		console.log("LEAVE REQUEST OCCURED, RECEIVED:");
		console.dir(req.body);

		let docs = await ChatRoomModel.find({ chatRoomID: req.body.chatRoomID });

		if (docs[0].userOneID == req.body.remove)
		{
			let query = { chatRoomID: req.body.chatRoomID };
			let update = { $set: { userOneID: "" } };
			let options = { new: true };

			let newDocs = await ChatRoomModel.findOneAndUpdate(query, update, options);

			res.send(newDocs);
			console.log("CHATTER SUCCESFULLY REMOVED FROM CHATTROOM. SENT:");
			console.dir(newDocs);
		}
		else
		{
			let query = { chatRoomID: req.body.chatRoomID };
			let update = { $set: { userTwoID: "" } };
			let options = { new: true };

			let doc = await ChatRoomModel.findOneAndUpdate(query, update, options) as chatRoomDocument;
			
			if (docCheck(doc))
			{
				res.send(doc);
				console.log("CHATTER SUCCESFULLY REMOVED FROM CHATTROOM. SENT:");
				console.dir(doc); 
			}
			else { console.error("ERROR: Chatter requested to leave the chatroom, but wasn't in it..."); }
		}
	} 
	catch (err) { console.error(`CAUGHT ERROR: ${err}`) }
});

app.put('/get', cors(corsOptionsDelegate), async(req, res, _next) => // if the user is getting the chatroom (checking for new messages)
{
	try 
	{
		console.log("GET REQUEST OCCURED, RECEIVED:");
		console.dir(req.body);

		let docs = await ChatRoomModel.find({ chatRoomID: req.body.chatRoomID });

		if (docsCheck(docs))
		{
			res.send(docs);
			console.log("HTTP GETTER SUCCESSFULL. SENT:");
			console.dir(docs);
		}
		else { console.error("ERROR: Chatter's chatroom could not be get..."); }
	}
	catch (err) { console.error(`CAUGHT ERROR: ${err}`) }
});

app.put('/getEndorsementLevel', cors(corsOptionsDelegate), async (req, res, _next) => // if the user is getting their endorsement level 
{
	try 
	{
		console.log("GET ENDORSE REQUEST OCCURED, RECEIVED:");
		console.dir(req.body);

		let docs = await EndorsementModel.find({ id: '0' })

		if (docsCheck(docs))
		{
			let endorsements = docs[0].Endorsements
			for (let endorsement of endorsements)
			{
				if (endorsement.id == req.body.userID)
				{
					res.send(endorsement);
					console.log("ENDORSEMENT GETTER SUCCESSFULL. SENT:");
					console.dir(endorsement);
					return;
				}
			}
		}
		else { console.error("ERROR: Endorsements cannot be get...") }
	}
	catch (err) { console.error(`CAUGHT ERROR: ${err}`) }
});

app.put('/endorse', cors(corsOptionsDelegate), async (req, _res, _next) => // endorses user 
{
	try 
	{
		console.log("ENDORSE REQUEST OCCURED, RECEIVED:");
		console.dir(req.body);
		await endorser(req.body.userID, true);
	}
	catch (err) { console.error(`CAUGHT ERROR: ${err}`) }
});

app.put('/delete', cors(corsOptionsDelegate), async (req, res, _next) => // if the user is deleting (a) message(s) in their chatroom
{
	try 
	{
		console.log("DELETE REQUEST OCCURED, RECEIVED:");
		console.dir(req.body);
		let query = { "chatRoomID": req.body.chatRoomID };
		let update = { $set: { messages: req.body.messages } };
		let options = { new: true };

		let doc = await ChatRoomModel.findOneAndUpdate(query, update, options) as chatRoomDocument;

		if (docCheck(doc))
		{
			res.send(doc);
			console.log("DELETE REQUEST SUCCESSFULL, SENT:");
			console.dir(doc);
		}
		else
		{
			console.error("ERROR: Nothing returned when updating chatroom:");
			console.dir(doc);
		}
	} 
	catch (err) { console.error(`CAUGHT ERROR: ${err}`) }
});

app.post('/send', cors(corsOptionsDelegate), async (req, res, _next) => // if the user is sending a message
{
	try
	{
		console.log("SEND REQUEST OCCURED, RECEIVED:");
		console.dir(req.body);

		let docs = await ChatRoomModel.find({ chatRoomID: req.body.chatRoomID });

		if (docsCheck(docs))
		{
			let messages = docs[0].messages;
			let newMessage = new MessageModel({
				message: req.body.message,
				sender: req.body.sender
			});
			messages.push(newMessage);
			let query = { "chatRoomID": req.body.chatRoomID };
			let update = { $set: { messages: messages } };
			let options = { new: true };

			let doc = await ChatRoomModel.findOneAndUpdate(query, update, options) as chatRoomDocument;
			
			if (docCheck(doc))
			{
				res.send(doc);
				console.log("SEND REQUEST SUCCESSFULL, SENT:");
				console.dir(doc);
			}
			else
			{
				console.error("ERROR: Nothing returned when updating chatroom:");
				console.dir(doc);
			}
		}
		else { console.error("ERROR: User tried to send message in invalid chatroom...") }
	}
	catch (err) { console.error(`CAUGHT ERROR: ${err}`) }
})

/* 
 * starting the backend, just makes an ChatroomIDTrackerModel if there isn't one already, same with EndorsementModel 
 * the only scenario where these models don't exist is if the backend is being run for the first time
 * the only possibilities should be all of the models exist, or none of them do
 * but I still handle cases where say, only one of them exists, just to be careful
*/
let portNum = process.env.PORT || 1618; // process.env.PORT is a heroku config var, if the back end is being run locally and therefore can't access this var, it'll instead use 1618
app.listen(portNum, async function()
{
	try 
	{
		console.log("SERVER INITIATED on port number " + portNum);
		
		new Database();

		let docs = await ChatroomIDTrackerModel.find({ id: '0' });

		if (docsCheck(docs))
		{
			console.log("There was already an ChatroomIDTrackerModel:"); 
			console.dir(docs);
		}
		else
		{
			let tracker = new ChatroomIDTrackerModel({
				id: '0',
				chatRoomIDs: []
			});

			let doc = await tracker.save();

			console.log("New ChatroomIDTracker:");
			console.dir(doc);
		}

		let newDocs = await EndorsementModel.find({ id: '0' });

		if (docsCheck(newDocs))
		{
			console.log("There was already an EndorsementModel:");
			console.dir(newDocs);
		}
		else
		{
			let model = new EndorsementModel({
				IDs: [],
				Endorsements: [],
				id: '0'
			});
			model.save()
				.then(doc =>
				{
					console.log("New EndorsementModel:");
					console.dir(doc);
				})
				.catch(err => console.error(err))
		}
	}
	catch (err) { console.error(`CAUGHT ERROR: ${err}`) }
})

/**
 * Makes a new chatroom.
 * 
 * @param userID The id of the user making the new chatroom.
 * @returns The new chatroom.
 */
async function makeNewChatRoom(userID: string): Promise<chatRoomDocument>// makes a new chatroom
{
	try 
	{
		// generating a unique id for the chatroom
		let idLength = 8;
		let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		let random_id = '';
		let options = { new: true };
		let query = { id: '0' };

		let doc = await ChatroomIDTrackerModel.find({ id: '0' }).lean();

		let ids = doc[0].chatRoomIDs;
		console.log("Current chatroom ids:");
		console.dir(ids);
		while (true)
		{
			random_id = '';
			for (let i = 0; i < idLength; i++ ) 
			{
				random_id += characters.charAt(Math.floor(Math.random() * characters.length));
			}
			if ((!ids.includes(random_id))/* || ids.length == 0 || ids.length == null || ids == null*/) // checks if the chatroom id is unique
			{
				break;
			}
		}
		ids.push(random_id);
		console.log("New chatroom ids:");
		console.dir(ids);
		let update = { $set: { chatRoomIDs: ids } };

		doc = await ChatroomIDTrackerModel.findOneAndUpdate(query, update, options).lean();

		console.log("RANDOM ID FOR CHATROOM GENERATED.");
		let newChatRoom = new ChatRoomModel({
			chatRoomID: random_id,
			messages: [],
			userOneID: userID,
			userTwoID: ''
		});

		let newDoc = await newChatRoom.save();

		console.log("NEW CHATROOM MADE, FOR NO OPEN CHATROOMS. SENT:");
		console.dir(newDoc);
		return newDoc;
	}
	catch (err) 
	{ 
		console.error(`CAUGHT ERROR: ${err}`);
		throw(err);
	}
}

/**
 * Finds a chatroom with an empty slot for the user or just makes a new one if not possible.
 * 
 * @param userID The id of the user finding an open chatroom.
 * @returns The chatroom found (or created).
 */
async function findOpenChatRoom(userID: string): Promise<chatRoomDocument> // finds a chatroom with an empty slot for the user or just makes a new one if not possible
{
	try
	{
		await endorser(userID, false);

		let query = { userOneID: "" };
		let update = { $set: { userOneID: userID } };
		let options = { new: true };
	
		let doc = await ChatRoomModel.findOneAndUpdate(query, update, options) as chatRoomDocument;
	
		if (docCheck(doc)) // a chatroom with the user one slot empty
		{
			console.log("OPEN CHATROOM FOUND WITH USER ONE SLOT AVAILABLE. SENT:");
			console.dir(doc);
			return doc;
		}
		else
		{
			console.log("NO CHATROOM WITH USER ONE SLOT AVAILABLE:")
			console.dir(doc);
			let query = { userTwoID: ""};
			let update = { $set: { userTwoID: userID } };
	
			doc = await ChatRoomModel.findOneAndUpdate(query, update, options) as chatRoomDocument;
	
			if (docCheck(doc)) // a chatroom with the user two slot empty
			{
				console.log("OPEN CHATROOM FOUND WITH USER TWO SLOT AVAILABLE. SENT:");
				console.dir(doc);
				return doc;
			}
			else 
			{ 
				console.log("NO CHATROOM WITH USER TWO SLOT AVAILABLE:");
				console.dir(doc);
				return await makeNewChatRoom(userID); // no chatrooms with empty slots exists, so a new one is made
			}
		}
	}
	catch (err) 
	{ 
		console.error(`CAUGHT ERROR: ${err}`);
		throw(err);
	}
}

/**
 * Checks if what mongoose returned a legitimate document.
 * 
 * @param doc The document you are checking.
 * @returns The validity of the document.
 */
 function docCheck(doc: Document<any>): boolean
 {
	 if ((doc == null) || (doc == undefined)|| (doc._id == null)) { return false }
	 else if (doc) { return true }
	 else { return false }
 }

/**
 * Checks if mongoose returned a legitimate array of documents or not.
 * Same thing as docCheck, but for when mongoose returns an array (typically of length 1) of docs.
 * 
 * @param docs The docs you are checking.
 * @returns The validity of the documents.
 */
function docsCheck(docs: Document<any>[]): boolean 
{
	if ((docs == null) || (docs == undefined)) { return false }
	else { return (docs.length > 0) }
}

/**
 * Two functions combined into one.
 * If endorse is false:
 * - Makes sure that the user is being tracked by the endorsement tracker, and adds them to the tracker if not.
 * If endorse is true:
 * - Makes sure that the user is being tracked by the endorsement tracker, add them if not, and increases their endorsement level by one.
 * 
 * @param userID 
 * @param endorse The function mode.
 */
async function endorser(userID: string, endorse: boolean) 
{
	try 
	{
		let docs = await EndorsementModel.find({ id: '0' }).lean()

		let endorsements = docs[0].Endorsements;
		let beingTracked = false;
		for (let endorsement of endorsements)
		{
			if (endorsement.id == userID)
			{
				beingTracked = true;
				if (endorse) 
				{
					let newLevel = (endorsement.level + 1);
					let newEndorsement = new EndorsementUserModel({
						level: newLevel,
						id: userID
					});
					endorsements[endorsements.indexOf(endorsement)] = newEndorsement;
	
					let query = { id: '0' };
					let update = { $set: { Endorsements: endorsements } };
					console.log("Updating endorsements:");
					console.dir(update);
					let options = { new: true };
	
					let doc = await EndorsementModel.findOneAndUpdate(query, update, options);
	
					console.log("User successfully endorsed.") ;
					console.dir(doc);
				}
			}
		}
		if (!beingTracked)
		{
			let level = endorse ? 1 : 0; 
			let newEndorsement = new EndorsementUserModel({
				level: level,
				id: userID
			});
			endorsements.push(newEndorsement);
	
			let query = { id: '0' };
			let update = { $set: { Endorsements: endorsements } };
			console.log("Updating endorsements:");
			console.dir(update);
			let options = { new: true };
	
			let doc = await EndorsementModel.findOneAndUpdate(query, update, options);
	
			console.log("New user added to endorsement tracker.");
			console.dir(doc);
		}
	}
	catch (err) { console.error(`CAUGHT ERROR: ${err}`) }
}
