$.getScript("https://raw.githubusercontent.com/mabdelmoez/nodejs-ws-ajax-rest/master/public/scripts/helper.js", function(){
	console.log("Helper script loaded");
});

$(document).ready(function () {
	var websocket = new WebSocket('ws://127.0.0.1:5000/appws');
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