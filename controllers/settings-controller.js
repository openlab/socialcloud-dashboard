var settingsRepo = require("../model/settings"),
	config = require("../config"),
	auth = require("../util/authUtil"),
	azure = require('azure');

var slug = "/settings";
process.env.AZURE_SERVICEBUS_NAMESPACE= config.azureNamespace;
process.env.AZURE_SERVICEBUS_ACCESS_KEY= config.azureAccessKey;

var serviceBusService = azure.createServiceBusService();

var shapeOptions = ["cloud", "microsoft", "xbox", "kinect"];

module.exports = function(app) {
	app.get( slug + '/blacklist', auth.makeAuth, blacklist);
	app.get( slug + '/general', auth.makeAuth, general);
	app.post( slug + '/general/update', auth.makeAuth, updateGeneral);
	app.post( slug + '/blacklist/remove', auth.makeAuth, removeWord);
	app.post( slug + '/blacklist/add', auth.makeAuth, addWord);
	//app.post( slug + '/settings', makeAuth, updateSettings); 
	serviceBusService.createTopicIfNotExists(config.configTopic,function(error){
    if(!error){
        // Topic was created or exists
        console.log('topic created or exists.');
    }
});
};

function updateGeneral(req, res) {
	console.log("Updating");
	console.log(req.body);

	var key = req.body.key;
	var val = req.body.value;

	settingsRepo.add(key, val, function(err, obj) {
		if(err)
			console.log(err);
		else
			sendConfigMessage('update-config');
		return res.json({status: "OK"});

	})

}

function blacklist(req, res) {
	res.render('settings/blacklist', {
				user:req.user,
				layout: 'layout'
			});
}

function removeWord(req, res) {
	var wtr = req.body.word;
	console.log("Removing " + wtr);
	settingsRepo.getByKey('blacklist', function(err, obj) {
		var filtered = obj.value.split(',').filter(function(el) { console.log("comparing " + el + " to " + wtr + " which gives us " + (el != wtr));return el != wtr; }); 
		settingsRepo.add("blacklist", filtered.join(','), function(err, obj) {
			if(err) console.log(err);
			sendConfigMessage("update-blacklist");
			return res.json({status:"OK"});
		});
	});
}

function addWord(req, res) {
	var wtr = req.body.word;
	console.log("adding " + wtr);
	settingsRepo.getByKey('blacklist', function(err, obj) {
		var newArray = obj.value.split(',');
		newArray.push(wtr);

		settingsRepo.add("blacklist", newArray.join(','), function(err, obj) {
			if(err) console.log(err);
			sendConfigMessage("update-blacklist");
			return res.json({status:"OK"});
		});
	});
}

function general(req, res) {
	return res.render('settings/general', {
		user:req.user,
		layout: 'layout'
	});
}

function getDefaultBlackList() {
	return [
		'a',
		'i',
		'the',
		'to',
		'and'
	];
}
