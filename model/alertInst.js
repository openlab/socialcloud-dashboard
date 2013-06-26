var TABLE = 'AlertInst';

var mongoose = require('mongoose'),
	db = require('./baseRepo'),
	Schema = mongoose.Schema;

db.init();

module.exports = {
	_schema: new Schema({
		ruleId: String,
		count: Number,
		ruleName:String,
		dt: Date,
	}),
	getAll: function(callback) {
		var model = mongoose.model(TABLE, this._schema);
		model.find({}, null, { sort: { dt: -1 } }, callback);
	},
	deleteById: function( id, callback ) {
		var model = mongoose.model(TABLE, this._schema);
		model.findById(id).remove(callback);
	}

}