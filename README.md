# Weather Forecast Web Application

## Project Overview

This web application is designed to provide users with real-time weather updates, leveraging Flask, a Python micro-framework. It features location-based weather data, search functionality for custom locations, and a dynamic background that changes based on day or night.

## Key Features

- **Real-Time Weather Updates**: Fetches current weather data using the user's IP or a specified location.
- **Hourly and Daily Forecasts**: Offers detailed weather forecasts for up to 14 days, including hourly data.
- **Location Detection**: Automatically detects the user's location for relevant weather updates.
- **Custom Location Search**: Allows users to search for weather data in different locations.
- **Dynamic Backgrounds**: The UI changes between day and night modes based on real-time data.

1. **Install Dependencies**: 
pip install flask geocoder

2. **Set API Key**: 
- Set your WeatherAPI key in the application as `API_KEY`.

3. **Run the Application**:
python app.py


## How to Use

- **Home Page**: Shows weather based on the user's location.
- **Search Function**: Input a location to get its weather forecast.
- **Date Selector**: Choose a date for hourly weather data.
- **Day/Night Checker**: Automatically adjusts UI based on the time of the day.

## APIs Used

- **WeatherAPI**: For weather data (requires an API key).
- **Geocoder**: To determine the user's location via IP address.

## Endpoints

- `GET /`: Main page with default weather data.
- `GET /default`: Weather data based on the user's location.
- `POST /getDate`: Hourly data for a selected date.
- `GET /CheckSun`: Determines current time phase (day/night).
- `GET /location`: Weekly forecast for a specified or current location.

## Contributing

Contributions are welcome. Ensure adherence to coding standards, documentation norms, and thorough testing.

## License
Licensed under Apache 2.0. See the LICENSE file for more details.