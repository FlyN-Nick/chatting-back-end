const { Console } = require('console');
const express = require('express');
const app = express();
const cors = require('cors');
let database = require('./database');
let ChatRoomModel = require('./schema/chatRoom');	 // schema for the chatrooms
let IDTrackerModel = require('./schema/idTracker'); // schema for tracking all the chatroom ids that have been generated (so when a new chatroom is made, it can be made sure that the id is unique)
let EndorsementModel = require('./schema/endorsement'); // schema for tracking the endorsement level of users
let EndorsementUserModel = require('./schema/endorsementUser');	 // schema for each endorsement-user pair
let MessageModel = require('./schema/message');	 // schema for each individual message

console.log('May node be with you!')
app.use(express.json());
app.use('*', cors());

app.put('/find', function(req, res, next) // if the user is finding a chatroom
{
	console.log("FIND REQUEST OCCURED, RECEIVED:");
	console.dir(req.body);
	ChatRoomModel
		.find({ userOneID: req.body.find })
		.then(docs =>
		{
			if (docsCheck(docs)) // user was already in a chatroom and was in the userOneID slot (they refreshed the page, or they previously didn't leave a chatroom and got back onto the website)
			{
				res.send(docs);
				console.log("OLD CHATROOM FOUND. SENT:");
	  			console.dir(docs);
			}
			else
			{
				ChatRoomModel
					.find({ userTwoID: req.body.find })
					.then(docs =>
					{
						if (docsCheck(docs)) // user was already in a chatroom and was in the userTwoID slot (they refreshed the page, or they previously didn't leave a chatroom and got back onto the website)
						{
							res.send(docs);
							console.log("OLD CHATROOM FOUND. SENT:");
	 						console.dir(docs);
						}
						else { res.send(findOpenChatRoom(req.body.find)) } // find a chatroom for the user because they weren't already in one 
					})
					.catch(err => console.error(err))
			}
		})
		.catch(err => console.error(err))
})
app.put('/leave', function(req, res, next) // if the user is leaving their chatroom
{
	console.log("LEAVE REQUEST OCCURED, RECEIVED:");
	console.dir(req.body);
	ChatRoomModel
		.find({ chatRoomID: req.body.chatRoomID })
		.then(docs =>
		{
			if (docs[0].userOneID == req.body.remove)
			{
				let query = { chatRoomID: req.body.chatRoomID };
				let update = { $set: { userOneID: "" } };
				let options = { new: true };
				ChatRoomModel.findOneAndUpdate(query, update, options)
					.then(docs => 
				  	{
				    	res.send(docs);
				    	console.log("CHATTER SUCCESFULLY REMOVED FROM CHATTROOM. SENT:");
						console.dir(docs);
				  	})
				  	.catch(err => console.error(err))
			}
			else
			{
				let query = { chatRoomID: req.body.chatRoomID };
				let update = { $set: { userTwoID: "" } };
				let options = { new: true };
				ChatRoomModel.findOneAndUpdate(query, update, options)
					.then(docs => 
				  	{
				  		if (docCheck(docs))
				  		{
				  			res.send(docs);
				    		console.log("CHATTER SUCCESFULLY REMOVED FROM CHATTROOM. SENT:");
							console.dir(docs); 
				  		}
				  		else { console.log("Error: chatter requested to leave the chatroom, but wasn't in it..."); }
				  	})
				  	.catch(err => console.error(err))
			}
		})
		.catch(err => console.error(err))
})
app.put('/get', function(req, res, next) // if the user is getting the chatroom (checking for new messages)
{
	console.log("GET REQUEST OCCURED, RECEIVED:");
	console.dir(req.body);
	ChatRoomModel
		.find({ chatRoomID: req.body.chatRoomID})
		.then(docs => 
		{
			if (docsCheck(docs))
			{
				res.send(docs);
				console.log("HTTP GETTER SUCCESSFULL. SENT:");
				console.dir(docs);
			}
			else { console.log("Chatter's chatroom could not be get..."); }
		})
		.catch(err => console.error("Error occured: " + err))
})
app.put('/getEndorsementLevel', function(req, res, next) // if the user is getting their endorsement level 
{
	console.log("GET ENDORSE REQUEST OCCURED, RECEIVED:");
	console.dir(req.body);
	EndorsementModel
		.find({ id: "0" })
		.then(docs =>
		{
			if (docsCheck(docs))
			{
				let endorsements = docs[0].Endorsements
				for (endorsement of endorsements)
				{
					if (endorsement.id == req.body.userID)
					{
						res.send(endorsement);
						console.log("ENDORESEMENT GETTER SUCCESSFULL. SENT:");
						console.dir(endorsement);
						return
					}
				}
			}
			else { console.log("Endorsements cannot be get...") }
		})
		.catch(err => console.error(err))
})
app.put('/endorse', function(req, res, next) // endorses user 
{
	console.log("ENDORSE REQUEST OCCURED, RECEIVED:");
	console.dir(req.body);
	endorser(req.body.userID, true)
})
app.put('/delete', function(req, res, next) // if the user is deleting (a) message(s) in their chatroom
{
	console.log("DELETE REQUEST OCCURED, RECEIVED:");
	console.dir(req.body);
	let query = { "chatRoomID": req.body.chatRoomID };
	let update = { $set: { messages: req.body.messages } };
	let options = { new: true };
	ChatRoomModel.findOneAndUpdate(query, update, options)
		.then(doc => 
	  	{
	  		if (docCheck(doc))
	  		{
	  			res.send(doc);
	  			console.log("DELETE REQUEST SUCCESSFULL, SENT:");
				console.dir(doc);
	  		}
	  		else
	  		{
	  			console.log("Error: nothing returned when updating chatroom:");
	  			console.dir(doc);
	  		}
	 	})
	  	.catch(err => console.error(err))
})
app.post('/send', function(req, res, next) // if the user is sending a message
{
	console.log("SEND REQUEST OCCURED, RECEIVED:");
	console.dir(req.body);
	ChatRoomModel
		.find({ chatRoomID: req.body.chatRoomID})
		.then(docs => 
		{
			if (docsCheck(docs))
			{
				let messages = docs[0].messages
				let newMessage = new MessageModel({
					message: req.body.message,
					sender: req.body.sender
				});
				messages.push(newMessage)
				let query = { "chatRoomID": req.body.chatRoomID };
				let update = { $set: { messages: messages } };
				let options = { new: true };
				ChatRoomModel.findOneAndUpdate(query, update, options)
					.then(doc =>
					{
						if (docCheck(doc))
						{
							res.send(doc);
							console.log("SEND REQUEST SUCCESSFULL, SENT:");
							console.dir(doc);
						}
						else
						{
							console.log("Error: nothing returned when updating chatroom:");
							console.dir(doc);
						}
					})
					.catch(err => console.error(err))
			}
			else { console.log("User tried to send message in invalid chatroom...") }
		})
		.catch(err => console.error(err))
})

