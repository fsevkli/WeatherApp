
// Get the current input value from the Location input field.
var inputValue;

//  Store the previous card data for later retrieval.
var previouscard;

// Store hourly temperature data.
let hourlytemp = [];

// Store timestamp data.
let timestamp = [];
/**
 * This function is Run the google autocorrect api
 */
function Autocorrect(){
  var input = document.getElementById('Location');
  var autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)']['geocode'] });
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
        const locationHtml = `<p><h2> ${forecastWeek.location.name}, ${forecastWeek.location.region}  -- ${forecastWeek.location.country}  </h2></p>
        `;
        $('#Location').attr('value', forecastWeek.location.name+' '+forecastWeek.location.region+' , '+forecastWeek.location.country)
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
function getWeekly (urlString, _value){
  $.ajax({
    url:urlString,
    type:'get',
    contentType:'application/json',
    data: {
       inputValue: _value
    }, 
    success: function (response) {
        console.log(response)
        
const cardsContainer = $('#Cards');
cardsContainer.empty(); // Clear existing card data
const forecastWeek  = response
getLocation(forecastWeek)
// Loop through the forecast data and create cards
for (const forecast of forecastWeek.forecast) {
//console.log(forecast)
// Append a new card to div Cards

   const cardHtml = `
    <div class="col-md-2">
      <div id="CardBlock">
        <button class = "no-outline-button" value= ${forecast.date} Onclick = "ShowHourly(value)">
        <div class="card">
          <img class="card-img-top" src="${forecast.day.condition.icon}" alt="Card image">
          <div class="card-img-overlay" style="text-align: center;">
            <h4 class="card-title"><b>${getDayOfWeek(forecast.date)}</b></h4>
            <p class="card-text"><h3>${forecast.day.condition.text}</h3></p>
            <img src="static/Images/thermometer.png" alt="Card image" width="20" height="20">
            Low ${forecast.day.mintemp_f}°F |  ${forecast.day.avgtemp_f}°F | High ${forecast.day.maxtemp_f}°F 
          </div>
        </div>
        </button>
      </div>
    </div>
  `;// Need to change Mesurement if the user has chosen another one
  cardsContainer.append(cardHtml);
}
SetBackground()
},
error: function(error) {
console.error('Error:', error);
}    
})
}  


/**
 * Initialize the page with data and event handlers.
 */
$(document).ready(function() {
  getWeekly('/default', '')
  Autocorrect()
  previousCard()
  CheckInput()
})

/**
 * This Function check of the user pressed the Enter key
 * if so render the cards with the input of in #Location
 */
