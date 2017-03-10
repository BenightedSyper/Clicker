var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer( {port:1337} );
var mysql = require('mysql');

console.log("the server has started");

SOCKETID = 0;
SOCKETS = [];
CurrentConnections = 0;

/*
var connection = mysql.createConnection({
  host     : 'localhost:3306',
  user     : 'root',
  pass : 'password',
  database : 'clickertest'
});

connection.connect();

connection.query('SELECT * FROM users', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
*/

wss.on("connection", function(_sock) {
	_sock.id = SOCKETID++;
	CurrentConnections++;
	SOCKETS[_sock.id] = _sock;
	_sock.send("Connected to Server. ID : " + _sock.id);
	
	ServerBroadcast("current connections: " + CurrentConnections);
	
	_sock.on('message', function (_data) {
		var data = JSON.parse(_data);
		//console.log(data);
		switch(data.message){
			case "Login":
				console.log('User %s is logging in with password %s', data.data.user, data.data.pass);
		}
		console.log('received: %s', _data);
	});
	
	_sock.on('close', function (_data) {
		CurrentConnections--;
		console.log('Client %s has Disconnected.', _sock.id);
	});
});

function ServerBroadcast(_message){
	wss.clients.forEach(function(_client){
		_client.send(_message);
	});
};