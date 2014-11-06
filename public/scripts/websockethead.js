$(document).ready(function () {
    
	var websocket = new WebSocket('ws://127.0.0.1:5000/appws');
    
	$('#submit').click(function(event) {
	event.preventDefault();
		if ($('#message').val()!= "") {
		   websocket.send(JSON.stringify({message: $('#message').val()}));
		}
	});

	websocket.onmessage = function (evt) 
	{ 
	   $('#responseMsg').append(evt.data + "\n");
	};
	
	websocket.onconnection = function (evt) 
	{ 
	   $('#lblusername').html(evt);
	};
});