var stockholm;
var parliament;
var map;
var points = [];
var infoWindow;

function initialize() {
	stockholm = new google.maps.LatLng(59.32522, 18.07002);
	parliament = new google.maps.LatLng(59.327383, 18.06747);

	var mapOptions = {
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: stockholm
	};

	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	infoWindow = new google.maps.InfoWindow;
	google.maps.event.addListener(map, 'click', function() {
		infoWindow.close();
	});

	addMarker();
}

function onMarkerClick() 
{
	var marker = this;
	var latLng = marker.getPosition();

	infoWindow.setContent('<h3>Marker position is:</h3>' + latLng.lat() + ', ' + latLng.lng());

	infoWindow.open(map, marker);
};


function addMarker()
{
	// var image = 'beachflag.png';
	var marker = new google.maps.Marker({
		map:map,
		// draggable:true,
		// animation: google.maps.Animation.DROP,
		// icon: image,
		position: parliament
	});	
	
	google.maps.event.addListener(marker, 'click', onMarkerClick);
}

$(document).ready(function() {
	initialize();
	
});

$(window).resize(function () {
    var h = $(window).height(),
        offsetTop = 60; // Calculate the top offset

    $('#map-canvas').css('height', (h - offsetTop));
}).resize();