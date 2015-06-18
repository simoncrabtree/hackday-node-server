var should = require('chai').should();
var request = require('request');
var url = 'http://localhost:' + process.env.port

describe('The Http Server', function () {
	describe('when GET /info is called', function () {
		var getInfo = {
			method: 'GET',
			url: url + '/info',
			json: true
		}

		it('returns information about the running instance', function (done) {
			request(getInfo, function (err, response, body) {
				should.not.exist(err)
				response.statusCode.should.equal(200)
				should.exist(body)
				body.should.have.property('version')

				done()
			})
		})
	})
})