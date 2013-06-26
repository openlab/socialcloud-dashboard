require('newrelic');

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , passport = require('passport')
  , util = require('util')
  , auth = require("./util/authUtil")
  , hogan = require('hogan-express');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.engine('mustache', hogan);
  app.set('view engine', 'mustache');
  app.set('layout',  __dirname + '/views/layout');
  app.use(express.errorHandler());
  app.use(express.logger('tiny'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', auth.makeAuth, routes.index);
app.get('/login', routes.login);
app.get('/notadmin', routes.notadmin);

//Load up all the controllers.
var controllers_path = __dirname + '/controllers',
    controller_files = fs.readdirSync(controllers_path);

console.log("About to load " + controller_files.length + " controllers");
controller_files.forEach(function(file) {
  console.log("Loading controller: " + file);
  require(controllers_path + '/' + file )(app);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
