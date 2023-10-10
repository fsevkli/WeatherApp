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
    if loc == "current":
        latlng = get_location()
       
        response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={latlng[0]},{latlng[1]}&days=14")
    else:
       # get the input from text box html
       input = request.args.get('inputValue')
       response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={input}&days=14")

    data = json.loads(response.read())
    
    #Convert data to json to use in main.js
    return jsonify(data=data, 
                           location=data['location'], current=data['current'], condition=data['current']['condition'],
                           forecast=data['forecast']['forecastday'])

def search():
    # Do this because the API has issues with spaces between words
    query = request.args.get('inputValue')
    query = query.split(" ")[0]  # Do this because API has issues with spaces between words
    response = urlopen(f"https://api.weatherapi.com/v1/search.json?key={API_KEY}&q={query}")
    data = json.loads(response.read())

    # Save data to JSON file (optional)
   
    return data

################################
# This functions renders the 
# index webpage 
################################
@app.route('/')
def index():

   if request.is_json:
        json_data = search()
        json_data = location(str)
        
        print(json_data)
       
        return json_data
   return render_template("index.html")

################################
# This Function Runs the server 
# on a local machine 
################################
if __name__ == '__main__':
    # Port is set to 8080, change to anything you want
    # Remember, it has to be 1024 or above
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
