var TABLE = 'Users';

var mongoose = require('mongoose'),
	db = require('./baseRepo'),
	Schema = mongoose.Schema;

db.init();

module.exports = {
	_schema: new Schema({
		liveId: String,
		displayName: String,
		isAdmin: Boolean

	}),
	getByLiveId: function(liveId, callback) {
		var model = mongoose.model(TABLE, this._schema);

		model.findOne({liveId: liveId}, callback);
	},
	add: function(user, callback) {

		var model = mongoose.model(TABLE, this._schema);
		var data = new model();
		data.liveId = user.id;
		data.displayName = user.displayName;

		module.exports.getAll(function(error, users){
			if(!users || users.length < 1 ) {
				data.isAdmin = true;
			}
			else {
				data.isAdmin = false;
			}
			data.save(callback);
		});

	},
	getAll: function(callback) {
		var model = mongoose.model(TABLE, this._schema);
		console.log("finding all users");
		model.find({}, callback);
	}
}