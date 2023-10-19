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
@app.route('/location/<loc>')
def location(loc: str = "Paris"):
    response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key=5dea31b4204948a681b182600230709&q={loc}&days=14")
    data = json.loads(response.read())

    # Saves data to json
    with open(f'loc_json/loc_{loc}.json', 'w') as f:
        json.dump(data, f, indent=4)

    return render_template("location.html", data=data, 
                           location=data['location'], current=data['current'], condition=data['current']['condition'],
                           forecast=data['forecast']['forecastday'])

@app.route('/search')
def search():
    query = request.args.get('query', 'Paris')
    query = query.replace(" ", "%20")
    response = urlopen(f"https://api.weatherapi.com/v1/search.json?key={API_KEY}&q={query}")
    data = json.loads(response.read())

    # Saves data to json
    with open(f'loc_json/search_{query}.json', 'w') as f:
        json.dump(data, f, indent=4)

    return render_template("search.html", data=data)

################################
# This functions renders the 
# index webpage 
################################
@app.route('/')
def index():
   response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={get_location()[0]},{get_location()[1]}&days=3")
   print(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={get_location()[0]},{get_location()[1]}")
   data = json.loads(response.read())

   return render_template("index.html", data=data)

################################
# This Function Runs the server 
# on a local machine 
################################
if __name__ == '__main__':
    # Port is set to 8080, change to anything you want
    # Remember, it has to be 1024 or above
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
