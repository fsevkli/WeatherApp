import os
from flask import Flask, render_template, request, jsonify
from urllib.request import urlopen
import json
import geocoder
from datetime import datetime

app = Flask(__name__)



API_KEY = '5dea31b4204948a681b182600230709'


################################
# This function Get the 
# location of the user 
# via ip address
################################
def get_location():
    g = geocoder.ip('me')
    return g.latlng

################################
# This function makes a api call 
# to weatherapi to get the weekly 
# forecast
################################
def location(loc: str):
    loc = request.args.get('inputValue')
    loc = loc.split(" ")[0] 
    if loc == "current":
        latlng = get_location()
       
        response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={latlng[0]},{latlng[1]}&days=14")
    else:
       # get the input from text box html
       input = request.args.get('inputValue')
       input = input.replace(" ", "%20")
      # print(input)
       response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={input}&days=14")
       
    global forecastData
    # Convert the response to JSON and store it in forecastData
    forecastData = json.loads(response.read())
    
    # Convert data to JSON to use in main.js
    return jsonify(data=forecastData, 
                   location=forecastData['location'], current=forecastData['current'], condition=forecastData['current']['condition'],
                   forecast=forecastData['forecast']['forecastday'])

######################
# This function Get the card date from 
# Main.js and returns the hourly data
# for that date
#######################
@app.route('/getDate', methods=['POST'])
def getDate():
    ChangeBackground()
    cardDate = request.json 
   # print(cardDate)
    hourlyData = None
    #print(forecastData)
    for forecast_day in forecastData['forecast']['forecastday']:
       
        if forecast_day['date'] == cardDate:
         #You can access the data for the specific day here
             hourlyData = forecast_day['hour']
             break
            
   
    return  jsonify(hourlyData)
################################
# This function Changes the Background of
# The Webpage  depending on the time of day
#
################################
@app.route('/Background', methods=['GET'])
def ChangeBackground():
    print ('Change Background')
    sunrise_time_str = forecastData['forecast']['forecastday'][0]['astro']['sunrise']
    sunset_time_str = forecastData['forecast']['forecastday'][0]['astro']['sunset']
    local_time_str = forecastData['location']['localtime']
    
    # Convert sunrise and sunset time strings to datetime objects
    sunrise_time = datetime.strptime(sunrise_time_str, '%I:%M %p').time()
    sunset_time = datetime.strptime(sunset_time_str, '%I:%M %p').time()

    # Get current local time in HH:MM format
    current_time = datetime.now().time().replace(second=0, microsecond=0)
    
    # Check if current time is between sunrise and sunset
    if sunrise_time <= current_time <= sunset_time:
        suntime = "day"
    else:
        suntime = "night"
    print("Current" +  sunrise_time_str)
    return jsonify(sunrise=sunrise_time_str, sunset=sunset_time_str, suntime=suntime, localtime=local_time_str)

################################
# Get the default location which is the user location
################################
@app.route('/default')
def default():
   response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={get_location()[0]},{get_location()[1]}&days=3")
   global forecastData
   forecastData  = json.loads(response.read())
   return jsonify( location=forecastData['location'], current=forecastData['current'], condition=forecastData['current']['condition'],
                   forecast=forecastData['forecast']['forecastday'])

################################
# This functions renders the 
# index webpage 
################################
@app.route('/')
def index():
   response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={get_location()[0]},{get_location()[1]}&days=3")
   global forecastData
   forecastData  = json.loads(response.read())
   #print( forecastData)
  
   if request.is_json:
       
        json_data = location(str)
        
       
       
        return json_data
   return render_template("index.html", data=forecastData,   location=forecastData['location'])

################################
# This Function Runs the server 
# on a local machine 
################################
if __name__ == '__main__':
    # Port is set to 8080, change to anything you want
    # Remember, it has to be 1024 or above
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
