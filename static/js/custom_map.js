var map;

// Create a new blank array for all the listing markers.
var markers = [];



function initMap() {

  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.75, lng: 204.5},
    zoom: 10,
    mapTypeControl: false
  });

  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.


  var largeInfowindow = new google.maps.InfoWindow();

  // Style the markers a bit. This will be our listing marker icon.
  var defaultIcon = makeMarkerIcon('0091ff');

  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  var highlightedIcon = makeMarkerIcon('FFFF24');

  var largeInfowindow = new google.maps.InfoWindow();
  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });

    showListings();
  }
//
//  document.getElementById('reveal-filter').addEventListener('click', filterToggle);
  document.getElementById('show-listings').addEventListener('click', showListings);
  document.getElementById('hide-listings').addEventListener('click', hideListings);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}

// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideListings() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;

};











var locations = [
    {title: "Teshima's Restaurant",
     location: {lat: 19.5418234, lng: -155.9284432},
     address: "79-7251 Hawaii Belt Rd, Kealakekua, HI 96750",
     filterState: true},
    {title: "Roy's Waikoiloa Bar & Grill",
     location: {lat: 19.9165196, lng: -155.8822263},
     address: "69-250 Waikoloa Beach Dr, Waikoloa Village, HI 96738",
     filterState: true},
    {title: "Merriman's",
     location: {lat: 20.0230144, lng: -155.67659830000002,
     address:"65-1227 Opelo Road Kamuela B, Waimea, HI 96743"},
     filterState: true},
    {title: "Ocean Sushi",
     location: {lat: 19.7240111, lng: -155.08658230000003,
     address:"235 Keawe St, Hilo, HI 96720, USA"},
     filterState: true},
    {title: "Ka Lae Garden Thai Food",
     location: {lat: 19.077417, lng: -155.757177},
     address:"92-8395 Mamalahoa Hwy, Ocean View, HI 96704",
     filterState: true}
];


var Restaurant = function(data) {
    this.title = ko.observable(data.title);
    this.displayTitle = ko.observable(data.displayTitle);
    this.location = ko.observable(data.location);
    this.address = ko.observable(data.address);
    this.id = ko.observable(data.id);
    this.filterState = ko.observable(data.filterState);
};



function buildModel(restaurantRawData){
    var restaurants=[];
    var idCnt = 0;
    $.each( restaurantRawData, function(key, val) {
        var currRestaurantData = {
            title: val.title,
            displayTitle: val.title,
            location: val.location,
            address: val.address,
            id: idCnt,
            filterState: val.filterState
        }
        restaurants.push(new Restaurant(currRestaurantData));
        idCnt += 1;
    });

    return restaurants
};

var initialRestaurants = buildModel(locations);



var filterStatus = false;

function filterToggle(entity){
    if (entity){
        entity = false
    } else {
        entity = true
    }
    console.log(entity)
return entity
}


var ViewModel = function() {
    var self = this;

    self.markerList = ko.observableArray(initialRestaurants);
    console.log(initialRestaurants)

    this.toggle = function(location){
        console.log(location.title())
        if(filterStatus == true){
            location.filterState(filterToggle(location.filterState()))
            self.displayFilter(location)
        };

        //    var marker = markers[location.id]
        //    if (marker.map == null){
        //        marker.setMap(map)
        //        //location.title = "Bob"
        //        console.log(self.markerList)
        //    } else {
        //        marker.setMap(null)
        //    }

      }


    self.displayFilter = function(item) {
        if(item.filterState()){
            item.displayTitle(item.title() +  '  ✅')
        } else{
            item.displayTitle(item.title() +  '  ❌')
        };
        //console.log(item)

    }


    self.update = function () {
        filterStatus = filterToggle(filterStatus)
        if(filterStatus){
            ko.utils.arrayForEach(self.markerList(), function(item){
            console.log('hey', item.filterState(), item.title())
            console.log(item)
            self.displayFilter(item)
            })
        } else {
            ko.utils.arrayForEach(self.markerList(), function(item){
            if( item.filterState() == false){
                item.displayTitle(null)
                markers[item.id()].setMap(null)
            } else{
                item.displayTitle(item.title())
                 markers[item.id()].setMap(map)
                }
            })
         };

    }


};

ko.applyBindings(new ViewModel());
















//var ViewModel = function() {
//  var self = this;
//
//  this.markerList = ko.observableArray(locations);
//
//  this.toggle = function(location){
//
//    var marker = markers[location.id]
//    if (marker.map == null){
//        marker.setMap(map)
//        //location.title = "Bob"
//        console.log(self.markerList)
//    } else {
//        marker.setMap(null)
//    }
//  }
//};
//
//ko.applyBindings(new ViewModel());
