var Hapi = require('hapi');
var config = require('./package.json');
var server = new Hapi.Server();

var fs = require('fs');
fs.writeFile('hackday.csv')

var replies = ['ROCK','PAPER','SCISSORS','DYNAMITE','WATERBOMB'];
var dynamiteCount = 0;

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

server.route({method: 'POST', path: '/start', config : {payload: {parse: true}}, handler: function (request, reply) {
	var log = Date.now() + "," + "start" + "," +  request.payload.opponentName + "," + request.payload.pointsToWin + ","  + request.payload.maxRounds + "," + request.payload.dynamiteCount;
	console.log(log);
	fs.writeFileSync('hackday.csv', log);
	dynamiteCount = request.payload.dynamiteCount;
	reply();
}});

server.route({method: 'GET', path: '/move', handler: function (request, reply) {
	var max=4;
	var min=0;
	var no = Math.floor(Math.random() * (max - min)) + min
	var ourmove = replies[no];
	var log = Date.now() + "," + "ourmove" + "," +  ourmove;
	console.log(log);
	fs.writeFileSync('hackday.csv', log);

	reply(ourmove);
}});

server.route({method: 'POST', path: '/move', config : {payload: {parse: true}}, handler: function (request, reply) {
	var log = Date.now() + "," + "theirmove" + "," +  request.payload.lastOpponentMove;
	console.log(log);
	fs.writeFileSync('hackday.csv', log);


	reply();
}});


