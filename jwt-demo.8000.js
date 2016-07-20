
/**
 * Sample app to use express-jwt and jsonwebtoken(jwt)
 */
var express = require('express');
var app = express();

var expressJwt = require('express-jwt');


var cfg = require('./config');

var jwt = require('jsonwebtoken');
//requestProperty, , userProperty: 'payload'
var jwt_auth = expressJwt({secret: cfg.jwt.secret, userProperty: 'payload'});

var _ = require('underscore');
var bunyan = require('bunyan');
var log = bunyan.createLogger(_.extend(cfg.logging, {name: 'jwt-demo'}));

var util = require('util');
//app.use('/api', expressJwt({secret: cfg.jwt.secret}).unless({path: ['/api/token']}));


var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
app.use(bodyParser.json({ limit: '1mb' }));

app.use(cookieParser());
app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(__dirname + '/public'));

app.post('/api/token', function(req, res) {
	//console.log(util.inspect(req, {showHidden: false, depth: null}));
	log.debug('POST /api/token req=%j', req.body);
	if (!req.body.username) {
		return res.status(400).json({
			message : 'Please post with username!'
		});
	}
	//var token = jwt.sign({username: req.body.username}, cfg.jwt.secret);
			
	var token = jwt.sign({username: req.body.username}, cfg.jwt.secret, {expiresIn:'14d'});
	log.debug('POST /api/token token created: %s', token);
	res.send({token: token});
});

app.get('/api/protected', jwt_auth, function(req, res) {
	res.send('hello from /api/protected route.');
});

var users = require('./routes/users');
app.use('/api/users', users);

app.get('*', function(req,res){
	res.sendfile('index.html', { root: path.resolve(__dirname + '/public') });
})

//app.use(function(err, req, res, next) {
//  res.status(err.status || 500).send(err);
//});

app.listen(8000, function() {
  console.log('server up and running at 8000 port');
});

module.exports = app;