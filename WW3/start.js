// ** Modules **
// Online
var http = require('http');
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();

// Homebrew
var dt = require('./mod1');


http.createServer(function (req, res) {
	fs.readFile('demo.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
	
	// res.writeHead(200, {'Content-Type': 'text/html'});
	// res.write('Hello World! ' + dt.myDateTime());
	// res.end();
	
}).listen(8080);