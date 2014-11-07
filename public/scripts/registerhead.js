
$(document).ready(function () {
	$('#form').submit(function(event){event.preventDefault();});
});

submitRegisterationForm = function(){
		if (Helper.isValidUsername($('#username').val())) {
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
	//return false;
}