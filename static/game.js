var socket = io();

// Log Messages to Console
socket.on('message', function(data) {
  console.log(data);
});

// Character Variables
var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}


// Set Movement to True when Key Pressed
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});

// Set Movement to False when Key Pressed
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

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

// ----- GAMEPLAY -----

// --- Prepatory

// Prep Canvas
var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');

// Create New Player
socket.emit('new player');


// --- Repeating Game Functions

// Tell Server Movement
setInterval(function() 
{
	socket.emit('movement', movement);
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