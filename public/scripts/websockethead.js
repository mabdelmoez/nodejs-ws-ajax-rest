
var websocket = new WebSocket('ws://127.0.0.1:5000/appws');

$(document).ready(function () {
	$('#form').submit(function(event){event.preventDefault();});
	
	websocket.onmessage = function (evt) 
	{ 
	   $('#responseMsg').append(evt.data + "\n");
	};
	
	websocket.onconnection = function (evt) 
	{ 
	   $('#lblusername').html(evt);
	};
});

submitMessageForm = function(){
		if (Helper.isValidMessage($('#message').val())) {
		   websocket.send(JSON.stringify({message: $('#message').val()}));
		}
}