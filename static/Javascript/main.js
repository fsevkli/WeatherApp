
// Get the current input value from the Location input field.
var inputValue;

//  Store the previous card data for later retrieval.
var previouscard;

// Store hourly temperature data.
let hourlytemp = [];

let precipation = [];

let humidity = [];

// Store timestamp data.
let timestamp = [];

// Default
let tempUnit = 'F';

let selectedUnit;

// Store latitude.
let latu;
// Store longitude.
let long;

let currentLocation;

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
 * Store the previous card data before switching to hourly data.
 */
function previousCard(){
  previouscard = $('#Cards').html();
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

/**
 * Get the Word Day of the week I.e (Sunday , Monday, etc)
 * @param {String} dateString - The date string given by the python server
 * @returns {String} - the Word day of the Week
 */
function getDayOfWeek(dateString) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateString + 'T00:00:00');
  const dayOfWeek = date.getDay();
  return daysOfWeek[dayOfWeek];
}

/**
 * Get the Weekly Forecast and display on the webpage
 * @param {String} urlString - The url to search for on the python server
 * @param {String} _value - The input value to give to the python server
 */
function getWeekly(urlString, _value) {
   $('#overlay').fadeIn().delay(2000).fadeOut();
  $.ajax({
      url: urlString,
      type: 'get',
      contentType: 'application/json',
      data: {
          inputValue: _value
      },
      success: function (response) {
          console.log("getWeekly response:", response);

          const cardsContainer = $('#Cards');
          cardsContainer.empty(); // Clear existing card data

          // Here we directly use 'response.forecast' since the backend is structured to send 'forecast' as top-level key
          if (!response || !response.forecast) {
              console.error('Forecast data is missing or not in expected format:', response);
              return; // Stop execution if data is not correct
          }

          // Update location information on the page
          getLocation(response);
        
          // Loop through the forecast data and create cards
          response.forecast.forEach((dayForecast) => {
              const tempLow = tempUnit === 'F' ? Math.round(dayForecast.day.mintemp_f) : Math.round(dayForecast.day.mintemp_c);
              const tempAvg = tempUnit === 'F' ? Math.round(dayForecast.day.avgtemp_f) : Math.round(dayForecast.day.avgtemp_c);
              const tempHigh = tempUnit === 'F' ? Math.round(dayForecast.day.maxtemp_f) : Math.round(dayForecast.day.maxtemp_c);
              const unitSymbol = tempUnit === 'F' ? '°F' : '°C';

              const cardHtml = `
                  <div class="col-md-2">
                      <div id="CardBlock">
                          <button class="no-outline-button" value="${dayForecast.date}" onclick="ShowHourly(value)">
                              <div class="card">
                                  <img class="card-img-top" src="https:${dayForecast.day.condition.icon}" alt="Weather icon">
                                  <div class="card-img-overlay" style="text-align: center;">
                                      <h4 class="card-title"><b>${getDayOfWeek(dayForecast.date)}</b></h4>
                                      <p class="card-text"><h3>${dayForecast.day.condition.text}</h3></p>
                                      <img src="static/Images/thermometer.png" alt="Thermometer" width="20" height="20">
                                      Low ${tempLow}${unitSymbol} | Avg ${tempAvg}${unitSymbol} | High ${tempHigh}${unitSymbol}
                                  </div>
                              </div>
                          </button>
                      </div>
                  </div>
              `;

              cardsContainer.append(cardHtml);
          });
         
          SetBackground();
          $('#overlay').fadeOut();
          
      },
      error: function (error) {
          console.error('Error in getWeekly:', error);
      }
  });
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
  getWeekly('/default', '');
  Autocorrect();
  previousCard();
  CheckInput();
  MesurementDropdown();
  // CheckInput function is not provided but should be included here if it's defined elsewhere
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
    getWeekly('/default', inputValue); // Refresh the cards with the new temperature unit
  });
});
/**
 * This Function check of the user pressed the Enter key
 * if so render the cards with the input of in #Location
 */
