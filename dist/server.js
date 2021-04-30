"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var cors_1 = __importDefault(require("cors"));
var chatRoom_1 = __importDefault(require("./schema/chatRoom")); // schema for the chatrooms
var chatroomIDTracker_1 = __importDefault(require("./schema/chatroomIDTracker")); // schema for tracking all the chatroom ids that have been generated (so when a new chatroom is made, it can be made sure that the id is unique)
var endorsement_1 = __importDefault(require("./schema/endorsement")); // schema for tracking the endorsement level of users
var endorsementUser_1 = __importDefault(require("./schema/endorsementUser")); // schema for each endorsement-user pair
var message_1 = __importDefault(require("./schema/message")); // schema for each individual message
console.log('May node be with you!'); // *so* funny
app.use(express_1.default.json());
//app.use('*', cors());
//app.options('*', cors());
var whitelist = ['https://chat-n-5b27d.web.app', 'https://chat-n-5b27d.firebaseapp.com', 'https://flynchattin.web.app', 'https://flynchattin.firebaseapp.com']; // websites that are allowed to fetch from the backend (them being my frontend)
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.headers.origin || "") !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};
// all of these options requests are for cors preflight, and I use cors(corsOptionsDelegate) to only allow my frontend
app.options('/find', cors_1.default(corsOptionsDelegate), function (_req, res, _next) {
    res.json({ msg: 'Only websites from FlyN Nick are authorized.' });
});
app.options('/leave', cors_1.default(corsOptionsDelegate), function (_req, res, _next) {
    res.json({ msg: 'Only websites from FlyN Nick are authorized.' });
});
app.options('/get', cors_1.default(corsOptionsDelegate), function (_req, res, _next) {
    res.json({ msg: 'Only websites from FlyN Nick are authorized.' });
});
app.options('/getEndorsementLevel', cors_1.default(corsOptionsDelegate), function (_req, res, _next) {
    res.json({ msg: 'Only websites from FlyN Nick are authorized.' });
});
app.options('/endorse', cors_1.default(corsOptionsDelegate), function (_req, res, _next) {
    res.json({ msg: 'Only websites from FlyN Nick are authorized.' });
});
app.options('/delete', cors_1.default(corsOptionsDelegate), function (_req, res, _next) {
    res.json({ msg: 'Only websites from FlyN Nick are authorized.' });
});
app.options('/send', cors_1.default(corsOptionsDelegate), function (_req, res, _next) {
    res.json({ msg: 'Only websites from FlyN Nick are authorized.' });
});
app.get('/', function (_req, res, _next) {
    res.json({ msg: 'Welcome to the backend :)' });
});
app.put('/find', cors_1.default(corsOptionsDelegate), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docs, _a, _b, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                console.log("FIND REQUEST OCCURED, RECEIVED:");
                console.dir(req.body);
                return [4 /*yield*/, chatRoom_1.default.find({ userOneID: req.body.find })];
            case 1:
                docs = _c.sent();
                if (!docsCheck(docs)) return [3 /*break*/, 2];
                res.send(docs);
                console.log("OLD CHATROOM FOUND. SENT:");
                console.dir(docs);
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, chatRoom_1.default.find({ userTwoID: req.body.find })];
            case 3:
                docs = _c.sent();
                if (!docsCheck(docs)) return [3 /*break*/, 4];
                res.send(docs);
                console.log("OLD CHATROOM FOUND. SENT:");
                console.dir(docs);
                return [3 /*break*/, 6];
            case 4:
                _b = (_a = res).send;
                return [4 /*yield*/, findOpenChatRoom(req.body.find)];
            case 5:
                _b.apply(_a, [_c.sent()]);
                _c.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _c.sent();
                console.error("CAUGHT ERROR: " + err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.put('/leave', cors_1.default(corsOptionsDelegate), function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    var docs, query, update, options, newDocs, query, update, options, doc, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                console.log("LEAVE REQUEST OCCURED, RECEIVED:");
                console.dir(req.body);
                return [4 /*yield*/, chatRoom_1.default.find({ chatRoomID: req.body.chatRoomID })];
            case 1:
                docs = _a.sent();
                if (!(docs[0].userOneID == req.body.remove)) return [3 /*break*/, 3];
                query = { chatRoomID: req.body.chatRoomID };
                update = { $set: { userOneID: "" } };
                options = { new: true };
                return [4 /*yield*/, chatRoom_1.default.findOneAndUpdate(query, update, options)];
            case 2:
                newDocs = _a.sent();
                res.send(newDocs);
                console.log("CHATTER SUCCESFULLY REMOVED FROM CHATTROOM. SENT:");
                console.dir(newDocs);
                return [3 /*break*/, 5];
            case 3:
                query = { chatRoomID: req.body.chatRoomID };
                update = { $set: { userTwoID: "" } };
                options = { new: true };
                return [4 /*yield*/, chatRoom_1.default.findOneAndUpdate(query, update, options)];
            case 4:
                doc = _a.sent();
                if (docCheck(doc)) {
                    res.send(doc);
                    console.log("CHATTER SUCCESFULLY REMOVED FROM CHATTROOM. SENT:");
                    console.dir(doc);
                }
                else {
                    console.error("ERROR: Chatter requested to leave the chatroom, but wasn't in it...");
                }
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_2 = _a.sent();
                console.error("CAUGHT ERROR: " + err_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.put('/get', cors_1.default(corsOptionsDelegate), function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    var docs, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("GET REQUEST OCCURED, RECEIVED:");
                console.dir(req.body);
                return [4 /*yield*/, chatRoom_1.default.find({ chatRoomID: req.body.chatRoomID })];
            case 1:
                docs = _a.sent();
                if (docsCheck(docs)) {
                    res.send(docs);
                    console.log("HTTP GETTER SUCCESSFULL. SENT:");
                    console.dir(docs);
                }
                else {
                    console.error("ERROR: Chatter's chatroom could not be get...");
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error("CAUGHT ERROR: " + err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put('/getEndorsementLevel', cors_1.default(corsOptionsDelegate), function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    var docs, endorsements, _i, endorsements_1, endorsement, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("GET ENDORSE REQUEST OCCURED, RECEIVED:");
                console.dir(req.body);
                return [4 /*yield*/, endorsement_1.default.find({ id: '0' })];
            case 1:
                docs = _a.sent();
                if (docsCheck(docs)) {
                    endorsements = docs[0].Endorsements;
                    for (_i = 0, endorsements_1 = endorsements; _i < endorsements_1.length; _i++) {
                        endorsement = endorsements_1[_i];
                        if (endorsement.id == req.body.userID) {
                            res.send(endorsement);
                            console.log("ENDORSEMENT GETTER SUCCESSFULL. SENT:");
                            console.dir(endorsement);
                            return [2 /*return*/];
                        }
                    }
                }
                else {
                    console.error("ERROR: Endorsements cannot be get...");
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error("CAUGHT ERROR: " + err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put('/endorse', cors_1.default(corsOptionsDelegate), function (req, _res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    var err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("ENDORSE REQUEST OCCURED, RECEIVED:");
                console.dir(req.body);
                return [4 /*yield*/, endorser(req.body.userID, true)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                console.error("CAUGHT ERROR: " + err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put('/delete', cors_1.default(corsOptionsDelegate), function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, update, options, doc, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("DELETE REQUEST OCCURED, RECEIVED:");
                console.dir(req.body);
                query = { "chatRoomID": req.body.chatRoomID };
                update = { $set: { messages: req.body.messages } };
                options = { new: true };
                return [4 /*yield*/, chatRoom_1.default.findOneAndUpdate(query, update, options)];
            case 1:
                doc = _a.sent();
                if (docCheck(doc)) {
                    res.send(doc);
                    console.log("DELETE REQUEST SUCCESSFULL, SENT:");
                    console.dir(doc);
                }
                else {
                    console.error("ERROR: Nothing returned when updating chatroom:");
                    console.dir(doc);
                }
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                console.error("CAUGHT ERROR: " + err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/send', cors_1.default(corsOptionsDelegate), function (req, res, _next) { return __awaiter(void 0, void 0, void 0, function () {
    var docs, messages, newMessage, query, update, options, doc, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                console.log("SEND REQUEST OCCURED, RECEIVED:");
                console.dir(req.body);
                return [4 /*yield*/, chatRoom_1.default.find({ chatRoomID: req.body.chatRoomID })];
            case 1:
                docs = _a.sent();
                if (!docsCheck(docs)) return [3 /*break*/, 3];
                messages = docs[0].messages;
                newMessage = new message_1.default({
                    message: req.body.message,
                    sender: req.body.sender
                });
                messages.push(newMessage);
                query = { "chatRoomID": req.body.chatRoomID };
                update = { $set: { messages: messages } };
                options = { new: true };
                return [4 /*yield*/, chatRoom_1.default.findOneAndUpdate(query, update, options)];
            case 2:
                doc = _a.sent();
                if (docCheck(doc)) {
                    res.send(doc);
                    console.log("SEND REQUEST SUCCESSFULL, SENT:");
                    console.dir(doc);
                }
                else {
                    console.error("ERROR: Nothing returned when updating chatroom:");
                    console.dir(doc);
                }
                return [3 /*break*/, 4];
            case 3:
                console.error("ERROR: User tried to send message in invalid chatroom...");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_7 = _a.sent();
                console.error("CAUGHT ERROR: " + err_7);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/*
 * starting the backend, just makes an ChatroomIDTrackerModel if there isn't one already, same with EndorsementModel
 * the only scenario where these models don't exist is if the backend is being run for the first time
 * the only possibilities should be all of the models exist, or none of them do
 * but I still handle cases where say, only one of them exists, just to be careful
*/
var portNum = process.env.PORT || 1618; // process.env.PORT is a heroku config var, if the back end is being run locally and therefore can't access this var, it'll instead use 1618
app.listen(portNum, function () {
    return __awaiter(this, void 0, void 0, function () {
        var docs, tracker, doc, newDocs, model, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    console.log("SERVER INITIATED on port number " + portNum);
                    return [4 /*yield*/, chatroomIDTracker_1.default.find({ id: '0' })];
                case 1:
                    docs = _a.sent();
                    if (!docsCheck(docs)) return [3 /*break*/, 2];
                    console.log("There was already an ChatroomIDTrackerModel:");
                    console.dir(docs);
                    return [3 /*break*/, 4];
                case 2:
                    tracker = new chatroomIDTracker_1.default({
                        id: '0',
                        chatRoomIDs: []
                    });
                    return [4 /*yield*/, tracker.save()];
                case 3:
                    doc = _a.sent();
                    console.log("New ChatroomIDTracker:");
                    console.dir(doc);
                    _a.label = 4;
                case 4: return [4 /*yield*/, endorsement_1.default.find({ id: '0' })];
                case 5:
                    newDocs = _a.sent();
                    if (docsCheck(newDocs)) {
                        console.log("There was already an EndorsementModel:");
                        console.dir(newDocs);
                    }
                    else {
                        model = new endorsement_1.default({
                            IDs: [],
                            Endorsements: [],
                            id: '0'
                        });
                        model.save()
                            .then(function (doc) {
                            console.log("New EndorsementModel:");
                            console.dir(doc);
                        })
                            .catch(function (err) { return console.error(err); });
                    }
                    return [3 /*break*/, 7];
                case 6:
                    err_8 = _a.sent();
                    console.error("CAUGHT ERROR: " + err_8);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
});
/**
 * Makes a new chatroom.
 *
 * @param userID The id of the user making the new chatroom.
 * @returns The new chatroom.
 */
function makeNewChatRoom(userID) {
    return __awaiter(this, void 0, void 0, function () {
        var idLength, characters, random_id, options, query, doc, ids, i, update, newChatRoom, newDoc, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    idLength = 8;
                    characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                    random_id = '';
                    options = { new: true };
                    query = { id: '0' };
                    return [4 /*yield*/, chatroomIDTracker_1.default.find({ id: '0' }).lean()];
                case 1:
                    doc = _a.sent();
                    ids = doc[0].chatRoomIDs;
                    console.log("Current chatroom ids:");
                    console.dir(ids);
                    while (true) {
                        random_id = '';
                        for (i = 0; i < idLength; i++) {
                            random_id += characters.charAt(Math.floor(Math.random() * characters.length));
                        }
                        if ((!ids.includes(random_id)) /* || ids.length == 0 || ids.length == null || ids == null*/) // checks if the chatroom id is unique
                         {
                            break;
                        }
                    }
                    ids.push(random_id);
                    console.log("New chatroom ids:");
                    console.dir(ids);
                    update = { $set: { chatRoomIDs: ids } };
                    return [4 /*yield*/, chatroomIDTracker_1.default.findOneAndUpdate(query, update, options).lean()];
                case 2:
                    doc = _a.sent();
                    console.log("RANDOM ID FOR CHATROOM GENERATED.");
                    newChatRoom = new chatRoom_1.default({
                        chatRoomID: random_id,
                        messages: [],
                        userOneID: userID,
                        userTwoID: ''
                    });
                    return [4 /*yield*/, newChatRoom.save()];
                case 3:
                    newDoc = _a.sent();
                    console.log("NEW CHATROOM MADE, FOR NO OPEN CHATROOMS. SENT:");
                    console.dir(newDoc);
                    return [2 /*return*/, newDoc];
                case 4:
                    err_9 = _a.sent();
                    console.error("CAUGHT ERROR: " + err_9);
                    throw (err_9);
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Finds a chatroom with an empty slot for the user or just makes a new one if not possible.
 *
 * @param userID The id of the user finding an open chatroom.
 * @returns The chatroom found (or created).
 */
function findOpenChatRoom(userID) {
    return __awaiter(this, void 0, void 0, function () {
        var query, update, options, doc, query_1, update_1, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, endorser(userID, false)];
                case 1:
                    _a.sent();
                    query = { userOneID: "" };
                    update = { $set: { userOneID: userID } };
                    options = { new: true };
                    return [4 /*yield*/, chatRoom_1.default.findOneAndUpdate(query, update, options)];
                case 2:
                    doc = _a.sent();
                    if (!docCheck(doc)) return [3 /*break*/, 3];
                    console.log("OPEN CHATROOM FOUND WITH USER ONE SLOT AVAILABLE. SENT:");
                    console.dir(doc);
                    return [2 /*return*/, doc];
                case 3:
                    console.log("NO CHATROOM WITH USER ONE SLOT AVAILABLE:");
                    console.dir(doc);
                    query_1 = { userTwoID: "" };
                    update_1 = { $set: { userTwoID: userID } };
                    return [4 /*yield*/, chatRoom_1.default.findOneAndUpdate(query_1, update_1, options)];
                case 4:
                    doc = (_a.sent());
                    if (!docCheck(doc)) return [3 /*break*/, 5];
                    console.log("OPEN CHATROOM FOUND WITH USER TWO SLOT AVAILABLE. SENT:");
                    console.dir(doc);
                    return [2 /*return*/, doc];
                case 5:
                    console.log("NO CHATROOM WITH USER TWO SLOT AVAILABLE:");
                    console.dir(doc);
                    return [4 /*yield*/, makeNewChatRoom(userID)];
                case 6: return [2 /*return*/, _a.sent()]; // no chatrooms with empty slots exists, so a new one is made
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_10 = _a.sent();
                    console.error("CAUGHT ERROR: " + err_10);
                    throw (err_10);
                case 9: return [2 /*return*/];
            }
        });
    });
}
/**
 * Checks if what mongoose returned a legitimate document.
 *
 * @param doc The document you are checking.
 * @returns The validity of the document.
 */
function docCheck(doc) {
    if ((doc == null) || (doc == undefined) || (doc._id == null)) {
        return false;
    }
    else if (doc) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * Checks if mongoose returned a legitimate array of documents or not.
 * Same thing as docCheck, but for when mongoose returns an array (typically of length 1) of docs.
 *
 * @param docs The docs you are checking.
 * @returns The validity of the documents.
 */
function docsCheck(docs) {
    if ((docs == null) || (docs == undefined)) {
        return false;
    }
    else {
        return (docs.length > 0);
    }
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
function endorser(userID, endorse) {
    return __awaiter(this, void 0, void 0, function () {
        var docs, endorsements, beingTracked, _i, endorsements_2, endorsement, newLevel, newEndorsement, query, update, options, doc, level, newEndorsement, query, update, options, doc, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, endorsement_1.default.find({ id: '0' }).lean()];
                case 1:
                    docs = _a.sent();
                    endorsements = docs[0].Endorsements;
                    beingTracked = false;
                    _i = 0, endorsements_2 = endorsements;
                    _a.label = 2;
                case 2:
                    if (!(_i < endorsements_2.length)) return [3 /*break*/, 5];
                    endorsement = endorsements_2[_i];
                    if (!(endorsement.id == userID)) return [3 /*break*/, 4];
                    beingTracked = true;
                    if (!endorse) return [3 /*break*/, 4];
                    newLevel = (endorsement.level + 1);
                    newEndorsement = new endorsementUser_1.default({
                        level: newLevel,
                        id: userID
                    });
                    endorsements[endorsements.indexOf(endorsement)] = newEndorsement;
                    query = { id: '0' };
                    update = { $set: { Endorsements: endorsements } };
                    console.log("Updating endorsements:");
                    console.dir(update);
                    options = { new: true };
                    return [4 /*yield*/, endorsement_1.default.findOneAndUpdate(query, update, options)];
                case 3:
                    doc = _a.sent();
                    console.log("User successfully endorsed.");
                    console.dir(doc);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    if (!!beingTracked) return [3 /*break*/, 7];
                    level = endorse ? 1 : 0;
                    newEndorsement = new endorsementUser_1.default({
                        level: level,
                        id: userID
                    });
                    endorsements.push(newEndorsement);
                    query = { id: '0' };
                    update = { $set: { Endorsements: endorsements } };
                    console.log("Updating endorsements:");
                    console.dir(update);
                    options = { new: true };
                    return [4 /*yield*/, endorsement_1.default.findOneAndUpdate(query, update, options)];
                case 6:
                    doc = _a.sent();
                    console.log("New user added to endorsement tracker.");
                    console.dir(doc);
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_11 = _a.sent();
                    console.error("CAUGHT ERROR: " + err_11);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=server.js.map