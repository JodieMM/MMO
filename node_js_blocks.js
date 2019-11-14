//			NODE JS CODE BLOCKS



// -- Error Testing/ Public Message Display

// Send message to console/terminal
console.log('Starting server on port 5000');

// Send message to browser console
io.sockets.emit('message', 'hi!');



// -- Structures

// Repeating action
setInterval(function() 
{
	// What should be done on loop goes here
}, 1000);	// Time between runs

// On message receive
socket.on('sent-message', function()
{
	// What should be done goes here
});



// -- Helpful Variable Types

var colors = ['pink', 'green', 'red', 'blue'];	// Array
var players = {};								// Object

// Object definition
players[socket.id] = {
	x: 300,
	y: 300,
	color: colors[Object.keys(players).length % colors.length]
};



// --- CODE SEGMENTS ---

// WASD Movement
// (Server)
socket.on('movement', function(data) {
		var player = players[socket.id] || {};
		
		if (data.left) {
			player.x -= 5;
		}
		if (data.up) {
			player.y -= 5;
		}
		if (data.right) {
			player.x += 5;
		}
		if (data.down) {
			player.y += 5;
		}
	});

//(Client)
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








