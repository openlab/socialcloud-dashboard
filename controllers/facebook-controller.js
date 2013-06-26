var graph = require('fbgraph'),
	authRepo = require('../model/fbAuth');


// this should really be in a config file!
var conf = {
	client_id: '124790277701102',
	client_secret: '2cf76336236686497901bb652b09aeba',
	scope: 'email,user_photos,friends_photos',
	redirect_uri: 'http://cc-admin.azurewebsites.net/fbauth/auth'
};

var slug = "/fbauth";
var access_token = "";
module.exports = function(app) {
	app.get(slug + '/auth', auth);
	app.get(slug + "/logged", logged);
};

function auth(req, res) {
	// we don't have a code yet
	// so we'll redirect to the oauth dialog
	if(!req.query.code) {
		var authUrl = graph.getOauthUrl({
			"client_id": conf.client_id,
			"redirect_uri": conf.redirect_uri,
			"scope": conf.scope
		});

		if(!req.query.error) { //checks whether a user denied the app facebook login/permissions
			res.redirect(authUrl);
		} else { //req.query.error == 'access_denied'
			res.send('access denied');
		}
		return;
	}

	// code is set
	// we'll send that and get the access token
	graph.authorize({
		"client_id": conf.client_id,
		"redirect_uri": conf.redirect_uri,
		"client_secret": conf.client_secret,
		"code": req.query.code
	}, function(err, facebookRes) {
		console.log(facebookRes.access_token);
		access_token = facebookRes.access_token;

		graph.get("/me", function(err, obj) {

			var link = obj.id;
			authRepo.add(link, access_token, function(err, obj) {
				if(err) console.log(err)
				else console.log("saved auth");
				return res.redirect('/')
			})

		})
	});
}

function logged(req, res) {
	//console.log(req);
	return res.json({status:access_token})
}