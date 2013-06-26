var settingsRepo = require("../model/settings"),
	socialRepo = require("../model/socialMessage"),
	bannedRepo = require("../model/bannedSocial"),
	msgUtil = require("../util/msgUtil");

var slug = "/api/";

module.exports = function(app) {
	app.get(slug + "tweets", tweets);
	app.put(slug + "tweets", promoteTweet);
	app.delete(slug + "tweets", banTweet);

	app.get(slug + "images", images);
	app.put(slug + "images", promoteImg);
	app.delete(slug + "images", banImg);

	app.get(slug + "settings", settings);
	app.post(slug + "settings", updateSetting);
	app.put(slug + "settings", updateSetting)

	app.get(slug + "blacklist", blacklist);
	app.post(slug + "blacklist", addBlacklist);
	app.delete(slug + "blacklist", deleteBlacklist);
};

function blacklist(req, res) {
	settingsRepo.getByKey('blacklist', function(err, obj) {
		res.json(obj.value.split(','));
	});
}

function addBlacklist(req, res) {
	var wtr = req.body.word;
	console.log("adding " + wtr);
	settingsRepo.getByKey('blacklist', function(err, obj) {
		var newArray = obj.value.split(',');
		newArray.push(wtr);

		settingsRepo.add("blacklist", newArray.join(','), function(err, obj) {
			if (err) console.log(err);
			msgUtil.sendConfigMessage("update-blacklist");
			return res.json({
				status: "OK",
				body: req.body

			});
		});
	});
}

function deleteBlacklist(req, res) {
	var wtr = req.body.word;
	console.log("Removing " + wtr);
	settingsRepo.getByKey('blacklist', function(err, obj) {
		var filtered = obj.value.split(',').filter(function(el) {
			console.log("comparing " + el + " to " + wtr + " which gives us " + (el != wtr));
			return el != wtr;
		});
		settingsRepo.add("blacklist", filtered.join(','), function(err, obj) {
			if (err) console.log(err);
			msgUtil.sendConfigMessage("update-blacklist");
			return res.json({
				status: "OK"
			});
		});
	});
}

function settings(req, res) {
	settingsRepo.getAll(function(err, obj) {
		console.log('error', err);
		res.json(obj.filter(function(obj) {
			return obj.key != 'blacklist'
		}));
	});
}

function updateSetting(req, res) {
	var key = req.body.key;
	var val = req.body.value;

	console.log("setting " + key + " to " + val);

	settingsRepo.add(key, val, function(err, obj) {
		if (err)
			console.log(err);
		else
			msgUtil.sendConfigMessage('update-config');
		return res.json({
			status: "OK"
		});

	})
}

function tweets(req, res) {

	var page = req.query.page || 1;
	var pageSize = req.query.pageSize || 15;

	socialRepo.getByType('tweet', page, pageSize, function(err, obj) {
		console.log('error', err);
		//console.log('length of ret' + obj.length)
		res.json(obj);
	});
}

function promoteTweet(req, res) {
	var id = req.body.id;

	socialPromote( id, "tweet" );
	return res.json({ status: "OK" });
}

function socialPromote(id, type ) {
	socialRepo.getByIdAndType(id, type, function(err, obj) {
			if(err) console.log(err);
			console.log("promoting " + type + " " + id, obj);
			var msg = {
	            id: obj[0].id,
	            type:obj[0].type,
	            content: obj[0].content,
	            size: obj[0].size + 1000,
	            colour:obj[0].colour,
	            authorId: obj[0].authorId,
	            authorName:obj[0].authorName,
	            authorProfileUrl: obj[0].authorProfileUrl,
	            dateTime: obj[0].dateTime,
	            promoted: true,
	            banned: false
	            //details: {}
	          };
			msgUtil.sendNewMessage("Message From " + type, msg );
			socialRepo.add(msg, function(err, obj, other) {
				console.log('error', err);
				console.log('obj', obj);
				console.log('other', other);
			});
			
		});
}

function socialBan(id, type ) {
	socialRepo.getByIdAndType(id, type, function(err, obj) {
			if(err) console.log(err);
			console.log("promoting " + type + " " + id, obj);
			var msg = {
	            id: obj[0].id,
	            type:obj[0].type,
	            content: obj[0].content,
	            size: 0,
	            colour:obj[0].colour,
	            authorId: obj[0].authorId,
	            authorName:obj[0].authorName,
	            authorProfileUrl: obj[0].authorProfileUrl,
	            dateTime: obj[0].dateTime,
	            promoted: false,
	            banned: true
	            //details: {}
	          };
			console.log(msg);
			msgUtil.sendNewMessage("Message From " + type, msg );
			socialRepo.add(msg, function(err, obj, other) {
				console.log('error', err);
				console.log('obj', obj);
				console.log('other', other);
			});
			
		});
}

function banTweet(req, res) {
	var id = req.body.id;

	bannedRepo.add(id, "tweet", function(err, obj) {

		socialBan( id, "tweet" );
		msgUtil.sendConfigMessage("update-blacklist");
		msgUtil.sendRemoveMessage("tweet", id);
		return res.json({
			status: "OK"
		});
	});
}

function promoteImg(req, res) {
	var id = req.body.id;

	socialPromote( id, "image" );
	return res.json({ status: "OK" });
}

function banImg(req, res) {
	var id = req.body.id;

	bannedRepo.add(id, "image", function(err, obj) {

		socialBan( id, "image" );
		msgUtil.sendConfigMessage("update-blacklist");
		msgUtil.sendRemoveMessage("image", id);
		return res.json({
			status: "OK"
		});
	});
}

function images(req, res) {
	var page = req.query.page || 1;
	var pageSize = req.query.pageSize || 15;

	socialRepo.getByType('image', page, pageSize, function(err, obj) {
		console.log('error', err);
		//console.log('length of ret' + obj.length)
		res.json(obj);
	});
}