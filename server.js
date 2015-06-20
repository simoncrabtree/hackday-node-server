var Hapi = require('hapi');
var config = require('./package.json');

var server = new Hapi.Server();
server.connection({ port: process.env.port });

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

server.route({method: 'GET', path: '/info', handler: function (request, reply) {
	reply({
		name: config.name,
		version: config.version
	});
}});

server.route({method: 'POST', path: '/testpayload', config: {payload: {parse: false}}, handler: function (request, reply) {
	console.log(request.payload)
	var postedText = request.payload;

	reply(postedText);
}});