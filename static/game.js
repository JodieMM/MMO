var socket = io();


// ----- GAMEPLAY -----



// --- Prepatory

// Constant Variables
const canvasWidth = 880;
const canvasHeight = 600;
const menuBarHeight = 50;
const repeatInterval = 1000 / 60;


// Prep Canvases
var canvas = $('#canvas')[0];
var menuBar = $('#layer6')[0];
var topLayer = $('#layer7')[0];

canvas.width = menuBar.width = top.width = canvasWidth;
canvas.height = menuBar.height = top.height = canvasHeight;

var context = canvas.getContext('2d');
var menuBarContext = menuBar.getContext('2d');

// Character Variables
var click = {
  x: 0,
  y: 0
}

var scene = "";

var coins = 0;



// --- Repeating Game Functions

// Tell Server Movement
setInterval(function() 
{
	socket.emit('movement', click);
}, repeatInterval);

// Display State Sent From Server
socket.on('state', function(players) 
{
	context.clearRect(0, 0, canvasWidth, canvasHeight);

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
socket.on('scene', function(sceneName, boolScene, playerX, playerY)
{
	scene = sceneName;
	clearLayers();
	
	if (boolScene)
	{
		click.x = playerX;
		click.y = playerY;
		drawMenuBar();
		
		if (sceneName == 'centre')
		{	
			$("#layer1").css("background-image", "linear-gradient(#33d6ff, #80e5ff)");			
		}
	}
	else
	{
		// Create load screen
	}
});



// --- Game Interactions

// Set Click Coords
topLayer.addEventListener('click', function(event) 
{
	if (scene != "load")
	{
		const rect = canvas.getBoundingClientRect();
		var xClick = event.clientX - rect.left;
		var yClick = event.clientY - rect.top;
	  
		if (yClick < (canvasHeight - menuBarHeight))		// Click Screen
		{
			click.x = xClick;
			click.y = yClick;
		}
		else												// Click Menu Bar
		{

		}  
	}
});


// Change Cursor on Hover
topLayer.addEventListener('mousemove', function(event)
{
	if (scene != "load")
	{
		const rect = canvas.getBoundingClientRect();
		var xClick = event.clientX - rect.left;
		var yClick = event.clientY - rect.top;
		
		if (yClick < (canvasHeight - menuBarHeight))		// Hover Screen
		{
			topLayer.style.cursor = 'default';
		}
		else												// Hover Menu Bar
		{
			topLayer.style.cursor = 'text';
		}  
	}
});
	
	



// --- Surrounding Interactions

// Exit Game on Button Press
$('#exitbtn')[0].addEventListener('click', function()
{
  socket.emit('exit player');
});

// Create Player on Button Press
$('#newbtn')[0].addEventListener('click', function()
{
  socket.emit('new player');
});



// --- General Functions

// Clear Layers
function clearLayers()
{
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	menuBarContext.clearRect(0, 0, canvasWidth, canvasHeight);
}

// Draw the Menu Bar
function drawMenuBar()
{
	// Draw Box
	var grd = menuBarContext.createLinearGradient(0, canvasHeight - menuBarHeight, 0, canvasHeight - 10);
	grd.addColorStop(0, 'lightgrey');
	grd.addColorStop(1, 'white');
	menuBarContext.fillStyle = grd;
	menuBarContext.fillRect(0, canvasHeight - menuBarHeight, canvasWidth, menuBarHeight - 1);
	// Draw Grey Line At Top
	menuBarContext.fillStyle = '#b3b3b3';
	menuBarContext.fillRect(0, canvasHeight - menuBarHeight - 1, canvasWidth, 1);
	// Draw Coins
	menuBarContext.font = "20px Alata";
	menuBarContext.fillStyle = 'black';
	menuBarContext.fillText(coins + "¢", 40, canvasHeight - menuBarHeight + 33);
}



