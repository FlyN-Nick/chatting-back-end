"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
var mongoose_1 = require("mongoose");
/** Schema for a message. */
exports.messageSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model('Message', exports.messageSchema);
//# sourceMappingURL=message.js.map