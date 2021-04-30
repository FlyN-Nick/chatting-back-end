"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endorsementSchema = void 0;
var mongoose_1 = require("mongoose");
var endorsementUser_1 = require("./endorsementUser");
/** Schema for the endorsement tracker. */
exports.endorsementSchema = new mongoose_1.Schema({
    Endorsements: {
        type: [endorsementUser_1.endorsementUserSchema],
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true,
        default: '0'
    }
});
exports.default = mongoose_1.model('Endorsement', exports.endorsementSchema);
//# sourceMappingURL=endorsement.js.map