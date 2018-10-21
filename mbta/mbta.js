var map;

function initMap() {

var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng)

	var myOptions = {
		//South Station center
		center: {lat: 42.352271, lng: -71.05524200000001},
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}	

	map = new google.maps.Map(document.getElementById('map'), myOptions);
	setTstops(map);
}

function setTstops(map){

	var tStops = [
		['South Station', 42.352271, -71.05524200000001, 1],
		['Andrew', 42.330154, -71.057655, 2],
		['Porter Square', 42.3884, -71.11914899999999, 3],
		['Harvard Square', 42.373362, -71.118956,4],
		['JFK/UMass', 42.320685, -71.052391,5],
		['Savin Hill', 42.31129, -71.053331,6],
		['Park Street', 42.35639457, -71.0624242,7],
		['Broadway', 42.342622, -71.056967,8],
		['North Quincy', 42.275275, -71.029583,9],
		['Shawmut', 42.29312583, -71.06573796000001,10],
		['Davis', 42.39674, -71.121815,11],
		['Alewife', 42.395428,-71.142483,12],
		['Kendall/MIT',42.36249079,-71.08617653,13],
		['Charles/MGH', 42.361166, -71.070628,14],
		['Downtown Crossing', 42.355518, -71.060225,15],
		['Quincy Center', 42.251809,-71.005409,16],
		['Quincy Adams', 42.233391, -71.007153,17],
		['Ashmont', 42.284652, -71.06448899999999,18],
		['Wollaston', 42.2665139, -71.0203369,19],
		['Fields Corner', 42.300093, -71.061667,20],
		['Central Square', 42.365486, -71.103802,21],
		['Braintree', 42.2078543, -71.0011385,22],
		]


// place-sstat
// | place-andrw
// | place-portr
// | place-harsq
// | place-jfk
// | place-shmnl
// | place-pktrm
// | place-brdwy
// | place-nqncy
// | place-smmnl
// | place-davis
// | place-alfcl
// | place-knncl
// | place-chmnl
// | place-dwnxg
// | place-qnctr
// | place-qamnl
// | place-asmnl
// | place-wlsta
// | place-fldcr
// | place-cntsq
// | place-brntn


	var image = {
		// This marker is 50 pixels wide by 50 pixels high.
		url:'icons8-manatee-50.png',

		size: new google.maps.Size(50, 50),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image
		anchor: new google.maps.Point(25, 25)
		};
		// Shapes define the clickable region of the icon. The type defines an HTML
		// <area> element 'poly' which traces out a polygon as a series of X,Y points.
		// The final coordinate closes the poly by connecting to the first coordinate.
		var shape = {
		coords: [1, 1, 1, 20, 18, 20, 18, 1],
		type: 'poly'
		};

	for (var i = 0; i < tStops.length; i++) {
		var t = tStops[i];
		var marker = new google.maps.Marker({
		position: {lat: t[1], lng: t[2]},
		map: map,
		icon: image,
		shape: shape,
		title: t[0],
		zIndex: t[3],
		});
	}

	redLine();

}

function redLine(){

	var redLinePath = [
		{lat: 42.395428,lng:-71.142483},
		{lat: 42.39674, lng:-71.121815},
		{lat: 42.3884, lng:-71.11914899999999},
		{lat: 42.373362, lng:-71.118956},
		{lat: 42.365486, lng:-71.103802},
		{lat: 42.36249079,lng:-71.08617653},
		{lat: 42.361166, lng:-71.070628},
		{lat: 42.35639457, lng:-71.0624242},		
		{lat: 42.355518, lng:-71.060225},
		{lat: 42.352271, lng:-71.05524200000001},
		{lat: 42.342622, lng:-71.056967},
		{lat: 42.330154, lng:-71.057655},
		{lat: 42.320685, lng:-71.052391},
		{lat: 42.275275, lng:-71.029583},
		{lat: 42.2665139, lng:-71.0203369},		
		{lat: 42.251809,lng:-71.005409},
		{lat: 42.233391, lng:-71.007153},
		{lat: 42.2078543, lng:-71.0011385}
	]

	var ashmontBranch = [
		{lat: 42.320685, lng:-71.052391},
		{lat: 42.31129, lng:-71.053331},
		{lat: 42.300093, lng:-71.061667},
		{lat: 42.29312583, lng:-71.06573796000001},	
		{lat: 42.284652, lng:-71.06448899999999},
		]

	poly = new google.maps.Polyline({
		path:redLinePath,
		geodesic:true,
		strokeColor: '#e20b0b',
		strokeOpacity: 1.0,
		strokeWeight: 6
	});

	ash = new google.maps.Polyline({
		path:ashmontBranch,
		geodesic:true,
		strokeColor: '#e20b0b',
		strokeOpacity: 1.0,
		strokeWeight: 6
	});

	poly.setMap(map);
	ash.setMap(map);

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