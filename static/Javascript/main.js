// Wait until html is done rendering 
var inputValue
var previouscard
function getLocation(forecastWeek) {
  const locationHolder = $('#location')
        locationHolder.empty(); // Clear existing
        console.log("Current Location : "+forecastWeek.location.name+" "+forecastWeek.location.region+" "+forecastWeek.location.country)
        const locationHtml = `<p><h2> ${forecastWeek.location.name}, ${forecastWeek.location.region}  -- ${forecastWeek.location.country}  </h2></p>
        `;
        locationHolder.append(locationHtml)
}
function previousCard(){
  previouscard = $('#Cards').html();
  console.log(previouscard)
}
console.log(previouscard)
$(document).ready(function() {
  previousCard()
  console.log(previouscard)
$("#Location").on('keyup', function (event) {
    if (event.keyCode === 13) {
        console.log("Enter key pressed!!!!!");
        inputValue = $(this).val();
        console.log(inputValue);
        $.ajax({
            url:'',
            type:'get',
            contentType:'application/json',
            data: {
               inputValue: inputValue 
            }, 
            success: function (response) {
                console.log(response)
                previouscard = $('#Cards').html();
                console.log(previouscard)
        const cardsContainer = $('#Cards');
        cardsContainer.empty(); // Clear existing card data
        const forecastWeek  = response
        getLocation(forecastWeek)
        // Loop through the forecast data and create cards
        for (const forecast of forecastWeek.forecast) {
        //date string in "YYYY-MM-DD" format
        var dateString = forecast.date;

        // Parse the date string into a Date object
        var date = new Date(dateString);

        // Array of day names
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        var dayOfWeek = date.getDay();

        // Get the name of the day
        var dayName = dayNames[dayOfWeek];
        //console.log(forecast)
        // Append a new card to div Cards 
           const cardHtml = `
            <div class="col-md-2">
              <div id="CardBlock">
                <button class = "no-outline-button" value= ${dateString} Onclick = "ShowHourly(value)">
                <div class="card">
                  <img class="card-img-top" src="${forecast.day.condition.icon}" alt="Card image">
                  <div class="card-img-overlay" style="text-align: center;">
                    <h4 class="card-title"><b>${dayName}</b></h4>
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
      },
      error: function(error) {
        console.error('Error:', error);
      }    
        })
     }
 })

})
/**
 * Convert time from 24:00 to 12:00 format
 * @param {*} DateTime 
 * @returns 
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

let hourlytemp = [];
let timestamp=[];
/**
 * Renders a chart using ZingChart
 * with the hourly date from hourlytemp
 * and time from timstamp
 */
function createChart(){
  console.log('createChart');
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
 * Shows the hourly data
 */
function ShowHourly(day){
  console.log(day)
  
  $.ajax({
    url: '/getDate',
    method: 'POST',
    data: JSON.stringify( day ), // Replace 'your-date-value' with the actual date
    contentType: 'application/json',
    success: function(response) {
      previouscard = $('#Cards').html();
      // Parse the JSON response
      var hourly_Data = response;
      const cardsContainer = $('#Cards');
      cardsContainer.empty(); // Clear existing card data
      backButton= `<button Onclick = "Return()"> Back </button>
      
     
 
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
        <br> ${hourly_Data[i].temp_f} F Feels Like ${hourly_Data[i].feelslike_f}F</br>
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
$(document).ready(function() {
  // Listen for the "Enter" key in the location input
  $("#Location").on('keyup', function(e) {
      if (e.keyCode === 13) {  // 13 is the key code for "Enter"
          let location = $(this).val();
          
          // Make an AJAX POST request to the server to get weather data for the new location
          $.ajax({
              type: "POST",
              url: "/updateLocation",
              data: {
                  'Location': location
              },
              success: function(response) {
                  // Here, you can handle the server's response, maybe update your page content based on the new data.
                  // For simplicity, we're just refreshing the page.
                  location.reload();
              }
          });
      }
  });
  // ... Rest of your code ...
});

document.addEventListener('DOMContentLoaded', function() {
  function setBackground() {
      const localtime = new Date(document.querySelector('#localtime').textContent);

      // Assuming the sunrise and sunset times in your HTML are in the format "HH:MM AM/PM"
      const sunriseParts = document.querySelector('#sunrise').textContent.split(/[:\s]/);
      const sunsetParts = document.querySelector('#sunset').textContent.split(/[:\s]/);

      const sunriseHour = sunriseParts[2] === 'PM' ? parseInt(sunriseParts[0]) + 12 : parseInt(sunriseParts[0]);
      const sunriseMinute = parseInt(sunriseParts[1]);

      const sunsetHour = sunsetParts[2] === 'PM' ? parseInt(sunsetParts[0]) + 12 : parseInt(sunsetParts[0]);
      const sunsetMinute = parseInt(sunsetParts[1]);

      const sunrise = new Date(localtime.getFullYear(), localtime.getMonth(), localtime.getDate(), sunriseHour, sunriseMinute);
      const sunset = new Date(localtime.getFullYear(), localtime.getMonth(), localtime.getDate(), sunsetHour, sunsetMinute);

      if (localtime >= sunrise && localtime < sunset) {
          // If the current time is between sunrise and sunset
          document.body.className = 'sunny-bg';
      } else {
          // If the current time is before sunrise or after sunset
          document.body.className = 'moon-bg';
      }
  }

  setBackground();
});

