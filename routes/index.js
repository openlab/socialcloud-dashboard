
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('promotion/tweets', { user: req.user, layout: 'layout' });
};

exports.login = function(req, res) {
	res.render('login', { layout: null });
}
exports.notadmin = function(req, res) {
	res.render('notadmin', { layout: null });
}