import os
from flask import Flask, render_template, request, jsonify
from urllib.request import urlopen
import json
import geocoder

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
       print(input)
       response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={input}&days=14")
       
    global forecastData
    # Convert the response to JSON and store it in forecastData
    forecastData = json.loads(response.read())
    
    # Convert data to JSON to use in main.js
    return jsonify(data=forecastData, 
                   location=forecastData['location'], current=forecastData['current'], condition=forecastData['current']['condition'],
                   forecast=forecastData['forecast']['forecastday'])
def search():
    query = request.args.get('query', 'Paris')
    query = query.replace(" ", "%20")
    response = urlopen(f"https://api.weatherapi.com/v1/search.json?key={API_KEY}&q={query}")
   
    data = json.loads(response.read())
    
    # Save data to JSON file (optional)
   
    return data
######################
# This function Get the card date from 
# Main.js and returns the hourly data
# for that date
#######################
@app.route('/getDate', methods=['POST'])
def getDate():
    cardDate = request.json 
    print(cardDate)
    hourlyData = None
    print(forecastData)
    for forecast_day in forecastData['forecast']['forecastday']:
       
        if forecast_day['date'] == cardDate:
         #You can access the data for the specific day here
             hourlyData = forecast_day['hour']
             break
            
   
    return  jsonify(hourlyData)
################################
# This functions renders the 
# index webpage 
################################
@app.route('/')
def index():
   response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={get_location()[0]},{get_location()[1]}&days=3")
   global forecastData
   forecastData  = json.loads(response.read())
   print( forecastData)
   if request.is_json:
        # json_data = search()
        json_data = location(str)
        
        print(json_data)
       
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
