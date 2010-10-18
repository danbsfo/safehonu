$(document).ready(function() {
	var debug = true;
	var current_position = null;
	$('div#map').hide();
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {  
			$('img#busy').hide();
			current_position = position.coords.latitude + ',' + position.coords.longitude;
			var src = 'http://maps.google.com/maps/api/staticmap?markers=size:mid|color:purple|label:!|'+current_position+'&size=350x300&sensor=false';
			$('img#map').attr('src', src).load(function() {
				$('div#map').show();
			});
		}); 
	} 
	$('input#checkin').click(function(event) {
		var checkin = {
    	username : $('input#username').val(),
    	password : $('input#password').val(),
    	coords : current_position
		}
		if (debug) alert(JSON.stringify(checkin));
		$.ajax({
			username: checkin.username,
			password: checkin.password,
			data: checkin.coords,
			url: "http://api.safehonu.com/checkin", //TODO: HTTPS
			type: "POST",
			contentType: "application/json",
			timeout: 60000,
			dataType: "json",
			success: function(response) {
				// TODO: notification = success
				//if (debug) alert('Success: ' + response);
			},
			error: function(response) {
				// TODO: notification = error
				//if (debug) alert('Error: ' + response);
			}
		});
	});
});
