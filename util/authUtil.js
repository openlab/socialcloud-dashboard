module.exports = {
	makeAuth: function makeAuth(req, res, next) {
		if(req.host === 'localhost') {
			req.user = {
				displayName: 'John Doe',
				isAdmin: true
			};
			next();
		} else {
			if(req.isAuthenticated() ) {
				if( req.user.isAdmin === true)
					return next();
				else
					return res.redirect('/notadmin');
			}
			res.redirect('/login');
		}
	}
}