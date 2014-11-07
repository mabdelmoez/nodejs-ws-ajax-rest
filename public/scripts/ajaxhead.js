
$(document).ready(function () {
	$('#form').submit(function(event){event.preventDefault();});
});

submitMessageForm = function(){
	if (Helper.isValidMessage($('#message').val())) {
		var dataObj = {
		message: $('#message').val()
		};
		 
		$.ajax({
		   url: 'http://127.0.0.1:5000/api/messaging',  
		   async: true,
		   type: 'POST',
		   dataType: 'json',
		   data:dataObj
		   })
		    .done(function(response) {
			console.log( "success" );
			$('#responseMsg').append(JSON.stringify(response)+ "\n");
			})
			.fail(function() {
			console.log( "error" );
			})
			.always(function() {
			console.log( "complete" );
        });
     }   
}