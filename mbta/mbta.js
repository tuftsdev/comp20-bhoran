

function initMap() {


	var myOptions = {
	center: {lat: 42.352271, lng: -71.05524200000001},
	zoom: 13,
	mapTypeId: google.maps.MapTypeId.ROADMAP
	}	

	var map = new google.maps.Map(document.getElementById('map'), myOptions);

	var myLat = 0;
	var myLng = 0;
	var me = new google.maps.LatLng(myLat, myLng)
}