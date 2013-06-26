var TABLE = 'FbAuth';

var mongoose = require('mongoose'),
	db = require('./baseRepo'),
	Schema = mongoose.Schema;

db.init();

module.exports = {
	_schema: new Schema({
		id: String,
		auth: String
	}),

	getById: function(key, callback) {
		var model = mongoose.model(TABLE, this._schema);
		model.findOne({id: id}, callback);
	},

	getAll: function(callback) {
		var model = mongoose.model(TABLE, this._schema);
		model.find({}, callback);
	},
	
	add: function(id, auth, callback) {
		var model = mongoose.model(TABLE, this._schema);
		var data = new model();
		console.log("upserting key: " + id + " with value: " + auth );
		model.update({
			id: id
		}, {
			$set: {
				auth: auth
			}
		}, {
			upsert: true
		}, callback);
	}
}