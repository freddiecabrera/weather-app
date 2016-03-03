'use strict';

$(function(){
  if($('#optionsRadios1').is(':checked')) {
    unitOfMeasureSign = '℉';
    unitOfMeasure = 'imperial';
  } else {
    unitOfMeasureSign = '°C';
    unitOfMeasure = 'metric';
  }



  $('.btn').click(newCity);
  $('.citySearchForm').keypress(function(e) {
    if(e.which === 13){
      if($('#optionsRadios1').is(':checked')) {
        unitOfMeasureSign = '℉';
        unitOfMeasure = 'imperial';
      } else {
        unitOfMeasureSign = '°C';
        unitOfMeasure = 'metric';
      }
      newCity();
    }
  });
});

var
unitOfMeasureSign,
unitOfMeasure,
lat,
long,
initialLocation,
currentCity,
currentTemp,
currentHumidity,
description,
currentWindSpeed,
currentIcon,
day1Temp,
day2Temp,
day3Temp,
day4Temp,
day1Icon,
day2Icon,
day3Icon,
day4Icon,
searchHistory;


navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  getCurrentCity();
}, function() {
  console.log('fail');
});


// Goole maps api call
var getCurrentCity = function() {
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
};

// Current weather api call
var currentWeather = function () {
  $.ajax({
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + initialLocation + '&units=' + unitOfMeasure +'&appid=8b7d40ff29a3bc2cfbc6dc4a39ab4577',
    success: function(data) {
      console.log(data);
      currentCity      = data.name;
      currentTemp      = Math.floor(data.main.temp);
      currentHumidity  = data.main.humidity;
      description      = data.weather[0].description;
      currentWindSpeed = Math.floor(data.wind.speed);
      currentIcon      = data.weather[0].icon;
      $('.currentCity').text(currentCity);
      $('.currentTemp').text(currentTemp + unitOfMeasureSign);
      $('.currentHumidity').text(currentHumidity);
      $('.description').text(description);
      $('.windSpeed').text(currentWindSpeed);
      $('.currentIcon').text(currentIcon);
    },
    error: function functionName() {
      console.error('currentWeather');
    }
  });

};

// forecast api call
var forecast = function () {
  $.ajax({
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + initialLocation + '&units=' + unitOfMeasure + '&appid=8b7d40ff29a3bc2cfbc6dc4a39ab4577',
    success: function (data) {
      day1Temp = Math.floor(data.list[0].main.temp);
      day2Temp = Math.floor(data.list[7].main.temp);
      day3Temp = Math.floor(data.list[15].main.temp);
      day4Temp  = Math.floor(data.list[23].main.temp);
      day1Icon = data.list[0].weather[0].icon;
      day2Icon = data.list[0].weather[0].icon;
      day3Icon = data.list[0].weather[0].icon;
      day4Icon = data.list[0].weather[0].icon;
      $('#day1').text(day1Temp + unitOfMeasureSign);
      $('#day2').text(day2Temp + unitOfMeasureSign);
      $('#day3').text(day3Temp + unitOfMeasureSign);
      $('#day4').text(day4Temp + unitOfMeasureSign);
      $('#nextDayIcon1').text(day1Icon);
      $('#nextDayIcon2').text(day2Icon);
      $('#nextDayIcon3').text(day3Icon);
      $('#nextDayIcon4').text(day4Icon);
    },
    error: function functionName() {
      console.error('forecast');
    }
  });
};

var newCity = function () {
  initialLocation = $('#title').val();
  $('#title').val('');
  currentWeather();
  forecast();
};
