var ruleRepo = require('../model/alertRule'),
	alertRepo = require('../model/alertInst'),
	msgUtil = require("../util/msgUtil");
var slug = "/api/";

module.exports = function(app) {
	app.get(slug + "alerts", listAlerts);
	app.delete(slug + "alerts", deleteAlert);
	app.post(slug + "rules", addRule);
	app.get(slug + "rules", listRules);
	app.delete(slug + "rules", deleteRule);
};

function addRule(req, res) {


	var id = req.body.id;

	if(id) {
		console.log("updating one");
	}
	else {
		console.log("adding a new one")
	}
	console.log('received', req.body)
	var newRule = {
		ruleName: req.body.ruleName,
		searchTerm: req.body.term,
		threashold: req.body.threashold,
		sendText: isTrue(req.body.smsToggle), 
		sendEmail: isTrue(req.body.emailToggle), 
		sendDashboard: isTrue(req.body.dashToggle), 
		sendMobile: isTrue(req.body.mobileToggle), 
		sms: req.body.sms,
  		email: req.body.email,
	};

	ruleRepo.addNew(newRule, function(err, obj) {
		console.log('error', err);
		console.log('object', obj);
		msgUtil.sendConfigMessage("update-rules");

		return res.json({
			status: "OK"
		});

	})
}

function isTrue(val) {
	if( val == null )
		return false;
	if( val == "on" )
		return true;
	if( val.toLowerCase() == "true")
		return true;

	return false;
}

function deleteRule(req, res) {
	ruleRepo.deleteById(req.body.id, function(err) {
		msgUtil.sendConfigMessage("update-rules");
		return res.json({
			status: "OK"
		});
	});
}

function deleteAlert(req, res) {
	alertRepo.deleteById(req.body.id, function(err) {
		return res.json({
			status: "OK"
		});
	});
}

function listAlerts(req, res) {
	alertRepo.getAll(function(err, alerts) {
		if (err) {
			console.log('error grabbing the alerts');
		}

		res.json(alerts);
	});

}

function listRules(req, res) {

	ruleRepo.getAll(function(err, rules) {
		if (err)
			console.log(err);

		res.json(rules);
	});
	/*
	var tmp = [
		{ searchTerm: "one", ruleName: "Rule One" },
		{ searchTerm: "two", ruleName: "Rule Two" },
		{ searchTerm: "three", ruleName: "Rule One" }
	];

	res.json(tmp); */
}