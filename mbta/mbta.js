var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng)

var map;

function initMap() {

	var myOptions = {
		//South Station center
		center: {lat: 42.352271, lng: -71.05524200000001},
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}	

	map = new google.maps.Map(document.getElementById('map'), myOptions);
//	setTstops(map);
	getMyLocation();
}

function getMyLocation() {
	//If supported on browser (yes for chrome)
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser. RIP.");
	}
}

function renderMap() {
	me = new google.maps.LatLng(myLat, myLng);

	// Update map from SS to geolocation
	map.panTo(me);
	
	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "You are Here!"
	});
	marker.setMap(map);
		
	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		var infowindow = new google.maps.InfoWindow({
  content: marker.title});
		//infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
}