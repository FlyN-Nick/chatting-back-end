"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endorsementUserSchema = void 0;
var mongoose_1 = require("mongoose");
/** Schema for an endorsement-user pair. */
exports.endorsementUserSchema = new mongoose_1.Schema({
    level: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    }
});
exports.default = mongoose_1.model('EndorsementUser', exports.endorsementUserSchema);
//# sourceMappingURL=endorsementUser.js.map