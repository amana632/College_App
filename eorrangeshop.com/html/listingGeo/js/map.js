/**
 * @fileoverview This demo is used for MarkerClusterer. It will show 100 markers
 * using MarkerClusterer and count the time to show the difference between using
 * MarkerClusterer and without MarkerClusterer.
 * @author Luke Mahe (v2 author: Xiaoxi Wu)
 */
(function($) {
    "use strict";
	
function $(element) {
  return document.getElementById(element);
}
function ratingData(ratingValue) {
    var starData = "";

    switch (ratingValue) {
        case 5:
            starData += '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
            break;
        case 4.5:
            starData += '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i>';
            break;
        case 4:
            starData += '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
            break;
        case 3.5:
            starData += '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i>';
            break;
        case 3:
            starData += '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
            break;
        case 2.5:
            starData += '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-half"></i>';
            break;
        case 2:
            starData += '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
            break;
        case 1.5:
            starData += '<i class="fa fa-star"></i><i class="fa fa-star-half"></i>';
            break;
        case 1:
            starData += '<i class="fa fa-star"></i>';
            break;
        case 0.5:
            starData += '<i class="fa fa-star-half"></i>';
            break;
        default:
            starData += '';
    }

    return starData;
}
var speedTest = {};

speedTest.mapData = null;
speedTest.map = null;
speedTest.markerClusterer = null;
speedTest.markers = [];
speedTest.infoWindow = null;

speedTest.init = function() {
  var latlng = new google.maps.LatLng(43.653187, -79.390699);
  var options = {
    'zoom': 4,
    'center': latlng,
    'mapTypeId': google.maps.MapTypeId.ROADMAP,
	scrollwheel: false
  };
  speedTest.map = new google.maps.Map($('map-canvas'), options);
  speedTest.mapData = listingData.listingMapData;
 // speedTest.infoWindow = new google.maps.InfoWindow();
  speedTest.showMarkers();
};

speedTest.showMarkers = function() {
  speedTest.markers = [];
  var type = 1;
  
  if (speedTest.markerClusterer) {
    speedTest.markerClusterer.clearMarkers();
  }
  var numMarkers = 5;

  for (var i = 0; i <= numMarkers; i++) {
    var titleText = speedTest.mapData[i].listing_title;
    if (titleText === '') {
      titleText = 'No title';
    }
    var item = document.createElement('DIV');
    var title = document.createElement('A');
    title.href = '#';
    title.className = 'title';
    title.innerHTML = titleText;
    item.appendChild(title);
    var latLng = new google.maps.LatLng(speedTest.mapData[i].listing_lat,
        speedTest.mapData[i].listing_lng);
		
    var imageUrl = speedTest.mapData[i].marker_img;
    var markerImage = new google.maps.MarkerImage(imageUrl,
        new google.maps.Size(100, 100));
    var marker = new google.maps.Marker({
      'position': latLng,
      'icon': markerImage
    });
    var fn = speedTest.markerClickFunction(speedTest.mapData[i], latLng);
    google.maps.event.addListener(marker, 'click', fn);
    speedTest.markers.push(marker);
 }
  window.setTimeout(speedTest.time, 0);
};

speedTest.markerClickFunction = function(mapsData, latLng){
  return function(e) {
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
    var listingTitle = mapsData.listing_title;
    var listingURL = mapsData.listing_url;
    var listingImg = mapsData.listing_img_url;
    var listingOpening = mapsData.listing_open_close;
	var listingRating = mapsData.listing_rating;
    var listingRatingCounter = mapsData.listing_rating_count;
    var listingAddress = mapsData.listing_address;

	  
	var infoHtml = '<a class="popular-listing-post map-marker-post" href="' + listingURL + 
	'"><span class="post-thumb"><img src="' + listingImg + 
	'" alt="' + listingTitle + '" class="img-responsive"><span class="listing-info"><h4>' + 
	listingTitle + '</h4></span><span class="rating-area" data-rating="' + 
	listingRating + '">' + ratingData(listingRating) + 
	' <span>(' + listingRatingCounter + ')</span></span><span class="overlay"></span></span><span class="post-details"><span class="location-address"><i class="fa fa-map-marker"></i>' + listingAddress +
	'</span><span class="open_close">' + listingOpening + '</span></span></a>';
	
	
	var myOptions = {
		 content: infoHtml
		,boxStyle: { 
		  //background: "url('tipbox.gif') no-repeat"
		  opacity: 0.75
		  ,width: "200px"
		},
		pixelOffset: new google.maps.Size(-110, -105)
		,alignBottom: true
	};
	var ib = new InfoBox(myOptions);
	ib.open(speedTest.map,this);
	$(".infoBox").fadeOut(300);
  };
};
 var clusterOptions= {
	imagePath: 'images/', minClusterSize: 2, cssClass: 'cluster-marker'
};
speedTest.time = function() {
  speedTest.markerClusterer = new MarkerClusterer(speedTest.map, speedTest.markers,clusterOptions);
};
speedTest.init();
}
)(this.jQuery);