"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatroomIDTrackerSchema = void 0;
var mongoose_1 = require("mongoose");
/** Schema for the tracker used for generating unique chat room ids */
exports.chatroomIDTrackerSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: '0'
    },
    chatRoomIDs: {
        type: [String],
        required: true,
        default: []
    }
});
exports.default = mongoose_1.model('ChatroomIDTracker', exports.chatroomIDTrackerSchema);
//# sourceMappingURL=chatroomIDTracker.js.map