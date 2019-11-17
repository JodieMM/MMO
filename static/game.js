var socket = io();


// ----- GAMEPLAY -----



// --- Prepatory

// Prep Canvas
var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');

// Character Variables
var click = {
  x: null,
  y: null
}

// Create New Player
socket.emit('new player');



// --- Repeating Game Functions

// Tell Server Movement
setInterval(function() 
{
	socket.emit('movement', click);
}, 1000 / 60);

// Display State Sent From Server
socket.on('state', function(players) 
{
	context.clearRect(0, 0, 800, 600);

	for (var id in players) 
	{
		var player = players[id];
		context.fillStyle = player.color;
		context.beginPath();
		context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
		context.fill();
	}
});



// --- Game Interactions

// Set Click Coords
document.addEventListener('click', function(event) {
  const rect = canvas.getBoundingClientRect();
  click.x = event.clientX - rect.left;
  click.y = event.clientY - rect.top;
});



// --- Surrounding Interactions

// Exit Game on Button Press
document.getElementById("exitbtn").addEventListener("click", function()
{
  socket.emit('exit player');
});

// Create Player on Button Press
document.getElementById("newbtn").addEventListener("click", function()
{
  socket.emit('new player');
});