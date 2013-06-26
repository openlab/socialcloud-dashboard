var auth = require("../util/authUtil");

var slug = "/promotion";

module.exports = function(app) {
	app.get(slug + '/tweets', auth.makeAuth, tweets);
	app.get(slug + '/images', auth.makeAuth, images);

};

function tweets(req, res) {
	res.render('promotion/tweets', { user: req.user, layout: 'layout' });
}

function images(req, res) {
	res.render('promotion/images', { user: req.user, layout: 'layout' });
}

