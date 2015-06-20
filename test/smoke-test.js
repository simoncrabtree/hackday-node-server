var should = require('chai').should();
var get = require('./helper-get');
var post = require('./helper-post');

describe('Server:', function () {
	
	it('GET /info - returns info about the running server instance', function (done) {
		get('/info', function (response, body) {
			response.statusCode.should.equal(200)
			body.should.have.property('name').equals('hackday-node-server')
			body.should.have.property('version')
			done()
		})
	})

	it('POST /testpayload - pulls out body text', function (done) {
		post('/testpayload', "This is a test", function (response, body) {
			response.statusCode.should.equal(200)
			response.body.should.equal("This is a test")
			done()
		})
	})
})