function CheckInput(){
  $("#Location").on('keyup', function (event) {
    if (event.keyCode === 13) {
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


/**
 * Renders a chart using ZingChart
 * with the hourly date from hourlytemp
 * and time from timstamp
 */
function createChart(){
  var myConfig = {
    "globals": {
      "font-family": "Roboto"
    },
    "graphset": [{
      "type": "area",
      "background-color": "#fff",
      "utc": true,
      "title": {
        "y": "15px",
        "text": "Hourly Temperature Change",
        "background-color": "none",
        "font-color": "#05636c",
        "font-size": "24px",
        "height": "25px",
        "adjust-layout": true
      },
      "plotarea": {
        "margin-top": "10%",
        "margin-right": "dynamic",
        "margin-bottom": "dynamic",
        "margin-left": "dynamic",
        "adjust-layout": true
      },
      "labels": [{
          "text": "",
          "default-value": "",
          "color": "#8da0cb",
          "x": "20%",
          "y": 50,
          "width": 120,
          "text-align": "left",
          "bold": 0,
          "font-size": "14px",
          "font-weight": "bold"
        },
        
      ],
      "scale-x": {
        "label": {
          "text": "Time",
          "font-size": "14px",
          "font-weight": "normal",
          "offset-x": "10%",
          "font-angle": 360
        },
        "item": {
          "text-align": "center",
          "font-color": "#05636c"
        },
        "zooming": 1,
        "max-labels": 12,
        "labels": [
          timestamp[0],
          timestamp[1],
          timestamp[2],
          timestamp[3],
          timestamp[4],
          timestamp[5],
          timestamp[6],
          timestamp[7],
          timestamp[8],
          timestamp[9],
          timestamp[10],
          timestamp[11],
          timestamp[12],
          timestamp[13],
          timestamp[14],
          timestamp[15],
          timestamp[16],
          timestamp[17],
          timestamp[18],
          timestamp[19],
          timestamp[20],
          timestamp[21],
          timestamp[22],
          timestamp[23]
        ],
        "max-items": 12,
        "items-overlap": true,
        "guide": {
          "line-width": "0px"
        },
        "tick": {
          "line-width": "2px"
        },
      },
      "crosshair-x": {
        "line-color": "#fff",
        "line-width": 1,
        "plot-label": {
          "visible": false
        }
      },
      "scale-y": {
        "values": "0:120:50",
        "item": {
          "font-color": "#05636c",
          "font-weight": "normal"
        },
        "label": {
          "text": "Temperature",
          "font-size": "14px"
        },
        "guide": {
          "line-width": "0px",
          "alpha": 0.2,
          "line-style": "dashed"
        }
      },
      "plot": {
        "line-width": 2,
        "marker": {
          "size": 1,
          "visible": false
        },
        "tooltip": {
          "font-family": "Roboto",
          "font-size": "15px",
          "text": "It feels like %v F at %Time",
          "text-align": "left",
          "border-radius": 5,
          "padding": 10
        }
      },
      "series": [{
          "values": [
            hourlytemp[0],
            hourlytemp[1],
            hourlytemp[2],
            hourlytemp[3],
            hourlytemp[4],
            hourlytemp[5],
            hourlytemp[6],
            hourlytemp[7],
            hourlytemp[8],
            hourlytemp[9],
            hourlytemp[10],
            hourlytemp[11],
            hourlytemp[12],
            hourlytemp[13],
            hourlytemp[14],
            hourlytemp[15],
            hourlytemp[16],
            hourlytemp[17],
            hourlytemp[18],
            hourlytemp[19],
            hourlytemp[20],
            hourlytemp[21],
            hourlytemp[22],
            hourlytemp[23],
           
          ],
          "Time": [
            timestamp[0],
            timestamp[1],
            timestamp[2],
            timestamp[3],
            timestamp[4],
            timestamp[5],
            timestamp[6],
            timestamp[7],
            timestamp[8],
            timestamp[9],
            timestamp[10],
            timestamp[11],
            timestamp[12],
            timestamp[13],
            timestamp[14],
            timestamp[15],
            timestamp[16],
            timestamp[17],
            timestamp[18],
            timestamp[19],
            timestamp[20],
            timestamp[21],
            timestamp[22],
            timestamp[23],
          ],
          "line-color": "#fc8d62",
          "aspect": "spline",
          "background-color": "#fc8d62",
          "alpha-area": ".5",
          "font-family": "Roboto",
          "font-size": "14px",
          "text": "returns"
        }
      ]
    }]
  };

  zingchart.render({
    id: 'chart',
    data: myConfig,
    height: '100%',
    width: '100%'
  });
}


  

/**
 * Show hourly data for a specific day.
 * @param {String} day - The selected day for hourly data.
 */
function ShowHourly(day){
  console.log(day)
  
  $.ajax({
    url: '/getDate',
    method: 'POST',
    data: JSON.stringify( day ), // Replace with the actual date
    contentType: 'application/json',
    success: function(response) {
      previouscard = $('#Cards').html();
      // Parse the JSON response
      var hourly_Data = response;
      const cardsContainer = $('#Cards');
      cardsContainer.empty(); // Clear existing card data
      backButton= `<button class="button-19" role="button" Onclick = "Return()"> Back </button><
     `;
      cardsContainer.append(backButton)
    
      const scrollHtml = `
      <div class="container horizontal-scrollable"> 
      <div id = "scroll" class="row text-center"style="height: 40vh;"> 
      </div> 
      </div>
      <div id="chart" style="height: 40vh;"></div> 
      `;
      cardsContainer.append(scrollHtml);
      for ( i = 0; i < hourly_Data.length; i++) {
        // Get the formatted time string
       
        const formattedDateTime = GetTime(hourly_Data[i].time);
        hourlytemp.push(hourly_Data[i].temp_f);
        timestamp.push(formattedDateTime)
      
         cardHtml =  `
        <br><div class="col-md-2">
        <h4>${formattedDateTime}</h4>
        <img src="${hourly_Data[i].condition.icon}" alt="Card image">
        <h5>${hourly_Data[i].condition.text}</h5>
        <br> ${hourly_Data[i].temp_f} °F  Feels Like ${hourly_Data[i].feelslike_f} °F </br>
        </div>
        </div><br>
      `;// Need to change Mesurement if the user has chosen another one
       
      $('#scroll').append(cardHtml)
       // console.log("DATA : "+ hourly_Data[i].feelslike_f)
      }
      createChart();
      console.log(hourly_Data);
    },
    error: function(error) {
      console.error('Error:', error);
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
}
