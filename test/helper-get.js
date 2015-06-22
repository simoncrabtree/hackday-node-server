var request = require('request')
//require('request-debug')(request)

module.exports = function (path, callback) {
	request({
		method: 'GET',
		url: 'http://localhost:' + process.env.port + path,
		json: true
	}, function (err, response, body) {
		if(err)
			throw err;
		callback(response, body);
	});
}
