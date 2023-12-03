
// Get the current input value from the Location input field.
var inputValue;

// Default
let tempUnit = 'F';

let selectedUnit;

// Store latitude.
let latu;
// Store longitude.
let long;
function geoFindMe() {
  function success(position) {
     
      latLong =  position.coords.latitude +" "+ position.coords.longitude;
     console.log("Latitude:", latu, "Longitude:", long);
      console.log(latLong)
          geolocation = true;
          getWeekly('', latLong);
         
         
     
  }

 function error() {
     console.log("Unable to retrieve your location");
    geolocation = false
     useDefault = true;
     getWeekly('/default', '');
  }

  if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      geolocation = false
     useDefault = true;
      getWeekly('/default', '');
  } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
  }
}

/**
 * This function is Run the google autocorrect api
 */
function Autocorrect(){
  var input = document.getElementById('Location');
  var autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)']['geocode']});
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
  })
}

/**
 * Get location information and update the UI.
 * @param {Object} forecastWeek - The forecast data for the week.
 */
function getLocation(forecastWeek) {
  const locationHolder = $('#location')
        locationHolder.empty(); // Clear existing
        currentLocation = forecastWeek.location.name+" , "+forecastWeek.location.region
        const locationHtml = `<p><h2> ${forecastWeek.location.name}, ${forecastWeek.location.region}  -- ${forecastWeek.location.country}  </h2></p>
        `;
        $('#Location').attr('value', forecastWeek.location.name+' '+forecastWeek.location.region+' , '+forecastWeek.location.country)

        latu = forecastWeek.location.lat;
        long = forecastWeek.location.lon;

        locationHolder.append(locationHtml)
}

/**
 * Set the Background of the webpage
 */
function SetBackground(){
  $.ajax({
    url:'/CheckSun',
    type:'get',
    contentType:'application/json',
  
    success: function (response) {
      console.log(response.suntime)
      console.log(response.suntime  === 'day')
       if(response.suntime === 'day'){
        $('body').attr('class', 'sunny-bg')
       } else {
        $('body').attr('class', 'moon-bg');
       }
      $("#suntime").append(response.suntime);
},
error: function(error) {
console.error('Error:', error);
}    
})
}

function MesurementDropdown (){
  $('#locationDropdown').text('My Location'); 
    $('#metricDropdown').text('Fahrenheit'); 

    $('.location-dropdown-item').click(function() { 
      var selectedText = $(this).text(); 
      $('#locationDropdown').text(selectedText);

    }); 

    $('.metric-dropdown-item').click(function() { 
      var selectedText = $(this).text(); 
      $('#metricDropdown').text(selectedText); 
    }); 
}
/**
 * Initialize the page with data and event handlers.
 */
$(document).ready(function() {
  // Call the function to get the location
  geoFindMe();
  Autocorrect();
  previousCard();
  CheckInput();
  MesurementDropdown();
  
  // Add event listeners for temperature unit changes
  $('.metric-dropdown-item').click(function() {
      zingchart.exec('chart','destroy')
      hourlytemp = [];
      precipation = [];
      humidity = [];
      timestamp = [];
      selectedUnit = $(this).text();
      $('#metricDropdown').text(selectedUnit);
          tempUnit = selectedUnit.includes('F') ? 'F' : 'C';
          if(!geolocation){
              if(useDefault) {
                  getWeekly('/default', ''); 
              } else {
                  getWeekly('', inputValue); 
              }
          } else {
              getWeekly('', latLong); 
          }// Refresh the cards with the new temperature unit
  });
});
/**
* This Function check of the user pressed the Enter key
* if so render the cards with the input of in #Location
*/
function CheckInput(){
$("#Location").on('keyup', function (event) {
  if (event.keyCode === 13) {
      geolocation = false
      useDefault = false;
    zingchart.exec('chart','destroy')
    $('body').attr('class', '')
      inputValue = $(this).val();
      getWeekly('', inputValue)
  } 
})
}

// toggle text size
let isEnlarged = false;
let originalSizes = new Map();
function toggleTextSize() {
  // select all text elements on document
  var allTextElements = document.querySelectorAll('*');

  if (isEnlarged == false) {
    allTextElements.forEach(function(element) {
      var currentSize = window.getComputedStyle(element).fontSize;
      // read in original font sizes
      originalSizes.set(element, parseFloat(currentSize));
      // increase font size by 2.5%
      var newSize = parseFloat(currentSize) * 1.025;
      element.style.fontSize = newSize + 'px';
    });
    // set true to properly toggle on next click
    isEnlarged = true;
  } else {
    originalSizes.forEach(function(value, key) {
      // set font size to stored value
      key.style.fontSize = value + 'px';
    });
    originalSizes.clear();
    // set false to trigger the toggle
    isEnlarged = false;
  }

}