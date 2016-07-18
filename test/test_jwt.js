var request = require('supertest');
//var app = require('../jwt-demo.8000.js');
var cfg = require('../config.js');

describe('Test API', function() {
  var token = '';
  var url = cfg.test.url;
  
  var user = { username : 'anna'};
  before(function(done) {
    request(url)
      .post('/api/token')
      .send(user)
      .end(function(err, res) {
        if (err) { return done(err); }
        var result = JSON.parse(res.text);
        console.log('POST /api/token result=%j', result);
        token = result.token;
        done();
      });
  });

  it('should not be able to consume /api/protected since no token was sent', function(done) {
    request(url)
      .get('/api/protected')
      .expect(401, done);
//      .end(function(err, res) {
//          if (err) { return done(err); }
//          //var result = JSON.parse(response.text);
//          console.log('get /api/protected result=%j', res);
//          //token = result.token;
//          done();
//        });
//      //.expect(401, done);
  });

  it('should be able to consume /api/protected since token was sent', function(done) {
    request(url)
      .get('/api/protected')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done);
  });
  
  it('should be able to consume /api/users since token was sent', function(done) {
	    request(url)
	      .get('/api/users')
	      .set('Authorization', 'Bearer ' + token)
	      .expect(200)
	      .end(function(err, res) {
				if (err) {
					return done(err);
					//throw err;
				}
				
				//var result = JSON.parse(res.payload);
				
				console.log('GET messages = %j', res.text);
				console.log('GET messages = %j', res);
				//message_id_list.push(res.body._id)
				//res.body.should.have.property('title', 'once we have specified the info we');
				done();
			});
  });
});