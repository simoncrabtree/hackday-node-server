var should = require('chai').should();
var get = require('./helper-get');

describe('Server:', function () {
	
	it('GET /info - returns info about the running server instance', function () {
		get('/info', function (response, body) {
			response.statusCode.should.equal(200)
			body.should.have.property('name').equals('hackday-node-server')
			body.should.have.property('version')
		})
	})
})