var content = null;// = document.getElementById('content');
var socket = null;// = new WebSocket('ws://localhost:1337');

$(document).on('click', '#LogInToggle', function(){
	//console.log("LogInToggle clicked");
	$("div[id=LogInDiv]").toggle();
	$("div[id=SignUpDiv]").toggle();
});
$(document).on('click', '#SignUpToggle', function(){
	//console.log("LogInToggle clicked");
	$("div[id=LogInDiv]").toggle();
	$("div[id=SignUpDiv]").toggle();
});
$(document).on('click', '#LogInSubmit', function(){
	var un = $('input[name=usernameLogIn]')[0].value;
	var pw = $('input[name=passwordLogIn]')[0].value;
	if(un != "" && pw != ""){
		var packet = { message:"LogIn", data:{user:un, pass:pw} };
		socket.send( JSON.stringify(packet) );
	}else{
		if(un == ""){
			alert("Input a User Name.");
		}else{
			alert("Input a Password.");
			}
		}
});
$(document).on('click', '#SignUpSubmit', function(){
	var un = $('input[name=usernameSignUp]')[0].value;
	var em = $('input[name=emailSignUp]')[0].value;
	var pw = $('input[name=passwordSignUp]')[0].value;
	var pwc = $('input[name=passwordConfirmSignUp]')[0].value;
	if(un != "" && em != ""){
		if(pw != pwc){
			alert("Passwords do not match.");
		}else{
			var packet = { message:"SignUp", data:{user:un, pass:md5(pw), email: em} };
			socket.send( JSON.stringify(packet) );
		}
	}else{
		if(un == ""){
			alert("Input a User Name.");
		}else{
			alert("Input a Email.");
			}
		}
});
$(document).ready(function(){
	console.log("document is ready!");
	$("div[id=SignUpDiv]").toggle();
	content = document.getElementById('content');
	socket = new WebSocket('ws://localhost:1337');
	
	socket.onopen = function () {
		var message = 'hello from the client';
		socket.send(JSON.stringify(message));
	};
	socket.onmessage = function (message) {
		content.innerHTML += message.data +'<br />';
	};
	socket.onerror = function (error) {
		console.log('WebSocket error: ' + error);
	};
	socket.onclose = function (){
		content.innerHTML += "DISCONNECTED" +'<br />';
	};
});

function SignUpSubmit(){
	var un = $('input[name=username]')[0].value;
	var em = $('input[name=email]')[0].value;
	var pw = $('input[name=password]')[0].value;
	var pwc = $('input[name=passwordConfirm]')[0].value;
	if(un != "" && pw != ""){
		var packet = { message:"Login", data:{user:un, pass:pw} };
		socket.send( JSON.stringify(packet) );
	}else{
		if(un == ""){
			alert("Input a User Name.");
		}else{
			alert("Input a Password.");
		}
	}
};
function LogInSubmit(){
	var un = $('input[name=username]')[0].value;
	var pw = $('input[name=password]')[0].value;
	if(un != "" && pw != ""){
		var packet = { message:"Login", data:{user:un, pass:pw} };
		socket.send( JSON.stringify(packet) );
	}else{
		if(un == ""){
			alert("Input a User Name.");
		}else{
			alert("Input a Password.");
		}
	}
};
function test(){
	var un = $('input[name=username]')[0].value;
	var pw = $('input[name=password]')[0].value;
	if(un != "" && pw != ""){
		var packet = { message:"Login", data:{user:un, pass:pw} };
		socket.send( JSON.stringify(packet) );
	}else{
		if(un == ""){
			alert("Input a User Name.");
		}else{
			alert("Input a Password.");
		}
	}
};