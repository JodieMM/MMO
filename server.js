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


var colors = ['pink', 'green', 'red', 'blue'];
var players = {};

io.on('connection', function(socket) 
{
	socket.on('new player', function() 
	{
		players[socket.id] = 
		{
			x: 300,
			y: 300,
			color: colors[Object.keys(players).length % colors.length]
		};
	});
	
	socket.on('exit player', function()
	{
		delete players[socket.id];
	});
  
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

setInterval(function() 
{
	io.sockets.emit('state', players);
}, 1000 / 60);








