var socket = io();


// ----- GAMEPLAY -----



// --- Prepatory

// Prep Canvases
var canvas = $('#canvas')[0];
var menuBar = $('#layer6')[0];
var topLayer = $('#layer7')[0];

canvas.width = menuBar.width = top.width = 880;
canvas.height = menuBar.height = top.height = 600;

var context = canvas.getContext('2d');
var menuBarContext = menuBar.getContext('2d');

// Character Variables
var click = {
  x: null,
  y: null
}

var scene = null;



// --- Repeating Game Functions

// Tell Server Movement
setInterval(function() 
{
	socket.emit('movement', click);
}, 1000 / 60);

// Display State Sent From Server
socket.on('state', function(players) 
{
	context.clearRect(0, 0, 880, 600);

	for (var id in players) 
	{
		var player = players[id];
		context.fillStyle = player.color;
		context.beginPath();
		context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
		context.fill();
	}
});

// Change Scene
socket.on('scene', function(sceneName)
{
	scene = sceneName;
	clearLayers();
	if (sceneName == 'centre')
	{
		$("#layer1").css("background-image", "linear-gradient(#33d6ff, #80e5ff)");
		drawMenuBar();
	}
});



// --- Game Interactions

// Set Click Coords
topLayer.addEventListener('click', function(event) {
  const rect = canvas.getBoundingClientRect();
  var xClick = event.clientX - rect.left;
  var yClick = event.clientY - rect.top;
  
  if (yClick < 548)		// Click Screen
  {
	  click.x = xClick;
	  click.y = yClick;
  }
  else					// Click Menu Bar
  {
	  
  }  
});



// --- Surrounding Interactions

// Exit Game on Button Press
$("#exitbtn")[0].addEventListener("click", function()
{
  socket.emit('exit player');
});

// Create Player on Button Press
$("#newbtn")[0].addEventListener("click", function()
{
  socket.emit('new player');
});



// --- General Functions

// Clear Layers
function clearLayers()
{
	context.clearRect(0, 0, 880, 600);
	menuBarContext.clearRect(0, 0, 880, 600);
}

// Draw the Menu Bar
function drawMenuBar()
{
	var grd = menuBarContext.createLinearGradient(0, 550, 0, 590);
	grd.addColorStop(0, "lightgrey");
	grd.addColorStop(1, "white");
	menuBarContext.fillStyle = grd;
	menuBarContext.fillRect(0, 550, 880, 50);
	menuBarContext.fillStyle = '#b3b3b3';
	menuBarContext.fillRect(0, 549, 880, 1);
	
	
	// menuBarContext.fillStyle = 'green';
	// menuBarContext.beginPath();
	// menuBarContext.rect(0, 550, 880, 600);
	// menuBarContext.fill();
}



