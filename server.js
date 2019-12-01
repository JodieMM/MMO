// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');var app = express();
var server = http.Server(app);
var io = socketIO(server);app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
  
  
});// Starts the server.
server.listen(5000, function() 
{
  console.log('Starting server on port 5000');
});


// --- Prep Variables

// Static
var colors = ['pink', 'green', 'red', 'blue'];
var scenes = ['centre'];

// Variable
var players = {};
var sceneCentre = [];



// --- Socket Interaction
io.on('connection', function(socket) 
{
	// Create New Player
	socket.on('new player', function() 
	{
		players[socket.id] = 
		{
			scene: scenes[0],
			x: 300,
			y: 300,
			color: colors[Object.keys(players).length % colors.length]
		};
		sceneCentre.push(socket);
		socket.emit('scene', 'centre', true, players[socket.id].x, players[socket.id].y);
	});
	
	// Player Logs Off
	socket.on('exit player', function()
	{
		delete players[socket.id];
	});
  
	// Player Moves
	socket.on('movement', function(data) 
	{
		var player = players[socket.id] || {};
		
		if (data.x != player.x) 
		{
			var difference = Math.abs(data.x - player.x);
			var increment = difference < 5 ? difference : 5;
			increment *= (data.x > player.x) ? 1 : -1;
			player.x += increment;
		}
		if (data.y != player.y) 
		{
			var difference = Math.abs(data.y - player.y);
			var increment = difference < 5 ? difference : 5;
			increment *= (data.y > player.y) ? 1 : -1;
			player.y += increment;
		}
	});
});



// --- Recurring Functions

// Transmit Positions
setInterval(function() 
{
	io.sockets.emit('state', players);
}, 1000 / 60);








