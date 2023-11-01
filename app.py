import os
from flask import Flask, render_template, request, jsonify
from urllib.request import urlopen
import json
import geocoder
from datetime import datetime
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
    CheckSun()
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
# This function Checks if the 
# Sun is up or Down 
################################
@app.route('/CheckSun', methods=['GET'])
def CheckSun():
    print ('Change Background')
    sunrise_time_str = forecastData['forecast']['forecastday'][0]['astro']['sunrise']
    sunset_time_str = forecastData['forecast']['forecastday'][0]['astro']['sunset']
    local_time_str = forecastData['location']['localtime']
    
    local_time_str = local_time_str.split(' ', 1)[1]
   
    
    print(local_time_str)
    
    # Parse the input time into a datetime object
    time_12h = datetime.strptime(sunset_time_str, "%I:%M %p")

    # Convert to 24-hour format
    sunset_time_str = time_12h.strftime("%H:%M")
    time_12h = datetime.strptime(sunrise_time_str, "%I:%M %p")
    sunrise_time_str = time_12h.strftime("%H:%M")
   

    # Extract hours and minutes from the time
    hours, minutes = map(int, local_time_str.split(':'))
    sunset_time_str = sunset_time_str.split(':')
    sunrise_time_str =  sunrise_time_str.split(':')
    
    daytime_start = (int(sunrise_time_str[0]), int(sunrise_time_str[1]))  
    daytime_end = (int(sunset_time_str[0]),int(sunset_time_str[1])) 
    # Compare the extracted time with the daytime and nighttime ranges
    if (daytime_start <= (hours, minutes) <= daytime_end):
        suntime = 'day'
    else:
        suntime = 'night'
        
    
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
######################
# This function Get the card date from 
# Main.js and returns the hourly data
# for that date
#######################
@app.route('/getDate', methods=['POST'])
def getDate():
    CheckSun()
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
# This function Checks if the 
# Sun is up or Down 
################################
@app.route('/CheckSun', methods=['GET'])
def CheckSun():
    print ('Change Background')
    sunrise_time_str = forecastData['forecast']['forecastday'][0]['astro']['sunrise']
    sunset_time_str = forecastData['forecast']['forecastday'][0]['astro']['sunset']
    local_time_str = forecastData['location']['localtime']
    
    local_time_str = local_time_str.split(' ', 1)[1]
   
    
    print(local_time_str)
    
    # Parse the input time into a datetime object
    time_12h = datetime.strptime(sunset_time_str, "%I:%M %p")

    # Convert to 24-hour format
    sunset_time_str = time_12h.strftime("%H:%M")
    time_12h = datetime.strptime(sunrise_time_str, "%I:%M %p")
    sunrise_time_str = time_12h.strftime("%H:%M")
   

    # Extract hours and minutes from the time
    hours, minutes = map(int, local_time_str.split(':'))
    sunset_time_str = sunset_time_str.split(':')
    sunrise_time_str =  sunrise_time_str.split(':')
    
    daytime_start = (int(sunrise_time_str[0]), int(sunrise_time_str[1]))  
    daytime_end = (int(sunset_time_str[0]),int(sunset_time_str[1])) 
    # Compare the extracted time with the daytime and nighttime ranges
    if (daytime_start <= (hours, minutes) <= daytime_end):
        suntime = 'day'
    else:
        suntime = 'night'
        
    
    return jsonify(sunrise=sunrise_time_str, sunset=sunset_time_str, suntime=suntime, localtime=local_time_str)

################################
# Get the default location which is the user location
################################
@app.route('/default')
def default():
   response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={get_location()[0]},{get_location()[1]}&days=3")
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