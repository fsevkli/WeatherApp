// Wait until html is done rendering 
$(document).ready(function() {
    
$("#Location").on('keyup', function (event) {
    if (event.keyCode === 13) {
        console.log("Enter key pressed!!!!!");
        var inputValue = $(this).val();
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
              
        const cardsContainer = $('#Cards');
        cardsContainer.empty(); // Clear existing card data
        const forecastWeek  = response

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
        console.log(forecast)
        // Append a new card to div Cards 
           const cardHtml = `
            <div class="col-md-2">
              <div id="CardBlock">
              <button type="button" class="no-outline-button">
                <div class="card">
                  <img class="card-img-top" src="${forecast.day.condition.icon}" alt="Card image">
                  <div class="card-img-overlay" style="text-align: center;">
                    <h4 class="card-title"><b>${dayName}</b></h4>
                    <p class="card-text"><h3>${forecast.day.condition.text}</h3></p>
                    <img src="static/Images/thermometer.png" alt="Card image" width="20" height="20">
                     Low ${forecast.day.mintemp_f } °F | Avg ${forecast.day.avgtemp_f}°F | High ${forecast.day.maxtemp_f}°F 
                  </div>
                </div>
                </button>
              </div>
            </div>
          `;

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

