var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer( {port:1337} );
var mysql = require('mysql');

console.log("the server has started");

SOCKETID = 0;
SOCKETS = [];
CurrentConnections = 0;


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'clickertest'
});

connection.connect();

/*
connection.query('SELECT * FROM users', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
*/
//connection.end();


wss.on("connection", function(_sock) {
	_sock.id = SOCKETID++;
	CurrentConnections++;
	SOCKETS[_sock.id] = _sock;
	_sock.send("Connected to Server. ID : " + _sock.id);
	
	ServerBroadcast("current connections: " + CurrentConnections);
	
	_sock.on('message', function (_pack) {
		var pack = JSON.parse(_pack);
		//console.log(pack);
		switch(pack.message){
			case "Login":
				console.log('User %s is logging in with password %s', pack.data.user, pack.data.pass);
				var res = logInUser(pack.data.user, pack.data.pass);
				break;
			case "SignUp":
				console.log('New User with username %s and email %s with a hash %s', pack.data.user, pack.data.email, pack.data.pass);
				var res = signUpUser(pack.data.user, pack.data.email, pack.data.pass);
				_sock.send(JSON.strigify(res));
				break;
			default:
				console.log('received: %s', _pack);
				break;
		}
	});
	
	_sock.on('close', function (_data) {
		CurrentConnections--;
		console.log('Client %s has Disconnected.', _sock.id);
	});
});
function logInUser(_un, _pw){
	connection.query('SELECT * FROM users WHERE username = ',[_un], function (error, results, fields) {
		if (error) throw error;
		console.log(results[0]);
		if(results[0].password == _pw){
			return { message:"connection", answer:true, reason:correct };
		}
	});
	return { message:"connection", answer:false, reason:unknown };
};
function signUpUser(_un, _em, _pw){
	connection.query('INSERT INTO users SET ?',{username:_un, emailaddress:_em, password:_pw}, function (error, results, fields) {
		console.log(error + " " + results + " " + fields);
		if(error != undefined){
			return { message:"connection", answer:false, reason:error };
		}
	});
	//connection.end();
	return { message:"connection", answer:false, reason:"unknown" };
};
function ServerBroadcast(_message){
	wss.clients.forEach(function(_client){
		_client.send(_message);
	});
};