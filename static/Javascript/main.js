// Wait until html is done rendering 
var inputValue
var previouscard
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
        const locationHolder = $('#Location')
        locationHolder.empty(); // Clear existing
        locationHolder.append(forecastWeek.location.name)
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
      backButton= `<button Onclick = "Return()"> Back </button>`;
      cardsContainer.append(backButton)
      console.log("DAT : "+ hourly_Data[1].feelslike_f)
      for ( i = 0; i < hourly_Data.length; i++) {
        const cardHtml = `
        <br>Feels Like ${hourly_Data[i].feelslike_f}F</br>
      `;// Need to change Mesurement if the user has chosen another one
      
      cardsContainer.append(cardHtml);
        console.log("DATA : "+ hourly_Data[i].feelslike_f)
      }
      
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
  console.log('Returning'+previouscard);
  cardsContainer.append(previouscard);
}

