var TABLE = 'AlertRule';

var mongoose = require('mongoose'),
	db = require('./baseRepo'),
	Schema = mongoose.Schema;

db.init();

module.exports = {
	_schema: new Schema({
		userId: String,
		ruleName: String,
		searchTerm: String,
		sms: String,
		email: String,
		threashold: Number,
		sendText: Boolean,
		sendEmail: Boolean,
		sendDashboard: Boolean,
		sendMobile: Boolean
	}),
	getAll: function(callback) {
		var model = mongoose.model(TABLE, this._schema);
		model.find({}, callback);
	},
	addNew: function(alert, callback) {
		var model = mongoose.model(TABLE, this._schema);
		var dbModel = new model();

		for( att in alert) {
			dbModel[att] = alert[att];
		}

		console.log("about to save", dbModel);

		dbModel.save(callback);
	},
	deleteById: function( id, callback ) {
		var model = mongoose.model(TABLE, this._schema);
		model.findById(id).remove(callback);
	}
}