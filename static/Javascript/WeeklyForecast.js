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