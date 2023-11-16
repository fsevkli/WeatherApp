import os
from flask import Flask, render_template, request, jsonify, session
from urllib.request import urlopen
import json
import geocoder
from datetime import datetime

app = Flask(__name__)


API_KEY = '5dea31b4204948a681b182600230709'

def get_location():
    """Get the location of the user via IP address."""
    g = geocoder.ip('me')
    return g.latlng

def location(loc: str):
    """Make an API call to weatherapi to get the weekly forecast."""
    loc = request.args.get('inputValue')
    loc = loc.split(" ")[0] 
    if loc == "current":
        latlng = get_location()
        response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={latlng[0]},{latlng[1]}&days=14")
    else:
        input_value = request.args.get('inputValue').replace(" ", "%20")
        response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={input_value}&days=14")
       
    global forecastData
    forecastData = json.loads(response.read())
    return jsonify(
        data=forecastData, 
        location=forecastData['location'], 
        current=forecastData['current'], 
        condition=forecastData['current']['condition'],
        forecast=forecastData['forecast']['forecastday']
    )

@app.route('/getDate', methods=['POST'])
def getDate():
    """Get the card date from Main.js and return the hourly data for that date."""
    cardDate = request.json['day']
    print("Received date for hourly data:", cardDate)  # Diagnostic print

    # Find the matching date entry in forecastData
    for forecast_day in forecastData['forecast']['forecastday']:
        if forecast_day['date'] == cardDate:
            hourlyData = forecast_day['hour']
            return jsonify(hourlyData)

    # Return an empty array if no matching date was found
    return jsonify([])

@app.route('/CheckSun', methods=['GET'])
def CheckSun():
    """Check if the Sun is up or Down."""
    sunrise_time_str = forecastData['forecast']['forecastday'][0]['astro']['sunrise']
    sunset_time_str = forecastData['forecast']['forecastday'][0]['astro']['sunset']
    local_time_str = forecastData['location']['localtime'].split(' ', 1)[1]

    sunset_time_str = datetime.strptime(sunset_time_str, "%I:%M %p").strftime("%H:%M")
    sunrise_time_str = datetime.strptime(sunrise_time_str, "%I:%M %p").strftime("%H:%M")

    hours, minutes = map(int, local_time_str.split(':'))
    daytime_start = (int(sunrise_time_str.split(':')[0]), int(sunrise_time_str.split(':')[1]))
    daytime_end = (int(sunset_time_str.split(':')[0]), int(sunset_time_str.split(':')[1]))
    
    suntime = 'day' if (daytime_start <= (hours, minutes) <= daytime_end) else 'night'
    
    return jsonify(sunrise=sunrise_time_str, sunset=sunset_time_str, suntime=suntime, localtime=local_time_str)

@app.route('/default')
def default():
    """Get the default location which is the user location."""
    response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={get_location()[0]},{get_location()[1]}&days=3")
    forecastData = json.loads(response.read())
    return jsonify(
        location=forecastData['location'], 
        current=forecastData['current'], 
        condition=forecastData['current']['condition'],
        forecast=forecastData['forecast']['forecastday']
    )

@app.route('/')
def index():
    """Render the index webpage."""
    response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={get_location()[0]},{get_location()[1]}&days=3")
    global forecastData
    forecastData = json.loads(response.read())
    if request.is_json:
        return location(str)
    return render_template("index.html", data=forecastData, location=forecastData['location'])

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
