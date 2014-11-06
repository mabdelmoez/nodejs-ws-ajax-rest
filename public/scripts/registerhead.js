$(document).ready(function () {
	$('#submit').click(function(event){
		event.preventDefault();
		if ($('#username').val() != "") {
		    
		    var dataObj = {
			username:$('#username').val()
			};
			 
			$.ajax({
			   url: 'http://127.0.0.1:5000/api/register',  
			   async: true,
			   type: 'POST',
			   dataType: 'json',
			   data:dataObj
			   })
			    .done(function(response) {
				$(location).attr('href',"http://127.0.0.1:5000/app");
				})
				.fail(function() {
				console.log( "error" );
				})
				.always(function() {
				console.log( "complete" );
	        });
		}
		
	});
	
});