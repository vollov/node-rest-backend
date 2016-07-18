var express = require('express');
var router = express.Router();

var expressJwt = require('express-jwt');
var cfg = require('../config');
var jwt_auth = expressJwt({secret: cfg.jwt.secret, userProperty: 'payload'});

/* GET users listing. */
router.get('/users', jwt_auth, function(req, res) {
	console.log('calling get users user=%j', req.payload);
	
	
  res.send('respond with a resource');
});

module.exports = router;