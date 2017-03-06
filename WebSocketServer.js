var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer( {port:1337} );

console.log("the server has started");

SOCKETID = 0;
SOCKETS = [];
CurrentConnections = 0;

wss.on("connection", function(_sock) {
	_sock.id = SOCKETID++;
	CurrentConnections++;
	SOCKETS[_sock.id] = _sock;
	_sock.send("Connected to Server. ID : " + _sock.id);
	
	wss.clients.forEach(function(_client){
		_client.send("current connections: " + CurrentConnections);
	});
	
	_sock.on('message', function (_data) {
		console.log('received: %s', _data);
	});
	
	_sock.on('close', function (_data) {
		CurrentConnections--;
		console.log('disconnected: %s', _sock.id);
	});
});