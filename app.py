import os
from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)

# Global Constants
TOMORROW_IO_API_KEY = 'jqDnTUjk6Hpyr5HuiMncD5zZFPJQKnLb'

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/location/<loc>')
def location(loc: str = "Paris"):
    url = f"https://api.tomorrow.io/v4/weather/forecast?location={loc}&apikey={TOMORROW_IO_API_KEY}"
    response = requests.get(url)
    data = response.json()

    # Extracting minutely data (you'll probably adjust for daily data later)
    minutely_data = data['timelines']['minutely'][0]['values']

    cloud_base = minutely_data['cloudBase']
    cloud_ceiling = minutely_data['cloudCeiling']
    cloud_cover = minutely_data['cloudCover']
    dew_point = minutely_data['dewPoint']
    freezing_rain_intensity = minutely_data['freezingRainIntensity']
    humidity = minutely_data['humidity']
    precipitation_probability = minutely_data['precipitationProbability']
    pressure_surface_level = minutely_data['pressureSurfaceLevel']
    rain_intensity = minutely_data['rainIntensity']
    sleet_intensity = minutely_data['sleetIntensity']
    snow_intensity = minutely_data['snowIntensity']
    temperature = minutely_data['temperature']
    temperature_apparent = minutely_data['temperatureApparent']
    uv_health_concern = minutely_data['uvHealthConcern']
    uv_index = minutely_data['uvIndex']
    visibility = minutely_data['visibility']
    weather_code = minutely_data['weatherCode']
    wind_direction = minutely_data['windDirection']
    wind_gust = minutely_data['windGust']
    wind_speed = minutely_data['windSpeed']

    # Save data to JSON
    with open(f'loc_json/loc_{loc}.json', 'w') as f:
        json.dump(data, f, indent=4)

    # Pass the extracted variables to the template
    return render_template("location.html", data=data, cloud_base=cloud_base, 
                           cloud_ceiling=cloud_ceiling, cloud_cover=cloud_cover, dew_point=dew_point,
                           freezing_rain_intensity=freezing_rain_intensity, humidity=humidity,
                           precipitation_probability=precipitation_probability, pressure_surface_level=pressure_surface_level,
                           rain_intensity=rain_intensity, sleet_intensity=sleet_intensity, snow_intensity=snow_intensity,
                           temperature=temperature, temperature_apparent=temperature_apparent, uv_health_concern=uv_health_concern,
                           uv_index=uv_index, visibility=visibility, weather_code=weather_code,
                           wind_direction=wind_direction, wind_gust=wind_gust, wind_speed=wind_speed)

@app.route('/search')
def search():
    query = request.args.get('query', 'Paris')
    return render_template("search.html", query=query)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
