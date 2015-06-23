var http = require('http')

var replies = ['WATERBOMB','ROCK','PAPER','SCISSORS','DYNAMITE'];

var dynamiteCount = 0;
var opponentName =""
var pointsToWin =0
var maxRounds =0
var min=1;
var max=3;
var no = 2;

var gameNo = 1;
var ourmove = "";no++;
	if(no > max)
		no = 1;
var nextmove = "SCISSORS"
var lastResult = "?"

var tournament = {
	games: []
}
var game = {
	rounds: []
};
var server = http.createServer(function (req, res) {
	var path = req.url;
	if(path === "/start") {
		console.log("start");
		res.end();
	} else if (path === "/move") {
		if(req.method === "GET"){

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

			res.end(ourmove)
		}else{
			res.end();
		}
	}

	console.log(path)
}).listen(3002);