var request = require('request')
require('request-debug')(request)

module.exports = function (path, body, callback) {
	request({
		method: 'POST',
		url: 'http://localhost:' + process.env.port + path,
		body: body
	}, function (err, response, body) {
		if(err)
			throw err;
		callback(response, body);
	});
}
