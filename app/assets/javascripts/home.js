$(document).ready(function() {
	var map = mapbox.map('map');
	map.addLayer(mapbox.layer().id('boxelder.map-2ueq8cki'));
	var instagramLayer = mapbox.markers.layer();

	map.addLayer(instagramLayer);

	var access_token = '11745006.ac42a06.33597d110ea4421a94ee06221c7f3ede';

	function initPoints() {
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: "https://api.instagram.com/v1/media/search?lat=45.524042&lng=-122.675545&access_token=" + access_token,
			success: function(localData) {
				console.log(localData);
				$.each(localData.data, function(i) {
					var newfeature = {
						geometry: {
							coordinates: [localData.data[i].location.longitude, localData.data[i].location.latitude]
						},
						properties: {
							imageID: localData.data[i].images.thumbnail.url
						}
					};
					instagramLayer.add_feature(newfeature);					
					map.centerzoom(instagramLayer.extent()[0], 15);
				})
			}
		});
	}
	
	
	initPoints();
	
	var interaction = mapbox.markers.interaction(instagramLayer);
    // Set a custom formatter for tooltips
    // Provide a function that returns html to be used in tooltip
    interaction.formatter(function(feature) {
        var o = '<img src="' + feature.properties.imageID + '">';
        return o;
    });
});
