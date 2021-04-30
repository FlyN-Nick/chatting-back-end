"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoomSchema = void 0;
var mongoose_1 = require("mongoose");
var message_1 = require("./message");
/** Schema for a chatroom. */
exports.chatRoomSchema = new mongoose_1.Schema({
    chatRoomID: {
        type: String,
        required: true,
        unique: true
    },
    messages: {
        type: [message_1.messageSchema],
        required: true
    },
    userOneID: {
        type: String,
        required: true,
        unique: true
    },
    userTwoID: {
        type: String,
        required: true,
        unique: true
    }
});
exports.default = mongoose_1.model('ChatRoom', exports.chatRoomSchema);
//# sourceMappingURL=chatRoom.js.map