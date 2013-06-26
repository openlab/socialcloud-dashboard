var auth = require("../util/authUtil"),
	arRepo = require('../model/alertRule');
var slug = "/alerts";

module.exports = function(app) {
	app.get( slug, auth.makeAuth, alertlist);	
	app.get( slug + "/rulelist", auth.makeAuth, rulelist);	

	app.post(slug + "/rulelist", auth.makeAuth, addRule);
};

function alertlist(req, res) {
	res.render('alerts/list.mustache', {
			user: req.user,
			layout: 'layout'
		});
}

function rulelist(req, res) {
	res.render('alerts/rules.mustache', {
			user: req.user,
			layout: 'layout'
		});
}

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
		sendText: req.body.smsToggle == "on",
		sendEmail: req.body.emailToggle == "on",
		sendDashboard: req.body.dashToggle == "on",
		sendMobile: req.body.mobileToggle == "on",
		sms: req.body.sms,
  		email: req.body.email,
	};

	arRepo.addNew(newRule, function(err, obj) {
		console.log('error', err);
		console.log('object', obj);
		res.redirect(slug + '/rulelist');

	})

}