function CheckInput(){
  $("#Location").on('keyup', function (event) {
    if (event.keyCode === 13) {
      zingchart.exec('chart','destroy')
      $('body').attr('class', '')
        inputValue = $(this).val();
        getWeekly('', inputValue)
    } 
})
}
/**
 * Convert time from 24:00 to 12:00 format.
 * @param {String} DateTime - Time in 24-hour format.
 * @returns {String} - Time in 12-hour format.
 */
function GetTime(DateTime) {
const parsedDate = new Date(DateTime);

// Get the time portion (hours and minutes)
const hours = parsedDate.getHours();
const minutes = parsedDate.getMinutes();

// Convert to 12-hour format
const period = hours >= 12 ? "PM" : "AM";
const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${period}`;
return formattedTime
}
function toggleActive(button) {
  // Remove 'active' class from all buttons
  $('.nav-link').removeClass('active');
  // Add 'active' class to the clicked button
  $(button).addClass('active');
}
/**
 * Show hourly data for a specific day.
 * @param {String} day - The selected day for hourly data.
 */
function ShowHourly(day) {
  console.log("Requested day for hourly data:", day);

  $.ajax({
      url: '/getDate',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ day: day }),
      success: function(response) {
          if (!response || !Array.isArray(response)) {
              console.error('Hourly data is missing or not an array:', response);
              return; // Stop execution if data is not correct
          }

          // Assuming 'response' is now a valid array of hourly forecast data
          previouscard = $('#Cards').html();
          const cardsContainer = $('#Cards');
          cardsContainer.empty(); // Clear existing card data


          const backButton = `<button class="button-19" role="button" onclick="Return()"> Back </button>`;
          cardsContainer.append(backButton);

          const scrollContainer = $('<div>', { 'class': 'container horizontal-scrollable' });
          const scrollRow = $('<div>', { 'id': 'scroll', 'class': 'row text-center', 'style': 'height: 40vh;' });
          scrollContainer.append(scrollRow);
          cardsContainer.append(scrollContainer);

          // Reset arrays for new data
          hourlytemp = [];
          precipation = [];
          humidity = [];
          timestamp = [];

          response.forEach(hour => {
              const formattedTime = GetTime(hour.time);
              const temp = tempUnit === 'F' ? Math.round(hour.temp_f) : Math.round(hour.temp_c);
              const feelsLike = tempUnit === 'F' ? Math.round(hour.feelslike_f) : Math.round(hour.feelslike_c);
              const unitSymbol = tempUnit === 'F' ? '°F' : '°C';

              hourlytemp.push(temp);
              precipation.push(hour.precip_in);
              humidity.push(hour.humidity);
              timestamp.push(formattedTime);

              const cardHtml = `
                  <div class="col-md-2">
                      <h4>${formattedTime}</h4>
                      <img src="${hour.condition.icon}" alt="Weather icon">
                      <h5>${hour.condition.text}</h5>
                      <div>${temp} ${unitSymbol} Feels Like ${feelsLike} ${unitSymbol}</div>
                  </div>
              `;
              scrollRow.append(cardHtml);
          });

          // Append chart and buttons for additional data visualization
          cardsContainer.append(`
              <div id="chart" style="height: 40vh;"></div>
              <nav class="nav nav-pills nav-fill">
              <a class="nav-item nav-link" onclick="toggleActive(this); precipationChart()">Precipitation</a>
              <a class="nav-item nav-link active" onclick="toggleActive(this); hourlyChart()">Hourly</a>
              <a class="nav-item nav-link" onclick="toggleActive(this); humidityChart()">Humidity</a>
              <a class="nav-item nav-link" onclick="toggleActive(this); WeatherMap()">Weather Map</a>
              </nav>
              </div>
          `);
          // Call hourlyChart() if it's defined
          if (typeof hourlyChart === 'function') {
              hourlyChart();
          } else {
              console.error('hourlyChart function is not defined');
          }
      },
      error: function(error) {
          console.error('Error fetching hourly data:', error);
      }
  });
}

/**
 * Returns the previous Card ui
 */
function Return(){
  const cardsContainer = $('#Cards');
  cardsContainer.empty();
  console.log('Returning');
  cardsContainer.append(previouscard);
  previouscard = null;
  zingchart.exec('chart','destroy')
}
