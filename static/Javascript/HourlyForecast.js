// Hourly Temperature Data 
let hourlytemp = [];
// Hourly precipation Data.
let precipation = [];
// Hourly humidity Data.
let humidity = [];
// Store timestamp data.
let timestamp = [];

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
