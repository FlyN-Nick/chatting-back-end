"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var mongoose_1 = require("mongoose");
// was previously using Heroku's mLab add-on, mLab got migrated to atlas
var atlasURI = process.env.MONGODB_URI; // proccess.env to acess heroku config vars 
var localURI = 'mongodb://localhost:27017/chattingLocal';
var Database = /** @class */ (function () {
    function Database() {
        this._connect();
    }
    Database.prototype._connect = function () {
        // if the backend is being run locally it'll just use the variable localURI 
        mongoose_1.connect(atlasURI || localURI, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(function (mong) {
            console.log('Database connection successful');
            mong.Schema.Types.String.checkRequired(function (v) { return v != null; }); // changing this behavior, because mongoose now treats empty strings as null
        })
            .catch(function (err) {
            console.error('Database connection error:');
            console.error(err);
        });
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=database.js.map