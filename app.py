import os
from flask import Flask, render_template, request, redirect, url_for
from urllib.request import urlopen
import json

app = Flask(__name__)

# How to get weather data from location in API
# response = urlopen(f"https://api.weatherapi.com/v1/current.json?key=5dea31b4204948a681b182600230709&q={loc}")
# data_json = json.loads(response.read())

@app.route('/')
def index():
    return render_template("index.html", data="")

@app.route('/location/<loc>')
def test(loc: str = "Paris"):
    response = urlopen(f"https://api.weatherapi.com/v1/current.json?key=5dea31b4204948a681b182600230709&q={loc}")
    data_json = json.loads(response.read())

    return render_template("index.html", data=data_json)

if __name__ == '__main__':
    # Port is set to 8080, change to anything you want
    #   Remember, has to be 1024 or above
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)