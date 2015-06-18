var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: process.env.port });

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

server.route({method: 'GET', path: '/info', handler: function (request, reply) {
	reply({version: '0.0.1'});
}});