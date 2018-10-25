var map;
var globalMarkers = [];

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

		var tStops = /*[
		['place-sstat', 42.352271, -71.05524200000001, 1],
		['place-andrw', 42.330154, -71.057655, 2],
		['place-portr', 42.3884, -71.11914899999999, 3],
		['place-harsq', 42.373362, -71.118956,4],
		['place-jfk', 42.320685, -71.052391,5],
		['place-shmnl', 42.31129, -71.053331,6],
		['place-pktrm', 42.35639457, -71.0624242,7],
		['place-brdwy', 42.342622, -71.056967,8],
		['place-nqncy', 42.275275, -71.029583,9],
		['place-smmnl', 42.29312583, -71.06573796000001,10],
		['place-davis', 42.39674, -71.121815,11],
		['place-alfcl', 42.395428,-71.142483,12],
		['place-knncl',42.36249079,-71.08617653,13],
		['place-chmnl', 42.361166, -71.070628,14],
		['place-dwnxg', 42.355518, -71.060225,15],
		['place-qnctr', 42.251809,-71.005409,16],
		['place-qamnl', 42.233391, -71.007153,17],
		['place-asmnl', 42.284652, -71.06448899999999,18],
		['place-wlsta', 42.2665139, -71.0203369,19],
		['place-fldcr', 42.300093, -71.061667,20],
		['place-cntsq', 42.365486, -71.103802,21],
		['place-brntn', 42.2078543, -71.0011385,22],
	]*/

	[
		['place-sstat', 42.352271, -71.05524200000001, 1, 'South Station'],
		['place-andrw', 42.330154, -71.057655, 2, 'Andrew'],
		['place-portr', 42.3884, -71.11914899999999, 3, 'Porter Square'],
		['place-harsq', 42.373362, -71.118956,4, 'Harvard Square'],
		['place-jfk', 42.320685, -71.052391,5, 'JFK/UMass'],
		['place-shmnl', 42.31129, -71.053331,6, 'Savin Hill'],
		['place-pktrm', 42.35639457, -71.0624242,7, 'Park Street'],
		['place-brdwy', 42.342622, -71.056967,8, 'Broadway'],
		['place-nqncy', 42.275275, -71.029583,9, 'North Quincy'],
		['place-smmnl', 42.29312583, -71.06573796000001,10, 'Shawmut'],
		['place-davis', 42.39674, -71.121815,11, 'Davis'],
		['place-alfcl', 42.395428,-71.142483,12, 'Alewife'],
		['place-knncl',42.36249079,-71.08617653,13, 'Kendall/MIT'],
		['place-chmnl', 42.361166, -71.070628,14, 'Charles/MGH'],
		['place-dwnxg', 42.355518, -71.060225,15, 'Downtown Crossing'],
		['place-qnctr', 42.251809,-71.005409,16, 'Quincy Center'],
		['place-qamnl', 42.233391, -71.007153,17, 'Quincy Adams'],
		['place-asmnl', 42.284652, -71.06448899999999,18, 'Ashmont'],
		['place-wlsta', 42.2665139, -71.0203369,19, 'Wollaston'],
		['place-fldcr', 42.300093, -71.061667,20, 'Fields Corner'],
		['place-cntsq', 42.365486, -71.103802,21, 'Central Square'],
		['place-brntn', 42.2078543, -71.0011385,22, 'Braintree'],
	]

	var image = {
		// This marker is 50 pixels wide by 50 pixels high.
		url:'icons8-manatee-50.png',

		size: new google.maps.Size(50, 50),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image
		anchor: new google.maps.Point(25, 25)
		};

		var marker;

	for (var i = 0; i < tStops.length; i++) {
		var t = tStops[i];
		marker = new google.maps.Marker({
			position: {lat: t[1], lng: t[2]},
			map: map,
			icon: image,
			title: t[0],
			zIndex: t[3],
			customInfo: t[4],
		});

		globalMarkers.push(marker);
		httpRequest(marker);
	}

	redLine();
}

function httpRequest(marker){

	//A global variable `request`
	var request;
	// Step 1: Make an instance of the XMLHttpRequest object to make an HTTP GET request
	request = new XMLHttpRequest();
	// Step 2: Initialize HTTP request
	//Ming's Key Request
	request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + marker.title, true);
	//My Key Request, Not working
	//request.open("GET", "https://api-v3.mbta.com/predictions?filter[route]=Red&filter[stop]=" + marker.title + "&page[limit]=10&page[offset]=0&sort=departure_time&api_key=" + "eeb84a113d4b4617a0af176f33831157", true);

	// Step 3: Set up handler / callback function to deal with HTTP response
	request.onreadystatechange = function() {
	  // Step 5: Get and parse data
	if (request.readyState == 4 && request.status == 200) {
			var theData = request.responseText;
			messages = JSON.parse(theData);

			sched = "Arrival Times " + marker.customInfo + '<br/>';

			console.log(messages);

			for(var i = 0; i < messages.data.length; i++){
				if(messages.data[i].attributes.arrival_time != undefined){
					sched += '<p>';
					sched += messages.data[i].attributes.arrival_time;
					sched += '</p>';
				}
				else if(messages.data.length == 0){
					sched += "Not Available";
				}
				else{
					sched += 'To Be Determined';
				}

				var infowindow = new google.maps.InfoWindow({
					content: sched
				});

				marker.addListener('click', function() {
					infowindow.open(map, marker);
				});
			}
		}
	}
//if null no trains acaiafdsjf
	request.setRequestHeader('Content-Type', 'application/xml');

	// Step 4: Send ("fire off") the request
	request.send();

}


function redLine(){

	//Local, and different from globalMarkers just for 
	//ordering/ashmont branching off
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
	];

	var ashmontBranch = [
		{lat: 42.320685, lng:-71.052391},
		{lat: 42.31129, lng:-71.053331},
		{lat: 42.300093, lng:-71.061667},
		{lat: 42.29312583, lng:-71.06573796000001},	
		{lat: 42.284652, lng:-71.06448899999999},
		];

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
		alert("Geolocation is not supported by your web browser. Yikes bos.");
	}
}

function renderMap() {
	me = new google.maps.LatLng(myLat, myLng);

	// Update map from South Station to geolocation
	map.panTo(me);
	
	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "You are Here! Closest Stop is "
	});
	marker.setMap(map);

	var closest;
	var station;
	var name;

	for(i = 0; i < globalMarkers.length; i++){
		temp = google.maps.geometry.spherical.computeDistanceBetween(me, globalMarkers[i].position);

		if(closest == undefined){
			closest = temp;
			station = globalMarkers[i].position;
			name = globalMarkers[i].customInfo;
		}

		if(temp < closest){
			closest = temp;
			station = globalMarkers[i].position;
			name = globalMarkers[i].customInfo;
		}
	}

	//convert to miles
	closest = closest/1609.344;


	var distance = [me, station];
	closestPoly = new google.maps.Polyline({
		path:distance,
		geodesic:true,
		strokeColor: '#3a042e',
		strokeOpacity: 1.0,
		strokeWeight: 6
	});
	closestPoly.setMap(map);

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		var infowindow = new google.maps.InfoWindow({
			content: marker.title + name + '<br/>'+ "It is " +closest+" miles away"});
		infowindow.open(map, marker);
	});
}


	//set content can take an html body, make a empty var and append a time to it
	// asynch idea, print out list html correctly? no return only opens up infowindow once constructs html
	//click on station, execute request, eventually get data back