'use strict';

$(function(){
  $('.btn').click();
});
var searchedCity;
var city;
var lat;
var long;
var initialLocation;

navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  getCurrentCity();
}, function() {
  console.log('fail');
});

function getCurrentCity() {
  $.ajax({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyBuUxK6G7_cGQmw1Y1FUUHGak4_C2bX15I',
    success: function (data) {
      initialLocation = data.results[0].address_components[3].long_name;
      currentWeather();
      forecast();
      console.log(initialLocation);
    },
    error: function functionName() {
      console.error('shit didnt go through');
    }
  });
}


var currentWeather = function () {
  $.ajax({
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + initialLocation + '&units=imperial&appid=8b7d40ff29a3bc2cfbc6dc4a39ab4577',
    success: function (data) {
      console.log(data);
    },
    error: function functionName() {
      console.error('shit didnt go through');
    }
  });

//https://maps.googleapis.com/maps/api/geocode/json?latlng=37.495385299999995,-121.91769&key=AIzaSyBuUxK6G7_cGQmw1Y1FUUHGak4_C2bX15I
//https://maps.googleapis.com/maps/api/geocode/json?latlng=undefined,undefined&key=AIzaSyBuUxK6G7_cGQmw1Y1FUUHGak4_C2bX15I


};

var forecast = function() {
  $.ajax({
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + initialLocation + '&units=imperial&appid=8b7d40ff29a3bc2cfbc6dc4a39ab4577',
    success: function (data) {
      console.log(data);
    },
    error: function functionName() {
      console.error('shit didnt go through');
    }
  });
}
