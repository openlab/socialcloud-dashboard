var mongoose = require('mongoose'),
	config   = require('../config');
module.exports = {
	_db: null,
	init: function() {
		if(!module.exports._db) {

			module.exports._db = mongoose.connect(config.mongoPath, {
							        server:{
							            auto_reconnect: true,
							            socketOptions:{
							                connectTimeoutMS:3600000,
							                keepAlive:3600000,
							                socketTimeoutMS:3600000
							            }
							        }});

		}
		return module.exports._db;
	}
}