// starting the backend, just makes an IDTrackerModel if there isn't one already, same with EndorsementModel
let portNum = process.env.PORT || 42069;
app.listen(portNum, function()
{
	console.log("SERVER INITIATED on port number " + portNum);
	IDTrackerModel
		.find({ id: '0' })
		.then(docs => 
		{ 
			if (docsCheck(docs))
			{
				console.log("There was already an IDTrackerModel:"); 
				console.dir(docs);
				EndorsementModel
					.find({ id: '0'})
					.then(docs => 
					{
						if (docsCheck(docs))
						{
							console.log("There was already an EndorsementModel:");
							console.dir(docs);
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

					})
					.catch(err => console.error(err))
			}
			else
			{
				let tracker = new IDTrackerModel({
					id: '0',
					chatRoomIDs: []
				});
				tracker.save()
					.then(doc =>
					{	
						console.log("New IDTracker:");
						console.dir(doc);
						EndorsementModel
							.find({ id: '0'})
							.then(docs => 
							{
								if (docsCheck(docs)) { console.log("There was already an EndorsementModel") }
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

							})
							.catch(err => console.error(err))
					})
					.catch(err => console.error(err))
			}
		})
		.catch(err => console.error(err))
})
function makeNewChatRoom(userID) // makes a new chatroom
{
	// generating a unique id for the chatroom
	let idLength = 8;
  	let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  	let random_id = '';
  	let options = { new: true };
  	let query = { id: "0"};
  	IDTrackerModel 
  			.find({ id: '0' }).lean()
  			.then(doc =>
  			{
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
			    IDTrackerModel.findOneAndUpdate(query, update, options).lean()
			    	.then(doc => 
			    	{ 
			    		console.log("RANDOM ID FOR CHATROOM GENERATED.");
						let newChatRoom = new ChatRoomModel({
							chatRoomID: random_id,
							messages: [],
							userOneID: userID,
							userTwoID: ''
						});
						newChatRoom.save()
						   .then(doc => 
						   {
						   		console.log("NEW CHATROOM MADE, FOR NO OPEN CHATROOMS. SENT:");
								console.dir(doc);
						   	 	return doc;
						   })
						   .catch(err => console.error(err))
			    	})
				    .catch(err => console.error(err))
  			})
  			.catch(err => console.error(err))
}
function findOpenChatRoom(userID) // finds a chatroom with an empty slot for the user or just makes a new one if not possible
{
	endorser(userID, false);
	let query = { userOneID: "" };
	let update = { $set: { userOneID: userID } };
	let options = { new: true };

	ChatRoomModel.findOneAndUpdate(query, update, options)
	    .then(doc => 
		{
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
			    ChatRoomModel.findOneAndUpdate(query, update, options)
			    	.then(doc => 
			      	{
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
			      			return makeNewChatRoom(userID); // no chatrooms with empty slots exists, so a new one is made
			      		}
			    	})
			    	.catch(err => console.error(err))
		  	}
		})
		.catch(err => console.error(err))
}
function docsCheck(docs) // same thing as below, except for the cases where mongoose returns an array (typically of length 1) of docs
{
	if((docs == null) || (docs == undefined)) { return false }
	else { return (docs.length > 0) }
}
function docCheck(doc) // checks if what mongoose returned is actually a doc or not
{
	if((doc == null) || (doc == undefined)|| (doc._id == null)) { return false }
	else if (doc) { return true }
	else { return false }
}
/*	This function does two things, depending on the boolean "endorse".
 *	If false, it will make sure that a user is being tracked by the endorsement tracker.
 *	^ if they aren't being tracked, they will be added.
 *	If true, it will also make sure if they are being tracked
 *	and will increase their endorsement level by one.
 */ 
