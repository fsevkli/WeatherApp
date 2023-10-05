import os
from flask import Flask, render_template, request, redirect, url_for
from urllib.request import urlopen
import json
app = Flask(__name__)

API_KEY = '5dea31b4204948a681b182600230709'

# How to get weather data from location in API
# response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={loc}")
# data_json = json.loads(response.read())

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/location/<loc>')
def location(loc: str = "Paris"):
    response = urlopen(f"https://api.weatherapi.com/v1/forecast.json?key={API_KEY}&q={loc}&days=14")
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
    query = query.split(" ")[0]  # Do this because API has issues with spaces between words
    response = urlopen(f"https://api.weatherapi.com/v1/search.json?key={API_KEY}&q={query}")
    data = json.loads(response.read())

    # Saves data to json
    with open(f'loc_json/search_{query}.json', 'w') as f:
        json.dump(data, f, indent=4)

    return render_template("search.html", data=data)

if __name__ == '__main__':
    # Port is set to 8080, change to anything you want
    #   Remember, has to be 1024 or above
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)