var TABLE = 'BannedSocial';

var mongoose = require('mongoose'),
	db = require('./baseRepo'),
	Schema = mongoose.Schema;

db.init();

module.exports = {
	_schema: new Schema({
		socialId: String,
		type: String
	}),

	getByKey: function(key, callback) {
		var model = mongoose.model(TABLE, this._schema);
		model.findOne({key: key}, callback);
	},

	getAll: function(callback) {
		var model = mongoose.model(TABLE, this._schema);
		model.find({}, callback);
	},
	
	add: function(socialId, type, callback) {
		var model = mongoose.model(TABLE, this._schema);
		var data = new model();
		model.update({
			socialId: socialId
		}, {
			$set: {
				type: type
			}
		}, {
			upsert: true
		}, callback);
	}
}