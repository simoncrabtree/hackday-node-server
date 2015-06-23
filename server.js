var Hapi = require('hapi');
var config = require('./package.json');
var server = new Hapi.Server();

var replies = ['WATERBOMB','ROCK','PAPER','SCISSORS','DYNAMITE'];

var dynamiteCount = 0;
var opponentName =""
var pointsToWin =0
var maxRounds =0
var min=1;
var max=3;
var no = 2;

var gameNo = 1;
var ourmove = "";
var nextmove = "SCISSORS"
var lastResult = "?"

var tournament = {
	games: []
}
var game = {
	rounds: []
};

server.connection({ host: "172.26.55.31", port: process.env.port });

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

server.route({method: 'GET', path: '/info', handler: function (request, reply) {
	reply(tournament);
}});


server.route({method: 'POST', path: '/start', config : {payload: {parse: true}}, handler: function (request, reply) {
	game = {
		opponentName: request.payload.opponentName,
		pointsToWin: request.payload.pointsToWin,
		maxRounds: request.payload.maxRounds,
		dynamiteCount: request.payload.dynamiteCount,
		rounds: []
	}

	tournament.games.push(game);
	
	var log = gameNo + "," + Date.now() + "," + "start" + "," + game.opponentName  + "," + game.pointsToWin + ","  + game.maxRounds + "," + game.dynamiteCount + "\n";
	reply();
}});

server.route({method: 'GET', path: '/move', handler: function (request, reply) {

	return reply("SCISSORS");
	
	// var no = Math.floor(Math.random() * (max - min)) + min

	if (lastResult === "DRAW"){
		if(ourmove === "DYNAMITE")
			ourmove = "WATERBOMB"
		else
			ourmove = "DYNAMITE"
	}else{
		ourmove = replies[no];
		no++;
		if(no > max)
			no = 1;
	}

	if(ourmove === "DYNAMITE"){
		dynamiteCount--;
		if(dynamiteCount === 0)
			max = 4;
	}

	

	// var log = gameNo + "," + Date.now() + "," + "ourmove" + "," +  ourmove  + "\n";
	// fs.appendFileSync('hackday.csv', log);

	reply(ourmove);
}});

server.route({method: 'POST', path: '/move', config : {payload: {parse: true}}, handler: function (request, reply) {
	var theirmove = request.payload.lastOpponentMove;
	// var log = gameNo + "," + Date.now() + "," + "theirmove" + "," +  request.payload.lastOpponentMove  + "\n";
	// fs.appendFileSync('hackday.csv', log);

	logResult(theirmove);

	gameNo++;
	reply();
}});

function getResult(theirmove, ourmove) {
	if(theirmove === ourmove)
		return "DRAW";

	return "?";
}

function logResult(theirmove){
	lastResult = getResult(theirmove, ourmove);

	game.rounds.push({no: gameNo, ourmove: ourmove, theirmove: theirmove, result: lastResult})
}