function endorser(userID, endorse) 
{
	EndorsementModel
		.find({ id: '0' }).lean()
		.then(docs =>
		{
			let Endorsements = docs[0].Endorsements;
			let beingTracked = false;
			for (endorsement of Endorsements)
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
						Endorsements[Endorsements.indexOf(endorsement)] = newEndorsement;
						let query = { id: "0" };
						let update = { $set: { Endorsements: Endorsements } };
						console.log("Updating endorsements:");
						console.dir(update);
						let options = { new: true };
						EndorsementModel.findOneAndUpdate(query, update, options)
							.then(doc => 
							{ 
								console.log("User successfully endorsed.") ;
								console.dir(doc);
							})
							.catch(err => console.error(err))
					}
				}
			}
			if (!beingTracked)
			{
				let level = 0;
				if (endorse) { level = 1 }
				let newEndorsement = new EndorsementUserModel({
					level: level,
					id: userID
				});
				Endorsements.push(newEndorsement);
				let query = { id: "0" };
				let update = { $set: { Endorsements: Endorsements } };
				console.log("Updating endorsements:");
				console.dir(update);
				let options = { new: true };
				EndorsementModel.findOneAndUpdate(query, update, options)
					.then(doc => 
					{ 
						console.log("New user added to endorsement tracker.");
						console.dir(doc);
					})
					.catch(err => console.error(err))
			}
		})
		.catch(err => console.error(err))
}

