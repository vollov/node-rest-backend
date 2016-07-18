'use strict';
var path = require('path');

module.exports = {
	
	logging: {
		name: 'berly',
		streams : [ {
			level : 'debug',
			type : 'rotating-file',
			path : path.join('.', 'logs/server.log'),
			period : '14d', // daily rotation
			count : 3 // keep 3 back copies
		} ]
	},
	
	test_log: {
		name: 'berly',
		streams : [ {
			level : 'debug',
			type : 'rotating-file',
			path : path.join('.', 'logs/test.log'),
			period : '1d', // daily rotation
			count : 3 // keep 3 back copies
		} ]
	},
		
	test:{
		url : 'http://localhost:8000'
	},
	port:8000,
	jwt:{
		secret: 'myusername_hmacsha256',
		algorithm: 'HS256',
		expiresInSeconds: 1800
	},


};
